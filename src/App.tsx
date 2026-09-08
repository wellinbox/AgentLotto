import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Database, Shield, Layers, CreditCard, TrendingUp,
  Target, Calculator, Lock, Globe, Monitor, Server, AlertTriangle,
  CheckCircle2, Map, ChevronRight, Menu, X, FileText, BookOpen
} from 'lucide-react';
import SectionOverview from './sections/SectionOverview';
import SectionModules from './sections/SectionModules';
import SectionData from './sections/SectionData';
import SectionHierarchy from './sections/SectionHierarchy';
import SectionFinancial from './sections/SectionFinancial';
import SectionRate from './sections/SectionRate';
import SectionBetting from './sections/SectionBetting';
import SectionSettlement from './sections/SectionSettlement';
import SectionSecurity from './sections/SectionSecurity';
import SectionAPI from './sections/SectionAPI';
import SectionFrontend from './sections/SectionFrontend';
import SectionInfrastructure from './sections/SectionInfrastructure';
import SectionDecisions from './sections/SectionDecisions';
import SectionRoadmap from './sections/SectionRoadmap';

const sections = [
  { id: 'overview', label: '1. Architecture Overview', icon: LayoutDashboard },
  { id: 'modules', label: '2. Major Modules', icon: Layers },
  { id: 'data', label: '3. Data Architecture', icon: Database },
  { id: 'hierarchy', label: '4. Hierarchy Architecture', icon: Map },
  { id: 'financial', label: '5. Financial Architecture', icon: CreditCard },
  { id: 'rate', label: '6. Rate Architecture', icon: TrendingUp },
  { id: 'betting', label: '7. Betting Architecture', icon: Target },
  { id: 'settlement', label: '8. Settlement Architecture', icon: Calculator },
  { id: 'security', label: '9. Security Architecture', icon: Shield },
  { id: 'api', label: '10. API Architecture', icon: Globe },
  { id: 'frontend', label: '11. Frontend Architecture', icon: Monitor },
  { id: 'infrastructure', label: '12. Infrastructure', icon: Server },
  { id: 'decisions', label: '13. Key Decisions', icon: CheckCircle2 },
  { id: 'roadmap', label: '14. Implementation Roadmap', icon: BookOpen },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id)
      }));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    const content = document.getElementById('main-content');
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setSidebarOpen(false);
    }
  };

  const renderSection = (id: string) => {
    switch (id) {
      case 'overview': return <SectionOverview />;
      case 'modules': return <SectionModules />;
      case 'data': return <SectionData />;
      case 'hierarchy': return <SectionHierarchy />;
      case 'financial': return <SectionFinancial />;
      case 'rate': return <SectionRate />;
      case 'betting': return <SectionBetting />;
      case 'settlement': return <SectionSettlement />;
      case 'security': return <SectionSecurity />;
      case 'api': return <SectionAPI />;
      case 'frontend': return <SectionFrontend />;
      case 'infrastructure': return <SectionInfrastructure />;
      case 'decisions': return <SectionDecisions />;
      case 'roadmap': return <SectionRoadmap />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Phase 1</h1>
              <p className="text-[11px] text-slate-400">Technical Specification</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-0.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13px] transition-all ${
                    isActive
                      ? 'nav-active font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-emerald-400' : ''} />
                  <span className="truncate">{section.label}</span>
                  {isActive && <ChevronRight size={12} className="ml-auto text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-[11px] text-amber-400/80">Awaiting approval for Phase 2</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center px-4 lg:px-6 gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2">
            <span className="badge badge-emerald">PHASE 1</span>
            <span className="text-sm text-slate-300 font-medium">System Architecture & Technical Specification</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:block">v2.0 — Production Specification</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              SA
            </div>
          </div>
        </header>

        {/* Content */}
        <main id="main-content" className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-16">
            {/* Hero */}
            <div className="text-center py-8 lg:py-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Lock size={12} className="text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">CONFIDENTIAL — FOR ARCHITECTURE REVIEW</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Multi-Level Agent Lottery<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Management & Settlement Platform
                </span>
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
                Complete Phase 1 Technical Specification covering system architecture, domain model, 
                database design, security model, API architecture, and implementation roadmap.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <div className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Stack</span>
                  <span className="text-xs font-medium text-white">Laravel 12 + Next.js + MySQL 8</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Architecture</span>
                  <span className="text-xs font-medium text-white">Domain-Driven + RBAC + Scope</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Financial</span>
                  <span className="text-xs font-medium text-white">Immutable Ledger + DECIMAL</span>
                </div>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <section.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{section.label}</h2>
                  </div>
                </div>
                {renderSection(section.id)}
              </section>
            ))}

            {/* Footer */}
            <div className="border-t border-slate-800 pt-8 pb-12 text-center">
              <p className="text-sm text-slate-500">
                Phase 1 — System Architecture & Technical Specification
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Awaiting explicit approval before proceeding to Phase 2 (Database Implementation)
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
