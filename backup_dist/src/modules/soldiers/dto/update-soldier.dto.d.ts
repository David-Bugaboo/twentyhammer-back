import * as baseFigureEntity from 'src/entities/base-figure.entity';
import { MiscModifiersDto } from './miscModifiers.dto';
export declare class UpdateSoldierDto {
    twoWeaponFighting?: boolean;
    xp?: number;
    effectiveRole?: baseFigureEntity.Role;
    campaignName?: string;
    notes?: string;
    miscModifiers?: MiscModifiersDto;
}
