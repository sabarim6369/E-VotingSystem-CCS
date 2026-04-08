import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      required: true
    },
    encryptedVote: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

voteSchema.index({ electionId: 1, userId: 1 }, { unique: true });

export const Vote = mongoose.model('Vote', voteSchema);
