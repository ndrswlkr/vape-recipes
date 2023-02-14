<script>
	import '@picocss/pico'	
	import '../app.css'
</script>

<svelte:head>
	<link href="/fontawesome/css/fontawesome.min.css" rel="stylesheet">
  <link href="/fontawesome/css/solid.min.css" rel="stylesheet">
</svelte:head>
<fragment>
	<nav>
		<ul>
			<li>
				<a href='/'>
					<i class="fa-solid fa-flask">
      </i>
      <strong>vape recipes<strong></a>
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
	nav{
		position: sticky;
		top: 0;
		background-color: var(--card-background-color);
		padding-left: .5rem;
		padding-right: .5rem;
	}
</style>