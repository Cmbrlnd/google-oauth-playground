import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { JwtPayload } from "jsonwebtoken";

import { config } from "dotenv";
config();

const PORT = 5000;
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

import googleAuthRoute from "./routes/googleAuthRoute";
import googleRefreshToken from "./routes/googleRefreshToken";
import { authenticateJwtToken } from "./middleware/authenticateJwtToken";

app.use("/auth/google", googleAuthRoute);
app.use("/auth/google-refresh-token", googleRefreshToken);

// Strings used for testing (delete later)
const protectedString = "Success! You are authenticated and can read this.";

// Extend the Request type with a custom property
declare module "express" {
  interface Request {
    user?: string | undefined | JwtPayload;
    emptyToken?: undefined | JwtPayload;
  }
}

// Check JWT token using middleware function, respond with the name from the JWT payload
app.get("/checkAuth", authenticateJwtToken, (req: Request, res: Response) => {
  const user = req.user;
    res.json({ successMsg: protectedString, user: user });
});

// Logout route
app.post("/logout", async (req: Request, res: Response) => {
  if (req.emptyToken === undefined) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
