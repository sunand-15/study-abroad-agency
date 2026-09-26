import University from '../models/University.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import QueryFeatures from '../utils/queryFeatures.js';

export const getUniversities = asyncHandler(async (req, res) => {
  const baseQuery = University.find({ isActive: true }).populate(
    'country',
    'name slug flag'
  );

  const features = new QueryFeatures(baseQuery, req.query)
    .search(['name', 'city', 'shortDescription'])
    .filter(['country', 'isFeatured'])
    .sort()
    .limitFields();

  const total = await University.countDocuments({ isActive: true });
  const paginated = features.paginate();
  const universities = await paginated.query;

  res.status(200).json(
    new ApiResponse(200, {
      universities,
      pagination: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 12,
      },
    })
  );
});

export const getUniversityBySlug = asyncHandler(async (req, res) => {
  const university = await University.findOne({
    slug: req.params.slug,
    isActive: true,
  }).populate('country', 'name slug flag');

  if (!university) throw new ApiError(404, 'University not found');
  res.status(200).json(new ApiResponse(200, { university }));
});

export const createUniversity = asyncHandler(async (req, res) => {
  const university = await University.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, { university }, 'University created'));
});

export const updateUniversity = asyncHandler(async (req, res) => {
  const university = await University.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!university) throw new ApiError(404, 'University not found');
  res
    .status(200)
    .json(new ApiResponse(200, { university }, 'University updated'));
});

export const deleteUniversity = asyncHandler(async (req, res) => {
  const university = await University.findByIdAndDelete(req.params.id);
  if (!university) throw new ApiError(404, 'University not found');
  res.status(200).json(new ApiResponse(200, null, 'University deleted'));
});