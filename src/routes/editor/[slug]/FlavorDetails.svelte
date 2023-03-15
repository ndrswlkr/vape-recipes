<script>
	export let flavor_details
	export let usage_keys
	export let usages
</script>

<main>
	<h4><em>{flavor_details?.name}</em></h4>
	<hr>
	{#if flavor_details?.flavor_details?.mix_recommendation?.length}
		{#each flavor_details?.flavor_details?.mix_recommendation as detail}
		<div>
			<small><strong>{detail}</strong></small>
		</div>
		{/each}
	{/if}
	<hr>
	<div><small>{ flavor_details?.flavor_details?.average || '' }</small></div>
	<div><small>{ flavor_details?.flavor_details?.min || '' }</small></div>
	<div><small>{ flavor_details?.flavor_details?.max || '' }</small></div>
	<hr>
	{#if usage_keys.length}
		{#each  usage_keys as key}
			<div style="display: grid; grid-template-columns: 1fr 8fr;">
				<div><small>{key}</small></div>
				<div style="
					background-color:blue; 
					height: 12px; margin-top: 6px; 
					width: {usages[key]}px;">
				</div>
			</div>
			{/each}

	{/if}
</main>

<style>
	hr{
		color: #fff4;
	}
</style>