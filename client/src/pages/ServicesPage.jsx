import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { ServiceCard } from '../components/common/ServiceCard';
import { CANONICAL_SERVICES } from '../utils/constants';

export const ServicesPage = () => {
  return (
    <>
      <PageMeta
        title="Services"
        description="Canonical 9 Core Services offered by Buddha Mayoori Constructions."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Official Offerings</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Services
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              The canonical 9 services supplied by Buddha Mayoori Constructions.
            </p>
          </div>
        </Container>
      </Section>

      {/* Canonical 9 Services Showcase Grid */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Canonical 9 Services"
            title="Service Catalog"
            subtitle="All 9 official canonical services established in official business materials."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANONICAL_SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};
