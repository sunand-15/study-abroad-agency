import Enquiry from '../models/Enquiry.js';
import Country from '../models/Country.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  sendEnquiryConfirmation,
  sendAgencyNotification,
} from '../services/emailService.js';

/**
 * @desc    Create enquiry (PUBLIC)
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = asyncHandler(async (req, res) => {
  const { fullName, email, phone, preferredCountry, consent } = req.body;

  if (!fullName || !email || !phone || !consent) {
    throw new ApiError(400, 'Name, email, phone and consent are required');
  }

  if (preferredCountry) {
    const countryExists = await Country.findById(preferredCountry);
    if (!countryExists) throw new ApiError(400, 'Invalid country');
  }

  // 1. Save enquiry
  const enquiry = await Enquiry.create(req.body);

  // 2. Send emails (non-blocking)
  Promise.allSettled([
    sendEnquiryConfirmation(enquiry),
    sendAgencyNotification(enquiry),
  ]).then((results) => {
    results.forEach((r, i) => {
      const label = i === 0 ? 'student confirmation' : 'agency notification';
      if (r.status === 'rejected') {
        console.error(`❌ Email (${label}) failed:`, r.reason);
      }
    });
  });

  // 3. Respond immediately
  res.status(201).json(
    new ApiResponse(
      201,
      {
        enquiryId: enquiry.enquiryId,
        _id: enquiry._id,
        fullName: enquiry.fullName,
        email: enquiry.email,
        status: enquiry.status,
      },
      'Enquiry submitted successfully'
    )
  );
});

/**
 * @desc    Get all enquiries (Admin)
 * @route   GET /api/enquiries
 */
export const getEnquiries = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.search) {
    filter.$or = [
      { fullName: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { enquiryId: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter)
      .populate('preferredCountry', 'name slug flag')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, {
      enquiries,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  );
});

export const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id).populate(
    'preferredCountry',
    'name slug flag'
  );
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.status(200).json(new ApiResponse(200, { enquiry }));
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  if (!status) throw new ApiError(400, 'Status is required');

  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');

  enquiry.status = status;
  enquiry.statusHistory.push({
    status,
    changedAt: new Date(),
    note: note || '',
  });

  await enquiry.save();
  res.status(200).json(new ApiResponse(200, { enquiry }, 'Status updated'));
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.status(200).json(new ApiResponse(200, null, 'Enquiry deleted'));
});