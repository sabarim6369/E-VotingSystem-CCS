import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    aadhaarId: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{12}$/
    },
    passwordHash: {
      type: String,
      required: true
    },
    votedElections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election'
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
