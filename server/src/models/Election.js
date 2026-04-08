import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Active', 'Closed'],
      default: 'Closed'
    }
  },
  { timestamps: true }
);

export const Election = mongoose.model('Election', electionSchema);
