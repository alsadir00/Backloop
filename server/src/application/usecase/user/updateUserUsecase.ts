import { UserRepository } from "@domain/repositories/userRepository.js";
import { updateUserSchema, updateUserInput } from "@application/schemas/UpdateUserSchema.js";
import { PasswordService } from "@application/services/PassworService.js";

export class UpadteUserUsecase {
    constructor(
        private userRepository : UserRepository ,
        private passwordService : PasswordService
    ){}

    async execute(input : updateUserInput){
        const validated = updateUserSchema.parse(input)
        const userExists = await this.userRepository.findUserById(validated.id)
        if(!userExists) throw new Error("User Not Found");

        const patch : any = {};
        if(validated.name) patch.name = validated.name;
        if(validated.email) patch.email = validated.email;
        if(validated.password) {
            patch.passwordHash = await this.passwordService.hashPassword(validated.password)
        }

        const updatedUser = await this.userRepository.updateUser(validated.id, patch)
        if (!updatedUser) throw new Error("Failed to update user");

        return updatedUser.toJSON();
    }
}