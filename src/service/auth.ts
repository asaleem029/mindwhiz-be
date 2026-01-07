
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthRepository } from '../repository/index';
import { AuthMessages } from '../utils/responseMessages/index.js';
import { ApiError, ApiSuccess } from '../utils/responses.js';

class AuthService extends AuthRepository {
    // --------------------------------------
    // LOGIN
    // --------------------------------------
    async login(email: string, password: string) {
        try {
            // Get user by email
            const user = await this.getUserByEmail(email);

            // Verify password
            const isPasswordValid = await this.verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password.');
            }

            // Generate JWT token
            const token = this.generateToken(user);

            return ApiSuccess.format({
                message: AuthMessages.LOGIN_SUCCESS.message,
                code: AuthMessages.LOGIN_SUCCESS.code,
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    },
                },
            });
        } catch (error) {
            throw ApiError.format(error, AuthMessages.LOGIN_FAILURE.message, AuthMessages.LOGIN_FAILURE.code);
        }
    }

    // Helper methods for token generation and password verification
    private generateToken(user: any) {
        const secret = process.env.JWT_SECRET;
        return jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            secret,
            {
                expiresIn: '24h',
            }
        );
    }

    private async verifyPassword(inputPassword: string, storedPassword: string) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}

export default new AuthService();
