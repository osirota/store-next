import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
  },
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  warehouses: {
    type: String,
    trim: true,
  },
  order: [
    {
      alchol: String,
      count: Number,
      name: String,
      partnerId: String,
      price: Number,
      taste: String,
      _id: String,
    },
  ],
  totalPrice: Number,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
