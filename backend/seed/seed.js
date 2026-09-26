import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Country from '../models/Country.js';
import University from '../models/University.js';
import Course from '../models/Course.js';
import Scholarship from '../models/Scholarship.js';
import Admin from '../models/Admin.js';

dotenv.config();

const countries = [
  {
    name: 'United States',
    flag: '🇺🇸',
    shortDescription:
      'Home to world-renowned universities with flexible programs and cutting-edge research.',
    description:
      'The United States is the top destination for international students, offering over 4,500 accredited institutions. From Ivy League schools to state universities, the US provides diverse programs, generous scholarships, and OPT/CPT work opportunities.',
    studyInfo: {
      intakes: ['Fall (Aug)', 'Spring (Jan)'],
      averageTuition: '$25,000 - $45,000 / year',
      livingCost: '$12,000 - $18,000 / year',
      duration: "Bachelor's 4 years, Master's 2 years",
    },
    visaInfo:
      'F-1 student visa required. Requires I-20 from university, SEVIS fee payment, and visa interview.',
    scholarshipInfo:
      'Fulbright, university merit scholarships, assistantships, and need-based aid available.',
    requirements: {
      academic: ['12th grade for Bachelors', 'Bachelors for Masters'],
      english: ['IELTS 6.5+', 'TOEFL 80+', 'PTE 58+'],
      other: ['GRE/GMAT (for some programs)', 'SOP', 'LORs (2-3)'],
    },
    stats: {
      universities: 4500,
      students: 1000000,
      workRights: 'OPT 12 months, STEM OPT 36 months',
    },
    displayOrder: 1,
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    shortDescription:
      'Historic institutions, 1-year Masters, and rich cultural exposure.',
    description:
      'The UK offers globally recognised degrees from universities like Oxford, Cambridge, and Imperial College. Its 1-year Masters programs and 2-year post-study work visa make it highly attractive.',
    studyInfo: {
      intakes: ['September', 'January'],
      averageTuition: '£15,000 - £30,000 / year',
      livingCost: '£9,000 - £15,000 / year',
      duration: "Bachelor's 3 years, Master's 1 year",
    },
    visaInfo:
      'Student Route visa. Requires CAS from university, proof of funds, and TB test (for some countries).',
    scholarshipInfo:
      'Chevening, Commonwealth, university-specific merit scholarships.',
    requirements: {
      academic: ['12th grade for Bachelors', 'Bachelors for Masters'],
      english: ['IELTS 6.0-6.5', 'TOEFL 80+', 'PTE 50+'],
      other: ['SOP', 'LORs (1-2)', 'Portfolio (for arts)'],
    },
    stats: {
      universities: 1300,
      students: 600000,
      workRights: 'Graduate Route: 2 years post-study work',
    },
    displayOrder: 2,
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    shortDescription:
      'Affordable education, post-study work options, and immigration pathways.',
    description:
      'Canada is known for high-quality education, multicultural environment, and PR pathways. Post-Graduation Work Permit (PGWP) allows students to work up to 3 years after graduation.',
    studyInfo: {
      intakes: ['Fall (Sep)', 'Winter (Jan)', 'Summer (May)'],
      averageTuition: 'CAD 15,000 - 35,000 / year',
      livingCost: 'CAD 10,000 - 15,000 / year',
      duration: "Bachelor's 4 years, Master's 1-2 years",
    },
    visaInfo:
      'Study Permit required. Requires acceptance letter, proof of funds (CAD 20,635 GIC), and medical exam.',
    scholarshipInfo:
      'Vanier, university entrance scholarships, provincial scholarships.',
    requirements: {
      academic: ['12th grade for Bachelors', 'Bachelors for Masters'],
      english: ['IELTS 6.5', 'TOEFL 88+', 'PTE 60+'],
      other: ['SOP', 'LORs (2-3)', 'GIC'],
    },
    stats: {
      universities: 850,
      students: 800000,
      workRights: 'PGWP up to 3 years',
    },
    displayOrder: 3,
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    shortDescription:
      'Globally recognized degrees, vibrant cities, and strong support for students.',
    description:
      'Australia combines top-ranked universities with excellent lifestyle. Group of Eight universities are world-renowned. Post-study work visa (Temporary Graduate) allows 2-4 years of work.',
    studyInfo: {
      intakes: ['February', 'July'],
      averageTuition: 'AUD 25,000 - 45,000 / year',
      livingCost: 'AUD 21,000 - 25,000 / year',
      duration: "Bachelor's 3-4 years, Master's 1-2 years",
    },
    visaInfo:
      'Subclass 500 Student Visa. Requires CoE, GTE statement, and OSHC health cover.',
    scholarshipInfo:
      'Australia Awards, university merit scholarships, research scholarships.',
    requirements: {
      academic: ['12th grade for Bachelors', 'Bachelors for Masters'],
      english: ['IELTS 6.5', 'TOEFL 79+', 'PTE 58+'],
      other: ['GTE statement', 'SOP', 'LORs'],
    },
    stats: {
      universities: 700,
      students: 700000,
      workRights: 'Temporary Graduate visa 2-4 years',
    },
    displayOrder: 4,
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    shortDescription:
      'Low tuition fees, engineering excellence, and innovative research.',
    description:
      'Germany offers world-class education with very low or no tuition fees at public universities. Known for engineering, technology, and research excellence.',
    studyInfo: {
      intakes: ['Winter (Oct)', 'Summer (Apr)'],
      averageTuition: '€0 - €500 / semester (public)',
      livingCost: '€10,000 - €12,000 / year',
      duration: "Bachelor's 3 years, Master's 2 years",
    },
    visaInfo:
      'National Visa for study. Requires university admission, blocked account (€11,208), and health insurance.',
    scholarshipInfo: 'DAAD, Erasmus+, Heinrich Böll Foundation.',
    requirements: {
      academic: ['12th grade + Studienkolleg (for Bachelors)', 'Bachelors for Masters'],
      english: ['IELTS 6.5', 'TOEFL 90+'],
      other: ['German language (for some programs)', 'SOP', 'LORs'],
    },
    stats: {
      universities: 400,
      students: 400000,
      workRights: '18 months post-study job-seeking visa',
    },
    displayOrder: 5,
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    shortDescription:
      'English-speaking, tech hub of Europe, and warm Irish culture.',
    description:
      'Ireland is home to global tech and pharma companies. Its universities rank among the top 200 globally, and the 2-year stay-back visa is a major draw.',
    studyInfo: {
      intakes: ['September', 'January'],
      averageTuition: '€12,000 - €25,000 / year',
      livingCost: '€12,000 - €15,000 / year',
      duration: "Bachelor's 3-4 years, Master's 1 year",
    },
    visaInfo:
      'Stamp 2 visa for students. Requires acceptance, proof of funds (€10,000/year), and health insurance.',
    scholarshipInfo:
      'Government of Ireland scholarships, university merit scholarships.',
    requirements: {
      academic: ['12th grade for Bachelors', 'Bachelors for Masters'],
      english: ['IELTS 6.5', 'TOEFL 90+', 'PTE 63+'],
      other: ['SOP', 'LORs (2)', 'CV'],
    },
    stats: {
      universities: 300,
      students: 35000,
      workRights: '2-year stay-back visa',
    },
    displayOrder: 6,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting seed...');

    // Clear existing data
    await Country.deleteMany({});
    await University.deleteMany({});
    await Course.deleteMany({});
    await Scholarship.deleteMany({});
    await Admin.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed countries
    const createdCountries = await Country.insertMany(countries);
    console.log(`✅ Created ${createdCountries.length} countries`);

    // Find USA for university seeding
    const usa = createdCountries.find((c) => c.name === 'United States');
    const uk = createdCountries.find((c) => c.name === 'United Kingdom');

    // Seed universities
    const universities = await University.insertMany([
      {
        name: 'Arizona State University',
        country: usa._id,
        city: 'Tempe, Arizona',
        shortDescription: 'A top-ranked public research university known for innovation.',
        description:
          'Arizona State University is one of the largest public universities in the US, consistently ranked #1 in innovation by U.S. News & World Report.',
        website: 'https://www.asu.edu',
        ranking: { world: 200, national: 62, source: 'QS 2025' },
        tuition: { min: 30000, max: 35000, currency: 'USD' },
        popularCourses: ['MS Computer Science', 'MBA', 'MS Data Science'],
        englishRequirements: { ielts: '6.5', toefl: '80', pte: '60' },
        isFeatured: true,
      },
      {
        name: 'University of Manchester',
        country: uk._id,
        city: 'Manchester',
        shortDescription: 'A prestigious Russell Group university in the heart of England.',
        description:
          'The University of Manchester is a world-leading research university and a member of the Russell Group. Known for its strong alumni network including 25 Nobel laureates.',
        website: 'https://www.manchester.ac.uk',
        ranking: { world: 34, national: 8, source: 'QS 2025' },
        tuition: { min: 20000, max: 30000, currency: 'GBP' },
        popularCourses: ['MSc Management', 'MSc Computer Science', 'MBA'],
        englishRequirements: { ielts: '6.5', toefl: '90', pte: '62' },
        isFeatured: true,
      },
    ]);
    console.log(`✅ Created ${universities.length} universities`);

    // Seed courses
    const asu = universities[0];
    const manchester = universities[1];

    const courses = await Course.insertMany([
      {
        name: 'MS in Computer Science',
        university: asu._id,
        country: usa._id,
        degreeLevel: "Master's",
        category: 'Engineering & IT',
        duration: '2 Years',
        tuition: { amount: 32000, currency: 'USD' },
        intakes: ['Fall 2026', 'Spring 2027'],
        eligibility: {
          academic: ["Bachelor's in CS or related field", 'Minimum GPA 3.0/4.0'],
          english: ['IELTS 6.5', 'TOEFL 80'],
        },
        description:
          'A rigorous MS program covering AI, machine learning, distributed systems, and cybersecurity.',
        isFeatured: true,
      },
      {
        name: 'MBA Global Business',
        university: manchester._id,
        country: uk._id,
        degreeLevel: "Master's",
        category: 'Business',
        duration: '1 Year',
        tuition: { amount: 28000, currency: 'GBP' },
        intakes: ['September 2026'],
        eligibility: {
          academic: ["Bachelor's degree", 'Minimum 2 years work experience'],
          english: ['IELTS 7.0', 'TOEFL 100'],
        },
        description:
          'An intensive 1-year MBA designed for professionals seeking global leadership roles.',
        isFeatured: true,
      },
    ]);
    console.log(`✅ Created ${courses.length} courses`);

    // Seed scholarships
    const scholarships = await Scholarship.insertMany([
      {
        name: 'Fulbright Foreign Student Program',
        provider: 'US Government',
        country: usa._id,
        amount: 'Full tuition + living stipend + airfare',
        eligibility: 'International students with strong academic record and leadership potential.',
        deadline: new Date('2026-05-30'),
        requirements: ['Bachelor\'s degree', 'IELTS/TOEFL', 'SOP', '3 LORs'],
        description:
          'Prestigious fully-funded scholarship for graduate studies in the United States.',
        applicationLink: 'https://foreign.fulbrightonline.org',
      },
      {
        name: 'Chevening Scholarship',
        provider: 'UK Government',
        country: uk._id,
        amount: 'Full tuition + monthly stipend + travel',
        eligibility: 'Citizens of Chevening-eligible countries with 2+ years work experience.',
        deadline: new Date('2026-11-01'),
        requirements: ['Bachelor\'s degree', 'IELTS', '3 essays', '2 LORs'],
        description:
          'Fully-funded UK government scholarship for one-year master\'s programs.',
        applicationLink: 'https://www.chevening.org',
      },
    ]);
    console.log(`✅ Created ${scholarships.length} scholarships`);

    // Seed admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@studyabroad.com',
      password: 'Admin@123456',
      role: 'SUPER_ADMIN',
    });
    console.log(`✅ Created admin: ${admin.email} / Admin@123456`);

    console.log('\n🎉 Seeding complete!\n');
    console.log('Login credentials (Phase 6 will use these):');
    console.log('  Email:    admin@studyabroad.com');
    console.log('  Password: Admin@123456');
    console.log('\n⚠️  CHANGE THIS PASSWORD BEFORE PRODUCTION\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();