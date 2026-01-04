import { Request, Response } from "express";
import { registerSchema } from "./auth.schema";
import { AuthService } from "./auth.service";
import { errorResponse, successResponse } from "../../common/utils/response";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, full_name, phone } = registerSchema.parse(
        req.body
      );
      const result = await AuthService.signUp({
        email,
        password,
        full_name,
        phone,
      });
      return successResponse(res, result);
    } catch (error) {
      return errorResponse(res, error);
    }
  }
}
