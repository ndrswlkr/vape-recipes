import db from '$lib/database.js'
import {json} from '@sveltejs/kit'

export const POST = async ({request}) => {
	let filter = {
		version: 'latest', 
		is_private: { $exists: false }, 
		'recipe.2':{ $exists: true }
	}
	let sort = {'recipeIndex': 1}
	const filter_list = []

	const {limit, skip, flavor_1, flavor_2, flavor_3, coverage } = await request.json()
	console.log(limit, skip, flavor_1)

		if(flavor_1) filter_list.push(flavor_1)
		if(flavor_2) filter_list.push(flavor_2)
		if(flavor_3) filter_list.push(flavor_3)
		if(coverage) sort = { "covered": -1, ...sort }
		/*if(search_and_filter.origin !== 'all'){
			filter = { ...filter, origin: search_and_filter.origin }
		}
		if(search_and_filter.recipe_name) {
			let regex = new RegExp(search_and_filter.recipe_name)
			filter = { ...filter, short_title: {$regex: regex} }
		}
		if(search_and_filter.date) sort = { "created": -1, ...sort }
		if(search_and_filter.favorite) sort = { "favorite": -1, ...sort }
		*/
		if(filter_list.length){
				filter = { ...filter, "recipe.flavor": { $all: filter_list }}
			}
	
	const recipes = await db.recipes
		.find(filter)
		.limit(Number(limit))
		.skip(Number(skip))
		.toArray()

	
	return json(recipes)
}