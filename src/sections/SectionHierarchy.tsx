export default function SectionHierarchy() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Hierarchy Model — Closure Table</h3>
        <p className="text-sm text-slate-400 mb-4">
          The hierarchy uses a <strong className="text-emerald-400">Closure Table</strong> pattern combined with 
          <strong className="text-cyan-400"> Materialized Path</strong> for display. This provides O(1) ancestor/descendant 
          queries while maintaining readable paths.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-emerald">Unlimited depth</span>
          <span className="badge badge-cyan">Data-driven levels</span>
          <span className="badge badge-violet">O(1) tree queries</span>
          <span className="badge badge-amber">Scope resolution</span>
        </div>
      </div>

      {/* Why Closure Table */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Why Closure Table?</h3>
        <div className="overflow-x-auto">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Ancestor Query</th>
                <th>Descendant Query</th>
                <th>Move Subtree</th>
                <th>Depth Query</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-white">Adjacency List</td>
                <td className="text-rose-400">O(n) recursive</td>
                <td className="text-rose-400">O(n) recursive</td>
                <td className="text-emerald-400">O(1)</td>
                <td className="text-rose-400">O(n) recursive</td>
                <td><span className="badge badge-rose">Rejected</span></td>
              </tr>
              <tr>
                <td className="font-medium text-white">Materialized Path</td>
                <td className="text-emerald-400">O(1) LIKE</td>
                <td className="text-emerald-400">O(1) LIKE</td>
                <td className="text-amber-400">O(n) UPDATE</td>
                <td className="text-emerald-400">O(1)</td>
                <td><span className="badge badge-amber">Supplementary</span></td>
              </tr>
              <tr>
                <td className="font-medium text-white">Nested Set</td>
                <td className="text-emerald-400">O(1)</td>
                <td className="text-emerald-400">O(1)</td>
                <td className="text-rose-400">O(n) renumber</td>
                <td className="text-emerald-400">O(1)</td>
                <td><span className="badge badge-rose">Rejected</span></td>
              </tr>
              <tr className="bg-emerald-500/5">
                <td className="font-medium text-emerald-400">Closure Table ✓</td>
                <td className="text-emerald-400">O(1) JOIN</td>
                <td className="text-emerald-400">O(1) JOIN</td>
                <td className="text-amber-400">O(d²) where d=depth</td>
                <td className="text-emerald-400">O(1) MAX(depth)</td>
                <td><span className="badge badge-emerald">Selected</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Closure table trades write complexity for read performance. Since hierarchy changes are rare 
          compared to reads (betting, reporting), this is the optimal trade-off.
        </p>
      </div>

      {/* Visual Hierarchy */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Example Hierarchy Structure</h3>
        <div className="font-mono text-xs text-slate-300 bg-slate-950 rounded-lg p-4 border border-slate-800 overflow-x-auto">
          <pre>{`
SUPERSENIOR (level 0)
│   path: /1/
│
├── MASTER A (level 1)
│   │   path: /1/5/
│   │
│   ├── AGENT A1 (level 2)
│   │   │   path: /1/5/23/
│   │   │
│   │   ├── MEMBER 001 (level 3)  path: /1/5/23/101/
│   │   ├── MEMBER 002 (level 3)  path: /1/5/23/102/
│   │   └── MEMBER 003 (level 3)  path: /1/5/23/103/
│   │
│   └── AGENT A2 (level 2)
│       │   path: /1/5/45/
│       └── MEMBER 004 (level 3)  path: /1/5/45/201/
│
├── SENIOR MASTER (level 1) [future extension]
│   │   path: /1/80/
│   └── MASTER B (level 2) [future extension]
│       │   path: /1/80/90/
│       └── AGENT B1 (level 3)  path: /1/80/90/301/
│
└── MASTER C (level 1)
        path: /1/150/
          `}</pre>
        </div>
      </div>

      {/* Scope System */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Scope-Based Authorization</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-emerald">GLOBAL</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">Access to entire organization</p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Supersenior</li>
              <li>• System Admin</li>
              <li>• Auditor (read-only)</li>
            </ul>
            <div className="mt-3 p-2 rounded bg-slate-900/50">
              <code className="text-[11px] text-emerald-400">WHERE organization_id = :org</code>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-cyan">DOWNLINE</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">Access to self + all descendants</p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Master</li>
              <li>• Agent</li>
              <li>• Senior Master (future)</li>
            </ul>
            <div className="mt-3 p-2 rounded bg-slate-900/50">
              <code className="text-[11px] text-cyan-400">WHERE node_id IN (descendants)</code>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border border-violet-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-violet">SELF</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">Access to own records only</p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Member</li>
            </ul>
            <div className="mt-3 p-2 rounded bg-slate-900/50">
              <code className="text-[11px] text-violet-400">WHERE user_id = :self</code>
            </div>
          </div>
        </div>
      </div>

      {/* State Machine */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">User Status State Machine</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { from: 'PENDING', to: 'ACTIVE', color: 'emerald' },
            { from: 'ACTIVE', to: 'SUSPENDED', color: 'amber' },
            { from: 'SUSPENDED', to: 'ACTIVE', color: 'emerald' },
            { from: 'ACTIVE', to: 'LOCKED', color: 'rose' },
            { from: 'LOCKED', to: 'ACTIVE', color: 'emerald' },
            { from: 'ACTIVE', to: 'DISABLED', color: 'amber' },
            { from: 'ACTIVE', to: 'CLOSED', color: 'rose' },
            { from: 'SUSPENDED', to: 'CLOSED', color: 'rose' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">{t.from}</span>
              <span className={`text-${t.color}-400`}>→</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">{t.to}</span>
              {i < 7 && <span className="text-slate-600 mx-1">|</span>}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          <strong className="text-rose-400">CLOSED is terminal.</strong> A closed financial account cannot be reopened. 
          All remaining balances must be settled before closure.
        </p>
      </div>

      {/* Data Isolation */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Data Isolation Rules</h3>
        <div className="space-y-3">
          {[
            { rule: 'Every transactional record includes organization_id', detail: 'Cross-tenant access impossible at query level' },
            { rule: 'Hierarchy IDs (supersenior_id, master_id, agent_id) stored on bets', detail: 'Full traceability without JOIN traversal' },
            { rule: 'Scope enforced in middleware + repository layer', detail: 'Double protection: middleware rejects, repository filters' },
            { rule: 'IDOR prevention via scope validation', detail: 'Even if user guesses an ID, scope check rejects unauthorized access' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
              <span className="text-emerald-400 text-sm mt-0.5">✓</span>
              <div>
                <p className="text-sm text-white">{item.rule}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
