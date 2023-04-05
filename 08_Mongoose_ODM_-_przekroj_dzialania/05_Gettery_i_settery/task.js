import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    let stockTransactionSchema;

    // Put your schema here
    stockTransactionSchema = new mongoose.Schema({
      price: {
        type: Number,
        required: true,
        get: (val) => val && Math.round(val * 100)/100,
        set: (val) => val && Math.round(val * 100)/100,
        // get: (val) => roundToTwoDecimals(val),
        // set: (val) => roundToTwoDecimals(val)
      },
      amount: {
        type: Number,
        required: true
      },
      market: {
        type: String,
        required: true
      },
      symbol: {
        type: String,
        required: true
      },
      industry: {
        type: String,
        required: true
      }
    })


    await runAssertions(stockTransactionSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
