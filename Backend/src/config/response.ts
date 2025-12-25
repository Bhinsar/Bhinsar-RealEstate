import { Response } from "express";

interface ApiResponsw<T> {
  status: "success" | "error" | "warning";
  message: string;
  data?: T;
  error?: any[];
  statusCode: number;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200
) => {
  const response: ApiResponsw<T> = {
    status: "success",
    message,
    data,
    statusCode,
  };
  return res.status(statusCode).json(response);
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = "Created",
  statusCode: number = 201
) => {
  const response: ApiResponsw<T> = {
    status: "success",
    message,
    data,
    statusCode,
  };
  return res.status(statusCode).json(response);
};

export const errorResponse = <T>(
  res: Response,
  error: any,
  message: string = "Error",
  statusCode: number = 500
) => {
  if (error?.name === "ZodError") {
    statusCode = 400;
    message = "Invalid Input";
    error = error.errors.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code,
    }));
  } else if (error instanceof Error) {
    message = error.message;
    if ("statusCode" in error) {
      statusCode = error.statusCode as number;
    }
  } else {
    message = "Something went wrong";
  }
  const response: ApiResponsw<T> = {
    status: "error",
    message,
    error,
    statusCode,
  };
  return res.status(statusCode).json(response);
};

export const notFoundResponse = <T>(
  res: Response,
  message: string = "Resource not found",
  statusCode: number = 404
): Response => {
  const response: ApiResponsw<T> = {
    status: "error",
    message,
    statusCode,
  };
  return res.status(statusCode).json(response);
};

export const unauthorizedResponse = <T>(
  res: Response,
  message: string = "Unauthorized access",
  statusCode: number = 401
): Response => {
  const response: ApiResponsw<T> = {
    status: "error",
    message,
    statusCode,
  };
  return res.status(statusCode).json(response);
};
