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
import { COMPANY_INFO, BUSINESS_CLAIMS, CONTACT_INFO } from '../utils/constants';
import { fetchServices, fetchTeam } from '../services/api';

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
        description="Buddha Mayoori Constructions — Civil construction and structural designing services in Koodal, Pathanamthitta, Kerala since 1990."
      />

      {/* Hero Section */}
      <Section background="dark" padding="large" className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4">
              <Badge variant="amber">{COMPANY_INFO.establishedLabel}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {COMPANY_INFO.name}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium">
              Delivering civil construction, structural designing, and building estimation services across Kerala.
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
        </Container>
      </Section>

      {/* Business Experience / Statistics Section */}
      <Section background="white" padding="default">
        <Container>
          <SectionHeading
            badgeText="Business-Provided Claims"
            title="Experience & Operational Claims"
            subtitle="Business-provided working experience and workforce statistics."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUSINESS_CLAIMS.map((claim) => (
              <StatCard key={claim.id} {...claim} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Canonical 9 Services Section */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Canonical Services"
            title="Our Services"
            subtitle="The official canonical services provided by Buddha Mayoori Constructions."
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
                    View All Canonical Services →
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
            title="Key Personnel Preview"
            subtitle="Business-provided team roster entries."
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

      {/* Major Branch & Working Sites Section */}
      <Section background="subtle" padding="default">
        <Container>
          <SectionHeading
            badgeText="Locations"
            title="Major Branch & Working Sites"
            subtitle="Business-provided locations. Branch/working-site classification requires business confirmation."
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
            <p className="mt-4 text-xs text-slate-500 italic">
              Note: Classification of specific physical branch offices vs active site locations requires business confirmation.
            </p>
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
            Contact Buddha Mayoori Constructions today or complete our online Building Estimate Request Form.
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
