import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import { Service } from '../models/Service.js';
import { TeamMember } from '../models/TeamMember.js';
import { logger } from '../utils/logger.js';

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

// Approved 9 Canonical Services
const CANONICAL_SERVICES = [
  { serviceId: "structural-designing", title: "Structural Designing", slug: "structural-designing", iconName: "Ruler", shortDesc: "Professional structural design and engineering services for safe building construction.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 1 },
  { serviceId: "building-estimation", title: "Building Estimation", slug: "building-estimation", iconName: "Calculator", shortDesc: "Comprehensive building cost estimation and material budgeting services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 2 },
  { serviceId: "building-construction-works", title: "Building Construction Works", slug: "building-construction-works", iconName: "Building2", shortDesc: "End-to-end building construction works for residential and commercial projects.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 3 },
  { serviceId: "building-planning", title: "Building Planning", slug: "building-planning", iconName: "FileText", shortDesc: "Architectural building planning and spatial layout services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 4 },
  { serviceId: "house-renovation", title: "House Renovation", slug: "house-renovation", iconName: "Hammer", shortDesc: "Complete house renovation, structural modernization, and alteration works.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 5 },
  { serviceId: "interior-design", title: "Interior Design", slug: "interior-design", iconName: "Paintbrush", shortDesc: "Custom interior design and space aesthetics services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 6 },
  { serviceId: "site-supervision", title: "Site Supervision", slug: "site-supervision", iconName: "ShieldCheck", shortDesc: "On-site construction supervision and technical quality oversight.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 7 },
  { serviceId: "plumbing-designing", title: "Plumbing Designing", slug: "plumbing-designing", iconName: "Wrench", shortDesc: "Plumbing system layout and sanitary design services.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 8 },
  { serviceId: "3d-elevation", title: "3D Elevation", slug: "3d-elevation", iconName: "Box", shortDesc: "Exterior 3D architectural elevation design and visual concepts.", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 9 }
];

// Approved 10 Team Roster Entries
const TEAM_ROSTER = [
  { memberId: "jayakumar-ramachandran", name: "Jayakumar Ramachandran (Kochukuttan)", role: "Proprietor / Civil Engineer / Managing Director / Director", location: "Koodal, Pathanamthitta, Kerala", avatar: "/src/assets/jaikumar-ramachandran.jpg", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 1 },
  { memberId: "sarath-jayakumar", name: "Sarath Jayakumar (Ph.D Scholar)", role: "Landscape Designer / Project Manager", location: "Koodal, Pathanamthitta, Kerala", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 2 },
  { memberId: "indrasena-reddy", name: "Indrasena Reddy", role: "Brand / Media Manager", location: "Andhra Pradesh", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 3 },
  { memberId: "anoop", name: "Anoop", role: "Brand / Media Manager", location: "Kerala", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 4 },
  { memberId: "rasika-sarje-ashok", name: "Rasika Sarje Ashok", role: "Landscaping Consultant", location: "Maharashtra", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 5 },
  { memberId: "smriti-pathania", name: "Smriti Pathania", role: "Landscaping Consultant", location: "Himachal Pradesh", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 6 },
  { memberId: "mahesh", name: "Mahesh", role: "Supervisor", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 7 },
  { memberId: "bhagan", name: "Bhagan", role: "Head — Painting & Finishing Department", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 8 },
  { memberId: "roy", name: "Roy (Roy Electricals)", role: "Head — Plumbing & Sanitary Department", status: "CONFIRMED_FROM_PROVIDED_MATERIAL", displayOrder: 9 },
  { memberId: "head-electrical", name: "Head — Electrical Department", role: "Electrical Department", status: "REQUIRES_BUSINESS_CONFIRMATION", confirmationNote: "Name to be confirmed", isPendingName: true, displayOrder: 10 }
];

export const seedData = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/buddha_mayoori_db';
    await mongoose.connect(connUri);
    logger.info('Connected to MongoDB for data seeding...');

    // Seed Services
    for (const service of CANONICAL_SERVICES) {
      await Service.findOneAndUpdate(
        { serviceId: service.serviceId },
        service,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    logger.info(`Successfully seeded ${CANONICAL_SERVICES.length} canonical core services.`);

    // Seed Team Members
    for (const member of TEAM_ROSTER) {
      await TeamMember.findOneAndUpdate(
        { memberId: member.memberId },
        member,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    logger.info(`Successfully seeded ${TEAM_ROSTER.length} approved team roster entries.`);

    await mongoose.connection.close();
    logger.info('Database connection closed. Seeding complete!');
  } catch (error) {
    logger.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

// Execute if run directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  seedData();
}
