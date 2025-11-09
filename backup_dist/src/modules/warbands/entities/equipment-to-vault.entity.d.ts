import { Equipment } from "src/entities/equipment.entity";
import { Modifier } from "src/entities/modifier.entity";
export declare class EquipmentToVault {
    id: string;
    warbandId: string;
    equipmentSlug: string;
    createdAt: Date;
    customPrice?: number | null;
    modifierSlug?: string | null;
    equipment?: Equipment;
    modifier?: Modifier | null;
}
