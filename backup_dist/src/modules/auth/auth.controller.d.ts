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
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            email: string;
            updatedAt: Date;
        };
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        email: string;
        updatedAt: Date;
    }>;
}
