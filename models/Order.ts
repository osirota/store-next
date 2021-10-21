import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
  },
  merchantSignature: {
    type: String,
    trim: true,
  },
  orderReference: {
    type: String,
    trim: true,
  },
  amount: {
    type: String,
    trim: true,
  },
  currency: {
    type: String,
    trim: true,
  },
  authCode: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  createdDate: {
    type: String,
    trim: true,
  },
  processingDate: {
    type: String,
    trim: true,
  },
  cardPan: {
    type: String,
    trim: true,
  },
  cardType: {
    type: String,
    trim: true,
  },
  issuerBankCountry: {
    type: String,
    trim: true,
  },
  issuerBankName: {
    type: String,
    trim: true,
  },
  transactionStatus: {
    type: String,
    trim: true,
  },
  reason: {
    type: String,
    trim: true,
  },
  reasonCode: {
    type: String,
    trim: true,
  },
  fee: {
    type: String,
    trim: true,
  },
  paymentSystem: {
    type: String,
    trim: true,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
