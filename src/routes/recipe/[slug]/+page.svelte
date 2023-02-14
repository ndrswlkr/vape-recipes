<script>
	export let data
	import RecipeView from '$lib/components/RecipeView.svelte'
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>{data.recipe.short_title}</title>
</svelte:head>

<main>
	{#await data.recipe}
		<p aria-busy=true>wait...</p>
	{:then recipe}
		<div class=container>
			<RecipeView {recipe} >
					<p>{recipe.version}</p>
					{#await data.versions}
						<p aria-busy=true>wait...</p>
					{:then versions}
						<label for=versions>versions</label>
						<select 
							id=versions
							on:change={(e) => goto(`/recipe/${e.target.value}`)}
							>
							{#each versions as version}
								<option 
									value={version._id} 
									selected={version.version === recipe.version}
								>
									{version.version}
								</option>
							{/each}
						</select>
					{/await}
				</RecipeView>
				
		</div>
	{/await}
</main>

<style>
	select{
		padding: 0px;
	}

</style>