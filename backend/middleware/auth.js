import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { verifyAccessToken } from '../utils/tokenUtils.js';

/**
 * Verify JWT from Authorization header.
 * Attaches req.user = admin doc.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized. Please log in.');
  }

  // 2. Verify token
  const decoded = verifyAccessToken(token); // throws if invalid/expired

  // 3. Find admin
  const admin = await Admin.findById(decoded.id).select('-password');
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Admin not found or inactive.');
  }

  // 4. Attach to request
  req.user = admin;
  next();
});

/**
 * Role-based access. Usage:
 *   router.post('/x', protect, requireRole('SUPER_ADMIN', 'ADMIN'), handler)
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authenticated'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied. Required role: ${allowedRoles.join(' or ')}`)
      );
    }
    next();
  };
};