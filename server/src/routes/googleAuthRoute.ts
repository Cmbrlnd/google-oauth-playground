import { Router, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = Router();

// Create/declare the oAuth2Client used for querying Google API
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

// Interface for the userObject which will later hold the Google API keys
interface userToken {
  google_access_token?: string;
  google_refresh_token: string;
  google_id_token: string;
}

// Google oAuth route
router.post("/", async (req: Request, res: Response) => {
  try {
    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    oAuth2Client.setCredentials(tokens);

    // Get object of type 'LoginTicket' using the access token
    if (typeof tokens.id_token === "string") {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.CLIENT_ID,
      });

      // Extract the userInfo of type 'TokenPayload' from the LoginTicket
      const userInfo = ticket.getPayload();

      // Check if the user already exists in the database
      let user = await User.findOne({ email: userInfo!.email });

      // If no user was found & userInfo was successful in getting user information payload
      if (!user && userInfo) {
        // If the user doesn't exist, create a new user in DB
        user = new User({
          email: userInfo.email,
          name: userInfo.name,
          given_name: userInfo.given_name,
          locale: userInfo.locale,
          sub: userInfo.sub,
        });
        await user.save();
      }

      // Convert the Mongoose object to a plain JavaScript object
      const userObject: userToken = user!.toObject();
      userObject.google_access_token = tokens.access_token!;
      userObject.google_refresh_token = tokens.refresh_token!;
      userObject.google_id_token = tokens.id_token!;

      // Setup the users' JWT
      var accessToken = jwt.sign(userObject!, process.env.JWT_ACCESS_SECRET!);
      res.json({ accessToken: accessToken, givenName: userInfo?.given_name });
    } else {
      res.status(500).json({
        success: false,
        error:
          "Authentication failed - could not retrieve user info because token was not of type string.",
      });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ success: false, error: "Authentication failed" });
  }
});

export default router;