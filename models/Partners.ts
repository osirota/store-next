import mongoose from 'mongoose';

const PartnersSchema = new mongoose.Schema({
  name: String,
  description: String,
  logoDark: String,
  logoLight: String,
});

export default mongoose.models.Partners ||
  mongoose.model('Partners', PartnersSchema);
