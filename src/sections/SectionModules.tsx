export default function SectionModules() {
  const modules = [
    {
      name: 'Identity',
      desc: 'User management, authentication, sessions, roles, permissions',
      services: ['UserService', 'AuthService', 'SessionService'],
      tables: ['users', 'roles', 'permissions', 'role_permissions', 'user_roles', 'sessions'],
      color: 'emerald'
    },
    {
      name: 'Hierarchy',
      desc: 'Parent-child relationships, tree traversal, scope resolution',
      services: ['HierarchyService', 'ScopeService'],
      tables: ['hierarchy_nodes', 'hierarchy_relationships', 'hierarchy_paths'],
      color: 'cyan'
    },
    {
      name: 'Organization',
      desc: 'Multi-tenant isolation, organization-level configuration',
      services: ['OrganizationService'],
      tables: ['organizations', 'organization_settings'],
      color: 'violet'
    },
    {
      name: 'Product',
      desc: 'Lottery products, draw schedules, configuration',
      services: ['ProductService', 'DrawService'],
      tables: ['products', 'draws', 'product_configurations'],
      color: 'amber'
    },
    {
      name: 'Betting Type',
      desc: 'Configurable betting categories, number formats, rules',
      services: ['BettingTypeService', 'BettingRuleService'],
      tables: ['betting_types', 'betting_rules', 'betting_type_configs'],
      color: 'rose'
    },
    {
      name: 'Rate Engine',
      desc: 'Rate matrix, inheritance, versioning, effective rate resolution',
      services: ['RateService', 'RateResolver', 'RateVersionService'],
      tables: ['rate_profiles', 'rate_profile_items', 'rate_versions', 'rate_matrix'],
      color: 'emerald'
    },
    {
      name: 'Limit Engine',
      desc: 'Credit limits, bet limits, exposure limits, per-draw limits',
      services: ['LimitService', 'ExposureService'],
      tables: ['limit_configurations', 'exposure_records'],
      color: 'cyan'
    },
    {
      name: 'Member Profile',
      desc: 'Betting profiles, product authorization, effective configuration',
      services: ['MemberProfileService'],
      tables: ['member_betting_profiles', 'member_profile_items'],
      color: 'violet'
    },
    {
      name: 'Credit',
      desc: 'Financial accounts, credit allocation, transfers',
      services: ['CreditService', 'AccountService'],
      tables: ['financial_accounts', 'credit_allocations', 'transfers'],
      color: 'amber'
    },
    {
      name: 'Ledger',
      desc: 'Immutable financial entries, balance projection, reconciliation',
      services: ['LedgerService', 'ReconciliationService'],
      tables: ['ledger_entries', 'balance_snapshots'],
      color: 'rose'
    },
    {
      name: 'Betting',
      desc: 'Bet placement, validation pipeline, idempotency, receipts',
      services: ['BettingService', 'BetValidationService'],
      tables: ['bets', 'bet_items', 'idempotency_keys'],
      color: 'emerald'
    },
    {
      name: 'Result',
      desc: 'Draw results, verification, publication, locking',
      services: ['ResultService', 'ResultVerificationService'],
      tables: ['results', 'result_items'],
      color: 'cyan'
    },
    {
      name: 'Settlement',
      desc: 'Win/loss calculation, approval workflow, locking',
      services: ['SettlementService'],
      tables: ['settlements', 'settlement_items', 'settlement_approvals'],
      color: 'violet'
    },
    {
      name: 'Commission',
      desc: 'Hierarchy distribution, calculation, posting',
      services: ['CommissionService', 'CommissionDistributionService'],
      tables: ['commissions', 'commission_distributions', 'commission_rules'],
      color: 'amber'
    },
    {
      name: 'Reporting',
      desc: 'Transaction reports, financial reports, exports',
      services: ['ReportingService', 'ExportService'],
      tables: ['report_requests', 'report_exports'],
      color: 'rose'
    },
    {
      name: 'Audit',
      desc: 'Immutable audit trail, security events, correlation',
      services: ['AuditService', 'SecurityEventService'],
      tables: ['audit_logs', 'security_events'],
      color: 'emerald'
    },
    {
      name: 'Notification',
      desc: 'Multi-channel notifications, templates, delivery tracking',
      services: ['NotificationService'],
      tables: ['notifications', 'notification_channels', 'notification_templates'],
      color: 'cyan'
    },
    {
      name: 'System Config',
      desc: 'Global settings, feature flags, configuration versioning',
      services: ['ConfigService'],
      tables: ['system_settings', 'config_versions'],
      color: 'violet'
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    violet: 'border-violet-500/30 bg-violet-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
    rose: 'border-rose-500/30 bg-rose-500/5',
  };

  const badgeMap: Record<string, string> = {
    emerald: 'badge-emerald',
    cyan: 'badge-cyan',
    violet: 'badge-violet',
    amber: 'badge-amber',
    rose: 'badge-rose',
  };

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Domain Modules</h3>
        <p className="text-sm text-slate-400 mb-4">
          The system is organized into 18 bounded context modules. Each module has dedicated services, 
          tables, and clear responsibility boundaries. No module directly accesses another module's tables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <div key={i} className={`section-card border ${colorMap[mod.color]}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-white">{mod.name}</h4>
              <span className={`badge ${badgeMap[mod.color]}`}>{mod.tables.length} tables</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">{mod.desc}</p>
            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Services</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mod.services.map((s, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tables</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mod.tables.map((t, j) => (
                    <span key={j} className="px-2 py-0.5 rounded bg-slate-800/60 text-[11px] text-slate-400 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dependency Graph */}
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-4">Module Dependencies</h3>
        <div className="text-sm text-slate-400 space-y-3">
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <span className="text-xs font-semibold text-emerald-400">Core (no dependencies):</span>
            <p className="text-xs mt-1">Identity → Organization → System Config</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <span className="text-xs font-semibold text-cyan-400">Structure (depends on Core):</span>
            <p className="text-xs mt-1">Hierarchy → Product → Betting Type → Rate Engine → Limit Engine</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <span className="text-xs font-semibold text-violet-400">Financial (depends on Structure):</span>
            <p className="text-xs mt-1">Credit → Ledger → Member Profile</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <span className="text-xs font-semibold text-amber-400">Operations (depends on Financial):</span>
            <p className="text-xs mt-1">Betting → Result → Settlement → Commission</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
            <span className="text-xs font-semibold text-rose-400">Cross-cutting:</span>
            <p className="text-xs mt-1">Audit (all modules) → Notification (all modules) → Reporting (read-only access)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
