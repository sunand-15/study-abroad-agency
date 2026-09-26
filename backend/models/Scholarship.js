import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Scholarship name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    provider: {
      type: String,
      required: [true, 'Provider is required'],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
    },
    amount: {
      type: String,
      required: [true, 'Amount/coverage is required'],
    },
    eligibility: {
      type: String,
      required: [true, 'Eligibility is required'],
    },
    deadline: {
      type: Date,
    },
    requirements: [String],
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    applicationLink: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

scholarshipSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;