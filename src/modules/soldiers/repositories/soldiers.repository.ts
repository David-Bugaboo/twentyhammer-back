import { EquipmentToVault } from 'src/modules/warbands/entities/equipment-to-vault.entity';
import { WarbandSoldier } from '../entities/warband-soldier.entity';
import { PromotedHeroSkillLists } from '../entities/promoted-hero-skill-list.entity';
import { UpdateSoldierDto } from '../dto/update-soldier.dto';

export abstract class SoldiersRepository {
  abstract removeSoldierFromWarband(soldierId: string, kill: boolean);
  abstract findSoldierById(soldierId: string): Promise<WarbandSoldier>;
  abstract addEquipmentToSoldier(
    soldierId: string,
    warbandVaultItem: EquipmentToVault,
  ): Promise<void>;
  abstract removeEquipmentFromSoldier(
    warbandToSoldierItemId: string,
  ): Promise<void>;
  abstract addSpellToSoldier(soldierId: string, spellSlug: string): Promise<void>;
  abstract removeSpellFromSoldier(SpellToWarbandSoldierId: string): Promise<void>;
  abstract addSkillToSoldier(soldierId: string, skillSlug: string): Promise<void>;
  abstract removeSkillFromSoldier(SkillToWarbandSoldierId: string): Promise<void>;
  abstract killSoldier(soldierId: string): Promise<void>;
  abstract undoSoldier(soldierId: string): Promise<void>;
  abstract addInjuryToSoldier(soldierId: string, injurySlug: string): Promise<void>;
  abstract removeInjuryFromSoldier(injuryToWarbandSoldierId: string): Promise<void>;
  abstract addAdvancementToSoldier(soldierId: string, advancementSlug: string): Promise<void>;
  abstract removeAdvancementFromSoldier(AdvancementToWarbandSoldierId: string): Promise<void>;
  abstract addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string): Promise<void>;
  abstract removeSuperNaturalAbilityFromSoldier(SuperNaturalAbilityToWarbandSoldierId: string): Promise<void>;
  abstract unequipAllHandsFromSoldier(soldierId: string): Promise<void>;
  abstract unequipGear(equipmentToWarbandSoldierId: string): Promise<void>;
  abstract unequipSlotFromSoldier(
    soldierId: string,
    slot: string,
  ): Promise<void>;
  abstract equipGear(equipmentToWarbandSoldierId: string, slot: string): Promise<void>;
  abstract addExtraSkillListToSoldier(soldierId: string, skillListSlug: string, source: string): Promise<void>;
  abstract removeExtraSkillListFromSoldier(soldierId: string, skillListSlug: string): Promise<void>;
  abstract addExtraSpellLoreToSoldier(soldierId: string, spellLoreSlug: string, source: string): Promise<void>;
  abstract removeExtraSpellLoreFromSoldier(soldierId: string, spellLoreSlug: string): Promise<void>;
  abstract updateSoldier(soldierId: string, updateSoldierDto: UpdateSoldierDto): Promise<void>;
}
