import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public — submit enquiry
router.post('/', createEnquiry);

// Admin only
router.use(protect, requireRole('SUPER_ADMIN', 'ADMIN', 'COUNSELLOR'));

router.route('/').get(getEnquiries);
router.route('/:id').get(getEnquiryById).delete(deleteEnquiry);
router.route('/:id/status').patch(updateEnquiryStatus);

export default router;