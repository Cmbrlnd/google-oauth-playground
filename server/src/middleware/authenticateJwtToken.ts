import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request type with a custom property
declare module "express" {
  interface Request {
    user?: string | undefined | JwtPayload;
    emptyToken?: undefined | JwtPayload;
  }
}

// Middleware function for verifying JWT token from frontend
export function authenticateJwtToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  // Check if token has been passed from frontend
  if (token === null) return res.sendStatus(401);

  // Verify the JWT
  jwt.verify(token!, process.env.JWT_ACCESS_SECRET!, (err, payload) => {
    if (err) return res.sendStatus(403);

    // Use type assertion to tell TypeScript that payload is JwtPayload
    const payloadWithClaims = payload as JwtPayload;

    // Check if name property is on the payload and pass it along on the request object to the next route
    if (payloadWithClaims.name) {
      req.user = payloadWithClaims.name;
    } else {
      // Handle the case where 'name' property doesn't exist
      // or perform other necessary actions
    }
    next();
  });
}