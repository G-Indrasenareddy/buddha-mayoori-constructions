import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TeamCard } from '../components/common/TeamCard';
import { COMPANY_INFO, TEAM_ROSTER, CONTACT_INFO } from '../utils/constants';

export const AboutPage = () => {
  return (
    <>
      <PageMeta
        title="About Us"
        description="About Buddha Mayoori Constructions — Established Since 1990 in Koodal, Pathanamthitta, Kerala."
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
            badgeText="Company Information"
            title="Overview & Location"
            subtitle="Factual company information provided in official business materials."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Company Facts</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Company Name:</strong> {COMPANY_INFO.name}</li>
                <li><strong>Established:</strong> {COMPANY_INFO.establishedLabel}</li>
                <li><strong>Primary Location:</strong> {COMPANY_INFO.primaryLocation}</li>
                <li><strong>Working Experience Claim:</strong> 35+ Years Working Experience</li>
                <li><strong>Workforce Claim:</strong> Over 100+ Experienced Labours</li>
              </ul>
            </Card>

            <Card className="bg-slate-50 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Working Locations</h3>
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
            badgeText="Personnel Roster"
            title="Business-Provided Team Members"
            subtitle="Business-provided team roster, with individual roles only where confirmed."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_ROSTER.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission / Vision Placeholder */}
      <Section background="white" padding="compact">
        <Container>
          <Card className="bg-amber-50 border-amber-200">
            <h3 className="font-bold text-amber-900 mb-1">Company Statements Status</h3>
            <p className="text-xs text-amber-800">
              <code>[TO BE SUPPLIED BY BUSINESS]</code> — Mission, vision, and core values statements will be added once officially provided by Buddha Mayoori Constructions. No fictional stories or unconfirmed history claims have been added.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
