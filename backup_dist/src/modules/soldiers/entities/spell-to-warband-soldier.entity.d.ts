import { Spell } from "src/entities/spell.entity";
export declare class SpellToWarbandSoldier {
    id: string;
    spellSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    spell?: Spell;
    modifier: number;
}
