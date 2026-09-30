import Admin from '../models/Admin.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/tokenUtils.js';

/**
 * @desc    Admin login
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Find admin and include password field (it's hidden by default)
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Compare password
  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate tokens
  const payload = { id: admin._id, role: admin.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Set refresh token as httpOnly cookie
  setRefreshTokenCookie(res, refreshToken);

  // Update last login
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          avatar: admin.avatar,
        },
      },
      'Login successful'
    )
  );
});

/**
 * @desc    Get current admin (from access token)
 * @route   GET /api/auth/me
 * @access  Protected
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { admin: req.user }));
});

/**
 * @desc    Refresh access token using refresh cookie
 * @route   POST /api/auth/refresh
 * @access  Public (requires refresh cookie)
 */
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    throw new ApiError(401, 'No refresh token. Please log in again.');
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch (err) {
    throw new ApiError(401, 'Invalid or expired refresh token.');
  }

  const admin = await Admin.findById(decoded.id).select('-password');
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Admin not found or inactive.');
  }

  // Issue new access token
  const accessToken = generateAccessToken({
    id: admin._id,
    role: admin.role,
  });

  res.status(200).json(
    new ApiResponse(200, { accessToken }, 'Token refreshed')
  );
});

/**
 * @desc    Logout (clear refresh cookie)
 * @route   POST /api/auth/logout
 * @access  Protected
 */
export const logout = asyncHandler(async (req, res) => {
  clearRefreshTokenCookie(res);
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});