import React, { useEffect, useState } from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TeamCard } from '../components/common/TeamCard';
import { COMPANY_INFO, CONTACT_INFO } from '../utils/constants';
import { fetchTeam } from '../services/api';

export const AboutPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchTeam();
      if (response && response.success && Array.isArray(response.data)) {
        setTeam(response.data);
      } else {
        setTeam([]);
      }
    } catch (err) {
      setError(err.message || 'Unable to load team roster from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <>
      <PageMeta
        title="About Us"
        description="About Buddha Mayoori Construction — Established Since 1990 in Koodal, Pathanamthitta, Kerala."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">About Our Company</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              About {COMPANY_INFO.name}
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              {COMPANY_INFO.establishedLabel} | Primary Location: {COMPANY_INFO.primaryLocation}
            </p>
          </div>
        </Container>
      </Section>

      {/* Factual Company Overview */}
      <Section background="white" padding="default">
        <Container>
          <SectionHeading
            badgeText="Company Overview"
            title="Experience & Operations"
            subtitle="Providing civil construction, structural designing, and building estimation services across Kerala since 1990."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Company Highlights</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Company Name:</strong> {COMPANY_INFO.name}</li>
                <li><strong>Established:</strong> {COMPANY_INFO.establishedLabel}</li>
                <li><strong>Primary Location:</strong> {COMPANY_INFO.primaryLocation}</li>
                <li><strong>Experience:</strong> 35+ Years Working Experience</li>
                <li><strong>Workforce:</strong> Over 100+ Experienced Labours</li>
              </ul>
            </Card>

            <Card className="bg-slate-50 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Major Working Sites & Regions</h3>
              <p className="text-xs text-slate-600 mb-3 font-semibold">
                {CONTACT_INFO.location.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {CONTACT_INFO.location.sites.map((site, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800">
                    📍 {site}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Team Roster Grid */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Our Team"
            title="Leadership & Department Leads"
            subtitle="Our experienced team of civil engineers, project managers, consultants, and site supervisors."
          />

          {loading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-3 text-xs text-slate-500 font-medium">Loading Team Roster...</p>
            </div>
          ) : error ? (
            <div className="max-w-xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-sm font-semibold text-red-800 mb-3">⚠️ {error}</p>
              <Button variant="primary" size="sm" onClick={loadTeam}>
                Retry Loading Team
              </Button>
            </div>
          ) : team.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
              No team roster members currently available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <TeamCard key={member.memberId || member.id || member._id} member={member} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
};
