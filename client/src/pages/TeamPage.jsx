import React, { useEffect, useState } from 'react';
import { PageMeta } from '../components/common/PageMeta';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { TeamCard } from '../components/common/TeamCard';
import { fetchTeam } from '../services/api';

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchTeam();
      if (response && response.success && Array.isArray(response.data)) {
        setTeam(response.data);
      } else {
        setTeam([]);
      }
    } catch (err) {
      setError(err.message || 'Unable to load team roster from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <>
      <PageMeta
        title="Team"
        description="Business-provided team roster for Buddha Mayoori Constructions."
      />

      {/* Header Banner */}
      <Section background="dark" padding="compact">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="amber" className="mb-2">Personnel</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Team Roster
            </h1>
            <p className="mt-2 text-slate-300 text-base">
              Business-provided personnel roster and department heads.
            </p>
          </div>
        </Container>
      </Section>

      {/* Full Team Roster Grid */}
      <Section background="default" padding="default">
        <Container>
          <SectionHeading
            badgeText="Complete Roster"
            title="Leadership, Consultants & Department Leads"
            subtitle="Business-provided team roster, with individual roles only where confirmed."
          />

          {loading ? (
            <div className="py-12 text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-3 text-xs text-slate-500 font-medium">Loading Team Roster...</p>
            </div>
          ) : error ? (
            <div className="max-w-xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-sm font-semibold text-red-800 mb-3">⚠️ {error}</p>
              <Button variant="primary" size="sm" onClick={loadTeam}>
                Retry Loading Team
              </Button>
            </div>
          ) : team.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg border border-slate-200 text-xs text-slate-500">
              No team roster members currently available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <TeamCard key={member.memberId || member.id || member._id} member={member} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Workforce Tribute Banner */}
      <Section background="white" padding="default">
        <Container>
          <Card className="bg-slate-900 text-white p-8 text-center border-slate-800">
            <Badge variant="amber" className="mb-3">Workforce Claim</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Over 100+ Experienced Labours
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto">
              Our projects across Kerala are supported by a dedicated workforce of over 100+ experienced labours, skilled tradesmen, and site supervisors.
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
};
