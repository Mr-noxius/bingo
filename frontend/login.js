async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/accounts");
  const accounts = await res.json();

  const found = accounts.find(acc => acc.username === username && acc.password === password);
  if (found) {
    localStorage.setItem("user", username);
    window.location.href = username === "dev" ? "devportal.html" : "bingo.html";
  } else {
    alert("Ongeldige gebruikersnaam of wachtwoord");
  }
}