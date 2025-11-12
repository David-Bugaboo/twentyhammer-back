import { IsNumber, IsOptional } from "class-validator";

export class MiscModifiersDto{
    @IsNumber()
    @IsOptional()   
    fight?: number;
    @IsNumber()
    @IsOptional()
    shoot?: number;
    @IsNumber()
    @IsOptional()
    armour?: number;
    @IsNumber()
    @IsOptional()
    will?: number;
    @IsNumber()
    @IsOptional()
    health?: number;
    @IsNumber()
    @IsOptional()
    strength?: number;
}