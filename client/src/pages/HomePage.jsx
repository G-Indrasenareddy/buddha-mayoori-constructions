import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { StatCard } from '../components/common/StatCard';
import { ServiceCard } from '../components/common/ServiceCard';
import { TeamCard } from '../components/common/TeamCard';
import { ProjectSlider } from '../components/common/ProjectSlider';
import { COMPANY_INFO, BUSINESS_CLAIMS, CONTACT_INFO } from '../utils/constants';
import { fetchServices, fetchTeam } from '../services/api';
import logoImg from '../assets/buddha-mayoori-logo.jpg';

export const HomePage = () => {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');

  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamError, setTeamError] = useState('');

  const loadServices = async () => {
    try {
      setServicesLoading(true);
      setServicesError('');
      const response = await fetchServices();
      if (response && response.success && Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      setServicesError(err.message || 'Unable to load services catalog from server');
    } finally {
      setServicesLoading(false);
    }
  };

  const loadTeam = async () => {
    try {
      setTeamLoading(true);
      setTeamError('');
      const response = await fetchTeam();
      if (response && response.success && Array.isArray(response.data)) {
        setTeam(response.data);
      } else {
        setTeam([]);
      }
    } catch (err) {
      setTeamError(err.message || 'Unable to load team roster from server');
    } finally {
      setTeamLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
    loadTeam();
  }, []);

  return (
    <>
      <PageMeta
        title="Home"
        description="Buddha Mayoori Construction — Civil construction and structural designing services in Koodal, Pathanamthitta, Kerala since 1990."
      />

      {/* Hero Section */}
      <Section background="dark" padding="large" className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />

        {/* Middle Layer: Subtle Blue/Navy Architectural Vector Skyline (Pure Inline SVG) */}
        <div
          className="absolute right-0 bottom-0 top-0 w-full lg:w-3/4 pointer-events-none z-0 overflow-hidden flex items-end justify-end opacity-10 sm:opacity-15 md:opacity-20 lg:opacity-25"
          aria-hidden="true"
        >
          <svg
            className="w-full h-full max-h-[550px] object-cover object-right-bottom shrink-0"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMax slice"
          >
            <defs>
              <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
                <stop offset="40%" stopColor="#1e293b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="buildingGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="buildingGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Background Structural Blueprint Grid Lines */}
            <g stroke="url(#skylineGrad)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
              <line x1="0" y1="520" x2="1200" y2="520" />
              <line x1="0" y1="440" x2="1200" y2="440" />
              <line x1="0" y1="360" x2="1200" y2="360" />
              <line x1="0" y1="280" x2="1200" y2="280" />
              <line x1="0" y1="200" x2="1200" y2="200" />
              <line x1="400" y1="0" x2="400" y2="600" />
              <line x1="600" y1="0" x2="600" y2="600" />
              <line x1="800" y1="0" x2="800" y2="600" />
              <line x1="1000" y1="0" x2="1000" y2="600" />
            </g>

            {/* Distant Architectural Buildings & Tower Silhouettes */}
            {/* Building 1 (Far Right Highrise) */}
            <rect x="1020" y="120" width="140" height="480" fill="url(#buildingGrad1)" stroke="#475569" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M1040 160 h100 v300 h-100 z" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.4" />

            {/* Construction Crane Tower (Far Right) */}
            <path d="M1120 120 V 40 M1120 40 H 1180 M1120 55 H 1160 M1120 70 H 1150" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M1120 40 L 1150 120" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />

            {/* Building 2 (Mid-Right Angular Modern Tower) */}
            <path d="M860 180 L 940 130 L 1020 180 V 600 H 860 Z" fill="url(#buildingGrad2)" stroke="#475569" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="940" y1="130" x2="940" y2="600" stroke="#64748b" strokeWidth="1" strokeOpacity="0.3" />
            {/* Window Grid Pattern */}
            <g stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.25">
              <line x1="880" y1="220" x2="920" y2="220" />
              <line x1="880" y1="260" x2="920" y2="260" />
              <line x1="880" y1="300" x2="920" y2="300" />
              <line x1="880" y1="340" x2="920" y2="340" />
              <line x1="880" y1="380" x2="920" y2="380" />
              <line x1="880" y1="420" x2="920" y2="420" />
              <line x1="960" y1="220" x2="1000" y2="220" />
              <line x1="960" y1="260" x2="1000" y2="260" />
              <line x1="960" y1="300" x2="1000" y2="300" />
              <line x1="960" y1="340" x2="1000" y2="340" />
              <line x1="960" y1="380" x2="1000" y2="380" />
              <line x1="960" y1="420" x2="1000" y2="420" />
            </g>

            {/* Building 3 (Center-Right Tiered Commercial Building) */}
            <path d="M720 250 H 840 V 600 H 720 Z" fill="url(#buildingGrad1)" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M740 210 H 820 V 250 H 740 Z" fill="url(#buildingGrad2)" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M760 170 H 800 V 210 H 760 Z" fill="url(#buildingGrad1)" stroke="#475569" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="780" y1="130" x2="780" y2="170" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" />

            {/* Building 4 (Foreground Diagonal Roof Form) */}
            <path d="M580 320 L 700 260 V 600 H 580 Z" fill="url(#buildingGrad2)" stroke="#475569" strokeWidth="1" strokeOpacity="0.3" />

            {/* Soft Low-Horizon Subtle Contour Lines */}
            <path d="M450 420 L 560 380 V 600 H 450 Z" fill="url(#skylineGrad)" opacity="0.6" />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Existing Hero Text Content & CTAs */}
            <div className="lg:col-span-7">
              <div className="mb-4">
                <Badge variant="amber">{COMPANY_INFO.establishedLabel}</Badge>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {COMPANY_INFO.name}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium">
                Delivering civil construction, structural designing, and building estimation services across India.
              </p>
              <p className="mt-2 text-sm text-amber-400 font-semibold">
                📍 Primary Location: {COMPANY_INFO.primaryLocation}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/request-a-quote">
                  <Button variant="primary" size="lg">
                    Request a Building Estimate
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="border-slate-400 text-white hover:bg-slate-800 hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Prominent Circular Official Logo Emblem */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center mt-6 lg:mt-0">
              <img
                src={logoImg}
                alt={`${COMPANY_INFO.name} Official Logo`}
                className="w-48 sm:w-64 md:w-72 lg:w-[370px] xl:w-[400px] h-auto aspect-square object-cover rounded-full border-4 border-amber-500/90 shadow-2xl shrink-0 max-w-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Construction Image Slider Section */}
      <ProjectSlider />

      {/* Business Experience / Statistics Section */}
      <Section background="white" padding="default">
        <Container>
          <SectionHeading
            badgeText="Experience & Operations"
            title="35+ Years Working Experience"
            subtitle="Civil construction, structural designing, and engineering operations across India."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUSINESS_CLAIMS.filter((claim) => claim.isVerified !== false).map((claim) => (
              <StatCard key={claim.id} {...claim} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Our Offerings"
            title="Our Services"
            subtitle="Civil construction, structural designing, and building estimation services provided by Buddha Mayoori Construction."
          />

          {servicesLoading ? (
            <div className="py-8 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-xs text-slate-500 font-medium">Loading Services...</p>
            </div>
          ) : servicesError ? (
            <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded text-center">
              <p className="text-xs font-semibold text-red-800 mb-2">⚠️ {servicesError}</p>
              <Button variant="primary" size="sm" onClick={loadServices}>
                Retry Loading Services
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.slice(0, 6).map((service, index) => (
                  <ServiceCard key={service.serviceId || service.id || service._id} service={service} index={index} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to="/services">
                  <Button variant="dark" size="md">
                    Explore All Services →
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* Leadership & Team Preview */}
      <Section background="white" padding="default">
        <Container>
          <SectionHeading
            badgeText="Leadership & Team"
            title="Key Personnel"
            subtitle="Our experienced team of engineers, designers, and department leads."
          />

          {teamLoading ? (
            <div className="py-8 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-xs text-slate-500 font-medium">Loading Team Preview...</p>
            </div>
          ) : teamError ? (
            <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-200 rounded text-center">
              <p className="text-xs font-semibold text-red-800 mb-2">⚠️ {teamError}</p>
              <Button variant="primary" size="sm" onClick={loadTeam}>
                Retry Loading Team
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.slice(0, 4).map((member) => (
                  <TeamCard key={member.memberId || member.id || member._id} member={member} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/team">
                  <Button variant="ghost" size="md" className="text-amber-800 hover:bg-amber-50">
                    View Full Team Roster →
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </Section>

      {/* Working Sites & Regions Section */}
      <Section background="subtle" padding="default">
        <Container>
          <SectionHeading
            badgeText="Locations"
            title="Major Working Sites & Regions"
            subtitle="Primary office location and key working site regions across India."
          />
          <Card className="bg-white">
            <div className="flex flex-wrap gap-3">
              {CONTACT_INFO.location.sites.map((site, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm"
                >
                  📍 {site}
                </span>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* Building Estimate Request CTA Banner */}
      <Section background="dark" padding="default">
        <Container className="text-center max-w-3xl">
          <Badge variant="amber" className="mb-3">Start Your Project</Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Ready to Request a Building Estimate?
          </h2>
          <p className="text-slate-300 text-base mb-8">
            Contact Buddha Mayoori Construction today or complete our online Building Estimate Request Form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-a-quote">
              <Button variant="primary" size="lg">
                Request a Building Estimate
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.phones[0].raw}`}>
              <Button variant="secondary" size="lg" className="border-slate-400 text-white hover:bg-slate-800">
                Call {CONTACT_INFO.phones[0].display}
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
};
