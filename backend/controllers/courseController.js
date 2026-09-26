import Course from '../models/Course.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import QueryFeatures from '../utils/queryFeatures.js';

export const getCourses = asyncHandler(async (req, res) => {
  const baseQuery = Course.find({ isActive: true })
    .populate('university', 'name slug logo city')
    .populate('country', 'name slug flag');

  const features = new QueryFeatures(baseQuery, req.query)
    .search(['name', 'description'])
    .filter(['university', 'country', 'degreeLevel', 'category', 'isFeatured'])
    .sort()
    .limitFields();

  const total = await Course.countDocuments({ isActive: true });
  const paginated = features.paginate();
  const courses = await paginated.query;

  res.status(200).json(
    new ApiResponse(200, {
      courses,
      pagination: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 12,
      },
    })
  );
});

export const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    slug: req.params.slug,
    isActive: true,
  })
    .populate('university', 'name slug logo city description')
    .populate('country', 'name slug flag');

  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, { course }));
});

export const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(new ApiResponse(201, { course }, 'Course created'));
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, { course }, 'Course updated'));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, null, 'Course deleted'));
});