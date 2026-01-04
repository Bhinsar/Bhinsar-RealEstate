import { z } from "zod";

export const registerSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  full_name: z.string().min(3, "Full name must be at least 3 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
