import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export const QuotePage = () => {
  return (
    <>
      <PageMeta title="Request a Building Estimate" description="Building Estimate Request Form." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Estimation Request — Route Verified"
            title="Request a Building Estimate"
            subtitle="Building Estimate Request Form foundation."
          />
          <Card>
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/request-a-quote</code>. Full step-by-step Building Estimate Request Form workflow belongs to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
