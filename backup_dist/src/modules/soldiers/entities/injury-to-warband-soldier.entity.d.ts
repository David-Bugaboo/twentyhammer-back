import { Injury } from "src/entities/injury.entity";
export declare class InjuryToWarbandSoldier {
    id: string;
    injurySlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    injury?: Injury;
}
