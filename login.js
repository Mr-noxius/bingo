async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const res = await fetch("https://api.github.com/repos/<YOUR_USERNAME>/<YOUR_REPO>/contents/accounts.json", {
    headers: {
      Authorization: "token <YOUR_GITHUB_TOKEN>"
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