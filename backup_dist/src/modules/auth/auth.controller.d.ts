import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/common/user.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    create(req: any): any;
    login(loginDto: LoginDto): Promise<{
        data: {
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
        };
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
}
