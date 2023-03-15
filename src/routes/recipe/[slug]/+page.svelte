<script>
	export let data
	import RecipeView from '$lib/components/RecipeView.svelte'
	import { goto } from '$app/navigation';

	async function delete_recipe(){
		let id = data.recipe._id
		const answer = window.confirm('do you really want to delete this recipe?')
		if(answer){
			console.log(`delete ${id}`)
			const res = await fetch(`/backend/recipe/${id}`, {method: 'DELETE'})
			goto('/recipes')			
		}
	}

	async function clone_recipe() {
		const id = data.recipe._id
		let title = window.prompt('Enter new title')
		if (title) {
			console.log(title)
			const res = await fetch(`/backend/clone-recipe/${id}`, {
				method: 'POST',
				body: JSON.stringify( {title: title} )
			})
			const data = await res.json()
			goto(`/recipe/${data.id}`)
		}
	}
</script>

<svelte:head>
	<title>{data.recipe.short_title}</title>
</svelte:head>

<main>
	{#await data.recipe}
	<p aria-busy=true>wait...</p>
	{:then recipe}
		<div class=container>
			<RecipeView {recipe}>
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
					<button 
						on:click={() => goto(`/editor/${recipe._id}`)}
					> 
						edit
					</button>
					<button on:click={clone_recipe}>clone</button>
					<button on:click={delete_recipe}>delete</button>
				</RecipeView>
				
		</div>
	{/await}

</main>

<style>
	button{
		width: 4rem;
		padding: .2rem;
		font-size: 1rem;
		margin-bottom: 0;
	}
	select{
		padding: 0px;
	}

</style>