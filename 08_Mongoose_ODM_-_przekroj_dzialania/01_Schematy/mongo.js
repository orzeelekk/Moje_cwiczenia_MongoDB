import Joi from '@hapi/joi';

import { runAssertionsMongo } from './internals/assertions.js';

(async function () {
  try {
    let schema;
    // Prepare Joi schema below
    schema = Joi.object().keys({
      // id: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      loginCount: Joi.number(),
      registerDate: Joi.date(),
      commentsAmount: Joi.number()
    }).options({presence: "required"})

    await runAssertionsMongo(schema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
