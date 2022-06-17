const ranks_colors = {
  a: "#0c5919",
  "a+": "#126309",
  "a-": "#085743",
  b: "#0e1f6a",
  "b+": "#11406a",
  "b-": "#1e0f78",
  c: "#190320",
  "c+": "#0f0219",
  "c-": "#270c32",
  d: "#431742",
  "d+": "#50224e",
  s: "#775400",
  "s+": "#926b00",
  "s-": "#5f4e04",
  ss: "#9f5c00",
  x: "#791180",
  u: "#712504",
};

async function main() {
  const res = await (
    await fetch("https://central-api.thatcookie.repl.co/teto")
  ).json();
  for (i in res.ranks_boundaries) {
    document.getElementById(
      "ranks"
    ).innerHTML += `<div class="ranks_row" style="background-color: ${
      ranks_colors[i] || "black"
    };">
      <div class="a">
        <img src="https://tetr.io/res/league-ranks/${i}.png">
        <p>${res.ranks_boundaries[
          i
        ].toFixed()}<span class="hiddable">TR</span></p>
      </div>
      <div>
        <p>
        ${res.ranks_playernum[i]} p<span class="hiddable">layers</span>
        </p>
      </div>
      <div>
        <p>${
          res.ranks_percentiles[i] -
          (Object.values(res.ranks_percentiles)[
            Object.values(res.ranks_percentiles).indexOf(
              res.ranks_percentiles[i]
            ) - 1
          ] || 0)
        }% <span class="hiddable">(${res.ranks_percentiles[i]}%)</span></p>
      </div>
    </div>`;
  }

  function table() {
    const sortBy = document.getElementById("sort").value;
    const moreData =
      sortBy == "apm"
        ? ["tr", "pps", "vs"]
        : sortBy == "pps"
        ? ["tr", "apm", "vs"]
        : sortBy == "tr"
        ? ["apm", "pps", "vs"]
        : ["tr", "apm", "pps"];
    const lb = res.country_lbs[sortBy];
    str = `<table class="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Flag</th>
            <th>${sortBy.toUpperCase()}</th>
            <th class="hiddable">${moreData[0].toUpperCase()}</th>
            <th class="hiddable">${moreData[1].toUpperCase()}</th>
            <th class="hiddable">${moreData[2].toUpperCase()}</th>
          </tr>
        </thead>
        <tbody>
          `;
    j = 1;
    for (i in lb) {
      str += `<tr>
          <th>#${j}</th>
          <td>${i}</td>
          <td><img src="https://tetr.io/res/flags/${i.toLowerCase()}.png" alt=""></td>
          <td>${lb[i].toFixed(2)}</td>
          <td class="hiddable">${res.country_lbs[moreData[0]][i].toFixed(
            2
          )}</td>
          <td class="hiddable">${res.country_lbs[moreData[1]][i].toFixed(
            2
          )}</td>
          <td class="hiddable">${res.country_lbs[moreData[2]][i].toFixed(
            2
          )}</td>
        </tr>`;
      j++;
    }
    str += "</tbody>";
    document.getElementById("table").innerHTML = str;
  }

  table();
  document.getElementById("sort").onchange = table;

  const input = document.getElementById("playername");
  input.addEventListener("keyup", async (ev) => {
    if (["Enter", " "].includes(ev.key) && input.value) {
      let players = input.value.split(" ").slice(0, players.length - 1);
      console.log(players)
      if (players.length > 2) { 
        input.value = players.slice(players.length - 2).join(" ");
        players = input.value.split(" ");
      }
      const textjson = await (
        await fetch(
          "https://central-api.thatcookie.repl.co/teto/" +
            encodeURI(input.value)
        )
      ).json();
      if (!textjson["tr"]) return;
      document.getElementById("playercard").style.display = "flex";
      badgesStr = "";
      if (textjson.badges.length > 0) {
        for (i in textjson.badges) {
          badgesStr += `<img src="https://tetr.io/res/badges/${textjson.badges[i]}.png">`;
        }
      }
      document.getElementById(
        "playercard"  
      ).innerHTML = ` <div class="title-box">
          <div class="ubox">
            <h4 class="subtitle is-4">${input.value.toUpperCase()}</h4>
            <img src="https://tetr.io/res/flags/${textjson.country.toLowerCase()}.png"/>
          </div>
          <div class="badges">${badgesStr}</div>
          ${
            textjson.avatar.endsWith("undefined") ||
            textjson.avatar.endsWith("0")
              ? ""
              : `<img src="${textjson.avatar}" class="avatar" alt="Player's avatar" />`
          }
        </div>
        <div class="card-grid">
          <div class="grid-entry">
            <h4 class="title is-6">TR</h4>
            <h4 class="subtitle is-6">${textjson.tr.toFixed(
              2
            )}<img src="https://tetr.io/res/league-ranks/${
        textjson.rank
      }.png" alt=""></h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">APM</h4>
            <h4 class="subtitle is-6">${textjson.apm.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">PPS</h4>
            <h4 class="subtitle is-6">${textjson.pps.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">VS</h4>
            <h4 class="subtitle is-6">${textjson.vs.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">WR</h4>
            <h4 class="subtitle is-6">${textjson.wr.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">APP</h4>
            <h4 class="subtitle is-6">${textjson.app.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">DSPS</h4>
            <h4 class="subtitle is-6">${textjson.dsps.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">DSPP</h4>
            <h4 class="subtitle is-6">${textjson.dspp.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">CI</h4>
            <h4 class="subtitle is-6">${textjson.ci.toFixed(2)}</h4>
          </div>
          <div class="grid-entry">
            <h4 class="title is-6">GE</h4>
            <h4 class="subtitle is-6">${textjson.ge.toFixed(2)}</h4>
          </div>
        </div>`;
    }
  });
}

main();
