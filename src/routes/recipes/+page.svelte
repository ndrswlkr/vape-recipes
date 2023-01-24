<script>
	export let data
	import '@picocss/pico'
	import SearchAndFilter from './SearchAndFilter.svelte'
	import RecipeView from './RecipeView.svelte'
	import { onMount } from 'svelte'
	import IntersectionObserver from "svelte-intersection-observer";
	import {search_and_filter} from '../../stores/search_and_filter.js'
	let element
	let skip=0
	let limit = 9

	async function load(type=null){
		if (type === 'search') skip = 0
		console.log($search_and_filter.flavor_filter_1)
		const response = await fetch(`api/recipes`,{
      method: 'POST',
      body: JSON.stringify({ 
      	limit, skip, 
      	flavor_1: $search_and_filter.flavor_filter_1,
      	flavor_2: $search_and_filter.flavor_filter_2,
      	flavor_3: $search_and_filter.flavor_filter_3,
      	coverage: $search_and_filter.sort_by_coverage,
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
		load('search')
	}
</script>

<fragment>
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
			<RecipeView recipe={recipe} />
		{/each}
	{/await}
	<form action='/recipes/9'>
		<button>load more</button>
	</form>
		<IntersectionObserver
	  {element}
	  on:intersect={async (e) => {
	  	skip += limit
	  	load()
	  }}
	>
	  <div bind:this={element}>recipes</div>
	</IntersectionObserver>
	
</fragment>