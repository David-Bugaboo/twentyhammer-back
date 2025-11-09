import { SoldiersService } from './soldiers.service';
export declare class SoldiersController {
    private readonly soldiersService;
    constructor(soldiersService: SoldiersService);
    findOne(id: string): Promise<import("./entities/warband-soldier.entity").WarbandSoldier>;
    addEquipmentToSoldier(soldierId: string, warbandVaultItemId: string): Promise<void>;
    removeEquipmentFromSoldier(soldierId: string, warbandToSoldierItemId: string): Promise<void>;
    equipItemToSoldier(equipmentToWarbandSoldierId: string, slot: string): Promise<void>;
    addSpellToSoldier(soldierId: string, spellSlug: string): Promise<void>;
    removeSpellFromSoldier(warbandSoldierSpellId: string): Promise<void>;
    addSkillToSoldier(soldierId: string, skillSlug: string): Promise<void>;
    removeSkillFromSoldier(skillToWarbandSoldierId: string): Promise<void>;
    killSoldier(soldierId: string): Promise<void>;
    undoSoldier(soldierId: string): Promise<void>;
    addInjuryToSoldier(soldierId: string, injurySlug: string): Promise<void>;
    removeInjuryFromSoldier(injuryToWarbandSoldierId: string): Promise<void>;
    addAdvancementToSoldier(soldierId: string, advancementSlug: string): Promise<void>;
    removeAdvancementFromSoldier(advancementToWarbandSoldierId: string): Promise<void>;
    addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string): Promise<void>;
    removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId: string): Promise<void>;
}
