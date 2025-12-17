import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { apiKey, refreshToken } = req.body;

  if (!apiKey || !refreshToken) {
    return res.status(400).json({
      error: "apiKey and refreshToken required",
    });
  }

  try {
    const response = await fetch(
      "https://api.atomberg-iot.com/v1/auth/token",
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          Authorization: refreshToken,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(401).json({
        error: data?.message || "Invalid Atomberg credentials",
      });
    }

    return res.status(200).json({
      accessToken: data.access_token,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Atomberg API unreachable",
    });
  }
}
