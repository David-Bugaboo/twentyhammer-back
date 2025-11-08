import { Type } from "class-transformer";
import { GiftOfTzeentch } from "src/entities/gift-of-tzeentch.entity";

export class GiftOfTzeentchToWarbandSoldier {
  id!: string;
  giftOfTzeentchSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => GiftOfTzeentch)
  giftOfTzeentch?: GiftOfTzeentch;
}


