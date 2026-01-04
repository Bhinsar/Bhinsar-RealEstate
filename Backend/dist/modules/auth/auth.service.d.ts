import z from "zod";
import { registerSchema } from "./auth.schema";
type registerUser = z.infer<typeof registerSchema>;
export declare class AuthService {
    private static hashPassword;
    private static verifyPassword;
    private static generateToken;
    static signUp(payload: registerUser): Promise<{
        user: {
            password: string | null;
            email: string;
            full_name: string;
            phone: string | null;
            id: number;
            avatar_url: string | null;
            login_otp: string | null;
            role: import("@prisma/client").$Enums.Role;
            verification_steps: import("@prisma/client").$Enums.verificationSteps;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map