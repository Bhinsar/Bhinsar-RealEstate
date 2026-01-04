import z from "zod";
import { registerSchema } from "./auth.schema";
import prisma from "../../config/db";
import { log } from "../../config/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/envConfig";
import { User } from "@prisma/client";

type registerUser = z.infer<typeof registerSchema>;

export class AuthService {

  private static async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  private static async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private static async generateToken(user: User) {
    const token = jwt.sign({ id: user.id }, config.jwt.secret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user.id }, config.jwt.secret, {
      expiresIn: "7d",
    });
    return {token, refreshToken};
  }

  static async signUp(payload: registerUser) {
    const {full_name, email, password, phone } = payload;

    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await prisma.user.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
          role: "Client",
          phone,
        },
      });

      return { user };
    } catch (prismaError) {
      log.error("Prisma failed, inconsistent state:", prismaError);
      throw new Error("Registration failed during profile creation.");
    }
  }
}
