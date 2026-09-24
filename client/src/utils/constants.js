// Buddha Mayoori Constructions — Single Source of Truth Constants

export const COMPANY_INFO = {
  name: "Buddha Mayoori Construction",
  established: 1990,
  establishedLabel: "Established Since 1990",
  primaryLocation: "Koodal, Pathanamthitta, Kerala",
  tagline: "Building Excellence Since 1990",
};

// Business-provided claims
export const BUSINESS_CLAIMS = [
  {
    id: "experience",
    label: "35+ Years Working Experience",
    value: "35+",
    unit: "Years",
    description: "35+ Years Working Experience",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
    type: "business-provided claim",
  },
  {
    id: "labours",
    label: "Over 100+ Experienced Labours",
    value: "100+",
    unit: "Labours",
    description: "Over 100+ Experienced Labours",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
    type: "business-provided claim",
  },
  {
    id: "completions",
    label: "Over 250+ Successful Completion",
    value: "250+",
    unit: "Projects",
    description: "Over 250+ Successful Completion",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
    isVerified: true,
    type: "business-provided claim",
  },
];

export const CONTACT_INFO = {
  phones: [
    { display: "+91 94474 53220", raw: "9447453220" },
    { display: "+91 86063 90918", raw: "8606390918" },
    { display: "+91 80752 18806", raw: "8075218806" },
  ],
  whatsapp: [
    { display: "+91 86063 90918", raw: "918606390918", primary: true },
    { display: "+91 80752 18806", raw: "918075218806", primary: false },
  ],
  // Both email addresses are equal in status
  emails: [
    { address: "sarathjayakumar98@gmail.com" },
    { address: "jayakumarkoodal334@gmail.com" },
  ],
  location: {
    primary: "Koodal, Pathanamthitta, Kerala",
    label: "Major Working Sites & Regions Across Kerala",
    sites: [
      "Koodal (Pathanamthitta)",
      "Pathanamthitta",
      "Kollam",
      "Trivandrum",
      "Alappuzha",
      "Kottayam",
    ],
  },
};

// Canonical 9 core services with conservative descriptions
export const CANONICAL_SERVICES = [
  {
    id: "structural-designing",
    title: "Structural Designing",
    slug: "structural-designing",
    iconName: "Ruler",
    shortDesc: "Professional structural design and engineering services for safe building construction.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "building-estimation",
    title: "Building Estimation",
    slug: "building-estimation",
    iconName: "Calculator",
    shortDesc: "Comprehensive building cost estimation and material budgeting services.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "building-construction-works",
    title: "Building Construction Works",
    slug: "building-construction-works",
    iconName: "Building2",
    shortDesc: "End-to-end building construction works for residential and commercial projects.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "building-planning",
    title: "Building Planning",
    slug: "building-planning",
    iconName: "FileText",
    shortDesc: "Architectural building planning and spatial layout services.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "house-renovation",
    title: "House Renovation",
    slug: "house-renovation",
    iconName: "Hammer",
    shortDesc: "Complete house renovation, structural modernization, and alteration works.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "interior-design",
    title: "Interior Design",
    slug: "interior-design",
    iconName: "Paintbrush",
    shortDesc: "Custom interior design and space aesthetics services.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "site-supervision",
    title: "Site Supervision",
    slug: "site-supervision",
    iconName: "ShieldCheck",
    shortDesc: "On-site construction supervision and technical quality oversight.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "plumbing-designing",
    title: "Plumbing Designing",
    slug: "plumbing-designing",
    iconName: "Wrench",
    shortDesc: "Plumbing system layout and sanitary design services.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "3d-elevation",
    title: "3D Elevation",
    slug: "3d-elevation",
    iconName: "Box",
    shortDesc: "Exterior 3D architectural elevation design and visual concepts.",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
];

// All 10 business-provided team roster entries
export const TEAM_ROSTER = [
  {
    id: "jayakumar-ramachandran",
    name: "Jayakumar Ramachandran (Kochukuttan)",
    role: "Proprietor / Civil Engineer / Managing Director / Director",
    location: "Koodal, Pathanamthitta, Kerala",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "sarath-jayakumar",
    name: "Sarath Jayakumar (Ph.D Scholar)",
    role: "Landscape Designer / Project Manager",
    location: "Koodal, Pathanamthitta, Kerala",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "indrasena-reddy",
    name: "Indrasena Reddy",
    role: "Brand / Media Manager",
    location: "Andhra Pradesh",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "anoop",
    name: "Anoop",
    role: "Brand / Media Manager",
    location: "Kerala",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "rasika-sarje-ashok",
    name: "Rasika Sarje Ashok",
    role: "Landscaping Consultant",
    location: "Maharashtra",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "smriti-pathania",
    name: "Smriti Pathania",
    role: "Landscaping Consultant",
    location: "Himachal Pradesh",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "mahesh",
    name: "Mahesh",
    role: "Supervisor",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "bhagan",
    name: "Bhagan",
    role: "Head — Painting & Finishing Department",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "roy",
    name: "Roy (Roy Electricals)",
    role: "Head — Plumbing & Sanitary Department",
    status: "CONFIRMED_FROM_PROVIDED_MATERIAL",
  },
  {
    id: "head-electrical",
    name: "Head — Electrical Department",
    role: "Electrical Department",
    status: "REQUIRES_BUSINESS_CONFIRMATION",
    confirmationNote: "Name to be confirmed",
    isPendingName: true,
  },
];
