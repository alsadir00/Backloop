import { AccessTokenPayload } from "@infrastructure/security/jwtServices";


declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload; 
    }
  }
}