export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.REPO;

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/accounts.json`, {
    headers: { Authorization: `token ${token}` }
  });

  if (!response.ok) {
    return res.status(500).send("Fout bij ophalen van accounts.json");
  }

  const data = await response.json();
  const accounts = JSON.parse(Buffer.from(data.content, 'base64').toString());
  res.status(200).json(accounts);
}