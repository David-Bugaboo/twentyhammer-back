"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./guards/jwt.guard");
const login_dto_1 = require("./dto/login.dto");
const supabase_client_1 = require("../../supabase/supabase.client");
const user_service_1 = require("../../common/user.service");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    create(req) {
        return req.user;
    }
    async login(loginDto) {
        const { data, error } = await supabase_client_1.supabase.auth.signInWithPassword({
            email: loginDto.email,
            password: loginDto.password,
        });
        if (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
        const user = await this.usersService.findUserByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado.');
        }
        return { data: user, token: data.session.access_token };
    }
    async register(registerDto) {
        const { data, error } = await supabase_client_1.supabase.auth.signUp({
            email: registerDto.email,
            password: registerDto.password,
            options: {
                data: {
                    display_name: registerDto.name,
                },
            },
        });
        if (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
        const user = await this.usersService.checkUserExistence(registerDto.email);
        if (user) {
            throw new common_1.UnauthorizedException('Usuário já existe.');
        }
        const newUser = await this.usersService.createUser(registerDto.email, registerDto.name);
        return newUser;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map