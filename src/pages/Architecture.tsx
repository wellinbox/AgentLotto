import { Database, Shield, Server, Lock, GitBranch, Layers, Cpu, Globe } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Phase 1 — System Architecture</h1>
        <p className="text-gray-500 mt-2">Multi-Level Agent Lottery Management & Settlement Platform</p>
        <p className="text-xs text-gray-400 mt-1">Technical Specification & Design Document</p>
      </div>

      {/* A. System Architecture */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Server size={22} className="text-emerald-500" /> A. System Architecture
        </h2>
        <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-emerald-400 overflow-x-auto">
          <pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Supersenior│  │  Master  │  │  Agent   │  │  Member  │       │
│  │Dashboard  │  │Dashboard │  │Dashboard │  │  Betting │       │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘       │
│        └──────────────┴──────────────┴──────────────┘           │
│                           │ HTTPS                                │
├───────────────────────────┼─────────────────────────────────────┤
│                     API GATEWAY                                  │
│         ┌─────────────────┼─────────────────┐                   │
│         │    Auth Middleware │ Rate Limiter   │                   │
│         │    RBAC/SBAC       │ Idempotency    │                   │
│         └─────────────────┬─────────────────┘                   │
├───────────────────────────┼─────────────────────────────────────┤
│                    SERVICE LAYER                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │Hierarchy │ │  Rate    │ │  Bet     │ │ Credit   │          │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │          │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤          │
│  │Permission│ │Commission│ │Settlement│ │ Ledger   │          │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │          │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤          │
│  │  Audit   │ │Exposure  │ │Reconcile │ │Notifica- │          │
│  │ Service  │ │ Service  │ │ Service  │ │  tion    │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
├─────────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  MySQL   │ │  Redis   │ │  Queue   │ │  File    │          │
│  │  8.0+    │ │  Cache   │ │ Workers  │ │ Storage  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>
      </section>

      {/* B. Domain Model */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Layers size={22} className="text-blue-500" /> B. Domain Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { domain: 'Identity & Access', entities: 'users, roles, permissions, sessions, 2FA' },
            { domain: 'Hierarchy', entities: 'agent_relationships, scopes, downline' },
            { domain: 'Product & Draw', entities: 'products, draws, betting_types, rules' },
            { domain: 'Rate Engine', entities: 'rate_profiles, rate_items, rate_versions' },
            { domain: 'Betting', entities: 'bets, bet_items, transactions' },
            { domain: 'Credit & Ledger', entities: 'credit_accounts, credit_ledger' },
            { domain: 'Commission', entities: 'commissions, distributions' },
            { domain: 'Settlement', entities: 'settlements, settlement_items' },
            { domain: 'Risk & Exposure', entities: 'exposure_limits, risk_config' },
            { domain: 'Audit', entities: 'audit_logs, security_events' },
            { domain: 'Notification', entities: 'notifications, channels' },
            { domain: 'System Config', entities: 'system_settings, policies' },
          ].map((d) => (
            <div key={d.domain} className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-sm text-gray-800">{d.domain}</p>
              <p className="text-xs text-gray-500 mt-1">{d.entities}</p>
            </div>
          ))}
        </div>
      </section>

      {/* C. Database ERD */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Database size={22} className="text-purple-500" /> C. Database ERD (Core Tables)
        </h2>
        <div className="bg-slate-900 rounded-xl p-5 text-xs font-mono text-gray-300 overflow-x-auto">
          <pre>{`
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│     users        │     │ agent_relations  │     │     roles       │
├─────────────────┤     ├──────────────────┤     ├─────────────────┤
│ id (PK)         │◄────│ user_id (FK)     │     │ id (PK)         │
│ username        │     │ parent_id (FK)   │────►│ name            │
│ display_name    │     │ level            │     │ scope           │
│ role_id (FK)    │     │ depth            │     └────────┬────────┘
│ parent_id (FK)  │     │ path (ltree)     │              │
│ status          │     └──────────────────┘     ┌────────▼────────┐
│ credit_limit    │                              │  permissions    │
│ created_at      │                              ├─────────────────┤
│ updated_at      │                              │ id (PK)         │
└───────┬─────────┘                              │ code            │
        │                                        │ description     │
        ▼                                        │ scope           │
┌─────────────────┐     ┌──────────────────┐     └─────────────────┘
│ credit_accounts │     │  credit_ledger   │
├─────────────────┤     ├──────────────────┤
│ id (PK)         │◄────│ account_id (FK)  │
│ user_id (FK)    │     │ type             │
│ credit_limit    │     │ amount           │
│ allocated       │     │ balance_before   │
│ used            │     │ balance_after    │
│ exposure        │     │ reference        │
└─────────────────┘     │ idempotency_key  │
                        │ created_by (FK)  │
┌─────────────────┐     └──────────────────┘
│    products     │     ┌──────────────────┐
├─────────────────┤     │     draws        │
│ id (PK)         │◄────├──────────────────┤
│ name            │     │ id (PK)          │
│ code            │     │ product_id (FK)  │
│ status          │     │ name             │
└───────┬─────────┘     │ draw_date        │
        │               │ open_at          │
        ▼               │ close_at         │
┌─────────────────┐     │ status           │
│  betting_types  │     │ result           │
├─────────────────┤     └────────┬─────────┘
│ id (PK)         │              │
│ product_id (FK) │              ▼
│ name            │     ┌──────────────────┐
│ code            │     │     bets         │
│ number_format   │     ├──────────────────┤
│ min_amount      │     │ id (PK)          │
│ max_amount      │     │ transaction_id   │
│ max_exposure    │     │ member_id (FK)   │
└─────────────────┘     │ agent_id (FK)    │
                        │ master_id (FK)   │
┌─────────────────┐     │ product_id (FK)  │
│  rate_profiles  │     │ draw_id (FK)     │
├─────────────────┤     │ betting_type_id  │
│ id (PK)         │     │ bet_number       │
│ name            │     │ amount           │
│ effective_date  │     │ effective_rate   │
│ version         │     │ rate_version_id  │
└───────┬─────────┘     │ status           │
        │               │ idempotency_key  │
        ▼               └──────────────────┘
┌─────────────────┐
│rate_profile_items│    ┌──────────────────┐
├─────────────────┤    │   settlements    │
│ id (PK)         │    ├──────────────────┤
│ profile_id (FK) │    │ id (PK)          │
│ product_id (FK) │    │ period_start     │
│ bet_type_id(FK) │    │ period_end       │
│ rate            │    │ gross_amount     │
│ max_rate        │    │ payout_amount    │
└─────────────────┘    │ commission_amount│
                       │ net_amount       │
                       │ status           │
                       │ approved_by (FK) │
                       └──────────────────┘
          `}</pre>
        </div>
      </section>

      {/* D. Permission Matrix */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Shield size={22} className="text-red-500" /> D. Permission Matrix (RBAC + Scope)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Permission</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Supersenior</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Master</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Agent</th>
                <th className="text-center px-3 py-2 font-medium text-gray-600">Member</th>
                <th className="text-left px-3 py-2 font-medium text-gray-600">Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                { perm: 'user.create', ss: '✓', ms: '✓', ag: '✓', mb: '—', scope: 'DOWNLINE' },
                { perm: 'user.suspend', ss: '✓', ms: '✓', ag: '✓', mb: '—', scope: 'DOWNLINE' },
                { perm: 'rate.edit', ss: '✓', ms: '✓', ag: '✓', mb: '—', scope: 'DOWNLINE' },
                { perm: 'credit.allocate', ss: '✓', ms: '✓', ag: '—', mb: '—', scope: 'DOWNLINE' },
                { perm: 'credit.view', ss: '✓', ms: '✓', ag: '✓', mb: 'SELF', scope: 'VARIES' },
                { perm: 'bet.create', ss: '—', ms: '—', ag: '—', mb: '✓', scope: 'SELF' },
                { perm: 'settlement.approve', ss: '✓', ms: '✓', ag: '—', mb: '—', scope: 'DOWNLINE' },
                { perm: 'settlement.lock', ss: '✓', ms: '—', ag: '—', mb: '—', scope: 'GLOBAL' },
                { perm: 'audit.view', ss: '✓', ms: '✓', ag: '—', mb: '—', scope: 'DOWNLINE' },
                { perm: 'report.export', ss: '✓', ms: '✓', ag: '✓', mb: '—', scope: 'DOWNLINE' },
                { perm: 'product.create', ss: '✓', ms: '—', ag: '—', mb: '—', scope: 'GLOBAL' },
                { perm: 'draw.manage', ss: '✓', ms: '✓', ag: '—', mb: '—', scope: 'DOWNLINE' },
              ].map((row) => (
                <tr key={row.perm} className="border-b border-gray-50">
                  <td className="px-3 py-2 font-mono">{row.perm}</td>
                  <td className="text-center px-3 py-2">{row.ss === '✓' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="text-center px-3 py-2">{row.ms === '✓' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="text-center px-3 py-2">{row.ag === '✓' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="text-center px-3 py-2">{row.mb === '✓' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="px-3 py-2"><span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{row.scope}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* E. Agent Hierarchy Model */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <GitBranch size={22} className="text-orange-500" /> E. Agent Hierarchy Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Dynamic Hierarchy (Extensible)</h3>
            <div className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-emerald-400">
              <pre>{`
SUPERSENIOR (Level 0)
    │
    ├── MASTER (Level 1)
    │   │
    │   ├── AGENT (Level 2)
    │   │   ├── MEMBER (Level 3)
    │   │   └── MEMBER (Level 3)
    │   │
    │   └── AGENT (Level 2)
    │       └── MEMBER (Level 3)
    │
    └── MASTER (Level 1)
        └── AGENT (Level 2)

Future extension:
SUPERSENIOR → SENIOR_MASTER → MASTER
→ SUB_MASTER → AGENT → MEMBER
              `}</pre>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Key Properties</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Parent-child relationships with unlimited depth</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Materialized path (ltree) for efficient traversal</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Scope-based access: GLOBAL, DOWNLINE, SELF</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Downline reporting & financial calculations</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Credit flows through hierarchy levels</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Rate inheritance from parent to child</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Child cannot exceed parent limits</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Data isolation enforced at query level</li>
            </ul>
          </div>
        </div>
      </section>

      {/* F. Rate Inheritance Model */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Cpu size={22} className="text-indigo-500" /> F. Rate Inheritance Model
        </h2>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white mb-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { level: 'System Max', rate: '90%', desc: 'Global ceiling' },
              { level: 'Master Rate', rate: '85%', desc: '≤ System Max' },
              { level: 'Agent Rate', rate: '82%', desc: '≤ Master Rate' },
              { level: 'Member Effective', rate: '82%', desc: '= Agent Rate' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="bg-white/10 rounded-lg px-4 py-3">
                    <p className="text-xs opacity-70">{item.level}</p>
                    <p className="text-2xl font-bold text-emerald-400">{item.rate}</p>
                    <p className="text-xs opacity-50">{item.desc}</p>
                  </div>
                </div>
                {i < 3 && <span className="text-2xl text-slate-500">→</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Rate Versioning Rules</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Each rate change creates immutable version</li>
              <li>• Transactions snapshot rate_version_id</li>
              <li>• Historical rates never recalculated</li>
              <li>• Effective date determines applicable version</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-800 mb-2">Rate Matrix Dimensions</h4>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>• Product × Betting Type</li>
              <li>• Agent-level overrides</li>
              <li>• Member-level overrides</li>
              <li>• Effective date ranges</li>
            </ul>
          </div>
        </div>
      </section>

      {/* G. Credit Model */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Lock size={22} className="text-amber-500" /> G. Credit & Ledger Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Double-Entry Ledger</h3>
            <div className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-emerald-400">
              <pre>{`
Every movement creates a ledger entry:

LedgerEntry {
  id: UUID
  account_id: FK
  type: ENUM(
    INITIAL_CREDIT,
    CREDIT_ALLOCATION,
    BET_DEBIT,
    SETTLEMENT_CREDIT,
    ADJUSTMENT,
    REVERSAL,
    WITHDRAWAL,
    REFUND
  )
  amount: DECIMAL(18,2)
  balance_before: DECIMAL(18,2)
  balance_after: DECIMAL(18,2)
  reference: VARCHAR
  idempotency_key: UNIQUE
  created_by: FK
  created_at: TIMESTAMP
}

Rules:
- NEVER modify past entries
- NEVER update balance directly
- Always create new entry
- balance_after = balance_before + amount
- Atomic within DB transaction
              `}</pre>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Credit Hierarchy Flow</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Supersenior allocates to Masters</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Masters allocate to Agents</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Agents allocate to Members</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Child limit ≤ Parent available</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Bets debit from member account</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Settlements credit winning accounts</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Adjustments require approval workflow</li>
              <li className="flex items-start gap-2"><span className="text-amber-500">•</span> Reconciliation: Account vs Ledger</li>
            </ul>
          </div>
        </div>
      </section>

      {/* H. Betting Flow */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Globe size={22} className="text-teal-500" /> H. Betting Validation Flow
        </h2>
        <div className="bg-slate-900 rounded-xl p-6 text-xs font-mono text-emerald-400 overflow-x-auto">
          <pre>{`
Member submits bet
        │
        ▼
┌───────────────────┐
│ Member Active?    │──NO──► REJECT: MEMBER_INACTIVE
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Agent Active?     │──NO──► REJECT: AGENT_INACTIVE
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Product Available?│──NO──► REJECT: PRODUCT_UNAVAILABLE
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Draw Open?        │──NO──► REJECT: DRAW_CLOSED
│ (Server Time)     │
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Bet Type Enabled? │──NO──► REJECT: TYPE_DISABLED
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Member Authorized?│──NO──► REJECT: NOT_AUTHORIZED
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Rate Available?   │──NO──► REJECT: NO_RATE_CONFIGURED
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Amount Valid?     │──NO──► REJECT: INVALID_AMOUNT
│ (min/max check)   │
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Number Format?    │──NO──► REJECT: INVALID_FORMAT
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────┐
│ Per-bet Limit?    │──NO──► REJECT: EXCEEDS_BET_LIMIT
└───────┬───────────┘
        │ PASS
        ▼
┌───────────────────┐
│ Per-number Limit? │──NO──► REJECT: EXCEEDS_NUMBER_LIMIT
└───────┬───────────┘
        │ PASS
        ▼
┌───────────────────┐
│ Member Exposure?  │──NO──► REJECT: EXCEEDS_MEMBER_EXPOSURE
└───────┬───────────┘
        │ PASS
        ▼
┌───────────────────┐
│ Agent Exposure?   │──NO──► REJECT: EXCEEDS_AGENT_EXPOSURE
└───────┬───────────┘
        │ PASS
        ▼
┌───────────────────┐
│ System Risk?      │──NO──► REJECT: EXCEEDS_SYSTEM_RISK
└───────┬───────────┘
        │ PASS
        ▼
┌───────────────────┐
│ Credit/Wallet OK? │──NO──► REJECT: INSUFFICIENT_CREDIT
└───────┬───────────┘
        │ YES
        ▼
┌───────────────────────────────────────────┐
│ BEGIN TRANSACTION                         │
│  → Create bet record                      │
│  → Debit member credit                    │
│  → Update exposure counters               │
│  → Create ledger entry                    │
│  → Calculate commissions                  │
│  → Create audit log                       │
│ COMMIT                                    │
└───────────────────────────────────────────┘
        │
        ▼
  Return Transaction Receipt
          `}</pre>
        </div>
      </section>

      {/* I. Settlement Flow */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Layers size={22} className="text-cyan-500" /> I. Settlement Flow
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-4">
          {['Draw Result Published', '→', 'Identify Winning Bets', '→', 'Calculate Payouts', '→', 'Calculate Gross', '→', 'Commission Engine', '→', 'Hierarchy Distribution', '→', 'Net Calculation', '→', 'Ledger Entries', '→', 'Settlement Record', '→', 'Review', '→', 'Approve', '→', 'Lock'].map((step, i) => (
            step === '→' ? <span key={i} className="text-gray-300 text-lg">→</span> : <span key={i} className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded border border-cyan-200">{step}</span>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
          <p className="font-semibold mb-2">Settlement States: OPEN → CALCULATING → CALCULATED → REVIEW → APPROVED → LOCKED</p>
          <p>After LOCKED: No direct edits. Corrections via Adjustment/Reversal workflows only.</p>
          <p className="mt-1">Settlement periods: DAILY | WEEKLY | MONTHLY | CUSTOM | PER_DRAW</p>
        </div>
      </section>

      {/* J. Security Model */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Shield size={22} className="text-red-500" /> J. Security Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Authentication</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Password hashing: Argon2id</li>
              <li>• Session security with secure cookies</li>
              <li>• 2FA support (TOTP)</li>
              <li>• Brute-force protection</li>
              <li>• Rate limiting on auth endpoints</li>
              <li>• Secure password reset flow</li>
            </ul>
            <h3 className="font-semibold text-gray-700 mt-4">Authorization</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• RBAC + Scope-Based Access Control</li>
              <li>• Server-side enforcement only</li>
              <li>• IDOR protection on all endpoints</li>
              <li>• Hierarchy scope validation</li>
              <li>• No frontend-only security</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Financial Security</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Idempotency keys on all financial ops</li>
              <li>• Database transaction locking</li>
              <li>• Atomic operations (no partial states)</li>
              <li>• Immutable ledger (append-only)</li>
              <li>• DECIMAL precision (no floating point)</li>
              <li>• Maker-checker for sensitive operations</li>
            </ul>
            <h3 className="font-semibold text-gray-700 mt-4">Infrastructure</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• CSRF protection</li>
              <li>• XSS prevention (output encoding)</li>
              <li>• SQL injection protection (parameterized)</li>
              <li>• Security headers (CSP, HSTS, etc.)</li>
              <li>• Secrets in environment variables</li>
              <li>• Audit logging for all actions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* K. Technology Architecture */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <Cpu size={22} className="text-violet-500" /> K. Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Backend</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Laravel (PHP 8.3+)</li>
              <li>• REST API architecture</li>
              <li>• Service Layer pattern</li>
              <li>• Repository pattern</li>
              <li>• Queue workers (Redis)</li>
              <li>• Scheduled tasks</li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">Frontend</h3>
            <ul className="text-xs text-emerald-700 space-y-1">
              <li>• React / Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Role-based UI rendering</li>
              <li>• Responsive design</li>
              <li>• Real-time updates</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Infrastructure</h3>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>• Docker containers</li>
              <li>• Nginx reverse proxy</li>
              <li>• MySQL 8.0+</li>
              <li>• Redis cache & queue</li>
              <li>• SSL/TLS</li>
              <li>• Automated backups</li>
            </ul>
          </div>
        </div>
      </section>

      {/* L. Development Roadmap */}
      <section className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
          <GitBranch size={22} className="text-pink-500" /> L. Development Roadmap
        </h2>
        <div className="space-y-3">
          {[
            { phase: 1, title: 'Architecture & Requirements', status: 'current', desc: 'System design, ERD, permission model, specification' },
            { phase: 2, title: 'Database', status: 'pending', desc: 'Migrations, models, relationships, seeders, constraints' },
            { phase: 3, title: 'Auth & Authorization', status: 'pending', desc: 'Login, RBAC, scope-based access, hierarchy control' },
            { phase: 4, title: 'Agent Management', status: 'pending', desc: 'Hierarchy CRUD, tree, status management' },
            { phase: 5, title: 'Product & Draw Management', status: 'pending', desc: 'Products, draws, betting types, state machine' },
            { phase: 6, title: 'Rate Engine', status: 'pending', desc: 'Rate profiles, inheritance, versioning, limits' },
            { phase: 7, title: 'Credit & Ledger', status: 'pending', desc: 'Credit accounts, ledger, adjustments, reconciliation' },
            { phase: 8, title: 'Betting Engine', status: 'pending', desc: 'Validation pipeline, exposure, idempotency' },
            { phase: 9, title: 'Result & Settlement', status: 'pending', desc: 'Results, settlement, commission, distribution' },
            { phase: 10, title: 'Reports', status: 'pending', desc: 'All report types with export capabilities' },
            { phase: 11, title: 'Security Hardening', status: 'pending', desc: 'Authorization audit, penetration testing' },
            { phase: 12, title: 'Production Deployment', status: 'pending', desc: 'Docker, Nginx, SSL, monitoring, backups' },
          ].map((p) => (
            <div key={p.phase} className={`flex items-center gap-4 p-3 rounded-lg ${p.status === 'current' ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${p.status === 'current' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {p.phase}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{p.title}</p>
                <p className="text-xs text-gray-500">{p.desc}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${p.status === 'current' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-500'}`}>
                {p.status === 'current' ? 'IN PROGRESS' : 'PENDING'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-amber-800 mb-2">⚠️ Regulatory Compliance Notice</h3>
        <p className="text-xs text-amber-700">
          This platform is designed to support lawful lottery/gaming operations subject to applicable licenses, regulations,
          KYC/AML requirements, age restrictions, responsible-gaming requirements, and jurisdictional rules. No real-money
          gambling operation is assumed to be legally permitted without proper licensing. All regulatory requirements must be
          configurable and validated before production deployment. This is a technical demonstration of Phase 1 architecture.
        </p>
      </div>
    </div>
  );
}
