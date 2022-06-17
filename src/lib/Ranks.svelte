<script>
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
    <div class="ranks_row" style="background-color: {ranks_colors[r] || "black"}">
      <div class="a">
        <img src="https://tetr.io/res/league-ranks/{r}.png" alt={r}>
        <p>{api_res.ranks_boundaries[r].toFixed()}<span class="hiddable">TR</span></p>
      </div>
      <div>
        <p>
        {api_res.ranks_playernum[r]} p<span class="hiddable">layers</span>
        </p>
      </div>
      <div>
        <p>{
          api_res.ranks_percentiles[r] -
          (Object.values(api_res.ranks_percentiles)[
            Object.values(api_res.ranks_percentiles).indexOf(
              api_res.ranks_percentiles[r]
            ) - 1
          ] || 0)
        }% <span class="hiddable">({api_res.ranks_percentiles[r]}%)</span></p>
      </div>
    </div>
  {/each}
</div>
