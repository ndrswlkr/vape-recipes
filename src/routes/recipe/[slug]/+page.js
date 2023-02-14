export async function load({fetch, params}){
	const id = params.slug
	const data = await fetch(`/backend/recipe/${id}`)
	const {recipe, versions} = await data.json()
	return {recipe, versions}
}