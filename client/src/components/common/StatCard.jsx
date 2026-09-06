import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const StatCard = ({ label, value, unit, description, status, type }) => {
  const isVerificationRequired = status === 'REQUIRES_FINAL_BUSINESS_VERIFICATION';

  return (
    <Card hoverEffect className="text-center flex flex-col justify-between h-full border-slate-200">
      <div>
        <div className="mb-2">
          <Badge variant={isVerificationRequired ? 'amber' : 'navy'}>
            {isVerificationRequired ? 'REQUIRES FINAL BUSINESS VERIFICATION' : 'Business-provided claim'}
          </Badge>
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight my-2">
          {value}
        </div>
        <div className="text-base font-bold text-slate-800">
          {label}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        Status: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px]">{status}</code>
      </div>
    </Card>
  );
};
