export default function SectionFinancial() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Financial Architecture — Immutable Ledger</h3>
        <p className="text-sm text-slate-400 mb-4">
          The financial system uses an <strong className="text-emerald-400">append-only ledger</strong> pattern. 
          Balances are <strong className="text-cyan-400">projected from ledger entries</strong>, never stored as mutable state. 
          All amounts use <strong className="text-amber-400">DECIMAL(18,4)</strong> — never floating point.
        </p>
      </div>

      {/* Core Principle */}
      <div className="section-card border border-rose-500/20 bg-rose-500/5">
        <h3 className="text-sm font-semibold text-rose-400 mb-2">⚠ Critical Financial Rule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-2 font-semibold">NEVER DO THIS:</p>
            <div className="code-block text-xs">
              <span className="comment">// ❌ Direct balance mutation</span>{'\n'}
              <span className="keyword">UPDATE</span> accounts{'\n'}
              <span className="keyword">SET</span> balance = balance - 500{'\n'}
              <span className="keyword">WHERE</span> id = 42;
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-2 font-semibold">ALWAYS DO THIS:</p>
            <div className="code-block text-xs">
              <span className="comment">// ✓ Immutable ledger entry</span>{'\n'}
              <span className="keyword">INSERT INTO</span> ledger_entries{'\n'}
              (account_id, type, amount,{'\n'}
              &nbsp;balance_before, balance_after){'\n'}
              <span className="keyword">VALUES</span> (42, <span className="string">'DEBIT'</span>, -500.0000,{'\n'}
              &nbsp;1000.0000, 500.0000);
            </div>
          </div>
        </div>
      </div>

      {/* Account + Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="section-card">
          <h3 className="text-sm font-semibold text-white mb-3">Financial Account</h3>
          <div className="code-block text-xs">
            <span className="type">financial_accounts</span>{'\n'}
            ├── id (BIGINT PK){'\n'}
            ├── organization_id (FK){'\n'}
            ├── user_id (FK → users){'\n'}
            ├── account_type (ENUM){'\n'}
            │&nbsp;&nbsp; ├── CREDIT{'\n'}
            │&nbsp;&nbsp; ├── WALLET{'\n'}
            │&nbsp;&nbsp; └── HOLDING{'\n'}
            ├── currency (CHAR(3)){'\n'}
            ├── status (ENUM){'\n'}
            │&nbsp;&nbsp; ├── ACTIVE{'\n'}
            │&nbsp;&nbsp; ├── FROZEN{'\n'}
            │&nbsp;&nbsp; └── CLOSED{'\n'}
            ├── credit_limit (DECIMAL 18,4){'\n'}
            ├── allocated_credit (DECIMAL 18,4){'\n'}
            └── created_at, updated_at
          </div>
        </div>
        <div className="section-card">
          <h3 className="text-sm font-semibold text-white mb-3">Ledger Entry</h3>
          <div className="code-block text-xs">
            <span className="type">ledger_entries</span>{'\n'}
            ├── id (BIGINT PK){'\n'}
            ├── account_id (FK){'\n'}
            ├── transaction_type (ENUM){'\n'}
            │&nbsp;&nbsp; ├── CREDIT / DEBIT{'\n'}
            │&nbsp;&nbsp; ├── BET_HOLD / BET_RELEASE{'\n'}
            │&nbsp;&nbsp; ├── WIN / LOSS{'\n'}
            │&nbsp;&nbsp; ├── COMMISSION{'\n'}
            │&nbsp;&nbsp; ├── ADJUSTMENT / REVERSAL{'\n'}
            │&nbsp;&nbsp; ├── TRANSFER_IN / TRANSFER_OUT{'\n'}
            │&nbsp;&nbsp; └── SETTLEMENT / REFUND{'\n'}
            ├── amount (DECIMAL 18,4){'\n'}
            ├── balance_before (DECIMAL 18,4){'\n'}
            ├── balance_after (DECIMAL 18,4){'\n'}
            ├── idempotency_key (UNIQUE){'\n'}
            └── request_id (correlation)
          </div>
        </div>
      </div>

      {/* Credit Flow */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Credit Hierarchy Flow</h3>
        <div className="flex flex-col items-center gap-2 py-4">
          {[
            { label: 'SUPERSENIOR — Credit Pool', sub: 'Total organization credit', color: 'border-emerald-500/40 bg-emerald-500/10' },
            { label: '↓ ALLOCATE ↓', sub: '', color: 'text-slate-600' },
            { label: 'MASTER — Allocated Credit', sub: 'Cannot exceed parent allocation', color: 'border-cyan-500/40 bg-cyan-500/10' },
            { label: '↓ ALLOCATE ↓', sub: '', color: 'text-slate-600' },
            { label: 'AGENT — Allocated Credit', sub: 'Cannot exceed master allocation', color: 'border-violet-500/40 bg-violet-500/10' },
            { label: '↓ ALLOCATE ↓', sub: '', color: 'text-slate-600' },
            { label: 'MEMBER — Available Credit', sub: 'Cannot exceed agent allocation', color: 'border-amber-500/40 bg-amber-500/10' },
          ].map((item, i) => (
            <div key={i} className={item.sub ? `w-full max-w-md px-4 py-3 rounded-lg border ${item.color} text-center` : ''}>
              {item.sub ? (
                <>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </>
              ) : (
                <p className={`text-xs ${item.color}`}>{item.label}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
          <p className="text-xs text-slate-400">
            <strong className="text-amber-400">Constraint:</strong> Sum of all child allocations ≤ Parent's allocated credit.
            Enforced server-side with row-level locking during transfer.
          </p>
        </div>
      </div>

      {/* Transaction Types */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Financial Transaction Types</h3>
        <div className="overflow-x-auto">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Direction</th>
                <th>Trigger</th>
                <th>Reversible</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'CREDIT', dir: '+', trigger: 'Credit allocation from parent', rev: 'Yes (REVERSAL)' },
                { type: 'DEBIT', dir: '−', trigger: 'Credit reduction', rev: 'Yes (REVERSAL)' },
                { type: 'BET_HOLD', dir: '−', trigger: 'Bet accepted (funds reserved)', rev: 'Yes (BET_RELEASE)' },
                { type: 'BET_RELEASE', dir: '+', trigger: 'Bet cancelled/voided', rev: 'No' },
                { type: 'WIN', dir: '+', trigger: 'Settlement — winning bet', rev: 'Via REVERSAL workflow' },
                { type: 'LOSS', dir: '±', trigger: 'Settlement — losing bet (hold released)', rev: 'Via REVERSAL workflow' },
                { type: 'COMMISSION', dir: '+', trigger: 'Commission distribution', rev: 'Via REVERSAL workflow' },
                { type: 'ADJUSTMENT', dir: '±', trigger: 'Manual correction (requires approval)', rev: 'Via compensating entry' },
                { type: 'REVERSAL', dir: '±', trigger: 'Undo previous entry', rev: 'No' },
                { type: 'TRANSFER_IN', dir: '+', trigger: 'Credit received from another account', rev: 'Via REVERSAL' },
                { type: 'TRANSFER_OUT', dir: '−', trigger: 'Credit sent to another account', rev: 'Via REVERSAL' },
                { type: 'SETTLEMENT', dir: '±', trigger: 'Settlement posting', rev: 'Via settlement reversal' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-mono text-xs text-emerald-400">{row.type}</td>
                  <td className={`text-sm ${row.dir === '+' ? 'text-emerald-400' : 'text-rose-400'}`}>{row.dir}</td>
                  <td className="text-xs text-slate-400">{row.trigger}</td>
                  <td className="text-xs text-slate-400">{row.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Atomic Operations */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Database Transaction Boundaries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { op: 'Bet Placement', steps: 'Validate → Lock account → Create bet → Create ledger (BET_HOLD) → Update exposure → Commit' },
            { op: 'Credit Transfer', steps: 'Validate → Lock sender → Lock receiver → Create ledger (OUT) → Create ledger (IN) → Update allocations → Commit' },
            { op: 'Settlement', steps: 'Lock draw → Calculate results → Create settlement → Create ledger entries → Post commissions → Commit' },
            { op: 'Reversal', steps: 'Validate original → Create compensating entry → Update balances → Audit log → Commit' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <span className="text-xs font-semibold text-cyan-400">{item.op}</span>
              <p className="text-xs text-slate-400 mt-1 font-mono">{item.steps}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reconciliation */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Reconciliation Engine</h3>
        <p className="text-xs text-slate-400 mb-3">
          The ReconciliationService runs periodically (and on-demand) to detect discrepancies:
        </p>
        <div className="space-y-2">
          {[
            'Ledger balance ≠ SUM(ledger_entries) for account',
            'Settled bet count ≠ Settlement bet references',
            'Commission total ≠ SUM(commission_distributions)',
            'Credit allocated ≠ SUM(child allocations)',
            'Exposure calculated ≠ SUM(open bets)',
          ].map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="text-amber-400">⚡</span>
              <span className="text-slate-300">{check}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
