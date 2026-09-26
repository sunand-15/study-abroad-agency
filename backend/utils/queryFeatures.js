/**
 * Builds a Mongoose query from request query params.
 * Supports: search, filter, sort, pagination, field selection.
 */
class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Text search on specified fields
  search(fields = []) {
    const keyword = this.queryString.search;
    if (keyword && fields.length) {
      const orConditions = fields.map((field) => ({
        [field]: { $regex: keyword, $options: 'i' },
      }));
      this.query = this.query.find({ $or: orConditions });
    }
    return this;
  }

  // Exact filter on allowed fields
  filter(allowed = []) {
    const queryObj = { ...this.queryString };
    const excluded = ['search', 'sort', 'page', 'limit', 'fields'];
    excluded.forEach((key) => delete queryObj[key]);

    // Build safe filter with only allowed fields
    const filterObj = {};
    Object.keys(queryObj).forEach((key) => {
      if (allowed.includes(key)) {
        filterObj[key] = queryObj[key];
      }
    });

    this.query = this.query.find(filterObj);
    return this;
  }

  // Sorting: ?sort=-createdAt,name
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // Field selection: ?fields=name,slug
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // Pagination: ?page=2&limit=20
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 12;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default QueryFeatures;