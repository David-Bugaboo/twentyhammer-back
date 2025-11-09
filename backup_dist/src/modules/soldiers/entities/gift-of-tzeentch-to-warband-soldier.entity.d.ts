import { GiftOfTzeentch } from "src/entities/gift-of-tzeentch.entity";
export declare class GiftOfTzeentchToWarbandSoldier {
    id: string;
    giftOfTzeentchSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    giftOfTzeentch?: GiftOfTzeentch;
}
