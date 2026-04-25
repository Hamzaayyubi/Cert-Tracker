const express = require('express');
const router = express.Router();
const {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  updateProgress,
  markMilestoneComplete,
  getSharedCertification
} = require('../controllers/certController.js');
const { exportCertifications } = require('../controllers/exportController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Public routes
router.get('/share/:shareId', getSharedCertification);

// All other certification routes require authentication
router.use(protect);

// Export route (must be before /:id to avoid conflict)
router.get('/export', exportCertifications);

router.route('/')
  .get(getCertifications)
  .post(createCertification);

router.route('/:id')
  .get(getCertification)
  .put(updateCertification)
  .delete(deleteCertification);

router.put('/:id/progress', updateProgress);
router.put('/:id/milestones/:milestoneId', markMilestoneComplete);

module.exports = router;
