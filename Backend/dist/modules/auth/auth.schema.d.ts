import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
    full_name: z.ZodString;
    phone: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map