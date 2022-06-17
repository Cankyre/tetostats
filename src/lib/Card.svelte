<script>
  import { createEventDispatcher, onMount } from 'svelte';

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
  var name = "cookie";
  onMount(() => document.getElementById("playername").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
      name = value
    }
  })) </script>

<h1 class="title is-5">Player stats</h1>
<input
  bind:value={value}
  class="input"
  id="playername"
  type="text"
  placeholder="Enter player"
/>


{#await fetch("https://central-api.thatcookie.repl.co/teto/" + name)}
  <p style="color:lightgray">Fetching data...</p>
{:then api_res}
  {#await api_res.json()}
    <p style="color:lightgray">Parsing data...</p>
  {:then json}
    {#if json == {}}
      <p style="color:lightgray">No data found</p>
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