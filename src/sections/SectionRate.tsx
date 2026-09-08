export default function SectionRate() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Rate Architecture — Matrix + Inheritance + Versioning</h3>
        <p className="text-sm text-slate-400 mb-4">
          Rates are NOT a single column. They form a multi-dimensional <strong className="text-emerald-400">Rate Matrix</strong> that 
          resolves based on Product × Draw × Betting Type × Hierarchy Level × Effective Period. 
          Rates are <strong className="text-cyan-400">versioned</strong> — historical bets always retain their original rate.
        </p>
      </div>

      {/* Rate Matrix */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Rate Matrix Dimensions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { dim: 'Product', desc: 'Government Lottery, Local Lottery, etc.', icon: '📦' },
            { dim: 'Draw', desc: 'Specific draw instance or draw type', icon: '🎯' },
            { dim: 'Betting Type', desc: '2-digit top, 3-digit, etc.', icon: '🔢' },
            { dim: 'Hierarchy Level', desc: 'Supersenior, Master, Agent, Member', icon: '👥' },
            { dim: 'Effective Period', desc: 'Time-bounded rate validity', icon: '📅' },
            { dim: 'Organization', desc: 'Per-organization rate configuration', icon: '🏢' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-lg">{item.icon}</span>
              <p className="text-xs font-semibold text-white mt-1">{item.dim}</p>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Inheritance */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Rate Inheritance — Top-Down Constraint</h3>
        <div className="space-y-3">
          {[
            { level: 'System Maximum', rate: '90.00%', constraint: 'Hard ceiling — no one can exceed', color: 'border-rose-500/40 bg-rose-500/5' },
            { level: 'Supersenior Allocation', rate: '85.00%', constraint: 'Must be ≤ System Maximum', color: 'border-amber-500/40 bg-amber-500/5' },
            { level: 'Master Allocation', rate: '80.00%', constraint: 'Must be ≤ Supersenior allocation', color: 'border-cyan-500/40 bg-cyan-500/5' },
            { level: 'Agent Allocation', rate: '75.00%', constraint: 'Must be ≤ Master allocation', color: 'border-violet-500/40 bg-violet-500/5' },
            { level: 'Member Effective Rate', rate: '75.00%', constraint: 'Inherits from Agent (or lower if configured)', color: 'border-emerald-500/40 bg-emerald-500/5' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${item.color}`}>
              <div>
                <p className="text-sm font-medium text-white">{item.level}</p>
                <p className="text-xs text-slate-400">{item.constraint}</p>
              </div>
              <span className="text-lg font-bold font-mono text-white">{item.rate}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
          <p className="text-xs text-rose-400">
            <strong>Validation Rule:</strong> If Agent attempts to set rate = 80% but Master max = 75%, the system REJECTS.
            This validation happens server-side in RateService before any database write.
          </p>
        </div>
      </div>

      {/* Rate Versioning */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Rate Versioning — Historical Reproducibility</h3>
        <div className="overflow-x-auto">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Effective From</th>
                <th>Effective Until</th>
                <th>Status</th>
                <th>2-digit Top</th>
                <th>3-digit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono text-xs">v1</td>
                <td className="text-xs">2026-01-01</td>
                <td className="text-xs">2026-01-10</td>
                <td><span className="badge badge-slate">SUPERSEDED</span></td>
                <td className="font-mono text-xs text-emerald-400">75.00%</td>
                <td className="font-mono text-xs text-emerald-400">70.00%</td>
              </tr>
              <tr>
                <td className="font-mono text-xs">v2</td>
                <td className="text-xs">2026-01-11</td>
                <td className="text-xs">2026-01-31</td>
                <td><span className="badge badge-slate">SUPERSEDED</span></td>
                <td className="font-mono text-xs text-emerald-400">73.00%</td>
                <td className="font-mono text-xs text-emerald-400">68.00%</td>
              </tr>
              <tr className="bg-emerald-500/5">
                <td className="font-mono text-xs">v3</td>
                <td className="text-xs">2026-02-01</td>
                <td className="text-xs text-slate-500">NULL (current)</td>
                <td><span className="badge badge-emerald">ACTIVE</span></td>
                <td className="font-mono text-xs text-emerald-400">75.00%</td>
                <td className="font-mono text-xs text-emerald-400">72.00%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Every bet stores <code className="text-cyan-400">rate_version_id</code> and <code className="text-cyan-400">applied_rate</code>.
          Historical settlement can always reproduce the exact calculation.
        </p>
      </div>

      {/* Rate Resolution Flow */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Rate Resolution Flow</h3>
        <div className="font-mono text-xs bg-slate-950 rounded-lg p-4 border border-slate-800 overflow-x-auto">
          <pre className="text-slate-300">
{`RateResolver.resolve(member_id, product_id, draw_id, betting_type_id):

  1. Load member's hierarchy path
  2. Determine effective date (server time, draw timezone)
  3. Query rate_matrix WHERE:
     ├── organization_id = :org
     ├── product_id = :product
     ├── betting_type_id = :type
     ├── effective_from <= :now
     └── (effective_until IS NULL OR effective_until > :now)
  4. Walk hierarchy from member → agent → master → supersenior
  5. At each level, check for level-specific override
  6. If no override, inherit parent's rate
  7. Validate: resolved_rate <= parent_level_max
  8. Return { rate_version_id, applied_rate, rate_path }`}
          </pre>
        </div>
      </div>

      {/* Rate Tables */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Rate-Related Tables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { table: 'rate_profiles', desc: 'Named rate configurations (e.g. "Standard Member Rates")' },
            { table: 'rate_profile_items', desc: 'Individual rate entries within a profile' },
            { table: 'rate_versions', desc: 'Version metadata with effective dates' },
            { table: 'rate_matrix', desc: 'The actual rate values: product × type × level × version' },
            { table: 'rate_approvals', desc: 'Maker-checker approval records for rate changes' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <code className="text-xs text-emerald-400">{item.table}</code>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
