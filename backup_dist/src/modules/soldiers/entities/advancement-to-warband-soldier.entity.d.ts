import { Advancement } from "src/entities/advancement.entity";
export declare class AdvancementToWarbandSoldier {
    id: string;
    advancementSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    advancement?: Advancement;
}
