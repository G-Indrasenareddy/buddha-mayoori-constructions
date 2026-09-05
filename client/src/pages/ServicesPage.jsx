import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { CANONICAL_SERVICES } from '../utils/constants';

export const ServicesPage = () => {
  return (
    <>
      <PageMeta title="Services" description="Canonical 9 Core Services offered by Buddha Mayoori Constructions." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Canonical 9 Services — Route Verified"
            title="Our Services"
            subtitle="Canonical service offerings established in Phase 01 specification."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {CANONICAL_SERVICES.map((s, idx) => (
              <Card key={s.id} hoverEffect>
                <span className="text-xs font-bold text-amber-600">0{idx + 1}</span>
                <h3 className="font-bold text-slate-900 mt-1">{s.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{s.shortDesc}</p>
              </Card>
            ))}
          </div>
          <Card className="bg-slate-100">
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/services</code>. Full interactive service cards and estimation triggers belong to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
