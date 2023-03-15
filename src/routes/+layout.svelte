<script>
	import '@picocss/pico'	
	import '../app.css'
	import { mixing_store } from '$lib/stores/mixing_store.js'
	import { page } from '$app/stores'

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	//$: console.log("pagedata", $page.data)
</script>

<svelte:head>
	<link href="/fontawesome/css/fontawesome.min.css" rel="stylesheet">
  <link href="/fontawesome/css/solid.min.css" rel="stylesheet">
</svelte:head>
<fragment>
	<nav>
		<ul>
			<li>
				<a href='/' class:active={$page.dirty}>
					<i class="fa-solid fa-flask">
      </i>
      <strong>vape recipes<strong></a>
			</li>
		</ul>
		<ul>
			<li class=amount-to-make>
				<label for=amount-to-make>amount to mix
					<input 
						id=amount-to-make 
						type=number 
						bind:value={$mixing_store.amount_to_make} 
						step=1
					/>
				</label>
			</li>
		</ul>

		<ul>
			<li>
				<a href = '/recipes'>recipes</a>
			</li>
			<li>
				<a href = '/flavors'>flavors</a>
			</li>
		</ul>
	</nav>
	<slot />
</fragment>

<style>
	.amount-to-make{
		display: inline;
		margin-right: .2rem;
	}
	nav{
		position: sticky;
		top: 0;
		background-color: var(--card-background-color);
		padding-left: .5rem;
		padding-right: .5rem;
	}
	input{
		width: 5rem;
		font-size: .8rem;
		height: 1rem;
		margin-left: .6rem;
	}
</style>