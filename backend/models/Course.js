import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: [true, 'University is required'],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
    degreeLevel: {
      type: String,
      required: [true, 'Degree level is required'],
      enum: ["Bachelor's", "Master's", 'PhD', 'Diploma', 'PG Diploma', 'Certificate'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Engineering & IT',
        'Business',
        'Healthcare',
        'Arts & Design',
        'Science',
        'Law',
        'Education',
        'Other',
      ],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    tuition: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD',
      },
    },
    intakes: [String], // ['Fall 2026', 'Spring 2027']
    eligibility: {
      academic: [String],
      english: [String],
    },
    englishRequirements: {
      ielts: String,
      toefl: String,
      pte: String,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
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

courseSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  
});

courseSchema.index({ name: 'text', description: 'text' });

const Course = mongoose.model('Course', courseSchema);

export default Course;