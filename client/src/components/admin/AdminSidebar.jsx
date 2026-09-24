import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Wrench, Users, MessageSquare, ExternalLink, Star } from 'lucide-react';
import logoImg from '../../assets/buddha-mayoori-logo.jpg';

export const AdminSidebar = () => {
  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/enquiries', label: 'Enquiries & Quotes', icon: MessageSquare },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { to: '/admin/reviews', label: 'Customer Reviews', icon: Star },
    { to: '/admin/services', label: 'Canonical Services', icon: Wrench },
    { to: '/admin/team', label: 'Team Roster', icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <img
          src={logoImg}
          alt="Buddha Mayoori Construction Logo"
          className="h-10 w-10 object-contain rounded bg-white p-0.5 border border-slate-700"
        />
        <div>
          <h2 className="text-sm font-bold text-white leading-tight">Buddha Mayoori</h2>
          <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Admin Management</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Public Site Link */}
      <div className="p-3 border-t border-slate-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Public Website</span>
        </a>
      </div>
    </aside>
  );
};
