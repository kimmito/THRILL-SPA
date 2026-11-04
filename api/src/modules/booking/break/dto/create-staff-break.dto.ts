import { IsInt, Max, Min, Validate } from 'class-validator';
import { IsTimeRangeValidConstraint } from '@src/libs/common/decorators/decorators/is-time-range-valid-constraint.decorator';
export class CreateStaffBreakDto {
  @IsInt({ message: 'День недели должен быть числом' })
  @Min(0, { message: 'День недели должен быть от 0 до 6' })
  @Max(6, { message: 'День недели должен быть от 0 до 6' })
  dayOfWeek!: number;

  @IsInt({ message: 'Время начала должно быть числом' })
  @Min(0, { message: 'Время начала не может быть меньше 0' })
  @Max(1439, { message: 'Время начала не может быть больше 1439' })
  startMinute!: number;

  @IsInt({ message: 'Время окончания должно быть числом' })
  @Min(1, { message: 'Время окончания должно быть больше 0' })
  @Max(1440, { message: 'Время окончания не может быть больше 1440' })
  @Validate(IsTimeRangeValidConstraint)
  endMinute!: number;
}
