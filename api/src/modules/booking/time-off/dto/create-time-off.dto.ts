import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateTimeOffDto {
  @IsISO8601({}, { message: 'Дата начала должна быть в формате ISO 8601' })
  startAt!: string;

  @IsISO8601({}, { message: 'Дата окончания должна быть в формате ISO 8601' })
  endAt!: string;

  @IsOptional()
  @IsString({ message: 'Причина должна быть строкой' })
  reason?: string;
}
