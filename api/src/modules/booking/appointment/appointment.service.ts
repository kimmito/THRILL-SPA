import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { User } from '../../../../generated/prisma/client';
import { AppointmentStatus } from '../../../../generated/prisma/enums';
import { PrismaService } from '@src/prisma/prisma.service';
import { AvailabilityService } from '../availability/availability.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';

const ACTIVE_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.PENDING,
  AppointmentStatus.CONFIRMED,
];
const CANCELLATION_WINDOW_MS = 2 * 60 * 60 * 1000;

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly service: PrismaService,
    private readonly availabilityService: AvailabilityService
  ) {}

  async getMyAppointments(userId: string) {
    return this.service.client.appointment.findMany({
      where: { userId },
      orderBy: { startAt: 'asc' },
    });
  }

  async cancelAppointment(userId: string, appointmentId: number) {
    const appointment = await this.service.client.appointment.findFirst({
      where: {
        id: appointmentId,
        userId,
        status: { in: ACTIVE_STATUSES },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Запись не найдена');
    }

    this.assertCancellationAllowed(appointment.startAt);
    return this.cancelOwnedAppointment(appointmentId, userId);
  }

  async cancelGuestAppointment(appointmentId: number, token: string) {
    const appointment = await this.service.client.appointment.findFirst({
      where: {
        id: appointmentId,
        guestCancellationTokenHash: this.hashToken(token),
        status: { in: ACTIVE_STATUSES },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Запись не найдена');
    }

    this.assertCancellationAllowed(appointment.startAt);

    const result = await this.service.client.appointment.updateMany({
      where: {
        id: appointmentId,
        guestCancellationTokenHash: this.hashToken(token),
        status: { in: ACTIVE_STATUSES },
      },
      data: { status: 'CANCELLED' },
    });

    if (result.count !== 1) {
      throw new ConflictException('Запись уже недоступна для отмены');
    }

    return this.service.client.appointment.findUniqueOrThrow({
      where: { id: appointmentId },
    });
  }

  async cancelAppointmentAsAdmin(appointmentId: number) {
    const result = await this.service.client.appointment.updateMany({
      where: {
        id: appointmentId,
        status: { in: ACTIVE_STATUSES },
      },
      data: { status: 'CANCELLED' },
    });

    if (result.count !== 1) {
      throw new NotFoundException('Запись не найдена или уже отменена');
    }

    return this.service.client.appointment.findUniqueOrThrow({
      where: { id: appointmentId },
    });
  }

  async rescheduleAppointment(appointmentId: number, dto: RescheduleAppointmentDto) {
    const appointment = await this.service.client.appointment.findFirst({
      where: {
        id: appointmentId,
        status: { in: ACTIVE_STATUSES },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Запись не найдена или недоступна для переноса');
    }

    const startAt = new Date(dto.startAt);
    const endAt = await this.availabilityService.assertSlotAvailable(
      appointment.serviceId,
      appointment.staffId,
      startAt,
      appointment.id
    );

    try {
      return await this.service.client.appointment.update({
        where: { id: appointment.id },
        data: { startAt, endAt },
      });
    } catch (error: unknown) {
      if (this.isAppointmentOverlapError(error)) {
        throw new ConflictException('Новое время уже занято');
      }
      throw error;
    }
  }

  async createAppointment(dto: CreateAppointmentDto, user?: User) {
    if (!user?.id && !dto.guestEmail) {
      throw new BadRequestException('Для гостевой записи необходимо указать email');
    }

    const service = await this.availabilityService.getBookableService(dto.serviceId);
    const staff = await this.service.client.staff.findFirst({
      where: {
        id: dto.staffId,
        isActive: true,
        staffServices: { some: { serviceId: dto.serviceId } },
      },
    });

    if (!staff) {
      throw new NotFoundException('Сотрудник не найден или не доступен для записи');
    }

    const startAt = new Date(dto.startAt);
    const endAt = await this.availabilityService.assertSlotAvailable(
      dto.serviceId,
      dto.staffId,
      startAt
    );
    const cancellationToken = user ? undefined : randomBytes(32).toString('hex');

    try {
      const appointment = await this.service.client.appointment.create({
        data: {
          name: dto.name,
          phone: dto.phone,
          userId: user?.id,
          guestEmail: user ? undefined : dto.guestEmail,
          guestCancellationTokenHash: cancellationToken
            ? this.hashToken(cancellationToken)
            : undefined,
          staffId: dto.staffId,
          serviceId: dto.serviceId,
          startAt,
          endAt,
          comment: dto.comment,
          serviceNameSnapshot: service.name,
          staffNameSnapshot: staff.name,
          priceSnapshot: service.price,
          durationMinutesSnapshot: service.durationMinutes,
        },
      });

      return {
        appointment,
        ...(cancellationToken ? { cancellationToken } : {}),
      };
    } catch (error: unknown) {
      if (this.isAppointmentOverlapError(error)) {
        throw new ConflictException('Выбранное время уже занято');
      }
      throw error;
    }
  }

  private async cancelOwnedAppointment(appointmentId: number, userId: string) {
    const result = await this.service.client.appointment.updateMany({
      where: {
        id: appointmentId,
        userId,
        status: { in: ACTIVE_STATUSES },
      },
      data: { status: 'CANCELLED' },
    });

    if (result.count !== 1) {
      throw new ConflictException('Запись уже недоступна для отмены');
    }

    return this.service.client.appointment.findUniqueOrThrow({
      where: { id: appointmentId },
    });
  }

  private assertCancellationAllowed(startAt: Date) {
    if (startAt.getTime() <= Date.now()) {
      throw new ConflictException('Нельзя отменить запись, которая уже началась');
    }
    if (startAt.getTime() - Date.now() < CANCELLATION_WINDOW_MS) {
      throw new ConflictException('Нельзя отменить запись менее чем за 2 часа');
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private isAppointmentOverlapError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2004' &&
      'meta' in error &&
      typeof error.meta === 'object' &&
      error.meta !== null &&
      'constraint' in error.meta &&
      error.meta.constraint === 'appointments_staff_active_time_no_overlap'
    );
  }
}
