import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/services/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, displayName: string, role?: UserRole): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
    checkUserExistence(email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<{
        warbands: ({
            faction: {
                id: string;
                name: string;
                createdAt: Date;
                slug: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            crowns: number;
            wyrdstone: number;
            factionSlug: string;
            userId: string;
        })[];
    } & {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
}
