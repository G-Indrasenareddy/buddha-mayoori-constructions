import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ProjectDetailPage = () => {
  const { projectId } = useParams();

  return (
    <>
      <PageMeta
        title={`Project - ${projectId || 'Showcase'}`}
        description="Project Showcase Detail — Buddha Mayoori Constructions."
      />

      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Project Detail</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Project Record: {projectId || 'Detail View'}
            </h1>
          </div>
        </Container>
      </Section>

      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Graceful Content Handler"
            title="Project Detail Status"
            subtitle="Dynamic project detail route handler."
          />
          <Card className="max-w-xl mx-auto text-center p-8 bg-white border-slate-200">
            <Badge variant="amber" className="mb-3">Content Status: Pending Official Data</Badge>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Project Data Pending Business Supply
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Detailed specifications and site photography for project <code>{projectId}</code> will be displayed here once verified by Buddha Mayoori Constructions.
            </p>
            <Link to="/projects">
              <Button variant="secondary" size="md">
                ← Return to Projects Portfolio
              </Button>
            </Link>
          </Card>
        </Container>
      </Section>
    </>
  );
};
