const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Jewelry & Watches',
      'Clothing & Accessories',
      'Books & Documents',
      'Pets',
      'Keys & Personal Items',
      'Sports Equipment',
      'Musical Instruments',
      'Other'
    ]
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'claimed', 'expired', 'removed'],
    default: 'active'
  },
  images: [{
    type: String,
    trim: true
  }],
  contactInfo: {
    name: {
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
  reward: {
    type: String,
    trim: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
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
  expiryDate: {
    type: Date,
    default: function() {
      // Items expire after 30 days
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      return expiry;
    }
  },
  views: {
    type: Number,
    default: 0
  },
  claims: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim'
  }],
  locationDetails: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  }
}, {
  timestamps: true
});

// Indexes for faster queries
reportSchema.index({ type: 1 });
reportSchema.index({ category: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ date: -1 });
reportSchema.index({ location: 'text', title: 'text', description: 'text' });
reportSchema.index({ reporterId: 1 });
reportSchema.index({ expiryDate: 1 });

// Middleware to check if item has expired
reportSchema.pre('find', function() {
  // Update expired items
  this.model.updateMany(
    { 
      status: 'active', 
      expiryDate: { $lt: new Date() } 
    },
    { status: 'expired' }
  );
});

module.exports = mongoose.model('Report', reportSchema); 