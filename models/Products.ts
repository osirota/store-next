import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
});

export default mongoose.models.Products ||
  mongoose.model('Products', ProductsSchema);
