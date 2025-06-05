const user = localStorage.getItem("user");
if (!user) window.location.href = "login.html";

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
  const path = `bingo-cards/${user}.json`;
  
  const getRes = await fetch(`https://api.github.com/repos/<YOUR_USERNAME>/<YOUR_REPO>/contents/${path}`, {
    headers: {
      Authorization: "token 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"
    }
  });
  
  const sha = getRes.ok ? (await getRes.json()).sha : undefined;
  
  await fetch(`https://api.github.com/repos/Mr-noxius/bingosavefiles/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: "token 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"
    },
    body: JSON.stringify({
      message: `Update bingo kaart voor ${user}`,
      content: btoa(JSON.stringify(grid)),
      sha
    })
  });
  
  alert("Kaart opgeslagen naar GitHub!");
}
