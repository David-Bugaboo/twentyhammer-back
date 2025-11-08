import { Type } from "class-transformer";
import { SpellLore } from "./spell-lore.entity";

export class Spell {
  id!: string;
  slug!: string;
  name!: string;
  difficultyClass!: number;
  spellLoreSlug!: string;
  description!: string;
  createdAt!: Date;
  keywords!: string[];
  @Type(() => SpellLore)
  spellLore?: SpellLore;
}


