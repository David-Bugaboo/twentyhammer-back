import { Type } from "class-transformer";
import { Spell } from "src/entities/spell.entity";

export class SpellToWarbandSoldier {
  id!: string;
  spellSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => Spell)
  spell?: Spell;
}


