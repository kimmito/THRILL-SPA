import { IsISO8601 } from 'class-validator';

export class RescheduleAppointmentDto {
  @IsISO8601({}, { message: 'Дата начала должна быть в формате ISO 8601' })
  startAt!: string;
}
