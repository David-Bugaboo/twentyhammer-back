import { BaseFigure } from 'src/entities/base-figure.entity';
export declare class BaseFigureToWarbandSoldier {
    id: string;
    baseFigureSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    baseFigure?: BaseFigure;
}
