import { PartialType } from '@nestjs/mapped-types';
import { CreateWarbandDto } from './create-warband.dto';

export class UpdateWarbandDto extends PartialType(CreateWarbandDto) {}
