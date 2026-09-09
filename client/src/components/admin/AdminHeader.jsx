import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between shadow-xs">
      <div>
        <h1 className="text-sm font-bold text-slate-800">Website Management Console</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 border-r border-slate-200 pr-4">
          <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600">
            <UserIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{user?.username || 'Admin'}</span>
            <span className="text-[10px] text-slate-500 block leading-tight">{user?.email}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="text-xs flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </Button>
      </div>
    </header>
  );
};
