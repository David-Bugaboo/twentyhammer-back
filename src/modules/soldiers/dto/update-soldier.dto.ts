
import * as baseFigureEntity from 'src/entities/base-figure.entity';
import { IsBoolean, IsEnum, IsNumber, IsObject, isObject, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { MiscModifiersDto } from './miscModifiers.dto';
import { Type } from 'class-transformer';


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
    @IsObject()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => MiscModifiersDto)
    miscModifiers?: MiscModifiersDto[];
}
