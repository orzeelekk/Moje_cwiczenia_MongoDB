import MongoClient from 'mongodb';

// Connection url

const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'tasks';
const completedCollectionName = 'completedTasks';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, {useUnifiedTopology: true});
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);
    const completedCollection = db.collection(completedCollectionName);

    // 1. UPDATE TASK
    const currentTask = await collection.findOne({
      name: 'Change lightbulbs'
    });
    await completedCollection.insertOne(currentTask);
    await collection.deleteOne({
      _id: currentTask._id
    })

    let unfinishedTasks = await collection.find({}).toArray();
    console.log(unfinishedTasks)
    console.assert(unfinishedTasks && unfinishedTasks.length === 2, 'Should have two unfinished tasks', unfinishedTasks);
    let completedTasks = await completedCollection.find({}).toArray();
    console.log(completedTasks)
    console.assert(completedTasks && completedTasks.length === 1, 'Should have one completed task', completedTasks);

    // 2. REVERT CHANGES HERE
    const completedTask = await completedCollection.findOne({
      name: 'Change lightbulbs'
    })
    await collection.insertOne({
      ... completedTask, dueDate: new Date().setDate( new Date().getDate() + 7)
    })
    await completedCollection.deleteOne({
      _id: completedTask._id
    });

    unfinishedTasks = await collection.find({}).toArray();
    console.assert(unfinishedTasks && unfinishedTasks.length === 3, 'Should have three unfinished tasks again', unfinishedTasks);
    completedTasks = await completedCollection.find({}).toArray();
    console.assert(completedTasks && completedTasks.length === 0, 'Should have no completed task', completedTasks);
    const taskWithNewDate = await collection.findOne({name: 'Change lightbulbs'});
    console.assert(taskWithNewDate && taskWithNewDate.dueDate > new Date().getTime(),
      'Should have new due date in the future', taskWithNewDate);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

