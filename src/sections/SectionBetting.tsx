export default function SectionBetting() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Betting Architecture — Validation Pipeline</h3>
        <p className="text-sm text-slate-400 mb-4">
          The BettingService implements a <strong className="text-emerald-400">22-step validation pipeline</strong> that runs 
          entirely server-side. Every bet creates an <strong className="text-cyan-400">immutable transaction</strong> with 
          full hierarchy trace and rate snapshot. All financial operations are <strong className="text-amber-400">atomic and idempotent</strong>.
        </p>
      </div>

      {/* Validation Pipeline */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">22-Step Validation Pipeline</h3>
        <div className="space-y-1">
          {[
            { step: 1, name: 'Authenticate', desc: 'Valid session/token', critical: false },
            { step: 2, name: 'Authorize', desc: 'Has bet.create permission', critical: false },
            { step: 3, name: 'Validate Member Status', desc: 'Account is ACTIVE', critical: true },
            { step: 4, name: 'Validate Hierarchy', desc: 'Agent and upstream are ACTIVE', critical: true },
            { step: 5, name: 'Validate Product', desc: 'Product exists and is ACTIVE', critical: true },
            { step: 6, name: 'Validate Draw', desc: 'Draw exists for product', critical: true },
            { step: 7, name: 'Validate Draw Time', desc: 'Server time < betting_close_at', critical: true },
            { step: 8, name: 'Validate Betting Type', desc: 'Type exists and is enabled', critical: true },
            { step: 9, name: 'Validate Member Authorization', desc: 'Member profile allows this type', critical: true },
            { step: 10, name: 'Load Effective Rate', desc: 'Resolve rate via RateResolver', critical: true },
            { step: 11, name: 'Validate Number Format', desc: 'Matches betting type pattern', critical: true },
            { step: 12, name: 'Validate Amount', desc: 'min ≤ amount ≤ max', critical: true },
            { step: 13, name: 'Validate Per-Bet Limit', desc: 'Within configured maximum', critical: true },
            { step: 14, name: 'Validate Per-Number Limit', desc: 'Number-specific cap not exceeded', critical: true },
            { step: 15, name: 'Validate Per-Draw Limit', desc: 'Total per draw not exceeded', critical: true },
            { step: 16, name: 'Validate Member Exposure', desc: 'Member exposure limit OK', critical: true },
            { step: 17, name: 'Validate Agent Exposure', desc: 'Agent exposure limit OK', critical: true },
            { step: 18, name: 'Validate System Risk', desc: 'Organization risk limit OK', critical: true },
            { step: 19, name: 'Validate Credit/Wallet', desc: 'Sufficient available balance', critical: true },
            { step: 20, name: 'Generate Idempotency Key', desc: 'Check for duplicate request', critical: true },
            { step: 21, name: 'Create Immutable Bet', desc: 'INSERT with rate snapshot', critical: true },
            { step: 22, name: 'Create Ledger Entry', desc: 'BET_HOLD transaction', critical: true },
          ].map((item) => (
            <div key={item.step} className={`flex items-center gap-3 px-3 py-2 rounded ${item.critical ? 'bg-slate-800/30' : 'bg-slate-800/10'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${item.critical ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                {item.step}
              </span>
              <span className="text-xs font-medium text-white w-48">{item.name}</span>
              <span className="text-xs text-slate-400 flex-1">{item.desc}</span>
              {item.critical && <span className="badge badge-rose">BLOCKING</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Bet State Machine */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Bet Status State Machine</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2 font-semibold">Legal Transitions:</p>
            <div className="space-y-1">
              {[
                'PENDING → ACCEPTED (validation passed)',
                'PENDING → REJECTED (validation failed)',
                'ACCEPTED → CANCELLED (before draw close)',
                'ACCEPTED → WON (settlement — winning)',
                'ACCEPTED → LOST (settlement — losing)',
                'ACCEPTED → VOID (system/admin void)',
                'WON → SETTLED (payout posted)',
                'LOST → SETTLED (hold released)',
                'ANY → VOID (with audit trail)',
              ].map((t, i) => (
                <p key={i} className="text-xs text-slate-300 font-mono">{t}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 font-semibold">Immutability Rules:</p>
            <div className="space-y-2">
              <div className="p-2 rounded bg-rose-500/5 border border-rose-500/20">
                <p className="text-xs text-rose-400">ACCEPTED bets cannot be directly edited</p>
              </div>
              <div className="p-2 rounded bg-amber-500/5 border border-amber-500/20">
                <p className="text-xs text-amber-400">Corrections use CANCEL + new bet or VOID workflow</p>
              </div>
              <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-xs text-emerald-400">Every change creates audit log entry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Idempotency */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Idempotency Design</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2">Request:</p>
            <div className="code-block text-xs">
              <span className="keyword">POST</span> /api/v1/bets{'\n'}
              <span className="type">Idempotency-Key</span>: idem_abc123{'\n'}
              {'{'}  {'\n'}
              &nbsp;&nbsp;<span className="string">"draw_id"</span>: 42,{'\n'}
              &nbsp;&nbsp;<span className="string">"betting_type_id"</span>: 5,{'\n'}
              &nbsp;&nbsp;<span className="string">"number"</span>: <span className="string">"123"</span>,{'\n'}
              &nbsp;&nbsp;<span className="string">"amount"</span>: <span className="number">100.00</span>{'\n'}
              {'}'}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2">Behavior:</p>
            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-800/40 text-xs text-slate-300">
                <strong className="text-emerald-400">First request:</strong> Process normally, store key + result
              </div>
              <div className="p-2 rounded bg-slate-800/40 text-xs text-slate-300">
                <strong className="text-cyan-400">Duplicate request:</strong> Return original response (200/201), no side effects
              </div>
              <div className="p-2 rounded bg-slate-800/40 text-xs text-slate-300">
                <strong className="text-amber-400">Conflict:</strong> Same key, different payload → 409 CONFLICT
              </div>
              <div className="p-2 rounded bg-slate-800/40 text-xs text-slate-300">
                <strong className="text-violet-400">Expiry:</strong> Keys retained for 24h (configurable)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concurrency */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Concurrency Control</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { scenario: 'Double-spend', solution: 'SELECT FOR UPDATE on financial_account before debit', icon: '🔒' },
            { scenario: 'Duplicate bet', solution: 'UNIQUE constraint on idempotency_key', icon: '🔑' },
            { scenario: 'Overselling exposure', solution: 'Row lock + atomic exposure check within transaction', icon: '⚡' },
            { scenario: 'Race on draw close', solution: 'Server time authoritative, re-validate at commit', icon: '⏰' },
            { scenario: 'Double settlement', solution: 'UNIQUE on (draw_id, period_type) + idempotency_key', icon: '🛡️' },
            { scenario: 'Concurrent rate change', solution: 'Optimistic lock via version_number', icon: '📊' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-lg">{item.icon}</span>
              <p className="text-xs font-semibold text-white mt-1">{item.scenario}</p>
              <p className="text-[11px] text-slate-400 mt-1">{item.solution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Receipt */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Transaction Receipt</h3>
        <div className="max-w-sm mx-auto p-4 rounded-lg bg-white/5 border border-slate-600/30 font-mono text-xs">
          <div className="text-center border-b border-slate-700 pb-2 mb-3">
            <p className="text-emerald-400 font-bold">BET CONFIRMED</p>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-slate-500">Transaction ID:</span><span>BT-20260215-001847</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Product:</span><span>Government Lottery</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Draw:</span><span>Draw #2026-042</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Type:</span><span>3-digit</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Number:</span><span>123</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Amount:</span><span>100.00</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Rate:</span><span>75.00%</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Time:</span><span>2026-02-15 14:32:07 UTC</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className="text-emerald-400">ACCEPTED</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
