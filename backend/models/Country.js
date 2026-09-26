import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Country name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    flag: {
      type: String,
      default: '🌍', // emoji or image URL
    },
    image: {
      type: String, // Cloudinary URL
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 300,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    // Study info
    studyInfo: {
      intakes: [String], // ['Fall', 'Spring']
      averageTuition: String,
      livingCost: String,
      duration: String,
    },
    // Visa info
    visaInfo: {
      type: String,
      default: '',
    },
    // Scholarship info
    scholarshipInfo: {
      type: String,
      default: '',
    },
    // Requirements
    requirements: {
      academic: [String],
      english: [String],
      other: [String],
    },
    // Quick facts
    stats: {
      universities: Number,
      students: Number,
      workRights: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name if not provided
countrySchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  
});

// Index for faster search
countrySchema.index({ name: 'text', shortDescription: 'text' });

const Country = mongoose.model('Country', countrySchema);

export default Country;