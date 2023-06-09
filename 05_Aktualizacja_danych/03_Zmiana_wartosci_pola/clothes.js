import MongoClient from 'mongodb';
import { runAssertions } from './internals/assertions.js';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'clothes';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    // INSERT YOUR CODE HERE
    await collection.updateOne({
      product: 'Shirt',
      shop: 'House',
      color: 'White',
      size: 'One Size'
    },{
      $set: {quantity: 50,},
      $setOnInsert: {price: '219 zł'}
    },{
     upsert:true
    })
    await collection.updateOne({
      product: 'Blouse',
      shop: 'Mohito',
      color: 'Violet',
      size: 'XL'
    },{
      $set: {quantity: 20,},
      $setOnInsert: {price: '199 zł'}
    },{
     upsert:true
    })

    // Assertions below
    await runAssertions(collection);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

