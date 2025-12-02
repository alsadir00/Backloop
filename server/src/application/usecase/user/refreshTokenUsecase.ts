import { MongoRefreshTokenRepository } from "@infrastructure/repositories/RefreshTokenRepository";
import { jwtService } from "@infrastructure/security/jwtServices";
import { compareRefreshToken, generateRefreshTokenPlain, hashRefreshToken } from "@infrastructure/security/refreshTokenService.js";
import crypto from "crypto";

export class RefreshTokenUseCase {
  constructor(private refreshRepository: MongoRefreshTokenRepository) {}

  async execute({ rid, token, deviceInfo, ip }: { rid: string; token: string; deviceInfo?: string; ip?: string }) {
    const row = await this.refreshRepository.findById(rid);
    if (!row || row.revoked) throw new Error("Invalid refresh token");
    if (row.expiresAt < new Date()) {
      await this.refreshRepository.revoke(row.id);
      throw new Error("Refresh token expired");
    }

    const match = await compareRefreshToken(token, row.tokenHash);
    if (!match) {
      await this.refreshRepository.revokeAllForUser(row.userId);
      throw new Error("Refresh token reuse detected");
    }


    const newRid = crypto.randomUUID();
    const newPlain = generateRefreshTokenPlain();
    const newHash = await hashRefreshToken(newPlain);
    const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_EXPIRES_DAYS ?? 15) * 24 * 3600 * 1000);

    const newRow = await this.refreshRepository.replace(row.id, {
      id: newRid,
      userId: row.userId,
      tokenHash: newHash,
      deviceInfo: deviceInfo ?? null,
      ipHash: ip ? ip : null,
      expiresAt,
      revoked: false,
      createdAt : new Date(),
    });


    const accessToken = jwtService.generateAccessToken({ sub: row.userId });

    return { accessToken, refresh: { rid: newRow.id, token: newPlain, expiresAt: newRow.expiresAt } };
  }
}
