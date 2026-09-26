import express from 'express';
import {
  getUniversities,
  getUniversityBySlug,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from '../controllers/universityController.js';

const router = express.Router();

router.route('/').get(getUniversities).post(createUniversity);
router.route('/:slug').get(getUniversityBySlug);
router.route('/id/:id').put(updateUniversity).delete(deleteUniversity);

export default router;