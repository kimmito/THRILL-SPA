import {
  IsEmail,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  @MaxLength(100, { message: 'Имя не может быть длиннее 100 символов' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @MaxLength(30, { message: 'Номер телефона не может быть длиннее 30 символов' })
  @Matches(/^\+7(?:[\s()-]*\d){10}$/, {
    message: 'Укажите номер в формате +7 (900) 000-00-00',
  })
  phone?: string;

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
