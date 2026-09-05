import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { CONTACT_INFO } from '../utils/constants';

export const ContactPage = () => {
  return (
    <>
      <PageMeta title="Contact Us" description="Contact directory for Buddha Mayoori Constructions." />
      <Section background="default">
        <Container>
          <SectionHeading
            badgeText="Contact — Route Verified"
            title="Contact Us"
            subtitle="Verified contact directory."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <h3 className="font-bold text-slate-900 mb-2">Phone Contacts</h3>
              {CONTACT_INFO.phones.map((p, idx) => (
                <p key={idx} className="text-sm text-slate-700">📞 <a href={`tel:${p.raw}`} className="hover:text-amber-600 font-medium">{p.display}</a></p>
              ))}
            </Card>

            <Card>
              <h3 className="font-bold text-slate-900 mb-2">Equal Emails</h3>
              {CONTACT_INFO.emails.map((e, idx) => (
                <p key={idx} className="text-sm text-slate-700">✉️ <a href={`mailto:${e.address}`} className="hover:text-amber-600 font-medium">{e.address}</a></p>
              ))}
            </Card>
          </div>
          <Card className="bg-slate-100">
            <p className="text-sm text-slate-700">
              Route resolution verified for <code>/contact</code>. Full interactive Building Estimate Request Form belongs to Phase 04.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
