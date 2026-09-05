import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { COMPANY_INFO, BUSINESS_CLAIMS } from '../utils/constants';

export const HomePage = () => {
  return (
    <>
      <PageMeta
        title="Home"
        description="Buddha Mayoori Constructions — Established Since 1990 in Koodal, Pathanamthitta, Kerala."
      />
      <Section background="white" padding="large">
        <Container>
          <SectionHeading
            badgeText="Phase 03 — Foundation Verified"
            title={COMPANY_INFO.name}
            subtitle={`Established ${COMPANY_INFO.establishedLabel} | Primary Location: ${COMPANY_INFO.primaryLocation}`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {BUSINESS_CLAIMS.map((claim) => (
              <Card key={claim.id} hoverEffect className="text-center">
                <Badge variant="amber" className="mb-2">{claim.type}</Badge>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{claim.label}</h3>
                <p className="text-xs text-slate-500 mt-1">Status: {claim.status}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-100 border-slate-300">
            <p className="text-sm text-slate-700">
              <strong>Phase 03 Route Architecture Active:</strong> Frontend foundation setup complete. Full homepage layout, hero section, and interactive service grids belong to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
