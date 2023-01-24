<script>
	export let recipe
</script>

<main>
	{#await recipe}
	{:then recipe}
	<article>
		<header>
			<h3>{recipe.short_title}</h3>
			<a href={`/recipe/${recipe._id}`} role=button>open</a>
		</header>
		{#each recipe.recipe as ingredient}
			<li>{ingredient.flavor}</li>
		{/each}
	</article>
	{/await}
</main>

<style>

</style>