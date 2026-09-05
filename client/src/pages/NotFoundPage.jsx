import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <>
      <PageMeta title="404 - Page Not Found" description="The requested page could not be found." />
      <Section background="white" padding="large">
        <Container className="text-center py-12">
          <span className="text-6xl font-extrabold text-amber-600 block mb-4">404</span>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Page Not Found</h1>
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="md">
              Return to Home Page
            </Button>
          </Link>
        </Container>
      </Section>
    </>
  );
};
