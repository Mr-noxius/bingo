const GITHUB_USER = "Mr-noxius";
const GITHUB_REPO = "bingosavefiles";
const GITHUB_TOKEN = "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";
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;

let accounts = [];

async function loadAccounts() {
  try {
    const res = await fetch(`${API_BASE}/accounts.json`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    
    if (!res.ok) throw new Error("Kan accounts.json niet laden");
    
    const data = await res.json();
    accounts = JSON.parse(atob(data.content));
    renderAccounts();
  } catch (err) {
    alert("Fout bij het laden van accounts: " + err.message);
  }
}

async function addAccount() {
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  
  if (!newUsername || !newPassword) return alert("Gebruikersnaam en wachtwoord verplicht");
  
  if (accounts.find(acc => acc.username === newUsername)) {
    return alert("Gebruikersnaam bestaat al");
  }
  
  accounts.push({ username: newUsername, password: newPassword });
  
  try {
    const sha = await getSha("accounts.json");
    
    const res = await fetch(`${API_BASE}/accounts.json`, {
      method: "PUT",
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
      body: JSON.stringify({
        message: `Account toegevoegd: ${newUsername}`,
        content: btoa(JSON.stringify(accounts, null, 2)),
        sha
      })
    });
    
    if (!res.ok) throw new Error("Fout bij opslaan naar GitHub");
    
    alert("Account toegevoegd!");
    renderAccounts();
  } catch (err) {
    alert("Fout bij toevoegen: " + err.message);
  }
}

async function getSha(filePath) {
  const res = await fetch(`${API_BASE}/${filePath}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  });
  
  if (!res.ok) return undefined;
  
  const data = await res.json();
  return data.sha;
}

function renderAccounts() {
  const list = document.getElementById("accountList");
  list.innerHTML = "";
  accounts.forEach(acc => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-3 shadow rounded";
    li.innerHTML = `
      <span>${acc.username}</span>
      <button onclick="viewCard('${acc.username}')" class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Bekijk kaart
      </button>
    `;
    list.appendChild(li);
  });
}

async function viewCard(username) {
  try {
    const res = await fetch(`${API_BASE}/bingo-cards/${username}.json`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    
    if (!res.ok) throw new Error("Kaart niet gevonden");
    
    const data = await res.json();
    const card = JSON.parse(atob(data.content));
    console.log(`Kaart van ${username}:`, card);
    alert(`Kaart van ${username} in de console gelogd.`);
  } catch (err) {
    alert("Fout bij ophalen van kaart: " + err.message);
  }
}

loadAccounts();
