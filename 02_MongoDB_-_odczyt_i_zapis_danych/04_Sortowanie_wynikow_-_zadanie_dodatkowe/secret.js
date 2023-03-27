import MongoClient from 'mongodb';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'secret';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url,  { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    // Get collection
    const collection = db.collection(collectionName);

    // HERE - add your query + sorting
    let secretPhrase = '';
    let secretElements = collection.find({isSecret:true}).sort({createdAt:1})
    await secretElements.forEach((Element) => {
      secretPhrase += Element.letter
      console.log(`Moj element - ${Element.letter}`)
    })

    console.log(`Your secret phrase is: ${secretPhrase}`);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

