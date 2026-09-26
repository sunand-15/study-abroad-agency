import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';

const router = express.Router();

router.route('/').post(createEnquiry).get(getEnquiries);
router.route('/:id').get(getEnquiryById).delete(deleteEnquiry);
router.route('/:id/status').patch(updateEnquiryStatus);

export default router;