import express from 'express';
import {
  getCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();

router.route('/').get(getCourses).post(createCourse);
router.route('/:slug').get(getCourseBySlug);
router.route('/id/:id').put(updateCourse).delete(deleteCourse);

export default router;