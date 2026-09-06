import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import * as Icons from 'lucide-react';

export const ServiceCard = ({ service, index }) => {
  // Dynamically map Lucide icon or fallback to Building2
  const IconComponent = Icons[service.iconName] || Icons.Building2;

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full border-slate-200">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-300">
            <IconComponent className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            0{index + 1}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link to={`/request-a-quote?service=${encodeURIComponent(service.title)}`}>
          <Button variant="ghost" size="sm" className="w-full text-amber-700 hover:text-amber-800 hover:bg-amber-50 justify-between">
            <span>Request a Building Estimate</span>
            <span aria-hidden="true">→</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
};
