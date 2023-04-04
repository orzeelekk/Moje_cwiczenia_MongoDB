import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect.js';
import { runAssertions } from './internals/assertions.js';

(async function () {
  try {
    await connectToMongoose();

    let books; // find() result should be assigned to this property
    let Book; // Book model should be assigned to this property

    // Add all of your code below
    const booksSchema = new mongoose.Schema({
      author: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      pages: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    });

    booksSchema.virtual('totalStoreValue')
        .get(function () {
          return this.amount * this.price
        })
    booksSchema.virtual('bookDetails')
        .set(function(detailsString) {
          const splitParts = detailsString.split(" - ");
          this.author = splitParts[0]
          this.title = splitParts[1]
        })
        .get(function () {
          return `${this.author} - ${this.title}`
        })

    Book = mongoose.model('Book',booksSchema)

    books = await Book.findOne()
        .where('amount')
        .gte(40)
        .exec()

    console.log(books)
    console.log(books.totalStoreValue)

    const book = new Book({
          "author": "Gabriel Garc\u00eda M\u00e1rquez",
          "country": "Colombia",
          "language": "Spanish",
          "pages": 417,
          "title": "One Hundred Years of Solitude",
          "year": 1967,
          "amount": 20,
          "price": 42.5
        }
    )

    book.bookDetails = "Gabriel Garc\u00eda M\u00e1rquez - One Hundred Years of Solitude"
    await book.save()
    console.log(book)

    await runAssertions(Book, books);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
