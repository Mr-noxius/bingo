const user = localStorage.getItem("user");
if (!user) window.location.href = "index.html";

document.getElementById("userTitle").innerText = `Welkom, ${user}`;
let grid = Array.from({ length: 5 }, () => Array(5).fill(false));
const gridContainer = document.getElementById("grid");

function renderGrid() {
  gridContainer.innerHTML = "";
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const div = document.createElement("div");
      div.className = "h-20 flex items-center justify-center border rounded cursor-pointer text-lg font-bold shadow " +
        (cell ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100");
      div.innerText = i * 5 + j + 1;
      div.onclick = () => {
        grid[i][j] = !grid[i][j];
        renderGrid();
      };
      gridContainer.appendChild(div);
    });
  });
}

renderGrid();

async function saveToGitHub() {
  const response = await fetch("/api/saveCard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, cardData: grid })
  });
  const result = await response.json();
  alert(result.success ? "Kaart opgeslagen!" : "Fout bij opslaan");
}