import { IsEmail, IsInt, IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt({ message: 'serviceId должен быть числом' })
  serviceId!: number;

  @IsInt({ message: 'staffId должен быть числом' })
  staffId!: number;

  @IsISO8601()
  startAt!: string;

  @IsOptional()
  @IsString({ message: 'Комментарий должен быть строкой' })
  @MaxLength(1000, { message: 'Комментарий не может быть длиннее 1000 символов' })
  comment?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  guestEmail?: string;
}
