<script>
	export let data

</script>

<main>
	{#await data.recipe}
		<p aria-busy=true>wait...</p>
	{:then recipe}
		<div class=container>
			<article>
				<header>
					<h3>{recipe.short_title}</h3>
				</header>
				<code>{JSON.stringify(recipe)}</code>
			</article>
		</div>
	{/await}
</main>

<style>

</style>