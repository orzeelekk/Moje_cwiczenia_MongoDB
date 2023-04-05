import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    let appSchema;

    // Put your schema here
    appSchema = new mongoose.Schema({
      version: {
        type: String,
        required: function() {
          if (this.shouldUpdate) {
            return true
          }
        }
      },
      shouldUpdate: {
        type: Boolean,
        // required: true
      },
      size: {
        type: Number,
        // required: true
      },
      installationLocation: {
        type: String,
        // required: true
      },
      lastChecked: {
        type: Date,
        required: function() {
          if (this.shouldUpdate) {
            return true
          }
        }
      }
    })

    await runAssertions(appSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
