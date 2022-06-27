<h1 class="title is-2">TetoStats</h1>
<h1 class="subtitle is-5">by Cankyre</h1>

<script>
  import CountryLB from "./lib/CountryLB.svelte"
  import Ranks from "./lib/Ranks.svelte"
  import Card from "./lib/Card.svelte";
</script>

{#await fetch("https://central-api.thatcookie.repl.co/teto")}
  <p style="color:lightgray">Fetching data...</p>
{:then api_res}
  {#await api_res.json()}
    <p style="color:lightgray">Parsing data...</p>
  {:then json}
    <div class="app">
      <div class="half" id="half1">
        <CountryLB api_res={json}/>
      </div>
      <div class="vhalf" id="vhalf1">
        <Ranks api_res={json}/>
      </div>
      <div class="vhalf" id="vhalf2">
        <Card/>
      </div>
    </div>
    <div class="btns is-spaced">
      <a href="../index.html"
        ><button class="button is-info is-light">Home</button></a
      >
      <button
        class="button is-link is-light"
        on:click={() => window.open('https://github.com/Cankyre/TetoStats','_blank')}
      >
        Help
      </button>
      <button
        class="button is-danger is-light"
        on:click={() => window.open('https://cankyre.github.io/form/','_blank')}
      >
        Report
      </button>
      <button
        class="button is-warning is-light"
        on:click={() => window.open('https://cankyre.github.io/rules/','_blank')}
      >
        Rules
      </button>
    </div>
  {/await}
{:catch _}
  <div class="message is-danger" id="api-outage-message">
    <div class="message-header">
      <h1>API outage</h1>
    </div>
    <div class="message-body">
      We are currently experiencing an API outage. TetoStats will therefore
      not work properly. Please
      <a href="mailto:cankyre@github.io">report it by email</a> in order for
      us to investigate the issue.
    </div>
  </div>
{/await}