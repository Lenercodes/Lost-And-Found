const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  claimantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  proofOfOwnership: {
    type: String,
    required: true,
    trim: true
  },
  additionalDetails: {
    type: String,
    trim: true
  },
  preferredContact: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'email'
  },
  contactInfo: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  adminNotes: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  verificationMethod: {
    type: String,
    enum: ['manual', 'automatic', 'pending'],
    default: 'pending'
  },
  claimDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for faster queries
claimSchema.index({ itemId: 1 });
claimSchema.index({ claimantId: 1 });
claimSchema.index({ status: 1 });
claimSchema.index({ claimDate: -1 });

module.exports = mongoose.model('Claim', claimSchema); 