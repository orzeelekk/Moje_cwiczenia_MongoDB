import MongoClient from 'mongodb';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'telNumbers';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url,  { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    // Get collection
    const collection = db.collection(collectionName);

    let pageData = [];
    let finalNumbersString = '';

    // HERE - you can add helper callback for both pages
    const telEntryGatherer = (telEntry) => {
      return `${telEntry.name},${telEntry.telNumber}`;
    };
    // HERE - add your first page
    let page = collection.find({}).sort({ name: 1 }).limit(5).skip(0);
    let pageElements = [];
    await page.forEach(telEntry => {
      pageElements.push(telEntryGatherer(telEntry));
    });
    pageData.push(pageElements.join(';'));

    // HERE - add your second page
    page = collection.find({}).sort({ name: 1 }).limit(5).skip(5);
    pageElements = [];
    await page.forEach(telEntry => {
      pageElements.push(telEntryGatherer(telEntry));
    });
    pageData.push(pageElements.join(';'));
    // HERE - glue all the data here!
    pageData = pageData.map((data, index) => `${index + 1}: ${data}`);
    finalNumbersString = pageData.join('\n');

    // Assertion below - do not modify!
    console.assert(finalNumbersString ===
      '1: Biddie Lightman,338-317-6767;Camille Elmes,573-476-8283;Cathlene Kintzel,670-756-3287;Cherish Cleugher,750-168-7463;Elsy Flecknoe,208-390-8304\n' +
      '2: Enrique Burgan,314-570-1648;Iain Danielski,260-602-7461;Irene Petkov,361-427-4074;Joyous Woolf,721-962-5123;Julieta Lemmer,331-433-7338',
      'Should match given format', finalNumbersString);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

