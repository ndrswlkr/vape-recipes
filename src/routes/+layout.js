export async function load(event){
	

	const flavors = async () =>{
		console.log('load flavors')
		const response = await event.fetch(`/backend/flavors`)
		console.log(response)
		const flavors =  await response.json()
//		console.log(flavors)
		return flavors
		}

	return { flavors: flavors() }
}
