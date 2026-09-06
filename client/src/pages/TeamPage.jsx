import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TeamCard } from '../components/common/TeamCard';
import { TEAM_ROSTER } from '../utils/constants';

export const TeamPage = () => {
  return (
    <>
      <PageMeta
        title="Team"
        description="Business-provided team roster for Buddha Mayoori Constructions."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Personnel</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Team Roster
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Business-provided personnel roster and department heads.
            </p>
          </div>
        </Container>
      </Section>

      {/* Full 10-Entry Team Roster Grid */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Complete 10-Entry Roster"
            title="Leadership, Consultants & Department Leads"
            subtitle="Business-provided team roster, with individual roles only where confirmed."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_ROSTER.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Workforce Tribute Banner */}
      <Section background="white" padding="default">
        <Container>
          <Card className="bg-slate-900 text-white p-8 text-center border-slate-800">
            <Badge variant="amber" className="mb-3">Workforce Claim</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Over 100+ Experienced Labours
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Our projects across Kerala are supported by a dedicated workforce of over 100+ experienced labours, skilled tradesmen, and site supervisors.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
