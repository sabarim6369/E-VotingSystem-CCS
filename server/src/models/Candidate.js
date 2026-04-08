import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    party: {
      type: String,
      required: true,
      trim: true
    },
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election',
      required: true
    }
  },
  { timestamps: true }
);

candidateSchema.index({ name: 1, electionId: 1 }, { unique: true });

export const Candidate = mongoose.model('Candidate', candidateSchema);
