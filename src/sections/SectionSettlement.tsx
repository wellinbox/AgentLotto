export default function SectionSettlement() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Settlement Architecture — Deterministic Engine</h3>
        <p className="text-sm text-slate-400 mb-4">
          The SettlementService processes draw results into financial outcomes. Settlement is 
          <strong className="text-emerald-400"> deterministic</strong> — running the same settlement twice produces identical results.
          Once <strong className="text-rose-400">LOCKED</strong>, historical data cannot be directly edited.
        </p>
      </div>

      {/* Settlement Flow */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Settlement Processing Flow</h3>
        <div className="flex flex-col items-center gap-1 py-4">
          {[
            { label: '1. Lock Draw', desc: 'Prevent new bets, mark as RESULT_PENDING', color: 'border-slate-500/40' },
            { label: '2. Load All Bets', desc: 'Fetch all ACCEPTED bets for this draw', color: 'border-slate-500/40' },
            { label: '3. Apply Results', desc: 'Match winning numbers against bet selections', color: 'border-cyan-500/40' },
            { label: '4. Calculate Win/Loss', desc: 'Determine WON/LOST for each bet using rate snapshot', color: 'border-cyan-500/40' },
            { label: '5. Calculate Gross', desc: 'SUM(amount) for all bets = gross_amount', color: 'border-violet-500/40' },
            { label: '6. Calculate Payouts', desc: 'SUM(potential_payout) for WON bets = payout_amount', color: 'border-violet-500/40' },
            { label: '7. Calculate Commission', desc: 'Apply commission rules to gross/payout', color: 'border-amber-500/40' },
            { label: '8. Distribute Commission', desc: 'Split by hierarchy: Master, Agent, Supersenior', color: 'border-amber-500/40' },
            { label: '9. Calculate Net', desc: 'gross - payout - commission = net_amount', color: 'border-emerald-500/40' },
            { label: '10. Create Ledger Entries', desc: 'WIN/LOSS/COMMISSION entries for each account', color: 'border-emerald-500/40' },
            { label: '11. Update Bet Statuses', desc: 'Mark bets as WON/LOST/SETTLED', color: 'border-emerald-500/40' },
            { label: '12. Create Settlement Record', desc: 'Store complete settlement with idempotency_key', color: 'border-emerald-500/40' },
          ].map((item, i) => (
            <div key={i} className={`w-full max-w-lg p-2.5 rounded-lg border ${item.color} bg-slate-800/20`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white">{item.label}</span>
                <span className="text-[11px] text-slate-500">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Status */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Settlement State Machine</h3>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { state: 'OPEN', color: 'bg-slate-700 text-slate-300' },
            { state: '→' },
            { state: 'CALCULATING', color: 'bg-cyan-500/20 text-cyan-400' },
            { state: '→' },
            { state: 'CALCULATED', color: 'bg-violet-500/20 text-violet-400' },
            { state: '→' },
            { state: 'REVIEW', color: 'bg-amber-500/20 text-amber-400' },
            { state: '→' },
            { state: 'APPROVED', color: 'bg-emerald-500/20 text-emerald-400' },
            { state: '→' },
            { state: 'LOCKED', color: 'bg-rose-500/20 text-rose-400' },
          ].map((item, i) => (
            item.state === '→' ? (
              <span key={i} className="text-slate-600">→</span>
            ) : (
              <span key={i} className={`px-3 py-1.5 rounded-md text-xs font-bold ${item.color}`}>{item.state}</span>
            )
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
            <p className="text-xs text-rose-400 font-semibold">LOCKED is irreversible</p>
            <p className="text-[11px] text-slate-400 mt-1">Once locked, corrections require a REVERSED settlement + new settlement</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs text-amber-400 font-semibold">Maker-Checker for APPROVED</p>
            <p className="text-[11px] text-slate-400 mt-1">Different users must calculate vs approve (configurable per organization)</p>
          </div>
        </div>
      </div>

      {/* Commission Engine */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Commission Distribution</h3>
        <div className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
          <div className="text-center mb-4">
            <p className="text-xs text-slate-500">Gross Revenue</p>
            <p className="text-2xl font-bold text-white">10,000.00</p>
          </div>
          <div className="space-y-2">
            {[
              { level: 'Supersenior Share (10%)', amount: '1,000.00', color: 'bg-emerald-500/20 border-emerald-500/30' },
              { level: 'Master Share (5%)', amount: '500.00', color: 'bg-cyan-500/20 border-cyan-500/30' },
              { level: 'Agent Share (3%)', amount: '300.00', color: 'bg-violet-500/20 border-violet-500/30' },
              { level: 'Net Platform Revenue', amount: '8,200.00', color: 'bg-amber-500/20 border-amber-500/30' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border ${item.color}`}>
                <span className="text-xs font-medium text-white">{item.level}</span>
                <span className="text-sm font-bold font-mono text-white">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Commission percentages are <strong>configuration-driven</strong>, never hard-coded. Each level's share 
          is stored in commission_rules and snapshotted in commission_distributions.
        </p>
      </div>

      {/* Commission Snapshot */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Commission Snapshot (Per Settlement)</h3>
        <div className="overflow-x-auto">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Purpose</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                { field: 'commission_id', purpose: 'Unique commission record', example: 'CM-20260215-001' },
                { field: 'settlement_id', purpose: 'Links to settlement', example: '42' },
                { field: 'beneficiary_id', purpose: 'Who receives commission', example: 'master_id: 5' },
                { field: 'beneficiary_level', purpose: 'Hierarchy level', example: 'MASTER' },
                { field: 'calculation_rule', purpose: 'Which rule was applied', example: 'GROSS_PERCENTAGE' },
                { field: 'commission_rate', purpose: 'Rate used (snapshotted)', example: '5.0000%' },
                { field: 'base_amount', purpose: 'What the rate was applied to', example: '10,000.0000' },
                { field: 'commission_amount', purpose: 'Result of calculation', example: '500.0000' },
                { field: 'rate_version_id', purpose: 'Which rate version', example: 'v3' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-mono text-xs text-emerald-400">{row.field}</td>
                  <td className="text-xs text-slate-400">{row.purpose}</td>
                  <td className="font-mono text-xs text-cyan-400">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Period Types */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Settlement Period Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            { type: 'PER_DRAW', desc: 'Each draw settled individually' },
            { type: 'DAILY', desc: 'All draws in a day aggregated' },
            { type: 'WEEKLY', desc: 'Weekly aggregation' },
            { type: 'MONTHLY', desc: 'Monthly aggregation' },
            { type: 'CUSTOM', desc: 'Custom date range' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 text-center">
              <span className="badge badge-emerald">{item.type}</span>
              <p className="text-[11px] text-slate-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
