<script>
  import CollapsibleCard from './CollapsibleCard.svelte'
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

  export let api_res;
</script>

<h1 class="title is-5">Rank caps</h1>
<div id="ranks">
  {#each Object.keys(api_res["ranks_boundaries"]) as r}
    <CollapsibleCard className="collapsible">
      <div slot="header" class="ranks_row" style="background-color: {ranks_colors[r] || "black"}">
        <div class="a">
          <img src="https://tetr.io/res/league-ranks/{r}.png" alt={r}>
          <p>{api_res.ranks_boundaries[r].toFixed()}
            <span class="hiddable">TR</span>
            {@html  (() => {
                if (api_res.ranks_variations[r] > 0) {
                  return '<span class="arrow" style="color: white"> 🡽 </span>'
                } else if (api_res.ranks_variations[r] < 0) {
                  return '<span class="arrow" style="color: white"> 🡾 </span>'
                } else {
                  return '<span class="arrow" style="color: white"> 🡺 </span>'
                }
            })()}
          </p>
        </div>
        <div>
          <p>
          {api_res.ranks_playernum[r]} p<span class="hiddable">layers</span>
          </p>
        </div>
        <div>
          <p>{
            (100 * api_res.ranks_playernum[r] / api_res["ranked_num"]).toFixed(2)
          }% <span class="hiddable">({api_res.ranks_percentiles[r]}%)</span></p>
        </div>
      </div>
      <div slot="body" class="card-grid ranks-avg">
        {#each stats.slice(1) as stat}
          <div class="grid-entry">
            <h4 class="title is-6">Average {stat.toUpperCase()}</h4>
            <h4 class="subtitle is-6">{api_res.ranks_avg[stat][r].toFixed(2)}</h4>
          </div>
        {/each}
      </div>
    </CollapsibleCard>
  {/each}
</div>
