<script>

	import { page } from '$app/stores';
	import {onMount} from 'svelte'
	import {search_and_filter} from '$lib/stores/search_and_filter.js'
	


	function close_popup(element) {
  	document.getElementById(element).removeAttribute('open');
	}
	function update_recipe_name(name){
		console.log("changed", name)
		$search_and_filter.recipe_name = name
	}

</script>

<main>
	<div class="container">
		<div class=sort-container>
			<section>
				<label for=coverage>sort by coverage</label>
				<input 
					id=coverage 
					type=checkbox
					bind:checked={$search_and_filter.sort_by_coverage}
					 />
			</section>
			<section>
				<label for=date>sort by date</label>
				<input 
					id=date 
					type=checkbox
					bind:checked={$search_and_filter.sort_by_date}
					 />
			</section>
			<section>
				<label for=favorite>sort by favorite</label>
				<input 
					id=favorite 
					type=checkbox
					bind:checked={$search_and_filter.sort_by_favorite}
					 />
			</section>
			<section>
						<label for=origin>search by origin</label>
						<select id=origin name=origin bind:value={$search_and_filter.sort_by_origin}>
							<option value=all selected> all origins </option>
							<option value=ELR> ELR </option>
							<option value="Smoky Blue's">  Smoky Blue's </option>
							<option value="own creation">  own creation </option>
							<option value="load-flavor-recipes">  load-flavor-recipes </option>
						</select>
			</section>
			<section>
				<label for=recipe-name>search by recipe name</label>
				<input 
					type=text 
					id=recipe-name 
					on:change={(e) => update_recipe_name(e.target.value)} 
				/>
			</section>
			</div>

		{#await $page.data.flavors}
			<p aria-busy=true>wait...</p>
		{:then flavors}
			<section>
			<div class=sort-container>
			{#each ['flavor_filter_1','flavor_filter_2','flavor_filter_3'] as key}
				<div>
					<input 
					type=text 
					name={key} 
					id={key} 
					list=flavor-list 
					placeholder="filter by flavor"
					bind:value={$search_and_filter[key]}
				/>
				<datalist id=flavor-list>
					{#each flavors as flavor}
						<option>{flavor.name}</option>
					{/each}
				</datalist>

				<a class=delete-symbol href="#/" class:disabled={!$search_and_filter[key]} on:click={()=>$search_and_filter[key] = null}><i class="fa-solid fa-delete-left"></i></a>

			</div>
				{/each}
		</div>
		</section>
	{/await}
	</div>
</main>

<style>
	select, input[type="text"]{
		width: 12rem;
		padding: .1rem;
		height: 1.5rem;
	}
	input[type=text], a{
		display: inline;
	}
	section{
		margin-bottom: 1rem;
	}

	.sort-container{
		margin-bottom: 1rem;
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 777px){
		.sort-container{
			margin-bottom: 1rem;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}		
	}
	.container{
		border: 1px solid var(--muted-border-color);
		padding: .5rem;
	}

	.delete-symbol{
		margin-left: .3rem;
	}
	.disabled{
		color: grey;
		cursor: default;
	}
</style>