<script>
  import { onMount } from "svelte";

  const stats = {
    "tr": "TR",
    "apm": "Attack per minute",
    "pps": "Pieces per second",
    "vs": "VS Score",
    "wr": "Winrate",
    "app": "Attack per piece",
    "dsps": "Downstack per second",
    "dspp": "Downstack per piece",
    "ci": "Chesse index",
    "ge": "Garbage efficiency",
  };

  var sortBy = "tr";
  $: moreData =
    sortBy == "apm"
      ? ["tr", "pps", "vs"]
      : sortBy == "pps"
      ? ["tr", "apm", "vs"]
      : sortBy == "tr"
      ? ["apm", "pps", "vs"]
      : ["tr", "apm", "pps"];

  export let api_res;

  

  
  function setDarkTheme() {
    const light = document.getElementsByClassName("is-light");
    for (let j = 0; j < 5; j++) {
      for (let i = 0; i < light.length; i++) {
        light[i].className = light[i].className.replace("is-light", "");
      }
    }
    document.getElementById("table").className = "table is-dark is-bordered";
  }

  onMount(() => {if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setDarkTheme();
  }})
</script>

<h1 class="title is-5">Countries leaderboard</h1>
<div class="subtitle">
  <div class="select is-small">
    <select bind:value={sortBy} name="sort" id="sort">
      {#each Object.keys(stats) as key}
        <option value={key}>{stats[key]}</option>
      {/each}
    </select>
  </div>
</div>
<table class="table is-striped is-bordered" id="table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Country</th>
        <th>Flag</th>
        <th>{sortBy.toUpperCase()}</th>
        <th class="hiddable">{moreData[0].toUpperCase()}</th>
        <th class="hiddable">{moreData[1].toUpperCase()}</th>
        <th class="hiddable">{moreData[2].toUpperCase()}</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.keys(api_res["country_lbs"][sortBy]) as r, i}
        <tr>
          <td>#{i+1}</td>
          <td>{r}</td>
          <td>
            <img src="https://tetr.io/res/flags/{r.toLowerCase()}.png"  alt=""/>
          </td>
          <td>{(api_res["country_lbs"][sortBy][r]).toFixed(2)}</td>
          {#each moreData as l}
            <td class="hiddable">{(api_res["country_lbs"][l][r]).toFixed(2)}</td>
          {/each}    
        </tr>
      {/each}
    </tbody>
</table>