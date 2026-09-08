import { UserRole } from '../types';
import { Shield, Crown, Briefcase, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const roles: { role: UserRole; label: string; description: string; icon: typeof Shield; color: string }[] = [
    { role: 'supersenior', label: 'Supersenior', description: 'Full system control & configuration', icon: Crown, color: 'from-red-500 to-orange-500' },
    { role: 'master', label: 'Master', description: 'Manage agents & downstream operations', icon: Shield, color: 'from-blue-500 to-indigo-500' },
    { role: 'agent', label: 'Agent', description: 'Manage members & betting profiles', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
    { role: 'member', label: 'Member', description: 'Place bets & view results', icon: User, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">LMS Platform</h1>
          </div>
          <p className="text-slate-400 text-lg">Multi-Level Agent Lottery Management & Settlement Platform</p>
          <p className="text-slate-500 text-sm mt-2">Phase 1 — Architecture & UI Demonstration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map(({ role, label, description, icon: Icon, color }) => (
            <button
              key={role}
              onClick={() => onLogin(role)}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{label}</h3>
              <p className="text-slate-400 text-sm">{description}</p>
              <div className="mt-4 text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                Click to login as {label} →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2">
            <span className="text-yellow-400 text-xs">⚠️</span>
            <p className="text-yellow-400/80 text-xs">
              Demo Mode — Subject to applicable licenses, regulations, KYC/AML, age restrictions & jurisdictional rules
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
