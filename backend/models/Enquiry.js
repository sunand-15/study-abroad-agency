import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    preferredCountry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    preferredCourse: {
      type: String,
      trim: true,
    },
    intake: {
      type: String,
      trim: true,
    },
    highestEducation: {
      type: String,
      enum: ['High School', "Bachelor's", "Master's", 'PhD', 'Other'],
    },
    percentage: {
      type: String,
    },
    englishTestStatus: {
      type: String,
      enum: ['Not taken', 'Taken - IELTS', 'Taken - TOEFL', 'Taken - PTE', 'Taken - Duolingo', 'Exempt'],
      default: 'Not taken',
    },
    budget: {
      type: String,
    },
    message: {
      type: String,
      maxlength: 2000,
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
    },
    status: {
      type: String,
      enum: [
        'NEW',
        'CONTACTED',
        'COUNSELLING',
        'SHORTLISTED',
        'DOCUMENTS_PENDING',
        'APPLICATION_READY',
        'APPLICATION_SUBMITTED',
        'OFFER_RECEIVED',
        'OFFER_ACCEPTED',
        'FEES_PAID',
        'VISA_PROCESSING',
        'VISA_DECISION',
        'PRE_DEPARTURE',
        'COMPLETED',
        'REJECTED',
        'WITHDRAWN',
        'ON_HOLD',
      ],
      default: 'NEW',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    statusHistory: [
      {
        status: String,
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        changedAt: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate a unique enquiry ID like ENQ-20250921-0001
enquirySchema.pre('save', async function () {
  if (!this.enquiryId) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await mongoose.model('Enquiry').countDocuments();
    this.enquiryId = `ENQ-${date}-${String(count + 1).padStart(4, '0')}`;
  }
  
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;