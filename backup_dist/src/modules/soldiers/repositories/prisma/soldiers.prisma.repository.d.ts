import { PrismaService } from 'prisma/services/prisma.service';
import { SoldiersRepository } from '../soldiers.repository';
import { WarbandSoldier } from '../../entities/warband-soldier.entity';
import { EquipmentToVault } from 'src/modules/warbands/entities/equipment-to-vault.entity';
export declare class SoldiersPrismaRepository implements SoldiersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    removeSoldierFromWarband(soldierId: string, kill: boolean): void;
    addEquipmentToSoldier(soldierId: string, warbandVaultItem: EquipmentToVault): Promise<void>;
    removeEquipmentFromSoldier(warbandToSoldierItemId: string): Promise<void>;
    findSoldierById(soldierId: string): Promise<WarbandSoldier>;
    addSkillToSoldier(soldierId: string, skillSlug: string): Promise<void>;
    addSpellToSoldier(soldierId: string, spellSlug: string): Promise<void>;
    removeSpellFromSoldier(SpellToWarbandSoldierId: string): Promise<void>;
    addAdvancementToSoldier(soldierId: string, advancementSlug: string): Promise<void>;
    addInjuryToSoldier(soldierId: string, injurySlug: string): Promise<void>;
    addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string): Promise<void>;
    removeSkillFromSoldier(SkillToWarbandSoldierId: string): Promise<void>;
    killSoldier(soldierId: string): Promise<void>;
    undoSoldier(soldierId: string): Promise<void>;
    removeInjuryFromSoldier(injuryToWarbandSoldierId: string): Promise<void>;
    removeAdvancementFromSoldier(AdvancementToWarbandSoldierId: string): Promise<void>;
    removeSuperNaturalAbilityFromSoldier(SuperNaturalAbilityToWarbandSoldierId: string): Promise<void>;
    unequipAllHandsFromSoldier(soldierId: string): Promise<void>;
    unequipGear(equipmentToWarbandSoldierId: string): Promise<void>;
    unequipSlotFromSoldier(soldierId: string, slot: string): Promise<void>;
    equipGear(equipmentToWarbandSoldierId: string, slot: string): Promise<void>;
}
