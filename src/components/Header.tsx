import { useAuth } from '../App';
import { Menu, Bell, LogOut, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();

  const roleColors: Record<string, string> = {
    supersenior: 'bg-red-100 text-red-700',
    master: 'bg-blue-100 text-blue-700',
    agent: 'bg-purple-100 text-purple-700',
    member: 'bg-green-100 text-green-700',
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.role === 'supersenior' ? 'Supersenior' :
             user?.role === 'master' ? 'Master' :
             user?.role === 'agent' ? 'Agent' : 'Member'} Control Panel
          </h2>
          <p className="text-xs text-gray-500">Multi-Level Agent Lottery Management & Settlement Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative text-gray-500 hover:text-gray-700 p-2">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">{user?.displayName}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleColors[user?.role || 'member']}`}>
              {user?.role}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors px-2 py-1"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
