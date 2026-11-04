import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface TimeRangeObject {
  startMinute: number;
  endMinute: number;
}

@ValidatorConstraint({ name: 'isTimeRangeValid', async: false })
export class IsTimeRangeValidConstraint implements ValidatorConstraintInterface {
  public validate(endMinute: number, args: ValidationArguments): boolean {
    const object = args.object as TimeRangeObject;

    if (!Number.isInteger(object.startMinute)) {
      return false;
    }

    if (!Number.isInteger(endMinute)) {
      return false;
    }

    return object.startMinute < endMinute;
  }

  public defaultMessage(): string {
    return 'Время окончания должно быть позже времени начала';
  }
}
