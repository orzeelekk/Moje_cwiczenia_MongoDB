import MongoClient from 'mongodb';
import { runAssertions } from './internals/assertions.js';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'raceResults'
const collectionNameOut = 'outRaceResults';
const collectionNameMerge = 'mergeRaceResults';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    // Try to drop old collection, if existing
    try {
      await db.dropCollection(collectionNameOut);
      await db.dropCollection(collectionNameMerge);
    } catch (err) {}

    const collection = db.collection(collectionName);

    // INSERT YOUR CODE HERE - for $out
    await collection.aggregate([{
      $addFields: {
        totalTime: { $sum: '$lapTimes'}
      }
    },{
      $sort: {
        sum: 1,
      }
    },{
      $out: collectionNameOut
    }]).toArray()

    // INSERT YOUR CODE HERE - for $merge
    await collection.aggregate([{
      $addFields: {
        totalTime: { $sum: '$lapTimes'}
      }
    },{
      $sort: {
        sum: 1,
      }
    },{
      $merge: {
        into: collectionNameMerge,
        on: '_id',
        whenMatched: 'replace'
      }
    }]).toArray()

    // Assertions below
    const outCollection = db.collection(collectionNameOut);
    const mergeCollection = db.collection(collectionNameMerge);
    await runAssertions(outCollection, mergeCollection);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

