import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class GetAvailableDatesDto {
  @Type(() => Number)
  @IsInt({ message: 'serviceId должен быть числом' })
  @Min(1, { message: 'serviceId должен быть больше 0' })
  serviceId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'staffId должен быть числом' })
  @Min(1, { message: 'staffId должен быть больше 0' })
  staffId?: number;
}
