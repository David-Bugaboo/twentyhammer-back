import { Type } from "class-transformer";
import { SpellLore } from "src/entities/spell-lore.entity";

export class ExtraSpellLoreToWarbandSoldier {
  id!: string;
  spellLoreSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  source!: string;
  @Type(() => SpellLore)
  spellLore?: SpellLore;
}


