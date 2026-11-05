import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessClosureDto } from './create-business-closure.dto';

export class UpdateBusinessClosureDto extends PartialType(CreateBusinessClosureDto) {}
