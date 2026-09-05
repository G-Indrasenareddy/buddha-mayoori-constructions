import React from 'react';
import { useParams } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';

export const ProjectDetailPage = () => {
  const { projectId } = useParams();

  return (
    <>
      <PageMeta title="Project Showcase" description="Project detail view." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Project Detail — Route Verified"
            title={`Project ID: ${projectId || 'Dynamic Route'}`}
            subtitle="Detailed project presentation placeholder."
          />
          <Card>
            <p className="text-sm text-slate-700">
              Dynamic parameter route resolution verified for <code>/projects/:projectId</code>. Detailed project showcase belongs to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
