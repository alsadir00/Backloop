import { UserRepository } from "@domain/repositories/userRepository.js";
import { PasswordService } from "@application/services/PassworService.js";
import { LoginUserSchema, LoginUserInput } from "@application/schemas/LoginUserSchema.js";
import { string } from "zod";

export class LoginUserUsecase {
    constructor(
        private userRepository: UserRepository,
        private passwordService: PasswordService
    ){}

    async execute(input: LoginUserInput) {
        const validated = LoginUserSchema.parse(input)
        const user = await this.userRepository.findUserByEmail(validated.email)
        if(!user) throw new Error('Invalid Credentials')
        

        const isValid = await this.passwordService.comparePassword(validated.password, user.getPasswordHash())
        if(!isValid) throw new Error("Invalid Credentials")
        return user.toJSON();
    }
}