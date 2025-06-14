let accounts = [];

async function loadAccounts() {
  const res = await fetch("/api/accounts");
  accounts = await res.json();
  renderAccounts();
}

async function addAccount() {
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if (!newUsername || !newPassword) return alert("Velden verplicht.");
  if (accounts.find(a => a.username === newUsername)) return alert("Gebruiker bestaat al.");

  accounts.push({ username: newUsername, password: newPassword });

  const res = await fetch("/api/saveAccounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(accounts)
  });

  if (res.ok) {
    alert("Account toegevoegd.");
    renderAccounts();
  } else {
    alert("Fout bij opslaan.");
  }
}

function renderAccounts() {
  const list = document.getElementById("accountList");
  list.innerHTML = "";
  accounts.forEach(acc => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-3 shadow rounded";
    li.innerHTML = \`
      <span>\${acc.username}</span>
      <button onclick="viewCard('\${acc.username}')" class="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Bekijk kaart</button>
    \`;
    list.appendChild(li);
  });
}

async function viewCard(username) {
  const res = await fetch(\`/api/loadCard?username=\${username}\`);
  if (!res.ok) return alert("Kaart niet gevonden.");
  const card = await res.json();
  console.log("Kaart van", username, card);
  alert("Kaart in console gelogd.");
}

loadAccounts();