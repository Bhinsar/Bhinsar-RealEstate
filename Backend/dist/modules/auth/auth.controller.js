"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const response_1 = require("../../common/utils/response");
class AuthController {
    static async register(req, res) {
        try {
            const { email, password, full_name, phone } = auth_schema_1.registerSchema.parse(req.body);
            const result = await auth_service_1.AuthService.signUp({
                email,
                password,
                full_name,
                phone,
            });
            return (0, response_1.successResponse)(res, result);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map