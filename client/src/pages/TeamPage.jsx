import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { TEAM_ROSTER } from '../utils/constants';

export const TeamPage = () => {
  return (
    <>
      <PageMeta title="Team" description="Business-provided team roster." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Team — Route Verified"
            title="Our Team"
            subtitle="Business-provided team roster, with individual roles only where confirmed."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {TEAM_ROSTER.slice(0, 4).map((member) => (
              <Card key={member.id}>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs text-amber-700 font-medium mt-1">{member.role}</p>
                <p className="text-[10px] text-slate-400 mt-1">Status: {member.status}</p>
              </Card>
            ))}
          </div>
          <Card className="bg-slate-100">
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/team</code>. Full team profile presentation belongs to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
