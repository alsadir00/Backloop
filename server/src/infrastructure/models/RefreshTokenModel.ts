import mongoose,{Schema,Document} from "mongoose";


export interface IRefreshToken extends Document {
    id: string;
    userId: string;
    tokenHash: string;
    deviceInfo?: string | null;
    ipHash?: string | null;
    expiresAt: Date;
    createdAt: Date;
    rotatedTo?: string | null;
    revoked: boolean;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  tokenHash: { type: String, required: true },
  deviceInfo: { type: String, default: null },
  ipHash: { type: String, default: null },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
  rotatedTo: { type: String, default: null },
  createdAt: { type: Date, required: true },
});

export const RefreshTokenModel = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema);