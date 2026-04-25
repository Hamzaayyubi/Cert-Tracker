const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { _id: true }); // keep _id for milestones so they can be easily updated

const certificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a certification title']
  },
  provider: {
    type: String,
    required: [true, 'Please add a provider (e.g., AWS, Microsoft)']
  },
  examDate: {
    type: Date
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  milestones: [milestoneSchema],
  completedTopics: [{
    type: String
  }],
  shareId: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certification', certificationSchema);
