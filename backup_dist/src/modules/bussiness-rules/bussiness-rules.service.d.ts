import { QueriesService } from '../queries/queries.service';
import { BaseFigure, Role } from 'src/entities/base-figure.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { Warband } from '../warbands/entities/warband.entity';
import { EquipmentToWarbandSoldier } from '../soldiers/entities/equipment-to-warband-soldier.entity';
export declare class BussinessRulesService {
    private readonly queriesService;
    constructor(queriesService: QueriesService);
    normalizeSpecialRules(specialRules?: Equipment['specialRules']): {
        label: string;
        value: string;
    }[];
    getLeader(factionSlug: string): Promise<BaseFigure>;
    validateFaction(factionSlug: string): Promise<boolean>;
    resolveFigure(slug: string): Promise<BaseFigure>;
    resolveEquipment(slug: string): Promise<Equipment>;
    resolveModifier(slug: string): Promise<Modifier>;
    ValidateModifier(modifier: Modifier, equipment: Equipment): Promise<void>;
    validateIfBuyIsValid(warband: Warband, equipment: Equipment, loot: boolean, modifier?: Modifier | null): Promise<void>;
    resolveEquipmentToWarbandSoldier(id: string): Promise<EquipmentToWarbandSoldier>;
    checkForCompatibility(equipmentSlug: string, soldierCompatibility: string[], soldierSkills: string[], equipmentCategory: string): Promise<true | undefined>;
    validateSkill(skillSlug: string, warbandSoldierSkills: string[], warbandSoldierSkillLists: string[]): Promise<void>;
    validateSpell(spellSlug: string, warbandSoldierSpellLores: string[], warbandSoldierSpells: string[], warbandSoldierSkills: string[]): Promise<void>;
    validateAddedAdvancement(advancementSlug: string, warbandSoldierAdvancements: string[]): Promise<void>;
    validateSuperNaturalAbility(supernaturalAbilitySlug: string, warbandSoldierSuperNaturalAbilities: string[], warbandSoldierBaseFigure: BaseFigure, warbandSoldierSkills: string[], warbandCrowns: number): Promise<void>;
    validateInjury(injurySlug: string, warbandSoldierInjuries: string[], warbandSoldierRole: Role): Promise<void>;
    validateAdvancement(advancementSlug: string, warbandSoldierAdvancements: string[], warbandSoldierRole: Role): Promise<void>;
    validateEquip(warbandSoldierEquipment: EquipmentToWarbandSoldier, warbandSoldierEquipmentList: EquipmentToWarbandSoldier[], warbandSoldierSuperNaturalAbilities: string[], warbandSoldierInjuries: string[], hand: string): Promise<void>;
    validateInventorySpace(warbandSoldierEquipmentList: EquipmentToWarbandSoldier[], equipmentCategory: string): Promise<void>;
    validateEquipTwoHanded(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void>;
    validateOffhand(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void>;
    validateMainHand(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void>;
    validateArmor(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void>;
    validateHelmet(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void>;
}
