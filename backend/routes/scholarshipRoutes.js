import express from 'express';
import {
  getScholarships,
  getScholarshipBySlug,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} from '../controllers/scholarshipController.js';

const router = express.Router();

router.route('/').get(getScholarships).post(createScholarship);
router.route('/:slug').get(getScholarshipBySlug);
router.route('/id/:id').put(updateScholarship).delete(deleteScholarship);

export default router;