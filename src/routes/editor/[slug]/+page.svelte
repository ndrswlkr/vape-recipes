<script>
	export let data
	import RecipeEditorView from '$lib/components/RecipeEditorView.svelte'
	import FlavorDetails from './FlavorDetails.svelte'
	import { goto } from '$app/navigation';

	let selected_flavor = {flavor: null, producer: null}
	let flavor_details = {}
	let usage_keys = []
	let usages = []

	$: console.log("changed", selected_flavor)
	$: get_flavor_details(selected_flavor)
	
	function get_flavor_details(ingredient){
		let {flavor, producer} = ingredient
		if (flavor === null ) return
		flavor = flavor.replace(/\//, '*')
		fetch(`/backend/flavor_details/${encodeURI(flavor)}/${producer}`)
		.then( res => res.json() )
		.then( json => {
			flavor_details = json.flavor_details
			usage_keys = json.usage_keys
			usages = json.usages
		})
	}
</script>

<svelte:head>
	<title>editor:{data.recipe.short_title}</title>
</svelte:head>

<main>
	{#await data.recipe}
		<p aria-busy=true>wait...</p>
	{:then recipe}
		<div class=top-container>
			<div class=container>
				<RecipeEditorView {recipe} bind:selected_flavor={selected_flavor} >
						<p>{recipe.version}</p>	
						
				</RecipeEditorView>
					
			</div>
				<div class=container>
					<h4>flavor details</h4>
					<FlavorDetails {flavor_details} {usage_keys} {usages} />
				</div>
		</div>
	{/await}
</main>

<style>
	.container{
		display: grid;
		align-content: center;
		justify-content: center;
		vertical-align: bottom;
	}


	.top-container{
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: .5rem;
	}
</style>