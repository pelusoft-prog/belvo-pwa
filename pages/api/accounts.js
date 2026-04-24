import belvo from "../../lib/belvo";

export default async function handler(req, res) {
  const { linkId } = req.query;

  try {
    const accounts = await belvo.accounts.retrieve(linkId);

    res.status(200).json(accounts);
  } catch (error) {
    console.error("BELVO ACCOUNTS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}