import { User } from "@domain/entities/user";
import { UserDocument } from "@infrastructure/models/userModel";



export function docToDomainUser(doc: UserDocument): User {
  return User.create({
    id: doc.id,
    email: doc.email,
    passwordHash: doc.password,
    name: doc.name ?? undefined,
    createdAt: doc.createdAt,
  });
}