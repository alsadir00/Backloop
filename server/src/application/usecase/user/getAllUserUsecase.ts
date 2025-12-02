import { User } from "@domain/entities/user.js";
import { UserRepository } from "@domain/repositories/userRepository.js";

export class GetAllUserUseCase{
    constructor(private userRepository : UserRepository){}

    async execute() {
        const users = await this.userRepository.getAllUsers()
        return users.map(u => u.toJSON());
    }


}