import { User } from "@domain/entities/user.js";

export interface UserRepository {
    createUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: string, data: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}