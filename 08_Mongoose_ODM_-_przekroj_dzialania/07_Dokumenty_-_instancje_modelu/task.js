import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect.js';
import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    await connectToMongoose();

    let tomato;

    // Add all of your code below
    const ingredientSchema = new mongoose.Schema({
      Name: {
        type: String,
        required: true
      },
      Calories: {
        type: Number,
        required: true
      },
      CookingTime: {
        type: Number,
        required: true
      },
      Tag: [new mongoose.Schema({
          Tag: String
      })],
      Portions: {
        type: new mongoose.Schema({
          SMALL: {
            type: Number,
            required: true,
            min: 1
          },
          MEDIUM: {
            type: Number,
            required: true,
            min: 1
          },
          LARGE: {
            type: Number,
            required: true,
            min: 1
          }
        })
      },
      FlavorValues: {
        type: new mongoose.Schema({
          SOUR: {
            type: Number,
          },
          SALT: {
            type: Number,
          },
          ACID: {
            type: Number,
          },
          SWEET: {
            type: Number,
          },
          FAT: {
            type: Number,
          },
          UMAMI: {
            type: Number,
          }
        }),
        default: {
          SOUR: 0,
          SALT: 0,
          ACID: 0,
          SWEET: 0,
          FAT: 0,
          UMAMI: 0
        }
      }
    })

    const Ingredient = mongoose.model('Ingredient',ingredientSchema);

    tomato = new Ingredient({
      Name: 'Tomato',
      Calories: 30,
      CookingTime: 480,
      Tags: {
        Tag: 'Vegetables'
      },
      Portions: {
        SMALL: 15,
        MEDIUM: 75,
        LARGE: 200
      }
    })

    await tomato.save()








    await runAssertions(tomato);
  } catch (err) {
    console.log('Error when running the task: ', err);
    console.assert(!err, 'Should not trigger error handler!', err);
  }
})();
