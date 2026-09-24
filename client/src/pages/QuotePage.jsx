import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { InquiryForm } from '../components/forms/InquiryForm';

export const QuotePage = () => {
  return (
    <>
      <PageMeta
        title="Request a Building Estimate"
        description="Request a Building Estimate from Buddha Mayoori Construction."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Estimation Request</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Request a Building Estimate
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Complete the form below to request a building estimate for your project.
            </p>
          </div>
        </Container>
      </Section>

      {/* Form Container */}
      <Section background="default" padding="default">
        <Container className="max-w-3xl">
          <SectionHeading
            badgeText="Frontend Form"
            title="Project Estimation Form"
            subtitle="Select from our 9 canonical services and specify your project location."
            centered
          />
          <InquiryForm />
        </Container>
      </Section>
    </>
  );
};
