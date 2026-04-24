import belvo from "../../lib/belvo";

export default async function handler(req, res) {
  const { institution, username, password } = req.body;

  try {
    const link = await belvo.links.register({
      institution,
      username,
      password,
    });

    res.status(200).json(link);
  } catch (error) {
    console.error("BELVO LINK ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}