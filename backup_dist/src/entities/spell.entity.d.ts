import { SpellLore } from "./spell-lore.entity";
export declare class Spell {
    id: string;
    slug: string;
    name: string;
    difficultyClass: number;
    spellLoreSlug: string;
    description: string;
    createdAt: Date;
    keywords: string[];
    spellLore?: SpellLore;
}
