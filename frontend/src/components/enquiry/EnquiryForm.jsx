import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';
import { useCountries } from '../../hooks/useCountries';
import { useCreateEnquiry } from '../../hooks/useCreateEnquiry';
import SuccessMessage from './SuccessMessage';

const EDUCATION_LEVELS = [
  'High School',
  "Bachelor's",
  "Master's",
  'PhD',
  'Other',
];

const ENGLISH_STATUS = [
  'Not taken',
  'Taken - IELTS',
  'Taken - TOEFL',
  'Taken - PTE',
  'Taken - Duolingo',
  'Exempt',
];

const EnquiryForm = () => {
  const [successData, setSuccessData] = useState(null);

  const { data: countriesData } = useCountries({ limit: 100 });
  const countries = countriesData?.countries || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: createEnquiry, isPending } = useCreateEnquiry();

  const onSubmit = (formData) => {
    // Convert empty strings to undefined (backend handles missing)
    const payload = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== '' && v !== undefined)
    );

    createEnquiry(payload, {
      onSuccess: (data) => {
        setSuccessData(data);
        reset();
        toast.success('Enquiry submitted successfully!');
      },
      onError: (err) => {
        toast.error(err.message || 'Could not submit enquiry. Please try again.');
      },
    });
  };

  if (successData) {
    return <SuccessMessage enquiry={successData} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white rounded-2xl border border-navy-100 p-6 md:p-8 shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Full name */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('fullName', { required: 'Name is required' })}
            className="input-field"
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email',
              },
            })}
            className="input-field"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone is required',
              minLength: { value: 10, message: 'Enter a valid phone number' },
            })}
            className="input-field"
            placeholder="+91 99999 99999"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Preferred country */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Preferred Country
          </label>
          <select {...register('preferredCountry')} className="input-field">
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred course */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Preferred Course
          </label>
          <input
            type="text"
            {...register('preferredCourse')}
            className="input-field"
            placeholder="e.g., MS Computer Science"
          />
        </div>

        {/* Intake */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Preferred Intake
          </label>
          <input
            type="text"
            {...register('intake')}
            className="input-field"
            placeholder="e.g., Fall 2026"
          />
        </div>

        {/* Highest education */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Highest Education
          </label>
          <select {...register('highestEducation')} className="input-field">
            <option value="">Select</option>
            {EDUCATION_LEVELS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        {/* Percentage */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Percentage / CGPA
          </label>
          <input
            type="text"
            {...register('percentage')}
            className="input-field"
            placeholder="e.g., 78% or 8.2 CGPA"
          />
        </div>

        {/* English test */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            English Test Status
          </label>
          <select {...register('englishTestStatus')} className="input-field">
            {ENGLISH_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-navy-800 mb-2">
            Budget (per year)
          </label>
          <input
            type="text"
            {...register('budget')}
            className="input-field"
            placeholder="e.g., $25,000"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mt-5">
        <label className="block text-sm font-semibold text-navy-800 mb-2">
          Message
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="input-field resize-none"
          placeholder="Tell us about your goals, questions, or anything else..."
        />
      </div>

      {/* Consent */}
      <div className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          {...register('consent', {
            required: 'You must accept to continue',
          })}
          className="mt-1 w-4 h-4 rounded border-navy-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="consent" className="text-sm text-navy-600">
          I consent to Study Abroad Compass contacting me via email or phone
          regarding my enquiry. I have read and agree to the{' '}
          <a href="/privacy-policy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>.
          <span className="text-red-500"> *</span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full mt-8 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Enquiry <FiSend />
          </>
        )}
      </button>

      <p className="text-xs text-center text-navy-500 mt-4">
        We typically respond within 24 hours.
      </p>
    </form>
  );
};

export default EnquiryForm;