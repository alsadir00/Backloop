import { Request, Response } from "express";
import { RegisterUserUseCase } from "@application/usecase/user/registerUserUsecase";
import { LoginUserUseCase } from "@application/usecase/user/loginUserUsecase";
import { RefreshTokenUseCase } from "@application/usecase/user/refreshTokenUsecase";
import { LogoutUserUseCase } from "@application/usecase/user/logoutUsecase";



export class AuthController {
    constructor(
        private registerUser: RegisterUserUseCase,
        private loginUser: LoginUserUseCase,
        private refreshToken: RefreshTokenUseCase,
        private logoutUser: LogoutUserUseCase
    ){}

    async register(req: Request, res: Response) {
        try {

            const user = await this.registerUser.execute(req.body);
            res.status(201).json({ success: true, data: user });
            
        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }



    async login(req:Request , res: Response) {

        try {
            
            const tokens =  await this.loginUser.execute(req.body);
            res.status(200).json({ success: true, data: { ...tokens } });

        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }

    }


    async refresh(req: Request, res: Response) {
        try {
            
            const {refreshToken} = req.body;
            const tokens = await this.refreshToken.execute(refreshToken);
            res.status(200).json({ success: true, data: { ...tokens } });

        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body;
            await this.logoutUser.execute(refreshToken);
            res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }
}