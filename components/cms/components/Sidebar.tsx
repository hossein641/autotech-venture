// components/cms/components/Sidebar.tsx
import React from 'react';
import { BarChart3, Edit, Tag, Users, Settings, LogOut } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentUser: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentUser, 
  currentView, 
  onViewChange, 
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'posts', label: 'Posts', icon: Edit },
    { id: 'categories', label: 'Categories & Tags', icon: Tag },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-900">AutoTech CMS</h1>
        <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-left rounded-md mb-1 transition-colors ${
                currentView === item.id
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} className="mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <LogOut size={18} className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
