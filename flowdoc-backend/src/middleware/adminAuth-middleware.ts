import type { NextFunction, Request, Response } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["x-admin-token"];

	if (token !== "supersecretadmintoken123") {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
};
