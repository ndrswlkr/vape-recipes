<script>
	export let data
	import '@picocss/pico'
	import '../../app.css'
	import SearchAndFilter from './SearchAndFilter.svelte'
	import RecipeView from '$lib/components/RecipeView.svelte'
	import IntersectionObserver from "svelte-intersection-observer";
	import {search_and_filter} from '$lib/stores/search_and_filter.js'
	import {browser} from '$app/environment'

	
	let element
	let skip=0
	let limit = 9

	async function load(type=null){
		if (!browser) return
		if (type === 'search') skip = 0
		const response = await fetch(`/backend/recipes`,{
      method: 'POST',
      body: JSON.stringify({ 
      	limit, skip, 
      	flavor_1: $search_and_filter.flavor_filter_1,
      	flavor_2: $search_and_filter.flavor_filter_2,
      	flavor_3: $search_and_filter.flavor_filter_3,
      	coverage: $search_and_filter.sort_by_coverage,
      	date: $search_and_filter.sort_by_date,
      	origin: $search_and_filter.sort_by_origin,
      	favorite: $search_and_filter.sort_by_favorite,
      	 }),
      headers: {
        'content-type': 'application/json'
      }
    })
		const new_recipes = await response.json()
		if (type === 'search'){
			data.recipes = new_recipes
		} else {
			data.recipes = [...data.recipes, ...new_recipes]
		}
	}

	$: {
		$search_and_filter;
		//console.log('search_and_filter changed')
		load('search')
	}
</script>

<svelte:head>
	<title>recipes</title>
</svelte:head>

<div class=container>
	<h2>recipes</h2>
	{#await data.flavors}
		<p aria-busy=true>wait...</p>
	{:then flavors}
		<SearchAndFilter flavors={flavors}/>
		
	{/await}
	{#await data.recipes}
		<p aria-busy=true>wait...</p>
	{:then recipes}
		{#each recipes as recipe}
			<RecipeView recipe={recipe} >
				<a href={`/recipe/${recipe._id}`} role=button>open</a>
			</RecipeView>
		{/each}
	{/await}


		<IntersectionObserver
	  {element}
	  on:intersect={async (e) => {
	  	skip += limit
	  	load()
	  }}
	>
	  <div bind:this={element}>recipes</div>
	</IntersectionObserver>
	
</div>

<style>
	a[role=button]{
		padding: .2rem;
		width: 6rem;
	}
</style>