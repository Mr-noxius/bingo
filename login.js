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
