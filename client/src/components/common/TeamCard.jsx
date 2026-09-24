import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const TeamCard = ({ member }) => {
  return (
    <Card hoverEffect className="flex flex-col justify-between h-full border-slate-200">
      <div>
        {/* Neutral Professional Avatar Placeholder */}
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xl mb-4 border border-amber-300">
          {member.name ? member.name.charAt(0).toUpperCase() : 'T'}
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {member.name}
        </h3>

        <p className="text-sm font-semibold text-amber-800 mt-1">
          {member.role}
        </p>

        {member.location && (
          <p className="text-xs text-slate-600 mt-2 flex items-center gap-1 font-medium">
            <span>📍 Region:</span>
            <span className="text-slate-900 font-semibold">{member.location}</span>
          </p>
        )}
      </div>
    </Card>
  );
};
