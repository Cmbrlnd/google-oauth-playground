import { Router, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRefreshClient } from "google-auth-library";

const router = Router();

// Send JWT to backend, verify, decode & pass refresh_token to Google for access_token refresh
router.get("/", async (req: Request, res: Response) => {
  const token = req.headers["authorization"];

  if (token === null) return res.sendStatus(401);

  // Verify the JWT
  jwt.verify(token!, process.env.JWT_ACCESS_SECRET!, async (err, payload) => {
    if (err) return res.sendStatus(403); // Return early if there's an error

    // Use type assertion to tell TypeScript that payload is JwtPayload
    const payloadWithClaims = payload as JwtPayload;

    // Check if refresh_token property is on the payload
    if (payloadWithClaims.google_refresh_token) {
      const refreshToken = payloadWithClaims.google_refresh_token;

      const user = new UserRefreshClient(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        refreshToken
      );

      // console.log(payloadWithClaims.google_access_token);

      try {
        const refreshedUser = await user.refreshAccessToken(); // obtain new tokens
        // console.log(refreshedUser.credentials.access_token);

        // Update the users' JWT with the new tokens!
        payloadWithClaims.google_access_token =
          refreshedUser.credentials.access_token;
        payloadWithClaims.google_refresh_token =
          refreshedUser.credentials.refresh_token;
        payloadWithClaims.google_id_token = refreshedUser.credentials.id_token;

        // Create a new JWT which includes updated tokens
        const accessToken = jwt.sign(
          payloadWithClaims,
          process.env.JWT_ACCESS_SECRET!
        );

        // Send to front-end for updating localStorage
        res.json({
          accessToken: accessToken,
          message:
            "Successfully refreshed Google tokens, updated JWT & sent to the front end to update locally stored JWT.",
        });
      } catch (refreshError) {
        console.error("Error refreshing Google access token", refreshError);
        res.sendStatus(500);
      }
    } else {
      res.json({
        failureMessage:
          "Could not refresh token, could not find a refresh token on the payload.",
      });
    }
  });
});

export default router;