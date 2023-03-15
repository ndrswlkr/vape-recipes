<script>
	export let recipe

	import fix_recipe_name from '$lib/fix_recipe_name.js'
	import {mix_it} from '$lib/recipe_functions'
	import { mixing_store } from '$lib/stores/mixing_store'

	let mix

	$: mix = mix_it(recipe.recipe, $mixing_store.amount_to_make)
	$: recipe.short_title = fix_recipe_name(recipe.short_title)
	
	function pretty_date(date){
		const d = new Date(date)
		return d.getDay() + "." + d.getMonth() + "." + d.getFullYear()
	}

	async function toggle_favorite(){
		console.log(recipe.favorite + "clicked")
		recipe.favorite = !recipe.favorite
		const res =await fetch(
			`/backend/toggle_favorite/${recipe._id}/${recipe.favorite}`
			)
		const message = await res.json().message
		if (!message === 'success'){
			console.log('error toggle_favorite')
		}
	}
</script>

<main>
	{#await recipe}
		<p aria-busy=true>wait...</p>
	{:then recipe}
	<article>
		<header>
			<h3>{recipe.short_title}</h3>
			<div class="detail-grid button-grid">
				<slot />
				<button 
					class="secondary outline"
					on:click={()=>toggle_favorite()}
				>
					<i 
						style={ recipe.favorite ? 'color: red' : 'color: grey' }
						class="fa-solid fa-heart">
					</i>
			</button>
			</div>
			
		</header>

		<div class=recipe-line>
			<div></div> 
			<div class=strong>base</div> 
			<div class=numbers>{mix.base_percentage}%</div> 
			<div class="strong numbers">{mix.base}g</div> 
			<div></div>
		</div>


		{#each recipe.recipe as ingredient, index}
			<div class=recipe-line>
				<div>{ingredient.producer}</div> 
				<div class=strong>{ingredient.flavor}</div> 
				<div class=numbers>{ingredient.percentage}%</div> 
				<div class="strong numbers">{mix.recipe[index]}g</div> 
				<div class=symbol>
					{#if ingredient.inStash}
						<i class="fa-solid fa-square-check"></i>
					{:else}
						<i class="fa-solid fa-square-minus"></i>
					{/if}
				</div>
			</div>
		{/each}
		<footer>
			<div class="detail-grid">
				<small>origin: {recipe.origin}</small>
				<small>creator: {recipe.creator}</small>				
				<small>created at: {pretty_date(recipe.created)}</small>				
				<small>total flavor: {mix.totalFlavor}%</small>				
				<small>covered: {recipe.covered}%</small>				
				<small>index: {recipe.recipeIndex}</small>				
			</div>
		</footer>
	</article>
	{/await}
</main>

<style>

	button{
		width: 3rem;
		padding: .2rem;
		font-size: 1rem;
		margin-bottom: 0;
	}

	small{
		font-style: italic;
	}
	.detail-grid{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-bottom: .3rem;
		gap: .5rem;
	}
	.button-grid{
		margin-bottom: 1rem;
	}
	.recipe-line{
		display: grid;
		grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
		gap: .5rem;
		border-bottom: 1px solid #fff2;
	}
	.recipe-line > *{
		overflow: hidden; 
		text-overflow: ellipsis;
		min-width: 4rem;
		white-space: nowrap; 
	}
	.numbers{
		text-align: right;
	}
	.symbol{
		text-align: center;
	}
	.strong{
		font-weight: 900;
	}

</style>