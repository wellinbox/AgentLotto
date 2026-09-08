import { Server, Database, Shield, Globe, Layers, Zap } from 'lucide-react';

export default function SectionOverview() {
  return (
    <div className="space-y-6">
      {/* Architecture Diagram */}
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-4">System Architecture — Layered Design</h3>
        <div className="flex flex-col items-center gap-2 py-4">
          {[
            { label: 'Frontend (Next.js + React + TypeScript)', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30' },
            { label: 'API Gateway (Nginx + Rate Limiting)', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30' },
            { label: 'Authentication Layer (Sanctum + 2FA)', color: 'from-violet-500/20 to-violet-500/5', border: 'border-violet-500/30' },
            { label: 'Authorization / Scope Engine (RBAC + Hierarchy)', color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/30' },
            { label: 'Application Services (Controllers → DTOs → Services)', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30' },
            { label: 'Domain Services (Betting, Settlement, Commission, Credit)', color: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/30' },
            { label: 'Repositories / ORM (Eloquent + Query Builder)', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30' },
            { label: 'Data Layer (MySQL 8 + Redis + Queue)', color: 'from-violet-500/20 to-violet-500/5', border: 'border-violet-500/30' },
          ].map((layer, i) => (
            <div key={i} className="w-full max-w-lg">
              <div className={`bg-gradient-to-r ${layer.color} border ${layer.border} rounded-lg px-4 py-3 text-center text-sm font-medium text-white`}>
                {layer.label}
              </div>
              {i < 7 && <div className="text-center text-slate-600 text-xs py-1">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Design Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="section-card">
          <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
            <Shield size={14} /> Core Design Principles
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {[
              'Domain-Driven Design with bounded contexts',
              'Immutable financial ledger — never modify, always append',
              'DECIMAL arithmetic for all financial calculations',
              'Server-side authorization — never trust client',
              'Idempotency for all financial operations',
              'Atomic database transactions for money movement',
              'Scope-based data isolation (GLOBAL/DOWNLINE/SELF)',
              'Rate versioning — historical reproducibility',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <Zap size={14} /> Technology Stack
          </h3>
          <div className="space-y-3">
            {[
              { category: 'Backend', items: 'PHP 8.3+, Laravel 12+, MySQL 8+, Redis' },
              { category: 'Frontend', items: 'Next.js 14+, React 18+, TypeScript, Tailwind CSS' },
              { category: 'Auth', items: 'Laravel Sanctum, Argon2id, Optional 2FA (TOTP)' },
              { category: 'Queue', items: 'Laravel Queue (Redis driver), Horizon' },
              { category: 'Infra', items: 'Docker, Nginx, PHP-FPM, Cloudflare' },
              { category: 'Testing', items: 'Pest/PHPUnit, Playwright, PHPStan' },
            ].map((tech, i) => (
              <div key={i}>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">{tech.category}</span>
                <p className="text-sm text-slate-300">{tech.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separation of Concerns */}
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-4">Separation of Core Concepts</h3>
        <p className="text-sm text-slate-400 mb-4">
          The system explicitly separates 19 distinct concepts. No single table combines unrelated concerns.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {[
            'User', 'Role', 'Hierarchy', 'Permission', 'Financial Profile',
            'Betting Profile', 'Product', 'Draw', 'Betting Type', 'Rate',
            'Limit', 'Credit', 'Ledger', 'Exposure', 'Bet Transaction',
            'Result', 'Settlement', 'Commission', 'Audit Log'
          ].map((concept, i) => (
            <div key={i} className="px-3 py-2 rounded-md bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 text-center">
              {concept}
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Diagram */}
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server size={16} className="text-cyan-400" />
          Deployment Architecture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-cyan-400" />
              <span className="text-sm font-medium text-white">Edge / CDN</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Cloudflare (DNS + WAF)</li>
              <li>• SSL/TLS termination</li>
              <li>• DDoS protection</li>
              <li>• Rate limiting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-emerald-400" />
              <span className="text-sm font-medium text-white">Application</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Nginx (reverse proxy)</li>
              <li>• Next.js (SSR + API routes)</li>
              <li>• Laravel API (PHP-FPM)</li>
              <li>• Queue Workers (Horizon)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Database size={14} className="text-violet-400" />
              <span className="text-sm font-medium text-white">Data</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• MySQL 8+ (primary DB)</li>
              <li>• Redis (cache + queue)</li>
              <li>• Automated backups</li>
              <li>• Point-in-time recovery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
