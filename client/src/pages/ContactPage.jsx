import React from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { InquiryForm } from '../components/forms/InquiryForm';
import { CONTACT_INFO } from '../utils/constants';

export const ContactPage = () => {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Contact directory for Buddha Mayoori Constructions — Phones, WhatsApp, Email, & Location."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Get in Touch</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Contact Directory
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Reach out to Buddha Mayoori Constructions via phone, WhatsApp, email, or inquiry form.
            </p>
          </div>
        </Container>
      </Section>

      {/* Directory Grid */}
      <Section background="default" padding="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Phone Directory Card */}
            <Card hoverEffect>
              <div className="w-10 h-10 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg mb-3">
                📞
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3">Direct Phone Contacts</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {CONTACT_INFO.phones.map((phone, idx) => (
                  <li key={idx}>
                    <a href={`tel:${phone.raw}`} className="hover:text-amber-700 font-semibold block">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Dual WhatsApp Card */}
            <Card hoverEffect>
              <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-lg mb-3">
                💬
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3">WhatsApp Direct Contacts</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {CONTACT_INFO.whatsapp.map((wa, idx) => (
                  <li key={idx}>
                    <a
                      href={`https://wa.me/${wa.raw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-700 font-semibold text-emerald-800 block"
                    >
                      WhatsApp: {wa.display} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Equal Email Card */}
            <Card hoverEffect>
              <div className="w-10 h-10 rounded bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-lg mb-3">
                ✉️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3">Equal Email Directory</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {CONTACT_INFO.emails.map((email, idx) => (
                  <li key={idx}>
                    <a href={`mailto:${email.address}`} className="hover:text-amber-700 font-semibold block break-all">
                      {email.address}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Location & Working Sites Card */}
          <Card className="mb-12 bg-white">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Location & Service Reach</h3>
            <p className="text-sm font-semibold text-slate-800 mb-3">
              📍 Primary Location: <span className="text-amber-800 font-bold">{CONTACT_INFO.location.primary}</span>
            </p>
            <div className="p-4 bg-slate-50 rounded border border-slate-200 mb-3">
              <p className="text-xs font-semibold text-slate-700 mb-2">
                {CONTACT_INFO.location.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {CONTACT_INFO.location.sites.map((site, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800">
                    📍 {site}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              Note: Branch vs active working-site classification requires business confirmation.
            </p>
          </Card>

          {/* Building Estimate Request Form Container */}
          <div id="estimate-form" className="max-w-3xl mx-auto">
            <InquiryForm />
          </div>
        </Container>
      </Section>
    </>
  );
};
