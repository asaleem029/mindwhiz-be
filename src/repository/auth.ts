import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { User } from '../models/userModel.js';

export abstract class AuthRepository {
    private _repo: Repository<User>;

    constructor() {
        this._repo = AppDataSource.getRepository(User);
    }

    // --------------------------------------
    // GET USER BY EMAIL
    // --------------------------------------
    async getUserByEmail(email: string) {
        try {
            const user = await this._repo.findOne({
                where: { email },
            });
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw OrmExceptionHandling(error);
        }
    }
}
