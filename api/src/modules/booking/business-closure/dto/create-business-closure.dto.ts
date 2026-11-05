import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CreateBusinessClosureDto {
  @IsISO8601(
    { strict: true },
    { message: 'Дата начала должна быть в формате ISO 8601 с часовым поясом' }
  )
  startAt!: string;

  @IsISO8601(
    { strict: true },
    { message: 'Дата окончания должна быть в формате ISO 8601 с часовым поясом' }
  )
  endAt!: string;

  @IsOptional()
  @IsString({ message: 'Причина должна быть строкой' })
  reason?: string;
}
