import Country from '../models/Country.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import QueryFeatures from '../utils/queryFeatures.js';

/**
 * @desc    Get all countries
 * @route   GET /api/countries
 * @access  Public
 */
export const getCountries = asyncHandler(async (req, res) => {
  const features = new QueryFeatures(Country.find({ isActive: true }), req.query)
    .search(['name', 'shortDescription'])
    .filter(['isActive'])
    .sort()
    .limitFields();

  const total = await Country.countDocuments({ isActive: true });

  // Clone query for pagination (count before paginate)
  const paginatedQuery = features.paginate();
  const countries = await paginatedQuery.query;

  res.status(200).json(
    new ApiResponse(200, {
      countries,
      pagination: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 12,
      },
    })
  );
});

/**
 * @desc    Get single country by slug
 * @route   GET /api/countries/:slug
 * @access  Public
 */
export const getCountryBySlug = asyncHandler(async (req, res) => {
  const country = await Country.findOne({
    slug: req.params.slug,
    isActive: true,
  });

  if (!country) throw new ApiError(404, 'Country not found');

  res.status(200).json(new ApiResponse(200, { country }));
});

/**
 * @desc    Create country
 * @route   POST /api/countries
 * @access  Admin (Phase 6 will enforce)
 */
export const createCountry = asyncHandler(async (req, res) => {
  const country = await Country.create(req.body);
  res.status(201).json(new ApiResponse(201, { country }, 'Country created'));
});

/**
 * @desc    Update country
 * @route   PUT /api/countries/:id
 * @access  Admin
 */
export const updateCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!country) throw new ApiError(404, 'Country not found');

  res.status(200).json(new ApiResponse(200, { country }, 'Country updated'));
});

/**
 * @desc    Delete country
 * @route   DELETE /api/countries/:id
 * @access  Admin
 */
export const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) throw new ApiError(404, 'Country not found');
  res.status(200).json(new ApiResponse(200, null, 'Country deleted'));
});