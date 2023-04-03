import MongoClient from 'mongodb';
import { runAssertions } from './internals/assertions.js';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'drugs';

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
      $rename: {
        dolor: 'company',
        consequat: 'name',
        ullamco: 'icdCode',
        veniam: 'icdDesc',
        lorem: 'icdProc'
      }
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

