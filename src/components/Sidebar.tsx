import { useAuth } from '../App';
import { LayoutDashboard, Users, Gamepad2, Receipt, Calculator, Percent, Wallet, Package, BarChart3, Shield, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onToggle }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['supersenior', 'master', 'agent', 'member'] },
    ];

    const superseniorItems = [
      { id: 'agents', label: 'Agent Hierarchy', icon: Users, roles: ['supersenior', 'master'] },
      { id: 'products', label: 'Products & Draws', icon: Package, roles: ['supersenior', 'master'] },
      { id: 'rates', label: 'Rate Management', icon: Percent, roles: ['supersenior', 'master', 'agent'] },
      { id: 'credit', label: 'Credit & Ledger', icon: Wallet, roles: ['supersenior', 'master', 'agent'] },
      { id: 'transactions', label: 'Transactions', icon: Receipt, roles: ['supersenior', 'master', 'agent'] },
      { id: 'settlements', label: 'Settlements', icon: Calculator, roles: ['supersenior', 'master'] },
      { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['supersenior', 'master', 'agent'] },
      { id: 'audit', label: 'Audit Logs', icon: Shield, roles: ['supersenior'] },
      { id: 'architecture', label: 'Architecture', icon: FileText, roles: ['supersenior'] },
    ];

    const agentItems = [
      { id: 'agents', label: 'Members', icon: Users, roles: ['agent'] },
      { id: 'transactions', label: 'Transactions', icon: Receipt, roles: ['agent'] },
      { id: 'rates', label: 'Rates', icon: Percent, roles: ['agent'] },
      { id: 'credit', label: 'Credit', icon: Wallet, roles: ['agent'] },
      { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['agent'] },
    ];

    const memberItems = [
      { id: 'betting', label: 'Place Bet', icon: Gamepad2, roles: ['member'] },
      { id: 'transactions', label: 'My Bets', icon: Receipt, roles: ['member'] },
      { id: 'credit', label: 'Wallet', icon: Wallet, roles: ['member'] },
    ];

    if (user?.role === 'supersenior') return [...baseItems, ...superseniorItems];
    if (user?.role === 'master') return [...baseItems, ...superseniorItems.filter(i => i.roles.includes('master'))];
    if (user?.role === 'agent') return [...baseItems, ...agentItems];
    return [...baseItems, ...memberItems];
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-16'} bg-slate-900 text-white flex flex-col transition-all duration-300 relative`}>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <div>
            <h1 className="text-lg font-bold text-emerald-400">LMS Platform</h1>
            <p className="text-xs text-slate-400">Lottery Management</p>
          </div>
        )}
        <button onClick={onToggle} className="text-slate-400 hover:text-white p-1">
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-600/20 text-emerald-400 border-r-2 border-emerald-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400">
            <p className="font-medium text-slate-200">{user?.displayName}</p>
            <p className="capitalize">{user?.role}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
