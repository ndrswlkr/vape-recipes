<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	export let recipe
	export let selected_flavor
	import fix_recipe_name from '$lib/fix_recipe_name.js'
	import {mix_it} from '$lib/recipe_functions'
	import {onMount, onDestroy} from 'svelte'
	import { mixing_store } from '$lib/stores/mixing_store'
	import Confirm from '$lib/components/Confirm.svelte'

	let color = 'green'

	let dirty = false
	let mix
	let hide = true
	let confirm = false
	$: mix = mix_it(recipe.recipe, $mixing_store.amount_to_make)
	$: recipe.short_title = fix_recipe_name(recipe.short_title)
  $: console.log("dirty", dirty)	

  function make_dirty() {
  		dirty = true
  }

	function pretty_date(date){
		const d = new Date(date)
		return d.getDay() + "." + d.getMonth() + "." + d.getFullYear()
	}
	
	/*
	onDestroy( () =>{
		color='red'
		console.log('destroy', color)
		let answer = window.confirm('like save')

			if (dirty) {

					//const answer = confirm("do you like to save  changes?")
					hide = false					
				if (answer === true){
					console.table(recipe.recipe)
				}
				}

	})
*/
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

	async function save_recipe(){
		console.log("save")
		dirty = false
		let res
		let data

		try{
			res = await fetch('/backend/save_new_version', {
				method: 'POST',
				body: JSON.stringify({
					id: recipe._id, 
					recipe: recipe.recipe, 
					recipeIndex: recipe.recipeIndex
				})
			})
			data = await res.json()
			console.log("try: ", data.message)
			goto(`/recipe/${data.new_id}`)
		}
		catch{
			console.log("catch: ", data.error)
		}
	}
	
	function add_ingredient(){
		recipe.recipe = [...recipe.recipe, {flavor:'', producer:'', percentage:0}]
	}

	function flavor_changed(index){
		const raw_flavor = recipe.recipe[index].flavor
		if (raw_flavor.indexOf(':') > 0){
			const [producer, flavor] = raw_flavor.split(':')
			recipe.recipe[index].producer = producer
			recipe.recipe[index].flavor = flavor
		}
	}
	function remove_ingredient(index){
		dirty = true
		recipe.recipe = [
			...recipe.recipe.slice(0, index), 
			...recipe.recipe.slice(index+1)
		]

	}
	function leave_page(e, type = 'normal'){
		console.log("leaving", type)
		//event.preventDefault();
    return event.returnValue = '';
	}

	window.onbeforeunload = (e) => leave_page(e)
	window.onhashchange = (e) => console.log("hash change")

</script>
<main>
	{#await $page.data.flavors}
		<p>loading...</p>
	{:then flavors}
		<datalist id=flavor-list>
			{#each flavors as flavor}
				<option>{flavor.vendor_abbreviation + ':' + flavor.name}</option>
			{/each}
		</datalist>
	{/await}

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
			<button on:click={ ()=>save_recipe() }>save</button>
			</div>		
		</header>

		<div class=recipe-line>
			<div></div> 
			<div></div> 
			<div class=strong>base</div> 
			<div class=numbers>{mix.base_percentage}%</div> 
			<div class="strong numbers">{mix.base}g</div> 
			<div></div>
			<div></div>
		</div>

		{#each recipe.recipe as ingredient, index}
			<div class=recipe-line>
				<button 
					class="secondary outline"
					on:click={ () =>	selected_flavor = ingredient } 
				>
					<i class="fa-solid fa-circle-question"></i>
				</button>
				<div>{ingredient.producer}</div> 
				<input 
					type=text 
					class=strong 
					name={'flavor' + index}
					id={'flavor' + index}
					list=flavor-list
					bind:value={ingredient.flavor}
					on:input={ () => {
						make_dirty()
						flavor_changed(index)
						}
					} 
				/> 
				<input 
					type=number 
					class=numbers 
					step=.1
					bind:value={ingredient.percentage}
					on:change={ () => make_dirty() } 
				/> 
				<div class="strong numbers">{mix.recipe[index]}g</div> 
				<div class=symbol>
					{#if ingredient.inStash}
						<i class="fa-solid fa-square-check"></i>
					{:else}
						<i class="fa-solid fa-square-minus"></i>
					{/if}
				</div>
				<button 
					class="secondary outline"
					on:click={() => remove_ingredient(index)}
					>
					<i class="fa-solid fa-trash-can"></i>
				</button>
			</div>
		{/each}
		<button class=add-ingredient on:click={()=>add_ingredient()}>add ingredient</button>
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
	input{
		padding: .2rem;
		height: 80%;
		font-size: .9rem;
	}

	button{
		width: 3rem;
		padding: .2rem;
		margin-bottom: 0;
		height: 80%;
	}
	.add-ingredient{
		margin-top: 1rem;
		width: auto;
	}
	div{
		font-size: .8rem;
		margin-top: .2rem;
	}
	small{
		font-style: italic;
	}
	.detail-grid{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		margin-bottom: .3rem;
		gap: .5rem;
	}
	.button-grid{
		margin-bottom: 1rem;
	}
	.recipe-line{
		display: grid;
		grid-template-columns: 2fr 1fr 5fr 1fr 1fr 1fr 2fr;
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