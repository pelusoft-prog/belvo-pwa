import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://sandbox.belvo.com/api/institutions/",
      {
        auth: {
          username: process.env.BELVO_SECRET_ID,
          password: process.env.BELVO_SECRET_PASSWORD,
        },
      }
    );

    res.status(200).json(response.data.results || []);
  } catch (error) {
    console.error("BELVO BANKS ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Error servidor" });
  }
}