
import bcrypt from 'bcrypt';

export class PasswordService {
    constructor(private readonly saltRounds: number = 10) {}

    async hashPassword(plainPassword: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
        return hashedPassword;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    }
}