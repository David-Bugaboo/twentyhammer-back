import { Warband } from "./warband.entity";

export class SharedLink {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  warbandId: string;
  warband: Warband;
  bandSnapShot: any;
}