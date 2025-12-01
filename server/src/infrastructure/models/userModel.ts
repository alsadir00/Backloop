import { User } from "@domain/entities/user";
import mongoose,{Document, Schema} from "mongoose"



export interface UserDocument extends Document {
    name : string;
    email: string;
    id: string;
    password: string;
    createdAt: Date;
    updatedAt? : Date;
  }

  const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
  });

  export const UserModel = mongoose.model<UserDocument>("User", userSchema);