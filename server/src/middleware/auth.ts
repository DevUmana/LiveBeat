import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the payload of the JWT token
interface JwtPayload {
  username: string;
  userId: number;
}

// Middleware to authenticate the token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = decoded as JwtPayload;
      return next();
    });
  } else {
    console.log('No token provided');
    console.log(req.headers);
    res.sendStatus(401); // Unauthorized
  }
};
