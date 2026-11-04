import { IsInt, IsOptional, Min } from 'class-validator';

export class GetAvailableDatesDto {
  @IsInt({ message: 'serviceId должен быть числом' })
  @Min(1, { message: 'serviceId должен быть больше 0' })
  serviceId!: number;

  @IsOptional()
  @IsInt({ message: 'staffId должен быть числом' })
  @Min(1, { message: 'staffId должен быть больше 0' })
  staffId?: number;
}
