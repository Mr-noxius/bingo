export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Only GET allowed");

  const { username } = req.query;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.REPO;

  const path = `bingo-cards/${username}.json`;
  const apiURL = `https://api.github.com/repos/${repo}/contents/${path}`;

  const response = await fetch(apiURL, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3.raw"
    }
  });

  if (!response.ok) {
    return res.status(404).json({ error: "Card not found" });
  }

  const cardData = await response.json();
  res.status(200).json(cardData);
}