import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let Order;

    // Add all of your code below
    const productSchema = new mongoose.Schema({
      name: String,
      brand: String,
      available: Number,
      lastOrderDate: Date,
      unitPrice: Number,
      supplierName: String,
      expirationDate: Date,
      categories: {
        type: [String],
        enum: ['coffee', 'food', 'accessories', 'equipment', 'premium']
      }
    });

    const orderSchema = new mongoose.Schema({
      date: Date,
      location: String,
      paidIn: {
        type: String,
        enum: ['cash', 'card']
      },
      staffId: mongoose.Schema.ObjectId,
      products: Array,
      total: {
        type: Number,
        min: 1
      }
    });

    orderSchema.methods.getRelatedProducts = function() {
      const productIds = (
          //mapowanie po naszym zbiorze w populate
          this.products && this.products.map(product => product.productId)
      ) || [];

      return Product.find({ _id: { $in: productIds }});
    };

    Order = mongoose.model('Order', orderSchema);

    const Product = mongoose.model('Product',productSchema);



    await runAssertions(Order);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
