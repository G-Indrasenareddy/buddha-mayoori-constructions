import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { User } from 'lucide-react';
import jaikumarImg from '../../assets/jaikumar-ramachandran.jpg';

export const TeamCard = ({ member }) => {
  const [imageError, setImageError] = useState(false);

  // Determine avatar source:
  // 1. If Jayakumar Ramachandran, use static asset jaikumar-ramachandran.jpg
  // 2. If member.avatar is set and not default placeholder, use member.avatar
  let avatarSrc = null;
  if (
    member.memberId === 'jayakumar-ramachandran' ||
    (member.name && member.name.toLowerCase().includes('jayakumar ramachandran'))
  ) {
    avatarSrc = jaikumarImg;
  } else if (
    member.avatar &&
    member.avatar !== '/assets/team-placeholder.jpg' &&
    member.avatar.trim() !== ''
  ) {
    avatarSrc = member.avatar;
  }

  const showFallback = !avatarSrc || imageError;

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full border-slate-200">
      <div>
        {/* Real Circular Profile Photo or SVG Fallback */}
        <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center border-2 border-amber-500/30 shadow-xs overflow-hidden bg-slate-100 shrink-0">
          {!showFallback ? (
            <img
              src={avatarSrc}
              alt={member.name || 'Team Member'}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <User className="w-8 h-8 text-slate-400" />
            </div>
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
            <span>📍 Region:</span>
            <span className="text-slate-900 font-semibold">{member.location}</span>
          </p>
        )}
      </div>
    </Card>
  );
};

