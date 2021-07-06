import mongoose from 'mongoose';

const InvitesSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
});

export default mongoose.models.Invites ||
  mongoose.model('Invites', InvitesSchema);
