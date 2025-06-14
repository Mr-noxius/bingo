export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.REPO;
  const content = Buffer.from(JSON.stringify(req.body, null, 2)).toString("base64");
  const path = "accounts.json";
  const apiURL = `https://api.github.com/repos/${repo}/contents/${path}`;

  let sha = undefined;
  const check = await fetch(apiURL, {
    headers: { Authorization: `token ${token}` }
  });
  if (check.ok) {
    const file = await check.json();
    sha = file.sha;
  }

  const response = await fetch(apiURL, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Accounts bijgewerkt via devportaal",
      content,
      sha
    })
  });

  if (!response.ok) {
    return res.status(500).send("Fout bij GitHub API");
  }

  res.status(200).json({ success: true });
}