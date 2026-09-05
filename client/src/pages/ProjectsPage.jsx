import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export const ProjectsPage = () => {
  return (
    <>
      <PageMeta title="Projects" description="Project Portfolio Showcase." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Projects — Route Verified"
            title="Project Portfolio"
            subtitle="Actual project categories and portfolio content require business confirmation."
          />
          <Card className="bg-amber-50 border-amber-200 mb-6">
            <p className="text-sm text-amber-900">
              <strong>Content Status:</strong> <code>[REQUIRES BUSINESS CONFIRMATION]</code> — Actual completed project portfolio items will be populated when official data and photography are provided.
            </p>
          </Card>
          <Card>
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/projects</code>. Full filterable project gallery belongs to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
