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
    if (username === "dev") { 
      window.location.href = "devportal.html";
    } else {
      window.location.href = "bingo.html";
    }
  } else {
    alert("Ongeldige gebruikersnaam of wachtwoord");
  }
}
