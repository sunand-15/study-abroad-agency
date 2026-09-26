import express from 'express';
import {
  getCountries,
  getCountryBySlug,
  createCountry,
  updateCountry,
  deleteCountry,
} from '../controllers/countryController.js';

const router = express.Router();

router.route('/').get(getCountries).post(createCountry);
router
  .route('/:slug')
  .get(getCountryBySlug);

router
  .route('/id/:id')
  .put(updateCountry)
  .delete(deleteCountry);

export default router;