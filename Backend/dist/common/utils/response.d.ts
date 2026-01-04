import { Response } from "express";
export declare const successResponse: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response<any, Record<string, any>>;
export declare const createdResponse: <T>(res: Response, data: T, message?: string, statusCode?: number) => Response<any, Record<string, any>>;
export declare const errorResponse: <T>(res: Response, error: any, message?: string, statusCode?: number) => Response<any, Record<string, any>>;
export declare const notFoundResponse: <T>(res: Response, message?: string, statusCode?: number) => Response;
export declare const unauthorizedResponse: <T>(res: Response, message?: string, statusCode?: number) => Response;
//# sourceMappingURL=response.d.ts.map