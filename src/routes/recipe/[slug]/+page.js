export async function load({fetch, params}){
	const id = params.slug
	const data = await fetch(`/backend/recipe/${id}`)
	const new_recipe = await data.json()
	return {recipe: recipe}
}