import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/services/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, displayName: string, role?: UserRole): Promise<{
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        email: string;
        updatedAt: Date;
    }>;
    checkUserExistence(email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<{
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        email: string;
        updatedAt: Date;
    }>;
}
