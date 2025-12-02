import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'alsadirebrahimtheone';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

export type AccessTokenPayload = {
    sub: string;
    email?: string;
    roles?: string[];
    jti?: string;
};

export class jwtService {
    static generateAccessToken(payload: AccessTokenPayload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static verifyAccessToken(token: string): AccessTokenPayload {
        return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
    }
}


