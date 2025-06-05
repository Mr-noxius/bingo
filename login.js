async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const res = await fetch("https://api.github.com/repos/Mr-noxius/bingosavefiles/contents/accounts.json", {
    headers: {
      Authorization: "token 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"
    }
  });
  
  const data = await res.json();
  const decodedContent = atob(data.content.replace(/\n/g, ""));
  const accounts = JSON.parse(decodedContent);
  
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
