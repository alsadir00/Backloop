import { UserRepository } from "@domain/repositories/userRepository.js";
import { PasswordService } from "@application/services/PassworService.js";
import { LoginUserSchema, LoginUserInput } from "@application/schemas/LoginUserSchema.js";
import { MongoRefreshTokenRepository } from "@infrastructure/repositories/RefreshTokenRepository";
import { generateRefreshTokenPlain,hashRefreshToken } from "@infrastructure/security/refreshTokenService";
import crypto from "crypto";
import { jwtService } from "@infrastructure/security/jwtServices";





export class LoginUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordService: PasswordService,
        private refreshRepository: MongoRefreshTokenRepository
    ){}

    async execute(input: LoginUserInput) {
        const validated = LoginUserSchema.parse(input)
        const user = await this.userRepository.findUserByEmail(validated.email)
        if(!user) throw new Error('Invalid Credentials')
        

        const isValid = await this.passwordService.comparePassword(validated.password, user.getPasswordHash())
        if(!isValid) throw new Error("Invalid Credentials")
        
        const AccessToken = jwtService.generateAccessToken({
            sub: user.getId().toString(),
            email: user.getEmail(),
            roles: ["user"]
        })

        const rid = crypto.randomUUID();
        const plain = generateRefreshTokenPlain();
        const hashed = await hashRefreshToken(plain);
        const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_EXPIRES_DAYS ?? 15)* 7*24*3600000);

        await this.refreshRepository.create({
            id: rid,
            userId: user.getId().toString(),
            tokenHash: hashed,
            expiresAt: expiresAt,
            deviceInfo: null,
            revoked: false,
            createdAt : new Date()
        })

            
        return { AccessToken, refresh: { rid, token: plain, expiresAt } , user: user.toJSON()};
    }
}