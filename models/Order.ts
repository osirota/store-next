import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema();

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
