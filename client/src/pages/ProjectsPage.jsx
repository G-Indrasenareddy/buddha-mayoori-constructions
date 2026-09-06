import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const ProjectsPage = () => {
  return (
    <>
      <PageMeta
        title="Projects"
        description="Project Portfolio Showcase — Buddha Mayoori Constructions."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Portfolio</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Project Portfolio
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Explore completed and ongoing construction projects across Kerala.
            </p>
          </div>
        </Container>
      </Section>

      {/* Polished Empty/Coming-Content State */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Portfolio Status"
            title="Project Portfolio Updating"
            subtitle="Official project details and photographs will be populated once supplied by Buddha Mayoori Constructions."
          />

          <Card className="max-w-2xl mx-auto text-center p-8 bg-white border-slate-200">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-2xl mx-auto mb-4 border border-amber-300">
              📁
            </div>
            <Badge variant="amber" className="mb-3">Content Status: Pending Official Upload</Badge>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Official Project Data Coming Soon
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              In accordance with our strict data authenticity policy, zero fictitious projects, stock photos, or fake client testimonials have been created. Real completed project records will be displayed here as official media is provided.
            </p>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 text-left space-y-1 mb-6">
              <p className="font-bold text-slate-900">Future Portfolio Structure Ready For:</p>
              <p>• Verified project names, locations, and completion dates</p>
              <p>• High-resolution site photographs and 3D elevation renderings</p>
              <p>• Categorized filters based on official portfolio data</p>
            </div>

            <Link to="/request-a-quote">
              <Button variant="primary" size="md">
                Request a Building Estimate
              </Button>
            </Link>
          </Card>
        </Container>
      </Section>
    </>
  );
};
