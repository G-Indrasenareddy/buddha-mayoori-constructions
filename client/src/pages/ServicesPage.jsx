import React, { useEffect, useState } from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ServiceCard } from '../components/common/ServiceCard';
import { fetchServices } from '../services/api';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchServices();
      if (response && response.success && Array.isArray(response.data)) {
        setServices(response.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      setError(err.message || 'Unable to load service catalog from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <>
      <PageMeta
        title="Services"
        description="Civil construction, structural designing, building estimation, and renovation services offered by Buddha Mayoori Construction across Kerala."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Services & Engineering</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Services
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Comprehensive civil construction, structural designing, and estimation services across Kerala.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Showcase Grid */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Our Offerings"
            title="Service Catalog"
            subtitle="Full-spectrum civil construction and structural design services."
          />

          {loading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-3 text-xs text-slate-500 font-medium">Loading Service Catalog...</p>
            </div>
          ) : error ? (
            <div className="max-w-xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-sm font-semibold text-red-800 mb-3">⚠️ {error}</p>
              <Button variant="primary" size="sm" onClick={loadServices}>
                Retry Loading Services
              </Button>
            </div>
          ) : services.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
              No services currently available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.serviceId || service.id || service._id} service={service} index={index} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
};
