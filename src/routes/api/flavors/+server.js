import db from '$lib/database.js'
import {json} from '@sveltejs/kit'

export const GET = async ({url}) => {
	
	const flavors = await db.flavors.find().toArray()
	
	return json(flavors)
}