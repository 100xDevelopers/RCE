import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

const notFoundHandler = (req: Request, res: Response, next: NextFunction)=>{
    next(new ApiError(404, "Resources not found."))
}

export default notFoundHandler;