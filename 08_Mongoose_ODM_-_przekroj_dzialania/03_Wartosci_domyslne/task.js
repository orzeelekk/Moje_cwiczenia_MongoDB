import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    let transactionSchema;

    // Put your schema here
    transactionSchema = new mongoose.Schema({
      code: {
        type: String,
        required: true
      },
      currentVal: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        default: 10
        // required: true
      },
      transactionDate: {
        type: Date,
        default: new Date().getTime()
        // required: true
      },
      boughtBy: {
        type: Number,
        required: true
      }
    })


    await runAssertions(transactionSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
