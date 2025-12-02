import { MongoRefreshTokenRepository } from "@infrastructure/repositories/RefreshTokenRepository";


export class LogoutUserUseCase {
    constructor(private refreshRepository: MongoRefreshTokenRepository) {}

    async execute(rid: string) {
        await this.refreshRepository.revoke(rid);
        return {ok : true}
    }
}