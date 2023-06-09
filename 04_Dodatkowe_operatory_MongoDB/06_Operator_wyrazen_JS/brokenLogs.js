import MongoClient from 'mongodb';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'brokenLogs';

// const checkForInvalidChars = function() {
//   const text = this.additionalId;
//   if (!text) return false;
//   for (let i=0;i<text.length;i++) {
//     if (text.charCodeAt(index) > 127) return true
//   }
//   return false;
// }

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    // HERE - modify this "find" code!
    const logs = collection.find({
      $where: `function () {
    const additionalId = this.additionalId;
    if (!additionalId) {
      return false;
    }
    for (let i = 0; i < additionalId.length; i++) {
      if (additionalId.charCodeAt(i) > 127) {
        return true;
      }
    } return false;
  }`
    });

    // Assertions below - do not modify them!
    const logsArr = await logs.toArray();
    console.assert(logsArr && logsArr.length === 3, 'Should find 3 broken logs', logsArr);
    console.assert(logsArr && logsArr[0] && logsArr[0].severity === 'warn',
      'Should have warn as the first broken log', logsArr);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

