const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const client_id = "78c6ha002uuhit";
const client_secret = "WPL_AP0.Bt58ijQcUFX0yElW.MTAxMjU2NjY2Mg==";
const redirect_uri = "http://localhost:3000/profile";

app.get("/getUserProfile", async (req, res) => {
  const { code, state } = req.query;
  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          client_secret: client_secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user's profile
    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const profileData = profileResponse.data;

    // Combine profile and email data
    const userData = {
      ...profileData,
    };

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
