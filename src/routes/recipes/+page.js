export async function load(event){
	
	const recipes = async () =>{
		const response = await event.fetch(`/backend/recipes`,{
      method: 'POST',
      body: JSON.stringify({ limit: 9, skip: 0 }),
      headers: {
        'content-type': 'application/json'
      }
    })
		
		const recipes =  await response.json()
		return recipes
	}	


	return {recipes: recipes()}
}

