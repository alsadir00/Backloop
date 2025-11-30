import { User } from "@domain/entities/user.js";
import { UserRepository } from "@domain/repositories/userRepository.js";
import { PasswordService } from "@application/services/PassworService.js";
import {RegisterUserSchema, RegisterUserInput } from "@application/schemas/RegisterUserSchema.js";




export class RegisterUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordService: PasswordService
    ){}

    async execute(input : RegisterUserInput){
        const validated = RegisterUserSchema.parse(input);

        const userExists = await this.userRepository.findUserByEmail(validated.email);
        if(userExists){
            throw new Error("User with this email already exists");
        }

        const passwordHash = await this.passwordService.hashPassword(validated.password);

        const newUser = User.create({
            id: crypto.randomUUID(),
            email: validated.email,
            passwordHash: passwordHash,
            name: validated.name ?? 'User'
        });

        const createdUser = await this.userRepository.createUser(newUser);
        return createdUser.toJSON();
    }

} 