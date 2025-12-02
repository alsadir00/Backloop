import { Request, Response, NextFunction } from "express";
import { jwtService } from "@infrastructure/security/jwtServices";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = typeof authHeader === "string" ? authHeader.split(" ")[1] : undefined;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const payload = jwtService.verifyAccessToken(token);
        req.user = payload; 
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
