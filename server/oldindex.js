const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const session = require("express-session");

const app = express();
const client_id = "78c6ha002uuhit";
const client_secret = "WPL_AP0.Bt58ijQcUFX0yElW.MTAxMjU2NjY2Mg==";
const redirect_uri = "http://localhost:4000/callback";
const unique_key = crypto.randomBytes(64).toString("hex");

app.use(
  session({
    secret: unique_key,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  const state = crypto.randomBytes(20).toString("hex");
  req.session.state = state;
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=openid%20profile%20email`;
  res.send(`<a href="${authUrl}">Login with LinkedIn</a>`);
});

app.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (state !== req.session.state) {
    return res.status(403).send("State mismatch, potential CSRF attack.");
  }

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

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

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const {
      sub,
      email_verified,
      name,
      locale,
      given_name,
      family_name,
      email,
    } = profileResponse.data;
    console.log(profileResponse.data);
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>User Profile</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome, ${given_name} ${family_name}</h1>
          <p>Email: ${email}</p>
          <p>Name: ${name}</p>
          <p>Locale: ${locale.language}-${locale.country}</p>
          <p>Email Verified: ${email_verified}</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    res.status(500).send("Something went wrong!");
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
