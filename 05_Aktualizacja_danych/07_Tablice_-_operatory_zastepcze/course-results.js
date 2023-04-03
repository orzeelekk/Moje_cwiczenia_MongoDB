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
    await collection.updateMany({
    },{
      //element to czesc do filtrowania
      $inc: {'results.$[element].score': 70}
    },{
      arrayFilters: [{'element.score': { $lte:0 }}]
    })

    await collection.updateMany({
    },{
      $inc: {'results.$[].score': -5}
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

