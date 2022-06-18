<script>
  import { onMount } from 'svelte';

  const stats = [
    "tr",
    "apm",
    "pps",
    "vs",
    "wr",
    "app",
    "dsps",
    "dspp",
    "ci" ,
    "ge",
  ]

  var value = "";
  var name = localStorage.getItem('username') || "cookie";
  onMount(() => document.getElementById("playername").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
      if (e.shiftKey) {
        localStorage.setItem('username', value)
      }
      name = value
    }
  })) </script>

<h1 class="title is-5">Player stats</h1>
<input
  bind:value={value}
  class="input"
  id="playername"
  type="text"
  placeholder="Enter player, Shift+Enter to set as default"
/>


{#await fetch("https://central-api.thatcookie.repl.co/teto/" + name)}
  <p style="color:lightgray">Fetching data...</p>
{:then api_res}
  {#await api_res.json()}
    <p style="color:lightgray">Parsing data...</p>
  {:then json}
    {#if json.type == 2}
      <div class="card" id="playercard">
        <div class="title-box">
          <div class="bbox">
            {#if !json.u1.avatar.endsWith("undefined")}
              <img src={json.u1.avatar} class="avatar" alt="Player's avatar" />
            {/if}
            <div class="battle-name-box">
              <div class="ubox">
                <h4 class="subtitle is-4">{name.split(" ")[0].toUpperCase()}</h4>
                <img src="https://tetr.io/res/flags/{json.u1.country.toLowerCase()}.png" alt="Player's flag"/>
              </div>
              <h4 class="title is-5" style="color: {(json.wc > 50) ? "green" : "red"}">{json.wc}%</h4>
            </div>
            <div class="badges">
              {#each json.u1.badges.slice(json.u1.badges.length > 3 ? json.u1.badges.length - 4 : 0) as badge}
                <img src="https://tetr.io/res/badges/{badge}.png" alt={badge}>
              {/each}
            </div>
          </div>
          <div class="abox">
            <h4 class="title is-3">VS</h4>
          </div>
          <div class="bbox">
            <div class="badges">
              {#each json.u2.badges.slice(json.u2.badges.length > 3 ? json.u2.badges.length - 4 : 0) as badge}
                <img src="https://tetr.io/res/badges/{badge}.png" alt={badge}>
              {/each}
            </div>
            <div class="battle-name-box">
              <div class="ubox">
                <img src="https://tetr.io/res/flags/{json.u1.country.toLowerCase()}.png" alt="Player's flag"/>
                <h4 class="subtitle is-4">{name.split(" ")[1].toUpperCase()}</h4>
              </div>
              <h4 class="title is-5" style="color: {(100-json.wc > 50) ? "green" : "red"}">{(100-json.wc).toFixed(3)}%</h4>
            </div>
            {#if !json.u2.avatar.endsWith("undefined")}
              <img src={json.u2.avatar} class="avatar" alt="Player's avatar" />
            {:else}
              <div class="default-avatar"></div>
            {/if}
          </div>
        </div>
        <div class="card-grid">
          {#each stats as stat}
            <div class="grid-entry">
              <h4 class="title is-6">{stat.toUpperCase()}</h4>
              <h4 class="subtitle is-6">{json.u1[stat].toFixed(2)} <span style="color: {
                  (json.u1[stat] > json.u2[stat]) ? "green" : "red"
              }">{
                  ((json.u1[stat] > json.u2[stat]) ? "+" : "") +
                ((json.u1[stat] - json.u2[stat]) / json.u2[stat] * 100).toFixed(2) + "%"
              }</span> {json.u2[stat].toFixed(2)}</h4>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="card" id="playercard">
        <div class="title-box">
          <div class="ubox">
            <h4 class="subtitle is-4">{name.toUpperCase()}</h4>
            <img src="https://tetr.io/res/flags/{json.country.toLowerCase()}.png" alt="Player's flag"/>
          </div>
          <div class="badges">
            {#each json.badges as badge}
              <img src="https://tetr.io/res/badges/{badge}.png" alt={badge}>
            {/each}
          </div>
          {#if !json.avatar.endsWith("undefined")}
            <img src={json.avatar} class="avatar" alt="Player's avatar" />
          {/if}
        </div>
        <div class="card-grid">
          <div class="grid-entry">
            <h4 class="title is-6">TR</h4>
            <h4 class="subtitle is-6">{json.tr.toFixed(
              2
            )}<img src="https://tetr.io/res/league-ranks/{json.rank}.png" alt="TR"/></h4>
          </div>
          {#each stats.slice(1) as stat}
            <div class="grid-entry">
              <h4 class="title is-6">{stat.toUpperCase()}</h4>
              <h4 class="subtitle is-6">{json[stat].toFixed(2)}</h4>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {:catch}
    <p style="color:lightgray">Error fetching data</p>
  {/await}
{:catch _}
  <p style="color:lightgray">Error fetching data.</p>
{/await}