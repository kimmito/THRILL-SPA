import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name?: string;

  @IsString({ message: 'Email должен быть строкой' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат email' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @MaxLength(30, { message: 'Номер телефона не может быть длиннее 30 символов' })
  @Matches(/^\+7(?:[\s()-]*\d){10}$/, {
    message: 'Укажите номер в формате +7 (900) 000-00-00',
  })
  phoneNumber?: string;
}
