import { useState, createContext, useContext } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AgentTree from './pages/AgentTree';
import BettingInterface from './pages/BettingInterface';
import Transactions from './pages/Transactions';
import Settlements from './pages/Settlements';
import Rates from './pages/Rates';
import Credit from './pages/Credit';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Architecture from './pages/Architecture';
import AuditLogs from './pages/AuditLogs';

interface AuthContextType {
  user: { id: string; displayName: string; role: UserRole } | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState<{ id: string; displayName: string; role: UserRole } | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = (role: UserRole) => {
    const users: Record<UserRole, { id: string; displayName: string }> = {
      supersenior: { id: 'SS-001', displayName: 'System Operator' },
      master: { id: 'MS-001', displayName: 'Master Alpha' },
      agent: { id: 'AG-001', displayName: 'Agent A1' },
      member: { id: 'MB-001', displayName: 'Player One' },
    };
    setUser({ ...users[role], role });
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'agents': return <AgentTree />;
      case 'betting': return <BettingInterface />;
      case 'transactions': return <Transactions />;
      case 'settlements': return <Settlements />;
      case 'rates': return <Rates />;
      case 'credit': return <Credit />;
      case 'products': return <Products />;
      case 'reports': return <Reports />;
      case 'architecture': return <Architecture />;
      case 'audit': return <AuditLogs />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
