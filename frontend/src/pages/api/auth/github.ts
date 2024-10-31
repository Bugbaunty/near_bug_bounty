import { NextApiRequest, NextApiResponse } from "next";

const CLIENT_ID = process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_ID;
const CLIENT_SECRET =
  process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_CLIENT_SECRET_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BUGBOUNTY_GITHUB_REDIRECT_URI;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    try {
      console.log("CLIENT_ID", CLIENT_ID);
      console.log("CLIENT_SECRET", CLIENT_SECRET);
      console.log("REDIRECT_URI", REDIRECT_URI);
      const response = await fetch(
        `https://github.com/login/oauth/access_token`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
          }),
        }
      );

      const data = await response.json();
      console.log("access code data", data);

      if (response.ok) {
        return res.status(200).json(data);
      } else {
        return res.status(response.status).json(data);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to exchange code for access token" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
