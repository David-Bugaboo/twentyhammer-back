export declare enum Role {
    LEADER = "LEADER",
    HERO = "HERO",
    MERCENARY = "MERCENARY",
    LEGEND = "LEGEND",
    SOLDIER = "SOLDIER"
}
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Faction {
    id: string;
    slug: string;
    name: string;
    createdAt: Date;
    figures?: BaseFigure[];
    warbands?: Warband[];
}
export interface Warband {
    id: string;
    name: string;
    crowns: number;
    wyrdstone: number;
    factionSlug: string;
    createdAt: Date;
    faction?: Faction;
    vault?: EquipmentToVault[];
    warbandSoldiers?: WarbandSoldier[];
}
export interface BaseFigure {
    id: string;
    name: string;
    role: Role;
    slug: string;
    lore: string;
    avaiability: string[];
    exclusions: string[];
    quality: number;
    canGetMutations: boolean;
    canGetSacredMarks: boolean;
    canGetBlessings: boolean;
    race: string;
    factionSlug?: string | null;
    cost: number;
    movement: number;
    fight: number;
    shoot: number;
    armour: number;
    will: number;
    health: number;
    strength: number;
    equipmentSlots: number;
    startingXp?: number | null;
    createdAt: Date;
    specialRules: unknown;
    faction?: Faction | null;
    baseFigureToWarbandSoldiers?: BaseFigureToWarbandSoldier[];
    avaiableEquipment?: FigureToAvaiableEquipment[];
    skillLists?: FigureToSkillList[];
    spellLores?: FigureToSpellLore[];
    legendStartingEquipment?: LegendStartingEquipment[];
    legendStartingSkills?: LegendStartingSkills[];
    legendStartingSpells?: LegendStartingSpells[];
    mercenaryStartingEquipment?: MercenaryStartingEquipment[];
}
export interface Equipment {
    id: string;
    slug: string;
    name: string;
    cost: number;
    category: string;
    rarity: number;
    avaiability: string[];
    exclusions: string[];
    damageBonus?: number | null;
    armourBonus?: number | null;
    movementPenalty?: number | null;
    range?: number | null;
    createdAt: Date;
    specialRules?: unknown;
    slot?: number | null;
    equipmentToVault?: EquipmentToVault[];
    equipmentToWarbandSoldier?: EquipmentToWarbandSoldier[];
    figureToAvaiableEquipments?: FigureToAvaiableEquipment[];
    legendStartingEquipments?: LegendStartingEquipment[];
    mercenaryStartingEquipments?: MercenaryStartingEquipment[];
}
export interface Modifier {
    id: string;
    slug: string;
    name: string;
    category: string;
    multiplier: number;
    effect: string;
    createdAt: Date;
    specialRules?: unknown;
    equipmentsInVault?: EquipmentToVault[];
    equipmentToWarbandSoldiers?: EquipmentToWarbandSoldier[];
}
export interface WarbandSoldier {
    id: string;
    campaignName: string;
    warbandId: string;
    experience: number;
    createdAt: Date;
    xp: number;
    extraSpecialRules?: unknown;
    warband?: Warband;
    advancements?: AdvancementToWarbandSoldier[];
    baseFigure?: BaseFigureToWarbandSoldier[];
    equipment?: EquipmentToWarbandSoldier[];
    extraSkillLists?: ExtraSkillListToWarbandSoldier[];
    extraSpellLists?: ExtraSpellLoreToWarbandSoldier[];
    giftsOfTzeentch?: GiftOfTzeentchToWarbandSoldier[];
    injuries?: InjuryToWarbandSoldier[];
    skills?: SkillToWarbandSoldier[];
    spells?: SpellToWarbandSoldier[];
    supernaturalAbilities?: SuperNaturalAbilityToWarbandSoldier[];
}
export interface SuperNaturalAbility {
    id: string;
    slug: string;
    name: string;
    description: string;
    cost: number;
    category: string;
    createdAt: Date;
    superNaturalAbilityToWarbandSoldier?: SuperNaturalAbilityToWarbandSoldier[];
}
export interface Injury {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    injuryToWarbandSoldier?: InjuryToWarbandSoldier[];
}
export interface GiftOfTzeentch {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    giftOfTzeentchToWarbandSoldier?: GiftOfTzeentchToWarbandSoldier[];
}
export interface Advancement {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    advancementToWarbandSoldier?: AdvancementToWarbandSoldier[];
}
export interface Spell {
    id: string;
    slug: string;
    name: string;
    difficultyClass: number;
    spellLoreSlug: string;
    description: string;
    createdAt: Date;
    keywords: string[];
    legendStartingSpells?: LegendStartingSpells[];
    spellToWarbandSoldier?: SpellToWarbandSoldier[];
    spellLore?: SpellLore;
}
export interface Skill {
    id: string;
    slug: string;
    name: string;
    skillListSlug: string;
    description: string;
    createdAt: Date;
    legendStartingSkills?: LegendStartingSkills[];
    skillToWarbandSoldier?: SkillToWarbandSoldier[];
    skillList?: SkillList;
}
export interface SpellLore {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    extraSpellLoreToWarbandSoldiers?: ExtraSpellLoreToWarbandSoldier[];
    figureToSpellLores?: FigureToSpellLore[];
    spells?: Spell[];
}
export interface SkillList {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    extraSkillListToWarbandSoldiers?: ExtraSkillListToWarbandSoldier[];
    figureToSkillLists?: FigureToSkillList[];
    skills?: Skill[];
}
export interface FigureToAvaiableEquipment {
    id: string;
    figureSlug: string;
    avaiableEquipmentSlug: string;
    customCost?: number | null;
    createdAt: Date;
    avaiableEquipment?: Equipment;
    figure?: BaseFigure;
}
export interface FigureToSpellLore {
    id: string;
    figureSlug: string;
    spellLoreSlug: string;
    createdAt: Date;
    figure?: BaseFigure;
    spellLore?: SpellLore;
}
export interface FigureToSkillList {
    id: string;
    figureSlug: string;
    skillListSlug: string;
    createdAt: Date;
    figure?: BaseFigure;
    skillList?: SkillList;
}
export interface EquipmentToVault {
    id: string;
    warbandId: string;
    equipmentSlug: string;
    createdAt: Date;
    customPrice?: number | null;
    modifierSlug: string;
    equipment?: Equipment;
    modifier?: Modifier;
    warband?: Warband;
}
export interface MercenaryStartingEquipment {
    id: string;
    figureSlug: string;
    equipmentSlug: string;
    createdAt: Date;
    equipment?: Equipment;
    figure?: BaseFigure;
}
export interface LegendStartingEquipment {
    id: string;
    figureSlug: string;
    equipmentSlug: string;
    createdAt: Date;
    equipment?: Equipment;
    figure?: BaseFigure;
}
export interface LegendStartingSpells {
    id: string;
    figureSlug: string;
    spellSlug: string;
    createdAt: Date;
    figure?: BaseFigure;
    spell?: Spell;
}
export interface LegendStartingSkills {
    id: string;
    figureSlug: string;
    skillSlug: string;
    createdAt: Date;
    figure?: BaseFigure;
    skill?: Skill;
}
export interface SpellToWarbandSoldier {
    id: string;
    spellSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    spell?: Spell;
    warbandSoldier?: WarbandSoldier;
}
export interface SkillToWarbandSoldier {
    id: string;
    skillSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    skill?: Skill;
    warbandSoldier?: WarbandSoldier;
}
export interface AdvancementToWarbandSoldier {
    id: string;
    advancementSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    advancement?: Advancement;
    warbandSoldier?: WarbandSoldier;
}
export interface InjuryToWarbandSoldier {
    id: string;
    injurySlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    injury?: Injury;
    warbandSoldier?: WarbandSoldier;
}
export interface GiftOfTzeentchToWarbandSoldier {
    id: string;
    giftOfTzeentchSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    giftOfTzeentch?: GiftOfTzeentch;
    warbandSoldier?: WarbandSoldier;
}
export interface SuperNaturalAbilityToWarbandSoldier {
    id: string;
    superNaturalAbilitySlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    superNaturalAbility?: SuperNaturalAbility;
    warbandSoldier?: WarbandSoldier;
}
export interface ExtraSkillListToWarbandSoldier {
    id: string;
    skillListSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    source: string;
    skillList?: SkillList;
    warbandSoldier?: WarbandSoldier;
}
export interface ExtraSpellLoreToWarbandSoldier {
    id: string;
    spellLoreSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    source: string;
    spellLore?: SpellLore;
    warbandSoldier?: WarbandSoldier;
}
export interface EquipmentToWarbandSoldier {
    id: string;
    equipmentSlug: string;
    warbandSoldierId: string;
    customCost?: number | null;
    modifierSlug: string;
    mainHandEqquiped: boolean;
    offHandEqquiped: boolean;
    helmetEqquiped: boolean;
    armorEquipped: boolean;
    twoHandedEqquiped: boolean;
    createdAt: Date;
    equipment?: Equipment;
    modifier?: Modifier;
    warbandSoldier?: WarbandSoldier;
}
export interface BaseFigureToWarbandSoldier {
    id: string;
    baseFigureSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    baseFigure?: BaseFigure;
    warbandSoldier?: WarbandSoldier;
}
