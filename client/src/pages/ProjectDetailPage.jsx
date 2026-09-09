import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { fetchProjectBySlug } from '../services/api';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError('');
        const response = await fetchProjectBySlug(projectId);
        if (response && response.success && response.data) {
          setProject(response.data);
        } else {
          setProject(null);
        }
      } catch (err) {
        setError(err.message || 'Project record not found');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  return (
    <>
      <PageMeta
        title={`Project - ${project?.title || projectId || 'Showcase'}`}
        description="Project Showcase Detail — Buddha Mayoori Constructions."
      />

      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Project Detail</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {project ? project.title : `Project Record: ${projectId || 'Detail View'}`}
            </h1>
            {project && (
              <p className="mt-2 text-slate-300 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{project.location}</span>
              </p>
            )}
          </div>
        </Container>
      </Section>

      <Section background="default" padding="default">
        <Container>
          {loading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-3 text-xs text-slate-500 font-medium">Loading Project Specifications...</p>
            </div>
          ) : project ? (
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="bg-white border-slate-200 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <Badge variant="amber">{project.category}</Badge>
                  {project.completionYear && (
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Completion: {project.completionYear}
                    </span>
                  )}
                </div>

                {project.coverImage && (
                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 max-h-80 flex items-center justify-center">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Short Overview</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{project.shortDescription}</p>
                </div>

                {project.fullDescription && (
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Project Specifications & Scope</h3>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100">
                  <Link to="/projects">
                    <Button variant="secondary" size="md" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Return to Projects Portfolio
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="max-w-xl mx-auto text-center p-8 bg-white border-slate-200">
              <Badge variant="amber" className="mb-3">Content Status: Pending Official Data</Badge>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Project Record Not Found
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
          )}
        </Container>
      </Section>
    </>
  );
};
