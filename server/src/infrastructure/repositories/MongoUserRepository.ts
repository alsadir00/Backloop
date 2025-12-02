import { UserRepository } from "@domain/repositories/userRepository";
import { User } from "@domain/entities/user";
import { UserModel, UserDocument } from "@infrastructure/models/userModel";
import { docToDomainUser } from "@infrastructure/mapper/userMapper";




export class MongoUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const doc = await UserModel.create({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPasswordHash(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
        })

        return docToDomainUser(doc as UserDocument);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const doc = await UserModel.findOne({email}).exec();
        return doc ? docToDomainUser(doc as UserDocument) : null;
    }


    async findUserById(id: string): Promise<User | null> {
        const doc = await UserModel.findOne({id}).exec();
        return doc ? docToDomainUser(doc as UserDocument) : null;
    }

    async getAllUsers(): Promise<User[]> {
        const docs = await UserModel.find().exec();
        return docs.map(doc => docToDomainUser(doc as UserDocument));
    }

    async updateUser(id: string, patch: any): Promise<User | null> {
        const updated = await UserModel.findByIdAndUpdate(
            id,
            { $set: patch },
            { new: true },
        );

        return updated ? docToDomainUser(updated) : null;
    }



    async deleteUser(id: string): Promise<void> {
        const res = await UserModel.deleteOne({id}).exec();
        if (res.deletedCount === 0) {
            throw new Error(`User not found`);
            return;
        }
        return ;
    }
}