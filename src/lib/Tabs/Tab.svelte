<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	@font-face {
		font-family: "HUN";
		src: url("../../assets/pfw.ttf");
	}
	:root {
		--accent-color: #00d1b2;
		--gray: #ccc;
	}

	button {
		font-family: "HUN";
		font-size: 17px;
		background: none;
		border: none;
		border-top: 2px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
	}
	
	.selected {
		border-top: 2px solid var(--accent-color);
		color: #333;
	}
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>