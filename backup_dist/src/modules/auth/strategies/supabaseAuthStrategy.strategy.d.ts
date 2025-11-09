import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/common/user.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private user;
    constructor(user: UsersService);
    validate(payload: any): Promise<{
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        email: string;
        updatedAt: Date;
    }>;
}
export {};
