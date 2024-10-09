import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
  userId: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const secretKey = process.env.JWT_SECRET_KEY || "";

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = decoded as JwtPayload;
      return next();
    });
  } else {
    console.log("No token provided");
    console.log(req.headers);
    res.sendStatus(401); // Unauthorized
  }
};
