import { RefreshTokenModel, IRefreshToken } from "@infrastructure/models/RefreshTokenModel";

export type RefreshTokenRow = {
  id: string;
  userId: string;
  tokenHash: string;
  deviceInfo?: string | null;
  ipHash?: string | null;
  expiresAt: Date;
  revoked: boolean;
  rotatedTo?: string | null;
  createdAt: Date;
};

export class MongoRefreshTokenRepository{


  async create(data: Omit<RefreshTokenRow, "createdAt"> & {createdAt: Date}): Promise<IRefreshToken> {
    const createdAt = data.createdAt ?? new Date();
    const doc = await RefreshTokenModel.create({
      id: data.id,
      userId: data.userId,
      tokenHash: data.tokenHash,
      deviceInfo: data.deviceInfo ?? null,
      ipHash: data.ipHash ?? null,
      expiresAt: data.expiresAt,
      revoked: data.revoked ?? false,
      rotatedTo: data.rotatedTo ?? null,
      createdAt: createdAt,
    });

    return doc.toObject() as unknown as IRefreshToken;
  }

  async findById(id: string): Promise<IRefreshToken | null> {
    const doc = await RefreshTokenModel.findOne({ id }).exec();
    return doc ? (doc.toObject() as unknown as IRefreshToken) : null;
  }

  async revoke(id: string): Promise<void> {
    await RefreshTokenModel.updateOne({ id }, { revoked: true }).exec();
  }

   async replace(oldId: string, newRow: Omit<RefreshTokenRow, "createdAt"> & { createdAt: Date }) {
    await RefreshTokenModel.updateOne({ id: oldId }, { rotatedTo: newRow.id, revoked: true }).exec();
    return this.create(newRow);
  }

  async delete(id: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ id }).exec();
  }
}