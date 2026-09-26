import Scholarship from '../models/Scholarship.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import QueryFeatures from '../utils/queryFeatures.js';

export const getScholarships = asyncHandler(async (req, res) => {
  const baseQuery = Scholarship.find({ isActive: true })
    .populate('country', 'name slug flag')
    .populate('university', 'name slug logo');

  const features = new QueryFeatures(baseQuery, req.query)
    .search(['name', 'provider', 'description'])
    .filter(['country', 'university'])
    .sort()
    .limitFields();

  const total = await Scholarship.countDocuments({ isActive: true });
  const paginated = features.paginate();
  const scholarships = await paginated.query;

  res.status(200).json(
    new ApiResponse(200, {
      scholarships,
      pagination: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 12,
      },
    })
  );
});

export const getScholarshipBySlug = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.findOne({
    slug: req.params.slug,
    isActive: true,
  })
    .populate('country', 'name slug flag')
    .populate('university', 'name slug logo');

  if (!scholarship) throw new ApiError(404, 'Scholarship not found');
  res.status(200).json(new ApiResponse(200, { scholarship }));
});

export const createScholarship = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, { scholarship }, 'Scholarship created'));
});

export const updateScholarship = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!scholarship) throw new ApiError(404, 'Scholarship not found');
  res
    .status(200)
    .json(new ApiResponse(200, { scholarship }, 'Scholarship updated'));
});

export const deleteScholarship = asyncHandler(async (req, res) => {
  const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
  if (!scholarship) throw new ApiError(404, 'Scholarship not found');
  res.status(200).json(new ApiResponse(200, null, 'Scholarship deleted'));
});