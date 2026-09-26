import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'University name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    logo: {
      type: String, // Cloudinary URL
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      maxlength: 300,
    },
    description: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    ranking: {
      world: Number, // e.g., 50 = #50 in the world
      national: Number,
      source: String, // e.g., 'QS 2025'
    },
    tuition: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    popularCourses: [String],
    admissionRequirements: {
      academic: [String],
      english: [String],
    },
    englishRequirements: {
      ielts: String, // e.g., '6.5 overall'
      toefl: String,
      pte: String,
    },
    scholarships: {
      type: String,
      default: '',
    },
    applicationInfo: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
universitySchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  
});

// Text search
universitySchema.index({ name: 'text', shortDescription: 'text', city: 'text' });

const University = mongoose.model('University', universitySchema);

export default University;