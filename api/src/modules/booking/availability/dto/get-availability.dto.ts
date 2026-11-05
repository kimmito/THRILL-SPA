import { Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, Min } from 'class-validator';

export class GetAvailabilityDto {
  @Type(() => Number)
  @IsInt({ message: 'serviceId должен быть числом' })
  @Min(1, { message: 'serviceId должен быть больше 0' })
  serviceId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'staffId должен быть числом' })
  @Min(1, { message: 'staffId должен быть больше 0' })
  staffId?: number;

  @IsISO8601({ strict: true }, { message: 'Дата должна быть в формате ISO 8601' })
  date!: string;
}
