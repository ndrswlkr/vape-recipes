import mongodb from 'mongodb'
//import {ObjectId} from 'mongodb'

const db = {}
//db
try{
	const client = new mongodb.MongoClient('mongodb://127.0.0.1/vape-recipes')
	await client.connect()
	console.log('connected to db')
	db.recipes = client.db().collection('recipes')
	db.flavors = client.db().collection('flavors')
	db.usages = client.db().collection('flavorUsages')

}catch(e){
	console.log(e)
}

export default db