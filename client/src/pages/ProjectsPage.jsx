import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { fetchProjects } from '../services/api';
import { MapPin, ArrowRight, Camera } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchProjects();
      if (response && response.success && Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      setError(err.message || 'Unable to load projects portfolio from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <PageMeta
        title="Projects"
        description="Project Portfolio Showcase — Buddha Mayoori Construction."
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

      {/* Portfolio Grid or Empty State */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Portfolio Showcase"
            title="Projects & Works"
            subtitle="Verified civil construction and structural design projects."
          />

          {loading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-3 text-xs text-slate-500 font-medium">Loading Projects Portfolio...</p>
            </div>
          ) : error ? (
            <div className="max-w-xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-sm font-semibold text-red-800 mb-3">⚠️ {error}</p>
              <Button variant="primary" size="sm" onClick={loadProjects}>
                Retry Loading Projects
              </Button>
            </div>
          ) : projects.length === 0 ? (
            /* Preserved Empty/Coming-Content State when 0 projects exist */
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
          ) : (
            /* Real Project Portfolio Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const coverUrl = typeof project.coverImage === 'string' ? project.coverImage : project.coverImage?.url;
                const photoCount = (project.galleryImages?.length || 0) + (coverUrl ? 1 : 0);

                return (
                  <Card key={project._id} hoverEffect className="flex flex-col justify-between h-full bg-white border-slate-200 overflow-hidden">
                    <div>
                      {/* Cover Photo / Thumbnail Header */}
                      {coverUrl && (
                        <div className="relative w-full h-48 bg-slate-100 overflow-hidden border-b border-slate-100 mb-4">
                          <img
                            src={coverUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                            onError={(e) => {
                              e.target.parentElement.style.display = 'none';
                            }}
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {project.status === 'ONGOING' ? (
                              <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300 shadow-xs backdrop-blur-xs">
                                🏗️ ONGOING
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-xs backdrop-blur-xs">
                                ✓ COMPLETED
                              </span>
                            )}
                          </div>
                          {photoCount > 0 && (
                            <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-white bg-slate-900/80 px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-xs">
                              <Camera className="w-3 h-3" /> {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="px-4 pt-1">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <Badge variant="amber">{project.category}</Badge>
                          {project.status === 'COMPLETED' && project.completionYear && (
                            <span className="text-[11px] font-semibold text-slate-500">{project.completionYear}</span>
                          )}
                          {!coverUrl && (
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {project.status === 'ONGOING' ? '🏗️ ONGOING' : '✓ COMPLETED'}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{project.title}</h3>
                        <p className="text-xs text-slate-600 mb-3 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{project.location}</span>
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                          {project.shortDescription}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                      >
                        View Project & Gallery <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
};
