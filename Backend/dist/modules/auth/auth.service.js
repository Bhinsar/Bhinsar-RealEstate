"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const logger_1 = require("../../config/logger");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("../../config/envConfig");
class AuthService {
    static async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt_1.default.hash(password, saltRounds);
    }
    static async verifyPassword(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    static async generateToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id }, envConfig_1.config.jwt.secret, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, envConfig_1.config.jwt.secret, {
            expiresIn: "7d",
        });
        return { token, refreshToken };
    }
    static async signUp(payload) {
        const { full_name, email, password, phone } = payload;
        try {
            const hashedPassword = await this.hashPassword(password);
            const user = await db_1.default.user.create({
                data: {
                    full_name,
                    email,
                    password: hashedPassword,
                    role: "Client",
                    phone,
                },
            });
            return { user };
        }
        catch (prismaError) {
            logger_1.log.error("Prisma failed, inconsistent state:", prismaError);
            throw new Error("Registration failed during profile creation.");
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map