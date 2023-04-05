import mongoose from 'mongoose';

import { runAssertionsMongoose } from './internals/assertions.js';
//zarówno tutaj .js jak i w assertions .js, inaczej nie odpala

(async function () {
  try {
    let schema;
    // Prepare Mongoose schema below
    schema = new mongoose.Schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      loginCount: {
        type: Number,
        required: true
      },
      registerDate: {
        type: Date,
        required: true
      },
      commentsAmount: {
        type: Number,
        required: true
      }
    })

    await runAssertionsMongoose(schema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
