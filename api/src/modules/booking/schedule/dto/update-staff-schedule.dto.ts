import { IsInt, Max, Min, Validate } from 'class-validator';

import { IsTimeRangeValidConstraint } from '@src/libs/common/decorators/decorators/is-time-range-valid-constraint.decorator';

export class UpdateStaffScheduleDto {
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
