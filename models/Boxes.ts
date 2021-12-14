import mongoose from 'mongoose';

const BoxesSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  mixes: String,
});

export default mongoose.models.Boxes || mongoose.model('Boxes', BoxesSchema);
