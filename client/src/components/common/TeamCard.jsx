import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const TeamCard = ({ member }) => {
  const isPendingName = member.isPendingName;

  return (
    <Card hoverEffect className={`flex flex-col justify-between h-full ${isPendingName ? 'border-dashed border-amber-300 bg-amber-50/50' : 'border-slate-200'}`}>
      <div>
        {/* Neutral Professional Avatar Placeholder */}
        <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xl mb-4 border border-slate-300">
          {isPendingName ? '⚡' : member.name.charAt(0)}
        </div>

        <div className="mb-2">
          {isPendingName ? (
            <Badge variant="amber">Name to be confirmed</Badge>
          ) : (
            <Badge variant="gray">Confirmed Team Member</Badge>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {member.name}
        </h3>

        <p className="text-sm font-semibold text-amber-800 mt-1">
          {member.role}
        </p>

        {member.location && (
          <p className="text-xs text-slate-600 mt-2 flex items-center gap-1 font-medium">
            <span>📍 Location / Region:</span>
            <span className="text-slate-900 font-semibold">{member.location}</span>
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
        Status: <code className="bg-slate-100 px-1 py-0.5 rounded">{member.status}</code>
      </div>
    </Card>
  );
};
