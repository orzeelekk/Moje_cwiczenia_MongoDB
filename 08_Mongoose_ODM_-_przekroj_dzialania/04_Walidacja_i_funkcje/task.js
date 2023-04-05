import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    let gameSchema;

    // Put your schema here
    gameSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      publisher: {
        type: String,
        required: true
      },
      releaseDate: {
        type: Date,
        required: true
      },
      meanRating: {
        type: Number,
        min: [1,'Mean rating should be between 1 and 10, is: {VALUE}'],
        max:[11,'Mean rating should be between 1 and 10, is: {VALUE}']
      },
      tags: {
        type: [String],
        enum: ['action','rpg','mmo','fps'],
        validate: [function validateTags(val) {
          return val ? val.length > 0 : true;
        },'Tags should be represented by at least one tag']
      },
      retailPrice: {
        type: Number,
        min: [0,'Retail price should be bigger or equal to 0, is: {VALUE}']
      },
      comments: {
        type: [String],
        validate: [function validateTags(val) {
          return val ? val.length > 0 : true;
        },'Comments cannot be empty']
      }
    })


    await runAssertions(gameSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
