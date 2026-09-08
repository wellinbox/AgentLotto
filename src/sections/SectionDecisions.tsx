export default function SectionDecisions() {
  const decisions = [
    {
      q: '1. Should hierarchy use adjacency list, materialized path, or closure table?',
      a: 'Closure Table (primary) + Materialized Path (supplementary).',
      reasoning: 'Closure table provides O(1) ancestor/descendant queries via simple JOIN. Materialized path provides human-readable hierarchy display and efficient LIKE queries for subtrees. Adjacency list was rejected due to O(n) recursive queries. Nested set was rejected due to expensive subtree moves.',
      risk: 'Write complexity for hierarchy changes (rare) vs read performance (frequent). Acceptable trade-off.'
    },
    {
      q: '2. Should balances be derived from ledger or maintained as a projection?',
      a: 'Ledger is source of truth. Balance is projected from SUM(ledger_entries) with optional cached snapshot.',
      reasoning: 'Immutable ledger guarantees auditability. Balance snapshots (balance_before/balance_after on each entry) provide O(1) current balance without full scan. Periodic reconciliation verifies projection accuracy.',
      risk: 'Snapshot could drift from actual sum. Mitigated by reconciliation engine running every hour.'
    },
    {
      q: '3. How should rate inheritance work?',
      a: 'Top-down constraint: child rate ≤ parent rate. Resolution walks from member upward.',
      reasoning: 'RateResolver loads the rate matrix for the effective period, then walks the hierarchy from member → agent → master → supersenior. At each level, if a specific override exists, it is used (validated against parent max). If no override, parent rate is inherited.',
      risk: 'Complex resolution logic. Mitigated by comprehensive unit tests and cached resolution results.'
    },
    {
      q: '4. How should rate versioning work?',
      a: 'Sequential versions with effective_from/effective_until. Bets snapshot rate_version_id.',
      reasoning: 'Each rate change creates a new version (never modifies existing). Old versions are marked SUPERSEDED but remain readable. Every bet stores the exact rate_version_id and applied_rate, ensuring historical reproducibility.',
      risk: 'Version proliferation. Mitigated by archiving old versions after configurable retention period.'
    },
    {
      q: '5. How should exposure be calculated?',
      a: 'Real-time calculation from open bets + cached aggregation per hierarchy level.',
      reasoning: 'ExposureService calculates SUM(potential_payout) for all non-settled bets, grouped by member/agent/master/product/draw. Results are cached in Redis with short TTL (5s) and refreshed on each bet. Hard limits are checked within the same DB transaction as bet creation.',
      risk: 'Cache staleness. Mitigated by re-validating exposure within the transaction before commit.'
    },
    {
      q: '6. How should settlement remain idempotent?',
      a: 'Unique idempotency_key per (draw_id, period_type). Settlement job checks before processing.',
      reasoning: 'Each settlement calculation generates a deterministic idempotency key. If a settlement with the same key exists, the job returns the existing result without re-processing. This prevents duplicate financial movements from queue retries.',
      risk: 'Key collision. Mitigated by including draw_id + period_type + organization_id in key generation.'
    },
    {
      q: '7. How should historical bets remain reproducible?',
      a: 'Every bet stores rate_version_id + applied_rate + potential_payout at time of acceptance.',
      reasoning: 'Even if rates change later, the bet record contains everything needed to reproduce the original calculation. Settlement uses the stored values, not current rates.',
      risk: 'Storage overhead. Acceptable — each bet adds ~50 bytes of rate metadata.'
    },
    {
      q: '8. How should cross-tenant isolation work?',
      a: 'organization_id on every relevant table + middleware enforcement + repository scoping.',
      reasoning: 'Triple protection: (1) Middleware extracts organization from authenticated user, (2) Repository layer auto-applies organization_id filter, (3) Policies verify resource belongs to user\'s organization. Even if one layer fails, others catch it.',
      risk: 'Developer forgetting to scope a query. Mitigated by base repository class that always applies scope.'
    },
    {
      q: '9. How should maker-checker approval work?',
      a: 'Two-step workflow: Maker creates → status PENDING → Checker approves → status EXECUTED.',
      reasoning: 'High-risk operations (rate changes, credit adjustments, settlement approval) require two different authorized users. The system prevents the same user from being both maker and checker. Approval records include timestamp, reason, and full audit trail.',
      risk: 'Operational delay. Mitigated by configurable — organizations can disable for lower-risk operations.'
    },
    {
      q: '10. How should financial corrections work?',
      a: 'Never modify original. Create compensating ledger entry + audit log.',
      reasoning: 'Original entries are immutable. Corrections create a new REVERSAL entry with opposite sign, referencing the original. This maintains the complete audit trail and ensures the ledger always balances.',
      risk: 'Complexity for users. Mitigated by adjustment UI that handles the reversal creation automatically.'
    },
    {
      q: '11. How should concurrent bets be handled?',
      a: 'SELECT FOR UPDATE on financial_account + idempotency key + DB transaction.',
      reasoning: 'When a bet is placed, the account row is locked within the transaction. This prevents two concurrent bets from spending the same credit. The idempotency key prevents duplicate submissions from network retries.',
      risk: 'Lock contention under extreme load. Mitigated by short transaction duration and Redis-based pre-check.'
    },
    {
      q: '12. How should large reports be generated?',
      a: 'Queue-based generation with progress tracking. Never block HTTP request.',
      reasoning: 'Report requests are dispatched to queue jobs. The job writes results to temporary storage and creates a download link. User receives notification when ready. Pagination and chunked processing prevent memory exhaustion.',
      risk: 'Queue backlog. Mitigated by dedicated report queue with separate workers.'
    },
    {
      q: '13. How should the system scale?',
      a: 'Horizontal scaling of API + queue workers. Read replicas for reporting. Redis for caching.',
      reasoning: 'API servers are stateless (session in Redis) and can be load-balanced. Queue workers scale independently. MySQL read replicas handle reporting queries without impacting transactional performance. Redis handles caching, rate limiting, and queue.',
      risk: 'Complexity of distributed systems. Mitigated by starting simple and scaling only when needed.'
    },
    {
      q: '14. What indexes are required?',
      a: 'Composite indexes on (organization_id, status, created_at) for most tables. Specific indexes per query pattern.',
      reasoning: 'Every query is analyzed for index needs. organization_id is included in most composite indexes because scope filtering is universal. Status + created_at supports common dashboard queries. Foreign keys always have indexes.',
      risk: 'Index overhead on writes. Acceptable — reads vastly outnumber writes for most tables.'
    },
    {
      q: '15. What operations require database locks?',
      a: 'Bet placement, credit transfer, settlement, rate changes, hierarchy modifications.',
      reasoning: 'Any operation that reads-then-writes financial data requires row-level locking (SELECT FOR UPDATE). This prevents race conditions where two concurrent operations could produce incorrect results.',
      risk: 'Deadlocks. Mitigated by consistent lock ordering (always lock parent before child).'
    },
    {
      q: '16. What operations should be asynchronous?',
      a: 'Settlement calculation, report generation, notifications, exports, reconciliation, analytics.',
      reasoning: 'Any operation that takes >1 second or doesn\'t need immediate response should be queued. This keeps API response times fast and prevents blocking the transactional database.',
      risk: 'Eventual consistency. Mitigated by clear status indicators and progress tracking.'
    },
    {
      q: '17. Which data must be immutable?',
      a: 'Ledger entries, accepted bets, published results, locked settlements, audit logs.',
      reasoning: 'Financial records and audit trails must never be modified after creation. This ensures complete traceability and prevents tampering. Corrections use compensating entries.',
      risk: 'Storage growth. Mitigated by archival strategy for old records.'
    },
    {
      q: '18. Which data can be updated?',
      a: 'User profiles, configurations (with versioning), draft records, pending items.',
      reasoning: 'Non-financial configuration can be updated but changes are versioned. Draft/pending records can be modified until they reach a committed state. User profile changes are audited.',
      risk: 'Accidental modification of should-be-immutable data. Mitigated by model-level immutability enforcement.'
    },
    {
      q: '19. Which operations require audit logs?',
      a: 'All mutations: auth events, user changes, hierarchy changes, rate changes, credit operations, bets, results, settlements, adjustments.',
      reasoning: 'Every state change in the system is audited. This includes who, what, when, before/after state, IP address, and correlation ID. Audit logs are append-only and tamper-evident.',
      risk: 'Audit log volume. Mitigated by structured logging and archival strategy.'
    },
    {
      q: '20. Which operations require additional approval?',
      a: 'Rate changes, large credit adjustments, settlement locking, result publication, account suspension.',
      reasoning: 'High-impact operations use maker-checker workflow. The specific operations requiring approval are configurable per organization. Approval records include reason and full audit trail.',
      risk: 'Operational bottleneck. Mitigated by configurable thresholds — small changes may not require approval.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Critical Design Decisions</h3>
        <p className="text-sm text-slate-400 mb-2">
          Explicit analysis and recommended answers for all 20 critical design questions. 
          Each decision includes reasoning and identified risks.
        </p>
      </div>

      {/* Risks & Trade-offs */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Risks & Trade-offs Summary</h3>
        <div className="overflow-x-auto">
          <table className="spec-table text-xs">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Impact</th>
                <th>Likelihood</th>
                <th>Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {[
                { risk: 'Ledger drift from balance snapshot', impact: 'HIGH', like: 'LOW', mit: 'Hourly reconciliation + alerting' },
                { risk: 'Rate resolution complexity', impact: 'MED', like: 'MED', mit: 'Comprehensive tests + caching' },
                { risk: 'Lock contention under load', impact: 'HIGH', like: 'LOW', mit: 'Short transactions + Redis pre-check' },
                { risk: 'Developer scope bypass', impact: 'HIGH', like: 'LOW', mit: 'Base repository + code review' },
                { risk: 'Queue backlog', impact: 'MED', like: 'MED', mit: 'Dedicated workers + monitoring' },
                { risk: 'Storage growth (audit/ledger)', impact: 'LOW', like: 'HIGH', mit: 'Archival strategy + partitioning' },
                { risk: 'Deadlock from lock ordering', impact: 'HIGH', like: 'LOW', mit: 'Consistent ordering + deadlock detection' },
                { risk: 'Rate version proliferation', impact: 'LOW', like: 'MED', mit: 'Archival after retention period' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="text-slate-300">{row.risk}</td>
                  <td>
                    <span className={`badge ${row.impact === 'HIGH' ? 'badge-rose' : row.impact === 'MED' ? 'badge-amber' : 'badge-emerald'}`}>
                      {row.impact}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${row.like === 'HIGH' ? 'badge-rose' : row.like === 'MED' ? 'badge-amber' : 'badge-emerald'}`}>
                      {row.like}
                    </span>
                  </td>
                  <td className="text-slate-400">{row.mit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decisions */}
      <div className="space-y-4">
        {decisions.map((d, i) => (
          <div key={i} className="section-card">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">{d.q}</h4>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 mb-3">
              <p className="text-sm text-white font-medium">{d.a}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Reasoning</p>
                <p className="text-xs text-slate-400">{d.reasoning}</p>
              </div>
              <div>
                <p className="text-[10px] text-amber-500 uppercase tracking-wider mb-1">Risk</p>
                <p className="text-xs text-slate-400">{d.risk}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
