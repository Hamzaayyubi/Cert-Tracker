const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const Certification = require('../models/Certification.js');

// @desc    Get all user certifications
// @route   GET /api/certifications
// @access  Private
const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find({ userId: req.user.id });
  res.status(200).json({ success: true, data: certifications });
});

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Private
const getCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found');
  }

  // Make sure user owns certification
  if (certification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json({ success: true, data: certification });
});

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
const createCertification = asyncHandler(async (req, res) => {
  const { title, provider, examDate, progress, milestones, completedTopics } = req.body;

  if (!title || !provider) {
    res.status(400);
    throw new Error('Please add title and provider');
  }

  const certification = await Certification.create({
    userId: req.user.id,
    title,
    provider,
    examDate,
    progress: progress || 0,
    milestones: milestones || [],
    completedTopics: completedTopics || [],
    shareId: uuidv4()
  });

  res.status(201).json({ success: true, data: certification });
});

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
const updateCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found');
  }

  // Make sure user owns certification
  if (certification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedCertification = await Certification.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: updatedCertification });
});

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found');
  }

  // Make sure user owns certification
  if (certification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await certification.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Update progress
// @route   PUT /api/certifications/:id/progress
// @access  Private
const updateProgress = asyncHandler(async (req, res) => {
  const { progress } = req.body;
  
  if (progress === undefined || progress < 0 || progress > 100) {
    res.status(400);
    throw new Error('Please provide valid progress (0-100)');
  }

  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found');
  }

  if (certification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  certification.progress = progress;
  await certification.save();

  res.status(200).json({ success: true, data: certification });
});

// @desc    Mark milestone complete
// @route   PUT /api/certifications/:id/milestones/:milestoneId
// @access  Private
const markMilestoneComplete = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found');
  }

  if (certification.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const milestone = certification.milestones.id(req.params.milestoneId);
  
  if (!milestone) {
    res.status(404);
    throw new Error('Milestone not found');
  }

  milestone.completed = req.body.completed !== undefined ? req.body.completed : true;

  await certification.save();

  res.status(200).json({ success: true, data: certification });
});

// @desc    Get shared certification
// @route   GET /api/certifications/share/:shareId
// @access  Public
const getSharedCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findOne({ shareId: req.params.shareId })
    .select('title provider examDate progress milestones completedTopics');

  if (!certification) {
    res.status(404);
    throw new Error('Certification not found or invalid link');
  }

  res.status(200).json({ success: true, data: certification });
});

module.exports = {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  updateProgress,
  markMilestoneComplete,
  getSharedCertification
};
