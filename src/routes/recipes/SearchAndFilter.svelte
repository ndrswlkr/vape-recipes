<script>
	import {onMount} from 'svelte'
	import {search_and_filter} from '../../stores/search_and_filter.js'
	export let flavors


	function close_popup(element) {
  document.getElementById(element).removeAttribute('open');
}
</script>

<main>
	<div class="container">
		<div class=sort-container>
			<label for=coverage>sort by coverage</label>
			<input 
				id=coverage 
				type=checkbox
				 />
		</div>
	</div>

	{#await flavors}

		<p aria-busy=true>wait...</p>
		{:then flavors}
		
		{#each ['flavor_filter_1','flavor_filter_2','flavor_filter_3'] as key}

		<details class=inline role="list" id={key}>
		  <summary aria-haspopup="listbox">
		    {$search_and_filter[key] || key.replace(/_/g, ' ')}
		  </summary>
		  <ul role="listbox">

		  	{#each flavors as flavor}
		    <li>
		    	<a
		    		href="#/"
		    	 	on:click={ ()=> {
		    	 		event.preventDefault()
		    			close_popup(key)
		    			$search_and_filter[key] = flavor.name
		    		}}>
		    		{flavor.name}
		  		</a>
		  	</li>
		    {/each}

		  </ul>
		</details>

			<a class=delete-symbol href="#/" class:disabled={!$search_and_filter[key]} on:click={()=>$search_and_filter[key] = null}><i class="fa-solid fa-delete-left"></i></a>

		{/each}
	{/await}

</main>

<style>
	.sort-container{
		margin-bottom: 1rem;
	}
	.inline{
		display:inline-block;
		width: 12rem;
	}
	.delete-symbol{
		margin-right: .3rem;
	}
	.disabled{
		color: grey;
		cursor: default;
	}
</style>