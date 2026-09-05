import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { COMPANY_INFO } from '../utils/constants';

export const AboutPage = () => {
  return (
    <>
      <PageMeta title="About Us" description="Learn about Buddha Mayoori Constructions." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="About Us — Foundation Placeholder"
            title={`About ${COMPANY_INFO.name}`}
            subtitle={`Established ${COMPANY_INFO.establishedLabel} | Primary Location: ${COMPANY_INFO.primaryLocation}`}
          />
          <Card>
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/about</code>. Full About Us company history, leadership bios, and workforce highlights belong to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
