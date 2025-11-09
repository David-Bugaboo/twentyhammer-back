import { SuperNaturalAbility } from "src/entities/super-natural-ability.entity";
export declare class SuperNaturalAbilityToWarbandSoldier {
    id: string;
    superNaturalAbilitySlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    superNaturalAbility?: SuperNaturalAbility;
}
