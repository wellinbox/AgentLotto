import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FolderTree, CheckCircle2, AlertTriangle, Shield,
  Database, Lock, DollarSign, GitBranch, Map, AlertOctagon,
  Settings, ArrowRight, Menu, X, FileText, Server, Code,
  ChevronRight, ExternalLink, Clock, Users, Layers, Target
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const sections = [
  { id: 'overview', label: 'Executive Summary', icon: LayoutDashboard },
  { id: 'architecture', label: '1. Current Architecture', icon: Layers },
  { id: 'structure', label: '2. Project Structure', icon: FolderTree },
  { id: 'existing', label: '3. Existing Features', icon: CheckCircle2 },
  { id: 'missing', label: '4. Missing Features', icon: AlertTriangle },
  { id: 'conflicts', label: '5. Architecture Conflicts', icon: GitBranch },
  { id: 'database', label: '6. Database Gaps', icon: Database },
  { id: 'security', label: '7. Security Gaps', icon: Shield },
  { id: 'financial', label: '8. Financial Integrity Risks', icon: DollarSign },
  { id: 'dependencies', label: '9. Implementation Dependencies', icon: GitBranch },
  { id: 'roadmap', label: '10. Phase-by-Phase Plan', icon: Map },
  { id: 'risks', label: '11. Risks', icon: AlertOctagon },
  { id: 'changes', label: '12. Recommended Changes', icon: Settings },
  { id: 'actions', label: '13. Next Actions', icon: ArrowRight },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Badge({ variant, children }: { variant: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
      variant === 'critical' ? 'badge-critical' :
      variant === 'high' ? 'badge-high' :
      variant === 'medium' ? 'badge-medium' :
      variant === 'low' ? 'badge-low' :
      variant === 'complete' ? 'badge-complete' :
      variant === 'pending' ? 'badge-pending' :
      variant === 'in-progress' ? 'badge-in-progress' :
      'badge-blocked'
    }`}>
      {children}
    </span>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`section-card ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ num, title, subtitle }: { num?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      {num && <span className="text-xs text-brand-400 font-mono tracking-wider">SECTION {num}</span>}
      <h2 className="text-2xl font-bold text-white mt-1">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div id="overview" className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-brand-950/50 to-slate-900/50 border border-brand-800/30 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <FileText size={20} className="text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">PHASE 1 — Repository & Architecture Verification</h1>
            <p className="text-sm text-slate-400">Multi-Level Agent Lottery Management & Settlement Platform</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">
          This report provides a comprehensive gap analysis between the current repository state and the 
          approved V2 Technical Specification. It identifies what exists, what is missing, and provides 
          a detailed implementation plan for building the production-ready system.
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Backend', status: 'NOT STARTED', pct: 0, color: 'bg-slate-600' },
          { label: 'Database', status: 'NOT STARTED', pct: 0, color: 'bg-slate-600' },
          { label: 'Frontend', status: 'SPEC ONLY', pct: 15, color: 'bg-amber-500' },
          { label: 'Infrastructure', status: 'NOT STARTED', pct: 0, color: 'bg-slate-600' },
        ].map((item, i) => (
          <Card key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-300">{item.label}</span>
              <Badge variant={item.pct === 0 ? 'pending' : 'medium'}>{item.status}</Badge>
            </div>
            <div className="progress-bar">
              <div className={`progress-fill ${item.color}`} style={{ width: `${item.pct}%` }} />
            </div>
            <span className="text-xs text-slate-500 mt-1">{item.pct}% complete</span>
          </Card>
        ))}
      </div>

      {/* Key Findings */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertOctagon size={18} className="text-amber-400" />
          Key Findings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-red-400">🔴 Critical Gaps</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2"><span className="text-red-400">•</span> No Laravel backend exists</li>
              <li className="flex items-start gap-2"><span className="text-red-400">•</span> No database migrations</li>
              <li className="flex items-start gap-2"><span className="text-red-400">•</span> No authentication system</li>
              <li className="flex items-start gap-2"><span className="text-red-400">•</span> No API endpoints</li>
              <li className="flex items-start gap-2"><span className="text-red-400">•</span> No Docker configuration</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">🟢 What Exists</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> V2 Technical Specification (complete)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> React/Vite/Tailwind project scaffold</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Architecture documentation site</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Database schema design (documented)</li>
              <li className="flex items-start gap-2"><span className="text-emerald-400">•</span> Technology decisions finalized</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Verdict */}
      <Card className="border-amber-500/30!">
        <h3 className="text-lg font-semibold text-amber-400 mb-3">⚠️ Repository Assessment</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The repository currently contains <strong className="text-white">only the frontend documentation site</strong> for the V2 Technical 
          Specification. <strong className="text-white">No application code exists</strong> — no backend, no database, no API, no authentication, 
          no Docker configuration. The repository is essentially a blank canvas with excellent architectural planning. 
          The entire system must be built from scratch following the approved V2 specification.
        </p>
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-amber-200">
            <strong>Recommendation:</strong> Proceed with Phase 2 (Project Foundation) to establish the Laravel backend, 
            Next.js frontend, Docker environment, and database connectivity before implementing business logic.
          </p>
        </div>
      </Card>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div id="architecture" className="space-y-6 animate-fade-in">
      <SectionHeader num="01" title="Current Architecture" subtitle="What exists in the repository today" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Current State: Frontend Documentation Site Only</h3>
        <p className="text-sm text-slate-400 mb-4">
          The repository contains a React/Vite/Tailwind application that renders the V2 Technical Specification 
          as an interactive documentation website. This is purely a documentation/visualization artifact.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Frontend Stack (Exists)</h4>
            <ul className="space-y-1.5 text-sm text-slate-300">
              <li>✅ React 18 + TypeScript</li>
              <li>✅ Vite 6 build system</li>
              <li>✅ Tailwind CSS 4</li>
              <li>✅ Lucide React icons</li>
              <li>✅ Recharts (charts library)</li>
              <li>✅ Framer Motion (animations)</li>
              <li>✅ React Router DOM</li>
              <li>✅ date-fns</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-red-500/20">
            <h4 className="text-sm font-semibold text-red-400 mb-2">Backend Stack (Missing)</h4>
            <ul className="space-y-1.5 text-sm text-slate-300">
              <li>❌ PHP 8.3+ / Laravel 12+</li>
              <li>❌ Laravel Sanctum</li>
              <li>❌ MySQL 8+ connection</li>
              <li>❌ Redis connection</li>
              <li>❌ Queue workers</li>
              <li>❌ Scheduler</li>
              <li>❌ Nginx configuration</li>
              <li>❌ Docker setup</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">V2 Architecture vs Current Reality</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>V2 Specification</th>
                <th>Current State</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: 'Frontend', spec: 'Next.js + React + TypeScript + Tailwind', current: 'React + Vite + TypeScript + Tailwind', gap: 'Vite ≠ Next.js (SSR missing)' },
                { layer: 'API', spec: 'RESTful API v1 with 40+ endpoints', current: 'None', gap: 'Complete gap' },
                { layer: 'Authentication', spec: 'Laravel Sanctum + Argon2id + 2FA', current: 'None', gap: 'Complete gap' },
                { layer: 'Authorization', spec: 'RBAC + Scope-based + Hierarchy', current: 'None', gap: 'Complete gap' },
                { layer: 'Database', spec: 'MySQL 8+ with ~45 tables', current: 'None', gap: 'Complete gap' },
                { layer: 'Cache', spec: 'Redis for caching/queues', current: 'None', gap: 'Complete gap' },
                { layer: 'Queue', spec: 'Laravel Queue (Redis driver)', current: 'None', gap: 'Complete gap' },
                { layer: 'Infrastructure', spec: 'Docker + Nginx + PHP-FPM', current: 'None', gap: 'Complete gap' },
                { layer: 'Testing', spec: 'Pest/PHPUnit + Playwright', current: 'None', gap: 'Complete gap' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-medium text-white">{row.layer}</td>
                  <td className="text-slate-400">{row.spec}</td>
                  <td>{row.current === 'None' ? <Badge variant="critical">Missing</Badge> : <span className="text-amber-300">{row.current}</span>}</td>
                  <td><Badge variant={row.gap === 'Complete gap' ? 'critical' : 'high'}>{row.gap}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StructureSection() {
  return (
    <div id="structure" className="space-y-6 animate-fade-in">
      <SectionHeader num="02" title="Current Project Structure" subtitle="File tree and organization analysis" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Current File Tree</h3>
        <div className="code-block text-slate-300">
{`project-root/
├── index.html                    # Entry HTML (theme handling)
├── package.json                  # Dependencies (React/Vite/Tailwind)
├── package-lock.json
├── tsconfig.json                 # TypeScript configuration
├── vite.config.js                # Vite build configuration
└── src/
    ├── main.tsx                  # React entry point
    ├── App.tsx                   # Main app with sidebar navigation
    ├── index.css                 # Tailwind + custom styles
    ├── types.ts                  # TypeScript type definitions
    └── sections/                 # Documentation sections (14 files)
        ├── SectionOverview.tsx
        ├── SectionModules.tsx
        ├── SectionData.tsx
        ├── SectionHierarchy.tsx
        ├── SectionFinancial.tsx
        ├── SectionRate.tsx
        ├── SectionBetting.tsx
        ├── SectionSettlement.tsx
        ├── SectionSecurity.tsx
        ├── SectionAPI.tsx
        ├── SectionFrontend.tsx
        ├── SectionInfrastructure.tsx
        ├── SectionDecisions.tsx
        └── SectionRoadmap.tsx`}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Required V2 Project Structure</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">Backend (Laravel) — TO BE CREATED</h4>
            <div className="code-block text-xs text-slate-300">
{`backend/
├── app/
│   ├── Domain/
│   │   ├── Identity/
│   │   ├── Organization/
│   │   ├── Hierarchy/
│   │   ├── Product/
│   │   ├── Draw/
│   │   ├── Betting/
│   │   ├── Rate/
│   │   ├── Credit/
│   │   ├── Ledger/
│   │   ├── Exposure/
│   │   ├── Result/
│   │   ├── Settlement/
│   │   ├── Commission/
│   │   ├── Reporting/
│   │   └── Audit/
│   ├── Application/
│   │   ├── Actions/
│   │   ├── Services/
│   │   ├── DTOs/
│   │   └── Queries/
│   ├── Infrastructure/
│   ├── Http/
│   ├── Models/
│   ├── Policies/
│   ├── Enums/
│   ├── Events/
│   ├── Listeners/
│   ├── Jobs/
│   └── Exceptions/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
├── config/
├── tests/
├── docker/
└── .env.example`}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 mb-2">Frontend (Next.js) — TO BE CREATED</h4>
            <div className="code-block text-xs text-slate-300">
{`frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/
│   │   │   ├── supersenior/
│   │   │   ├── master/
│   │   │   ├── agent/
│   │   │   └── member/
│   │   ├── finance/
│   │   ├── settlement/
│   │   └── admin/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── features/
│   ├── features/
│   ├── services/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── stores/
│   └── utils/
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js`}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ExistingSection() {
  return (
    <div id="existing" className="space-y-6 animate-fade-in">
      <SectionHeader num="03" title="Existing Features" subtitle="What has been implemented so far" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Implemented Components</h3>
        <div className="space-y-4">
          {[
            {
              name: 'Technical Specification Documentation',
              status: 'COMPLETE',
              desc: '14-section interactive documentation covering all V2 architecture decisions',
              details: ['Architecture overview', 'Module design', 'Database schema', 'Hierarchy model', 'Financial architecture', 'Rate engine', 'Betting engine', 'Settlement engine', 'Security model', 'API specification', 'Frontend architecture', 'Infrastructure design', 'Key decisions', 'Implementation roadmap']
            },
            {
              name: 'Database Schema Design (Documented)',
              status: 'COMPLETE',
              desc: 'Complete table definitions with columns, types, constraints, and indexes',
              details: ['users', 'hierarchy_nodes', 'hierarchy_paths', 'products', 'draws', 'betting_types', 'bets', 'financial_accounts', 'ledger_entries', 'rate_versions', 'rate_profile_items', 'settlements', 'commissions', 'audit_logs']
            },
            {
              name: 'Technology Decisions',
              status: 'COMPLETE',
              desc: 'All technology choices finalized and documented',
              details: ['Closure table for hierarchy', 'Ledger-derived balances', 'Rate versioning with snapshots', 'DECIMAL for all financial values', 'Server-side authorization', 'Idempotency for financial ops']
            },
            {
              name: 'React/Vite Project Scaffold',
              status: 'COMPLETE',
              desc: 'Basic React project with TypeScript, Tailwind CSS, and build configuration',
              details: ['package.json with dependencies', 'Vite configuration', 'TypeScript configuration', 'Tailwind CSS setup', 'Entry point and routing']
            },
          ].map((feature, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{feature.name}</h4>
                <Badge variant="complete">{feature.status}</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-2">{feature.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {feature.details.map((d, j) => (
                  <span key={j} className="text-[10px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-400 border border-slate-600/30">{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MissingSection() {
  return (
    <div id="missing" className="space-y-6 animate-fade-in">
      <SectionHeader num="04" title="Missing Features" subtitle="Complete gap analysis against V2 specification" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Missing by Category</h3>
        <div className="space-y-4">
          {[
            {
              category: 'Backend Infrastructure',
              severity: 'CRITICAL',
              items: [
                'Laravel 12+ project initialization',
                'PHP 8.3+ configuration',
                'MySQL 8+ database connection',
                'Redis connection and configuration',
                'Queue worker setup',
                'Scheduler configuration',
                'Health check endpoints',
                'Environment configuration (.env)',
                'Logging configuration',
              ]
            },
            {
              category: 'Database',
              severity: 'CRITICAL',
              items: [
                'All migration files (~45 tables)',
                'Model classes with relationships',
                'Seeders for roles, permissions, system config',
                'Factories for testing',
                'Database constraints and indexes',
                'ULID/UUID generation',
              ]
            },
            {
              category: 'Authentication & Authorization',
              severity: 'CRITICAL',
              items: [
                'Login/logout endpoints',
                'Password hashing (Argon2id)',
                'Password reset flow',
                'Session/token management',
                '2FA support (TOTP)',
                'Rate limiting',
                'Brute-force protection',
                'RBAC middleware',
                'Scope-based authorization',
                'Policy classes',
              ]
            },
            {
              category: 'Core Business Logic',
              severity: 'CRITICAL',
              items: [
                'HierarchyService (tree operations)',
                'PermissionService (RBAC)',
                'RateService + RateResolver',
                'LimitService',
                'CreditService',
                'LedgerService',
                'ExposureService',
                'BettingService (22-step validation)',
                'ResultService',
                'SettlementService',
                'CommissionService',
                'ReconciliationService',
                'AuditService',
              ]
            },
            {
              category: 'API Layer',
              severity: 'HIGH',
              items: [
                '40+ REST API endpoints',
                'Request validation (Form Requests)',
                'API Resources (response formatting)',
                'Error handling (centralized exceptions)',
                'Idempotency middleware',
                'Pagination support',
                'Filtering and sorting',
                'OpenAPI documentation',
              ]
            },
            {
              category: 'Frontend Application',
              severity: 'HIGH',
              items: [
                'Next.js application (currently Vite)',
                'Role-specific layouts',
                'Authentication pages',
                'Dashboard pages (4 roles)',
                'Betting interface',
                'Transaction management',
                'Settlement UI',
                'Rate configuration UI',
                'Credit management UI',
                'Reports and exports',
                'Agent tree visualization',
              ]
            },
            {
              category: 'Infrastructure',
              severity: 'HIGH',
              items: [
                'Docker Compose configuration',
                'Nginx configuration',
                'PHP-FPM configuration',
                'MySQL container',
                'Redis container',
                'Queue worker container',
                'Scheduler container',
                'SSL/TLS configuration',
                'Backup procedures',
              ]
            },
            {
              category: 'Testing',
              severity: 'HIGH',
              items: [
                'Unit tests for all services',
                'Feature tests for API endpoints',
                'Integration tests for financial flows',
                'Security tests (IDOR, privilege escalation)',
                'Concurrency tests',
                'Financial calculation tests',
                'E2E tests (Playwright)',
              ]
            },
          ].map((cat, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">{cat.category}</h4>
                <Badge variant={cat.severity.toLowerCase()}>{cat.severity}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-red-400">❌</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ConflictsSection() {
  return (
    <div id="conflicts" className="space-y-6 animate-fade-in">
      <SectionHeader num="05" title="Architecture Conflicts" subtitle="Discrepancies between V2 spec and current repository" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Identified Conflicts</h3>
        <div className="space-y-4">
          {[
            {
              conflict: 'Frontend Framework Mismatch',
              v2: 'V2 specifies Next.js (SSR, API routes, server components)',
              current: 'Current project uses Vite (CSR only, no SSR)',
              impact: 'MEDIUM — Vite can serve as development tool but Next.js is required for production per V2',
              resolution: 'Create separate Next.js frontend application. Current Vite project can be repurposed or discarded.'
            },
            {
              conflict: 'No Backend Exists',
              v2: 'V2 requires Laravel 12+ with PHP 8.3+',
              current: 'No PHP/Laravel code exists in repository',
              impact: 'CRITICAL — Entire backend must be built from scratch',
              resolution: 'Initialize Laravel project in /backend directory alongside frontend.'
            },
            {
              conflict: 'Package.json Contains Unused Dependencies',
              v2: 'V2 specifies specific frontend dependencies',
              current: 'package.json includes @supabase/supabase-js, canvas-confetti, @dnd-kit which are not in V2 spec',
              impact: 'LOW — Cleanup needed but not blocking',
              resolution: 'Remove unused packages. Add Next.js-specific dependencies when creating frontend.'
            },
            {
              conflict: 'No Monorepo Structure',
              v2: 'V2 implies separate backend and frontend projects',
              current: 'Single project with only frontend documentation',
              impact: 'MEDIUM — Need to establish monorepo or separate repo structure',
              resolution: 'Create /backend and /frontend directories at project root. Use Docker Compose to orchestrate.'
            },
            {
              conflict: 'Database Schema is Documented but Not Implemented',
              v2: 'V2 defines ~45 tables with full column specifications',
              current: 'Schema exists only as React component data (SectionData.tsx)',
              impact: 'HIGH — Schema must be converted to actual Laravel migrations',
              resolution: 'Use documented schema as blueprint for migration files. Preserve all constraints and indexes.'
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <h4 className="text-sm font-semibold text-amber-400 mb-2">{item.conflict}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-500 min-w-[80px]">V2 Spec:</span>
                  <span className="text-slate-300">{item.v2}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 min-w-[80px]">Current:</span>
                  <span className="text-slate-300">{item.current}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 min-w-[80px]">Impact:</span>
                  <span className="text-amber-300">{item.impact}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-500 min-w-[80px]">Resolution:</span>
                  <span className="text-emerald-300">{item.resolution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DatabaseSection() {
  return (
    <div id="database" className="space-y-6 animate-fade-in">
      <SectionHeader num="06" title="Database Gaps" subtitle="Analysis of database implementation status" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Database Status: 0% Implemented</h3>
        <p className="text-sm text-slate-400 mb-4">
          The V2 specification defines approximately 45 database tables. Currently, <strong className="text-white">zero tables exist</strong> in any database. 
          The schema is fully documented in the specification site but has not been converted to Laravel migrations.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { module: 'Identity', tables: 5, status: 0 },
            { module: 'Hierarchy', tables: 3, status: 0 },
            { module: 'Product', tables: 4, status: 0 },
            { module: 'Rate', tables: 4, status: 0 },
            { module: 'Betting', tables: 5, status: 0 },
            { module: 'Financial', tables: 6, status: 0 },
            { module: 'Settlement', tables: 4, status: 0 },
            { module: 'Audit', tables: 3, status: 0 },
          ].map((mod, i) => (
            <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-center">
              <div className="text-lg font-bold text-white">{mod.tables}</div>
              <div className="text-xs text-slate-400">{mod.module}</div>
              <div className="text-xs text-red-400 mt-1">0/{mod.tables} created</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Required Migrations (Priority Order)</h3>
        <div className="space-y-2">
          {[
            { phase: 1, tables: ['organizations', 'users', 'roles', 'permissions', 'role_permissions', 'user_roles'], priority: 'CRITICAL' },
            { phase: 2, tables: ['hierarchy_nodes', 'hierarchy_paths', 'hierarchy_levels'], priority: 'CRITICAL' },
            { phase: 3, tables: ['products', 'draws', 'betting_types', 'betting_rules'], priority: 'HIGH' },
            { phase: 4, tables: ['rate_profiles', 'rate_profile_items', 'rate_versions', 'rate_snapshots'], priority: 'HIGH' },
            { phase: 5, tables: ['member_betting_profiles', 'member_betting_profile_items'], priority: 'HIGH' },
            { phase: 6, tables: ['financial_accounts', 'ledger_entries', 'balance_snapshots', 'credit_adjustments'], priority: 'CRITICAL' },
            { phase: 7, tables: ['bets', 'bet_items', 'idempotency_keys'], priority: 'CRITICAL' },
            { phase: 8, tables: ['exposure_records', 'exposure_snapshots'], priority: 'HIGH' },
            { phase: 9, tables: ['results', 'result_items'], priority: 'HIGH' },
            { phase: 10, tables: ['settlements', 'settlement_items', 'commissions', 'commission_distributions'], priority: 'HIGH' },
            { phase: 11, tables: ['audit_logs', 'security_events', 'notifications'], priority: 'MEDIUM' },
            { phase: 12, tables: ['system_settings', 'reconciliation_reports', 'export_jobs'], priority: 'MEDIUM' },
          ].map((batch, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <Badge variant={batch.priority.toLowerCase()}>{batch.priority}</Badge>
              <div className="flex-1">
                <span className="text-xs text-slate-500">Phase {batch.phase}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {batch.tables.map((t, j) => (
                    <code key={j} className="text-[11px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-300 font-mono">{t}</code>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SecuritySection() {
  return (
    <div id="security" className="space-y-6 animate-fade-in">
      <SectionHeader num="07" title="Security Gaps" subtitle="Security implementation status and risks" />
      
      <Card>
        <h3 className="text-lg font-semibold text-red-400 mb-4">🔴 Security Status: NO IMPLEMENTATION</h3>
        <p className="text-sm text-slate-400 mb-4">
          The current repository has <strong className="text-white">zero security implementation</strong>. 
          No authentication, no authorization, no input validation, no rate limiting, no CSRF protection.
          This is expected since no application code exists yet.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { area: 'Authentication', items: ['Login/Logout', 'Password hashing (Argon2id)', 'Session management', '2FA (TOTP)', 'Password reset', 'Brute-force protection'], status: 'NONE' },
            { area: 'Authorization', items: ['RBAC middleware', 'Scope-based access', 'Hierarchy enforcement', 'Policy classes', 'IDOR prevention', 'Tenant isolation'], status: 'NONE' },
            { area: 'Input Security', items: ['Request validation', 'SQL injection prevention', 'XSS prevention', 'Mass assignment protection', 'File upload security', 'Output encoding'], status: 'NONE' },
            { area: 'Financial Security', items: ['Idempotency keys', 'Transaction locking', 'Decimal precision', 'Immutable ledger', 'Audit trail', 'Reconciliation'], status: 'NONE' },
            { area: 'Infrastructure', items: ['HTTPS enforcement', 'Security headers', 'Rate limiting', 'CORS configuration', 'Cookie security', 'Secret management'], status: 'NONE' },
            { area: 'Monitoring', items: ['Audit logging', 'Security events', 'Failed login tracking', 'Anomaly detection', 'Request tracing', 'Error handling'], status: 'NONE' },
          ].map((area, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-red-500/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{area.area}</h4>
                <Badge variant="critical">{area.status}</Badge>
              </div>
              <div className="space-y-1">
                {area.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function FinancialSection() {
  return (
    <div id="financial" className="space-y-6 animate-fade-in">
      <SectionHeader num="08" title="Financial Integrity Risks" subtitle="Analysis of financial system implementation gaps" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Financial System Status: NOT IMPLEMENTED</h3>
        <p className="text-sm text-slate-400 mb-4">
          No financial logic exists in the codebase. All financial components defined in V2 must be built from scratch.
          The specification is well-designed but requires careful implementation to maintain integrity.
        </p>
        
        <div className="space-y-4">
          {[
            {
              component: 'Immutable Ledger',
              risk: 'CRITICAL',
              desc: 'No ledger system exists. Financial movements cannot be tracked or audited.',
              requirement: 'Every financial movement must create an immutable ledger entry with before/after balances.',
              implementation: 'Create LedgerService with atomic transactions, DECIMAL precision, and compensating entry support.'
            },
            {
              component: 'Rate Versioning',
              risk: 'HIGH',
              desc: 'No rate versioning system. Historical bets cannot reproduce original calculations.',
              requirement: 'Every bet must snapshot the exact rate used. Rates must be versioned with effective periods.',
              implementation: 'Create RateVersion model with effective_from/effective_to. Bet records reference rate_version_id.'
            },
            {
              component: 'Idempotency',
              risk: 'CRITICAL',
              desc: 'No idempotency protection. Duplicate requests could create duplicate financial effects.',
              requirement: 'All financial endpoints must accept Idempotency-Key header and prevent duplicate processing.',
              implementation: 'Create idempotency_keys table. Middleware checks key before processing financial operations.'
            },
            {
              component: 'Decimal Precision',
              risk: 'HIGH',
              desc: 'No financial calculation code exists. Risk of floating-point errors if not carefully implemented.',
              requirement: 'All monetary values must use DECIMAL(18,4). Never use FLOAT or DOUBLE.',
              implementation: 'Use bcmath extension. Define rounding rules. Test with edge cases (0.0001, large amounts).'
            },
            {
              component: 'Settlement Idempotency',
              risk: 'HIGH',
              desc: 'No settlement engine. Running settlement twice could create duplicate financial movements.',
              requirement: 'Settlement must be deterministic. Same inputs must always produce same outputs.',
              implementation: 'Lock settlement records. Use status state machine. Prevent re-processing of LOCKED settlements.'
            },
            {
              component: 'Concurrency Control',
              risk: 'CRITICAL',
              desc: 'No database locking strategy. Simultaneous bets could overspend credit.',
              requirement: 'Use row-level locking for financial operations. Atomic transactions for bet placement.',
              implementation: 'DB::transaction() with lockForUpdate() on financial_accounts. Optimistic locking where appropriate.'
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{item.component}</h4>
                <Badge variant={item.risk.toLowerCase()}>{item.risk}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-slate-400">{item.desc}</p>
                <p className="text-cyan-300"><strong>Requirement:</strong> {item.requirement}</p>
                <p className="text-emerald-300"><strong>Implementation:</strong> {item.implementation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DependenciesSection() {
  return (
    <div id="dependencies" className="space-y-6 animate-fade-in">
      <SectionHeader num="09" title="Implementation Dependencies" subtitle="What must be built before what" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Dependency Graph</h3>
        <div className="space-y-3">
          {[
            { phase: 'Foundation', deps: [], blocks: ['Database', 'Auth', 'All business logic'], color: 'border-emerald-500/30 bg-emerald-500/5' },
            { phase: 'Database Migrations', deps: ['Foundation'], blocks: ['Models', 'Services', 'API', 'Tests'], color: 'border-cyan-500/30 bg-cyan-500/5' },
            { phase: 'Authentication', deps: ['Database'], blocks: ['RBAC', 'API endpoints', 'Frontend auth'], color: 'border-violet-500/30 bg-violet-500/5' },
            { phase: 'RBAC + Scope', deps: ['Authentication'], blocks: ['Hierarchy', 'All authorized endpoints'], color: 'border-amber-500/30 bg-amber-500/5' },
            { phase: 'Hierarchy Engine', deps: ['RBAC'], blocks: ['Products', 'Rates', 'Credit', 'Betting'], color: 'border-rose-500/30 bg-rose-500/5' },
            { phase: 'Products + Draws', deps: ['Hierarchy'], blocks: ['Betting Types', 'Rate Engine'], color: 'border-emerald-500/30 bg-emerald-500/5' },
            { phase: 'Rate Engine', deps: ['Products'], blocks: ['Member Profiles', 'Betting Engine'], color: 'border-cyan-500/30 bg-cyan-500/5' },
            { phase: 'Credit + Ledger', deps: ['Hierarchy'], blocks: ['Exposure', 'Betting', 'Settlement'], color: 'border-violet-500/30 bg-violet-500/5' },
            { phase: 'Betting Engine', deps: ['Rate', 'Credit', 'Exposure', 'Products'], blocks: ['Results', 'Settlement'], color: 'border-amber-500/30 bg-amber-500/5' },
            { phase: 'Settlement + Commission', deps: ['Betting', 'Ledger'], blocks: ['Reconciliation', 'Reports'], color: 'border-rose-500/30 bg-rose-500/5' },
            { phase: 'Frontend', deps: ['API ready'], blocks: ['User acceptance'], color: 'border-emerald-500/30 bg-emerald-500/5' },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-lg border ${item.color}`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 w-6">{i + 1}.</span>
                <div className="flex-1">
                  <span className="text-sm font-medium text-white">{item.phase}</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.deps.length > 0 && (
                      <span className="text-[10px] text-slate-500">
                        depends on: {item.deps.join(', ')}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">
                      → blocks: {item.blocks.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Critical Path</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {['Foundation', 'Database', 'Auth', 'RBAC', 'Hierarchy', 'Credit+Ledger', 'Rate Engine', 'Betting', 'Settlement'].map((step, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs">{step}</span>
              {i < arr.length - 1 && <ChevronRight size={12} className="text-slate-600" />}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-400 mt-3">
          The critical path runs through financial infrastructure. Credit/Ledger must be solid before Betting can be implemented. 
          Rate Engine must be complete before Betting validation can work. Settlement depends on all upstream components.
        </p>
      </Card>
    </div>
  );
}

function RoadmapSection() {
  const phases = [
    { num: 1, name: 'Repository & Architecture Verification', status: 'COMPLETE', effort: '1 day', desc: 'Gap analysis, architecture confirmation, implementation plan' },
    { num: 2, name: 'Project Foundation', status: 'PENDING', effort: '2-3 days', desc: 'Laravel init, Next.js init, Docker, MySQL, Redis, health checks' },
    { num: 3, name: 'Database', status: 'PENDING', effort: '3-5 days', desc: 'All migrations, models, relationships, seeders, constraints' },
    { num: 4, name: 'Authentication', status: 'PENDING', effort: '2-3 days', desc: 'Login, logout, password reset, Sanctum, 2FA architecture' },
    { num: 5, name: 'RBAC + Scope', status: 'PENDING', effort: '2-3 days', desc: 'Roles, permissions, policies, middleware, scope enforcement' },
    { num: 6, name: 'Hierarchy Engine', status: 'PENDING', effort: '3-4 days', desc: 'Closure table, tree operations, scope resolution, audit' },
    { num: 7, name: 'Products + Draws + Betting Types', status: 'PENDING', effort: '3-4 days', desc: 'Product CRUD, draw lifecycle, betting type config, state machines' },
    { num: 8, name: 'Rate Engine', status: 'PENDING', effort: '3-4 days', desc: 'Rate matrix, inheritance, versioning, effective rate resolution' },
    { num: 9, name: 'Member Profiles + Limits', status: 'PENDING', effort: '2-3 days', desc: 'Betting profiles, limit engine, exposure pre-calculation' },
    { num: 10, name: 'Credit + Ledger', status: 'PENDING', effort: '4-5 days', desc: 'Financial accounts, ledger entries, transfers, adjustments' },
    { num: 11, name: 'Exposure Engine', status: 'PENDING', effort: '2-3 days', desc: 'Real-time exposure tracking, limit enforcement' },
    { num: 12, name: 'Betting Engine', status: 'PENDING', effort: '4-5 days', desc: '22-step validation, idempotency, receipts, concurrency' },
    { num: 13, name: 'Results', status: 'PENDING', effort: '2-3 days', desc: 'Result entry, verification, publication, locking' },
    { num: 14, name: 'Settlement + Commission', status: 'PENDING', effort: '5-7 days', desc: 'Settlement engine, commission distribution, hierarchy payout' },
    { num: 15, name: 'Reconciliation + Audit', status: 'PENDING', effort: '3-4 days', desc: 'Balance verification, discrepancy detection, audit logs' },
    { num: 16, name: 'Reports + Exports', status: 'PENDING', effort: '3-4 days', desc: 'Scoped reports, queued exports (CSV/XLSX/PDF)' },
    { num: 17, name: 'Frontend Application', status: 'PENDING', effort: '7-10 days', desc: 'Next.js app, role layouts, dashboards, betting UI, management UI' },
    { num: 18, name: 'Security Hardening', status: 'PENDING', effort: '3-4 days', desc: 'Penetration testing, IDOR audit, privilege escalation tests' },
    { num: 19, name: 'Testing', status: 'PENDING', effort: '4-5 days', desc: 'Comprehensive test coverage, financial integrity tests' },
    { num: 20, name: 'Performance + Deployment', status: 'PENDING', effort: '3-4 days', desc: 'Query optimization, caching, Docker production, monitoring' },
  ];

  return (
    <div id="roadmap" className="space-y-6 animate-fade-in">
      <SectionHeader num="10" title="Phase-by-Phase Build Plan" subtitle="20-phase implementation roadmap with dependencies" />
      
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Implementation Phases</h3>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Complete</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500" /> Pending</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {phases.map((phase) => (
            <div key={phase.num} className={`flex items-center gap-3 p-3 rounded-lg border ${
              phase.status === 'COMPLETE' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/30 border-slate-700/30'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                phase.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700/50 text-slate-400'
              }`}>
                {phase.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{phase.name}</span>
                  <Badge variant={phase.status === 'COMPLETE' ? 'complete' : 'pending'}>{phase.status}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{phase.desc}</p>
              </div>
              <div className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
                <Clock size={10} />
                {phase.effort}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-3">Total Estimated Effort</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-white">20</div>
            <div className="text-xs text-slate-400">Phases</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-white">~65-85</div>
            <div className="text-xs text-slate-400">Working Days</div>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-white">~3-4</div>
            <div className="text-xs text-slate-400">Months (1 developer)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RisksSection() {
  return (
    <div id="risks" className="space-y-6 animate-fade-in">
      <SectionHeader num="11" title="Risks" subtitle="Identified risks with mitigation strategies" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Risk Matrix</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Financial Data Loss',
              category: 'FINANCIAL',
              likelihood: 'MEDIUM',
              impact: 'CRITICAL',
              desc: 'Incorrect implementation of ledger or settlement could cause irreversible financial errors.',
              mitigation: 'Comprehensive testing with deterministic test cases. Reconciliation engine. Immutable ledger. Backup strategy.'
            },
            {
              title: 'Authorization Bypass',
              category: 'SECURITY',
              likelihood: 'MEDIUM',
              impact: 'CRITICAL',
              desc: 'IDOR or privilege escalation could allow unauthorized access to financial data or operations.',
              mitigation: 'Server-side scope enforcement on every endpoint. Comprehensive security testing. Audit logging.'
            },
            {
              title: 'Race Conditions in Betting',
              category: 'FINANCIAL',
              likelihood: 'HIGH',
              impact: 'HIGH',
              desc: 'Simultaneous bets could overspend credit or exceed exposure limits.',
              mitigation: 'Database row locking. Idempotency keys. Atomic transactions. Concurrency testing.'
            },
            {
              title: 'Rate Calculation Errors',
              category: 'FINANCIAL',
              likelihood: 'MEDIUM',
              impact: 'HIGH',
              desc: 'Incorrect rate inheritance or versioning could produce wrong payouts.',
              mitigation: 'Rate versioning with snapshots. Deterministic calculation tests. Decimal precision enforcement.'
            },
            {
              title: 'Settlement Duplication',
              category: 'FINANCIAL',
              likelihood: 'MEDIUM',
              impact: 'CRITICAL',
              desc: 'Running settlement twice could create duplicate financial movements.',
              mitigation: 'Status state machine. Lock after settlement. Idempotent processing. Reconciliation checks.'
            },
            {
              title: 'Scope Complexity',
              category: 'ARCHITECTURE',
              likelihood: 'HIGH',
              impact: 'MEDIUM',
              desc: 'Hierarchy-based scope enforcement is complex and error-prone.',
              mitigation: 'Centralized scope resolution. Comprehensive testing. Clear documentation. Code review.'
            },
            {
              title: 'Performance at Scale',
              category: 'PERFORMANCE',
              likelihood: 'MEDIUM',
              impact: 'MEDIUM',
              desc: 'Large hierarchies and high bet volumes could cause performance degradation.',
              mitigation: 'Database indexing. Caching strategy. Queue-based processing. Pagination. Read replicas.'
            },
            {
              title: 'Regulatory Compliance',
              category: 'COMPLIANCE',
              likelihood: 'LOW',
              impact: 'CRITICAL',
              desc: 'System must support KYC/AML/responsible gaming requirements in licensed jurisdictions.',
              mitigation: 'Configurable compliance hooks. Audit trail. Data retention policies. Integration points documented.'
            },
          ].map((risk, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{risk.title}</h4>
                <div className="flex gap-2">
                  <Badge variant={risk.likelihood.toLowerCase()}>Likelihood: {risk.likelihood}</Badge>
                  <Badge variant={risk.impact.toLowerCase()}>Impact: {risk.impact}</Badge>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">{risk.desc}</p>
              <p className="text-sm text-emerald-300"><strong>Mitigation:</strong> {risk.mitigation}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ChangesSection() {
  return (
    <div id="changes" className="space-y-6 animate-fade-in">
      <SectionHeader num="12" title="Recommended Changes" subtitle="Architecture adjustments before implementation begins" />
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Recommended Architecture Changes</h3>
        <div className="space-y-4">
          {[
            {
              change: 'Adopt Monorepo Structure',
              reason: 'V2 specifies separate backend and frontend. Current repo has only frontend docs.',
              action: 'Create /backend (Laravel) and /frontend (Next.js) directories. Root docker-compose.yml orchestrates both.',
              risk: 'LOW'
            },
            {
              change: 'Replace Vite with Next.js for Frontend',
              reason: 'V2 explicitly requires Next.js for SSR, API routes, and server components.',
              action: 'Create new Next.js application. Current Vite documentation site can be preserved as /docs or discarded.',
              risk: 'LOW'
            },
            {
              change: 'Use Materialized Path + Adjacency List for Hierarchy',
              reason: 'V2 recommends closure table but materialized path is simpler for this use case with good query performance.',
              action: 'Use materialized_path column for ancestor queries + parent_id for direct parent. Simpler than full closure table.',
              risk: 'MEDIUM'
            },
            {
              change: 'Add Idempotency Table Early',
              reason: 'Financial operations require idempotency. Must be in place before any financial endpoints.',
              action: 'Create idempotency_keys table in Phase 2 migrations. Implement middleware in Phase 3.',
              risk: 'LOW'
            },
            {
              change: 'Implement BCMath for All Financial Calculations',
              reason: 'V2 mandates DECIMAL precision. PHP must use bcmath extension, not native float arithmetic.',
              action: 'Require ext-bcmath in composer.json. Create Money value object. Use bcadd/bcsub/bcmul/bcdiv everywhere.',
              risk: 'LOW'
            },
            {
              change: 'Add Organization/Tenant Table',
              reason: 'V2 requires multi-tenant isolation. Every record must trace to root organization.',
              action: 'Create organizations table. Add organization_id to all relevant tables. Implement tenant scope middleware.',
              risk: 'LOW'
            },
            {
              change: 'Use ULID for Public Identifiers',
              reason: 'V2 specifies ULID/UUID for public-facing IDs. Prevents enumeration of internal database IDs.',
              action: 'Generate ULID for public_id on users, bets, settlements. Use Laravel Str::ulid(). Never expose auto-increment IDs.',
              risk: 'LOW'
            },
            {
              change: 'Implement Event Sourcing for Financial Operations',
              reason: 'V2 requires complete audit trail and reproducibility for all financial movements.',
              action: 'Use domain events (BetAccepted, CreditTransferred, SettlementLocked) with event listeners for ledger/audit.',
              risk: 'MEDIUM'
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-white">{item.change}</h4>
                <Badge variant={item.risk.toLowerCase()}>Risk: {item.risk}</Badge>
              </div>
              <div className="space-y-1.5 text-sm">
                <p className="text-slate-400"><strong>Why:</strong> {item.reason}</p>
                <p className="text-cyan-300"><strong>Action:</strong> {item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ActionsSection() {
  return (
    <div id="actions" className="space-y-6 animate-fade-in">
      <SectionHeader num="13" title="Exact Next Actions" subtitle="Immediate steps to begin implementation" />
      
      <Card className="border-emerald-500/30!">
        <h3 className="text-lg font-semibold text-emerald-400 mb-4">✅ Phase 1 Complete — Awaiting Approval</h3>
        <p className="text-sm text-slate-300 mb-4">
          Phase 1 (Repository & Architecture Verification) is complete. The following actions are proposed for Phase 2.
          <strong className="text-white"> Implementation will not begin until explicit approval is received.</strong>
        </p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Phase 2 — Project Foundation (Proposed)</h3>
        <div className="space-y-3">
          {[
            { step: 1, action: 'Initialize Laravel 12+ project in /backend directory', detail: 'composer create-project laravel/laravel backend' },
            { step: 2, action: 'Configure PHP 8.3+ with required extensions', detail: 'bcmath, pdo_mysql, redis, mbstring, openssl, tokenizer' },
            { step: 3, action: 'Initialize Next.js 14+ project in /frontend directory', detail: 'npx create-next-app@latest frontend --typescript --tailwind' },
            { step: 4, action: 'Create Docker Compose configuration', detail: 'Services: frontend, backend, nginx, mysql, redis, queue, scheduler' },
            { step: 5, action: 'Configure MySQL 8+ connection', detail: 'Database: lottery_platform, charset: utf8mb4, collation: utf8mb4_unicode_ci' },
            { step: 6, action: 'Configure Redis connection', detail: 'For caching, sessions, queue driver' },
            { step: 7, action: 'Configure Laravel Queue (Redis driver)', detail: 'QUEUE_CONNECTION=redis' },
            { step: 8, action: 'Configure Laravel Scheduler', detail: 'For draw status transitions, settlement triggers, reconciliation' },
            { step: 9, action: 'Create /health endpoint', detail: 'Check: Laravel boots, MySQL connects, Redis connects, Queue works' },
            { step: 10, action: 'Configure environment files', detail: '.env.example with all required variables. Never commit secrets.' },
            { step: 11, action: 'Configure logging', detail: 'Structured logging. Separate channels: app, security, audit, financial, queue' },
            { step: 12, action: 'Verify all services boot correctly', detail: 'Run health checks. All tests pass. Docker compose up works.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="w-7 h-7 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-xs font-bold text-brand-400 shrink-0">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{item.action}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Phase 2 Gate Criteria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Laravel boots without errors',
            'Next.js boots without errors',
            'MySQL connection established',
            'Redis connection established',
            'Queue worker processes jobs',
            'Scheduler executes tasks',
            '/health endpoint returns 200',
            'Docker Compose starts all services',
            'Environment configuration documented',
            'Logging configured with channels',
          ].map((criterion, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="w-4 h-4 rounded border border-slate-600 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
              </span>
              {criterion}
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-brand-500/30!">
        <h3 className="text-lg font-semibold text-brand-400 mb-3">⏸️ STOPPING POINT</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Per V3 specification rules: <em>"DO NOT start implementing Phase 2. DO NOT create migrations immediately. 
          DO NOT generate random application code."</em>
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mt-2">
          This verification report is complete. <strong className="text-white">Awaiting explicit approval</strong> to proceed 
          with Phase 2 (Project Foundation) implementation.
        </p>
        <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg">
          <p className="text-sm text-brand-200">
            <strong>Next step upon approval:</strong> Initialize Laravel 12+ backend project with Docker environment, 
            database connectivity, and health checks.
          </p>
        </div>
      </Card>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const content = document.getElementById('main-content');
      if (!content) return;
      
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
      case 'overview': return <OverviewSection />;
      case 'architecture': return <ArchitectureSection />;
      case 'structure': return <StructureSection />;
      case 'existing': return <ExistingSection />;
      case 'missing': return <MissingSection />;
      case 'conflicts': return <ConflictsSection />;
      case 'database': return <DatabaseSection />;
      case 'security': return <SecuritySection />;
      case 'financial': return <FinancialSection />;
      case 'dependencies': return <DependenciesSection />;
      case 'roadmap': return <RoadmapSection />;
      case 'risks': return <RisksSection />;
      case 'changes': return <ChangesSection />;
      case 'actions': return <ActionsSection />;
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
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/95 border-r border-slate-800 flex flex-col transform transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Server size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Phase 1 Verification</h1>
              <p className="text-[10px] text-slate-500">Repository & Architecture</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`nav-item w-full text-left ${activeSection === section.id ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-slate-400">Awaiting approval</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-slate-800 flex items-center px-4 gap-4 bg-slate-900/50 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Lottery Platform</span>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-white font-medium">Phase 1 — Repository Verification</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="medium">V3 Build Spec</Badge>
          </div>
        </header>

        {/* Content */}
        <div id="main-content" className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 space-y-8">
            {sections.map((section) => (
              <div key={section.id}>
                {renderSection(section.id)}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
