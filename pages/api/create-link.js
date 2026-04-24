import axios from "axios";

export default async function handler(req, res) {
  const { institution } = req.body;

  try {
    const response = await axios.post(
      "https://sandbox.belvo.com/api/links/",
      {
        institution,
        username: "12345678",
        password: "password123",

      },
      {
        auth: {
          username: process.env.BELVO_SECRET_ID,
          password: process.env.BELVO_SECRET_PASSWORD,
        },
      }
    );

    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log("STATUS:", error.response?.status);

  console.log(
    "DATA COMPLETA:",
    JSON.stringify(error.response?.data, null, 2)
  );
    res.status(200).json({ error: "Error servidor" });
  }
}