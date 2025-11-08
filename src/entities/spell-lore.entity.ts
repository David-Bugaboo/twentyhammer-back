import { Spell } from "./spell.entity";

export class SpellLore {
  id!: string;
  slug!: string;
  name!: string;
  description!: string;
  createdAt!: Date;
  spells?: Spell[];
}


