export default function SectionRoadmap() {
  const phases = [
    {
      num: 1, name: 'Architecture', status: 'COMPLETE',
      desc: 'System architecture, domain model, ERD, permission matrix, API spec, security model',
      deliverables: ['Architecture document', 'ERD diagram', 'Permission matrix', 'API specification', 'Technology decisions'],
      gate: 'Architecture review approval'
    },
    {
      num: 2, name: 'Database', status: 'PENDING',
      desc: 'Migrations, models, relationships, seeders, factories, constraints, indexes',
      deliverables: ['~45 migration files', 'Eloquent models', 'Model relationships', 'Seeders (roles, permissions)', 'Factories', 'Unit tests for models'],
      gate: 'All migrations pass, tests green'
    },
    {
      num: 3, name: 'Authentication + Authorization', status: 'PENDING',
      desc: 'Login, logout, password reset, 2FA, RBAC, scope authorization, hierarchy access',
      deliverables: ['Auth controllers', 'Sanctum config', '2FA implementation', 'Permission middleware', 'Scope middleware', 'Policy classes'],
      gate: 'Auth tests pass, IDOR tests pass'
    },
    {
      num: 4, name: 'Hierarchy', status: 'PENDING',
      desc: 'Hierarchy nodes, closure table, tree operations, scope resolution',
      deliverables: ['HierarchyService', 'Tree CRUD', 'Descendant/ancestor queries', 'Scope resolution', 'Hierarchy tests'],
      gate: 'Tree operations tested, scope isolation verified'
    },
    {
      num: 5, name: 'Products + Draws', status: 'PENDING',
      desc: 'Product management, draw lifecycle, betting types, configuration',
      deliverables: ['ProductService', 'DrawService', 'Draw state machine', 'Betting type config', 'Open/close logic'],
      gate: 'Draw lifecycle tests pass'
    },
    {
      num: 6, name: 'Rate Engine', status: 'PENDING',
      desc: 'Rate matrix, inheritance, versioning, effective rate resolution',
      deliverables: ['RateService', 'RateResolver', 'RateVersionService', 'Inheritance validation', 'Rate tests'],
      gate: 'Rate inheritance tests, versioning tests'
    },
    {
      num: 7, name: 'Credit + Ledger', status: 'PENDING',
      desc: 'Financial accounts, ledger entries, credit allocation, transfers, reconciliation',
      deliverables: ['CreditService', 'LedgerService', 'Transfer logic', 'ReconciliationService', 'Financial tests'],
      gate: 'Ledger balance tests, transfer atomicity tests'
    },
    {
      num: 8, name: 'Betting Engine', status: 'PENDING',
      desc: 'Bet placement, 22-step validation, idempotency, receipts',
      deliverables: ['BettingService', 'BetValidationService', 'Idempotency handling', 'Receipt generation', 'Betting tests'],
      gate: 'Validation pipeline tests, concurrency tests'
    },
    {
      num: 9, name: 'Results', status: 'PENDING',
      desc: 'Result entry, verification, publication, locking',
      deliverables: ['ResultService', 'Result state machine', 'Verification workflow', 'Publication logic'],
      gate: 'Result lifecycle tests'
    },
    {
      num: 10, name: 'Settlement + Commission', status: 'PENDING',
      desc: 'Settlement calculation, commission distribution, approval workflow, locking',
      deliverables: ['SettlementService', 'CommissionService', 'Distribution logic', 'Approval workflow', 'Settlement tests'],
      gate: 'Deterministic settlement tests, commission tests'
    },
    {
      num: 11, name: 'Reports', status: 'PENDING',
      desc: 'Transaction, credit, ledger, agent, member, commission, settlement, audit reports',
      deliverables: ['ReportingService', 'Export service (CSV/XLSX/PDF)', 'Queue-based generation', 'Report tests'],
      gate: 'Report accuracy tests, export tests'
    },
    {
      num: 12, name: 'Audit + Reconciliation', status: 'PENDING',
      desc: 'Audit logging, security events, reconciliation engine, anomaly detection',
      deliverables: ['AuditService', 'SecurityEventService', 'ReconciliationService', 'Anomaly detection'],
      gate: 'Audit completeness tests, reconciliation tests'
    },
    {
      num: 13, name: 'Security Hardening', status: 'PENDING',
      desc: 'Authorization audit, IDOR testing, injection testing, privilege escalation testing',
      deliverables: ['Security test suite', 'Penetration test results', 'Hardening checklist', 'Headers config'],
      gate: 'All security tests pass'
    },
    {
      num: 14, name: 'Testing', status: 'PENDING',
      desc: 'Complete test coverage: unit, feature, integration, API, security, concurrency, financial',
      deliverables: ['Unit tests (>80% coverage)', 'Feature tests', 'Integration tests', 'E2E tests', 'Performance tests'],
      gate: 'All tests pass, coverage targets met'
    },
    {
      num: 15, name: 'Deployment', status: 'PENDING',
      desc: 'Docker, Nginx, SSL, queue, scheduler, backup, monitoring, deployment guide',
      deliverables: ['Docker configs', 'Nginx config', 'CI/CD pipeline', 'Deployment documentation', 'Runbook'],
      gate: 'Production deployment successful, monitoring active'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Implementation Roadmap</h3>
        <p className="text-sm text-slate-400 mb-4">
          15 phases with clear gate criteria. Each phase must pass its gate before proceeding. 
          No phase silently skips incomplete work.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-400">Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-xs text-slate-400">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-600"></span>
            <span className="text-xs text-slate-400">Not Started</span>
          </div>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="space-y-3">
        {phases.map((phase) => (
          <div key={phase.num} className={`section-card ${phase.status === 'COMPLETE' ? 'border-emerald-500/20 bg-emerald-500/5' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                phase.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {phase.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">Phase {phase.num}: {phase.name}</h4>
                  <span className={`badge ${phase.status === 'COMPLETE' ? 'badge-emerald' : 'badge-amber'}`}>
                    {phase.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{phase.desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">Deliverables</p>
                    <div className="flex flex-wrap gap-1">
                      {phase.deliverables.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-amber-500 uppercase tracking-wider mb-1.5">Phase Gate</p>
                    <p className="text-xs text-slate-400 p-2 rounded bg-amber-500/5 border border-amber-500/20">
                      {phase.gate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phase Gate Template */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Phase Gate Report Template</h3>
        <p className="text-xs text-slate-400 mb-3">At the end of every phase, provide:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            '1. Files created',
            '2. Files modified',
            '3. Database changes',
            '4. API changes',
            '5. Business rules implemented',
            '6. Tests created',
            '7. Tests passed',
            '8. Known issues',
            '9. Security considerations',
            '10. Next phase preview',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded bg-slate-800/40">
              <span className="text-emerald-400 text-xs">{item.split('.')[0]}.</span>
              <span className="text-xs text-slate-300">{item.split('.').slice(1).join('.')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Definition of Done */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Definition of Done</h3>
        <p className="text-xs text-slate-400 mb-3">A feature is NOT complete unless ALL of the following are satisfied:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'Backend implemented',
            'Validation implemented',
            'Authorization implemented',
            'Database implemented',
            'API implemented',
            'Frontend implemented (where applicable)',
            'Tests implemented',
            'Audit requirements implemented',
            'Error handling implemented',
            'Concurrency considered',
            'Security reviewed',
            'Documentation updated',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              <span className="text-emerald-400">✓</span>
              <span className="text-xs text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="section-card border border-emerald-500/30 bg-emerald-500/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-lg font-bold">✓</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-400">Phase 1 Complete — Awaiting Approval</h3>
            <p className="text-xs text-slate-400 mt-1">
              System Architecture & Technical Specification is complete. 
              Awaiting explicit approval before proceeding to Phase 2 (Database Implementation).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
