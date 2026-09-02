import { RegisterDto } from '@src/modules/auth/dto/register.dto';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
  public validate(passwordRepeat: string, args: ValidationArguments): boolean {
    const obj = args.object as RegisterDto;
    return obj.password === passwordRepeat;
  }
  public defaultMessage() {
    return 'Пароли не совпадают';
  }
}
