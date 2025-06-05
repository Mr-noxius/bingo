async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const res = await fetch("https://api.github.com/repos/Mr-noxius/bingosavefiles/contents/accounts.json", {
    headers: {
      Authorization: "token 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"
    }
  });
  
  const data = await res.json();
  const accounts = JSON.parse(atob(data.content));
  
  const found = accounts.find(acc => acc.username === username && acc.password === password);
  if (found) {
    localStorage.setItem("user", username);
    window.location.href = "bingo.html";
  } else {
    alert("Ongeldige gebruikersnaam of wachtwoord");
  }
}
