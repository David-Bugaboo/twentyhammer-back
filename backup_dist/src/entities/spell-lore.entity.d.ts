import { Spell } from "./spell.entity";
export declare class SpellLore {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: Date;
    spells?: Spell[];
}
