import { Type } from 'class-transformer';
import { BaseFigure } from 'src/entities/base-figure.entity';

export class BaseFigureToWarbandSoldier {
  id!: string;
  baseFigureSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => BaseFigure)
  baseFigure?: BaseFigure;
}
