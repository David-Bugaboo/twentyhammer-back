import { PartialType } from '@nestjs/mapped-types';
import { CreateSoldierDto } from './create-soldier.dto';
import * as baseFigureEntity from 'src/entities/base-figure.entity';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';


export class UpdateSoldierDto {
    @IsBoolean()
    @IsOptional()
    twoWeaponFighting?: boolean;
    @IsNumber()
    @IsOptional()
    xp?: number;
    @IsEnum([`HEROI`, `LENDA`, `MERCENARIO`, `SOLDADO`])
    @IsOptional()
    effectiveRole?: baseFigureEntity.Role;
    @IsString()
    @IsOptional()
    campaignName?: string;
    @IsString()
    @IsOptional()
    @MaxLength(255)
    notes?: string;
}
