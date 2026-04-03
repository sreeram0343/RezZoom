import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  title: { type: String, default: 'Untitled Resume' },
  text: { type: String, required: true },
  lastAnalysis: {
    score: Number,
    metrics: Object,
    missingKeywords: [String],
    matchedKeywords: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resume', resumeSchema);
