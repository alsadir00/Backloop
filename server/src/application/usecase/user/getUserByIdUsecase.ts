import { UserRepository } from "@domain/repositories/userRepository.js";


export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userId : string){
        const user = await this.userRepository.findUserById(userId);
        if(!user) throw new Error ("User Not Found");
        
        return user.toJSON();
    }
}