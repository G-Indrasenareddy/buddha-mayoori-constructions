import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { fetchProjectBySlug } from '../services/api';
import { MapPin, Calendar, ArrowLeft, Camera, ZoomIn, Tag } from 'lucide-react';
import { ImageLightbox } from '../components/common/ImageLightbox';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError('');
        const response = await fetchProjectBySlug(slug);
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
  }, [slug]);

  // Construct unified gallery array for lightbox and photo grid
  const galleryList = [];
  if (project) {
    const coverUrl = typeof project.coverImage === 'string' ? project.coverImage : project.coverImage?.url;
    if (coverUrl) {
      galleryList.push({
        url: coverUrl,
        caption: `${project.title} - Main Cover Photograph`,
        category: 'Hero Cover',
      });
    }

    if (Array.isArray(project.galleryImages)) {
      project.galleryImages.forEach((img) => {
        const imgUrl = typeof img === 'string' ? img : img.url;
        if (imgUrl) {
          galleryList.push({
            url: imgUrl,
            caption: typeof img === 'object' ? img.caption || '' : '',
            category: typeof img === 'object' ? img.category || 'Site Photo' : 'Site Photo',
          });
        }
      });
    }
  }

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <PageMeta
        title={`Project - ${project?.title || slug || 'Showcase'}`}
        description="Project Showcase Detail & Photo Gallery — Buddha Mayoori Construction."
      />

      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="amber">Project Detail</Badge>
              {project && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {project.status === 'ONGOING' ? '🏗️ ONGOING CONSTRUCTION' : '✓ COMPLETED PROJECT'}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {project ? project.title : `Project Record: ${slug || 'Detail View'}`}
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
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-white border-slate-200 p-6 sm:p-8 space-y-6">
                {/* Meta Information Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber">{project.category}</Badge>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {project.status === 'ONGOING' ? '🏗️ Ongoing Work' : '✓ Completed Work'}
                    </span>
                  </div>

                  {project.status === 'COMPLETED' && project.completionYear && (
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> Completion Year: {project.completionYear}
                    </span>
                  )}
                </div>

                {/* Hero Cover Photograph */}
                {galleryList.length > 0 && (
                  <div
                    onClick={() => handleOpenLightbox(0)}
                    className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 max-h-96 cursor-pointer group shadow-sm"
                  >
                    <img
                      src={galleryList[0].url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs gap-1.5">
                      <ZoomIn className="w-5 h-5" /> Click to view full image
                    </div>
                  </div>
                )}

                {/* Project Overview */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Short Overview</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{project.shortDescription}</p>
                </div>

                {/* Detailed Specifications */}
                {project.fullDescription && (
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Project Specifications & Scope</h3>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
                  </div>
                )}

                {/* Project Site Photography Gallery Grid */}
                {galleryList.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-amber-600" /> Site Construction Photographs ({galleryList.length})
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">Click thumbnail to enlarge</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {galleryList.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleOpenLightbox(idx)}
                          className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 cursor-pointer group shadow-xs hover:shadow-md transition-all"
                        >
                          <img
                            src={item.url}
                            alt={item.caption || `Site Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                            <ZoomIn className="w-5 h-5 mb-1 text-amber-400" />
                            <span className="text-[10px] font-semibold">View Photo</span>
                          </div>
                          {item.category && (
                            <div className="absolute bottom-1 left-1 right-1">
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-slate-800 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 backdrop-blur-xs truncate max-w-full">
                                <Tag className="w-2.5 h-2.5 text-amber-600 shrink-0" /> {item.category}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back Button */}
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
                Detailed specifications and site photography for project <code>{slug}</code> will be displayed here once verified by Buddha Mayoori Construction.
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

      {/* Lightbox Modal */}
      <ImageLightbox
        images={galleryList}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
};
