import { SpellLore } from "src/entities/spell-lore.entity";
export declare class ExtraSpellLoreToWarbandSoldier {
    id: string;
    spellLoreSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    source: string;
    spellLore?: SpellLore;
}
