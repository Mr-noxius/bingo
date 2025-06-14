export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { username, cardData } = req.body;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.REPO;

  const path = `bingo-cards/${username}.json`;
  const content = Buffer.from(JSON.stringify(cardData, null, 2)).toString("base64");

  const apiURL = `https://api.github.com/repos/${repo}/contents/${path}`;
  let sha = undefined;

  const check = await fetch(apiURL, {
    headers: { Authorization: `token ${token}` }
  });
  if (check.ok) {
    const file = await check.json();
    sha = file.sha;
  }

  const resGitHub = await fetch(apiURL, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Update bingo kaart voor ${username}`,
      content,
      sha
    })
  });

  if (!resGitHub.ok) {
    const err = await resGitHub.text();
    return res.status(500).send("GitHub error: " + err);
  }

  res.status(200).json({ success: true });
}