export default function SectionData() {
  const tables = [
    {
      module: 'Identity',
      name: 'users',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Auto-increment primary key' },
        { name: 'public_id', type: 'CHAR(26)', unique: true, desc: 'ULID for API exposure' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', fk: 'organizations.id', desc: 'Tenant isolation' },
        { name: 'username', type: 'VARCHAR(64)', unique: true, desc: 'Login identifier' },
        { name: 'email', type: 'VARCHAR(255)', unique: true, desc: 'Email (nullable for members)' },
        { name: 'password_hash', type: 'VARCHAR(255)', desc: 'Argon2id hash' },
        { name: 'status', type: "ENUM('PENDING','ACTIVE','SUSPENDED','LOCKED','DISABLED','CLOSED')", desc: 'Account state' },
        { name: 'two_factor_secret', type: 'TEXT', nullable: true, desc: 'Encrypted TOTP secret' },
        { name: 'last_login_at', type: 'TIMESTAMP', nullable: true, desc: 'Last successful login' },
        { name: 'created_at', type: 'TIMESTAMP', desc: 'Record creation' },
        { name: 'updated_at', type: 'TIMESTAMP', desc: 'Last modification' },
        { name: 'deleted_at', type: 'TIMESTAMP', nullable: true, desc: 'Soft delete' },
      ],
      indexes: ['organization_id', 'status', 'created_at']
    },
    {
      module: 'Hierarchy',
      name: 'hierarchy_nodes',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'user_id', type: 'BIGINT UNSIGNED', fk: 'users.id', unique: true, desc: 'Associated user' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', fk: 'organizations.id', desc: 'Tenant' },
        { name: 'level', type: 'TINYINT UNSIGNED', desc: 'Depth in hierarchy (0=root)' },
        { name: 'materialized_path', type: 'VARCHAR(500)', desc: 'e.g. /1/5/23/ for ancestor chain' },
        { name: 'parent_id', type: 'BIGINT UNSIGNED', nullable: true, fk: 'hierarchy_nodes.id', desc: 'Direct parent' },
        { name: 'is_active', type: 'BOOLEAN', default: 'true', desc: 'Node active status' },
      ],
      indexes: ['organization_id', 'parent_id', 'level', 'materialized_path(255)']
    },
    {
      module: 'Hierarchy',
      name: 'hierarchy_paths',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'ancestor_id', type: 'BIGINT UNSIGNED', fk: 'hierarchy_nodes.id', desc: 'Ancestor node' },
        { name: 'descendant_id', type: 'BIGINT UNSIGNED', fk: 'hierarchy_nodes.id', desc: 'Descendant node' },
        { name: 'depth', type: 'INT UNSIGNED', desc: 'Distance between nodes' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
      ],
      indexes: ['(ancestor_id, descendant_id)', '(descendant_id, ancestor_id)', 'organization_id']
    },
    {
      module: 'Product',
      name: 'products',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', fk: 'organizations.id', desc: 'Tenant' },
        { name: 'name', type: 'VARCHAR(128)', desc: 'Product name' },
        { name: 'code', type: 'VARCHAR(32)', unique: true, desc: 'Unique product code' },
        { name: 'description', type: 'TEXT', nullable: true, desc: 'Product description' },
        { name: 'status', type: "ENUM('DRAFT','ACTIVE','SUSPENDED','CLOSED')", desc: 'Product status' },
        { name: 'timezone', type: 'VARCHAR(64)', default: "'UTC'", desc: 'Authoritative timezone' },
        { name: 'currency', type: 'CHAR(3)', default: "'USD'", desc: 'ISO 4217 currency' },
        { name: 'configuration', type: 'JSON', nullable: true, desc: 'Flexible product config' },
      ],
      indexes: ['organization_id', 'status', 'code']
    },
    {
      module: 'Product',
      name: 'draws',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'product_id', type: 'BIGINT UNSIGNED', fk: 'products.id', desc: 'Parent product' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'draw_code', type: 'VARCHAR(64)', desc: 'Unique draw identifier' },
        { name: 'draw_name', type: 'VARCHAR(128)', desc: 'Display name' },
        { name: 'draw_date', type: 'DATE', desc: 'Draw date' },
        { name: 'betting_open_at', type: 'TIMESTAMP', desc: 'When betting opens' },
        { name: 'betting_close_at', type: 'TIMESTAMP', desc: 'When betting closes' },
        { name: 'result_publish_at', type: 'TIMESTAMP', nullable: true, desc: 'Expected result time' },
        { name: 'status', type: "ENUM('DRAFT','OPEN','SUSPENDED','CLOSED','RESULT_PENDING','RESULT_PUBLISHED','SETTLING','SETTLED','LOCKED','CANCELLED')", desc: 'Draw lifecycle' },
        { name: 'timezone', type: 'VARCHAR(64)', desc: 'Draw timezone' },
      ],
      indexes: ['product_id', 'organization_id', 'status', 'betting_close_at', 'draw_date']
    },
    {
      module: 'Betting',
      name: 'bets',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Internal PK' },
        { name: 'public_id', type: 'CHAR(26)', unique: true, desc: 'ULID for receipt' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'supersenior_id', type: 'BIGINT UNSIGNED', desc: 'Hierarchy trace' },
        { name: 'master_id', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Hierarchy trace' },
        { name: 'agent_id', type: 'BIGINT UNSIGNED', desc: 'Hierarchy trace' },
        { name: 'member_id', type: 'BIGINT UNSIGNED', fk: 'users.id', desc: 'Bettor' },
        { name: 'product_id', type: 'BIGINT UNSIGNED', fk: 'products.id', desc: 'Product' },
        { name: 'draw_id', type: 'BIGINT UNSIGNED', fk: 'draws.id', desc: 'Draw' },
        { name: 'betting_type_id', type: 'BIGINT UNSIGNED', fk: 'betting_types.id', desc: 'Bet type' },
        { name: 'selected_number', type: 'VARCHAR(32)', desc: 'Bet number selection' },
        { name: 'amount', type: 'DECIMAL(18,4)', desc: 'Bet amount (DECIMAL!)' },
        { name: 'rate_version_id', type: 'BIGINT UNSIGNED', fk: 'rate_versions.id', desc: 'Snapshot of rate used' },
        { name: 'applied_rate', type: 'DECIMAL(10,6)', desc: 'Exact rate at time of bet' },
        { name: 'potential_payout', type: 'DECIMAL(18,4)', desc: 'Calculated max payout' },
        { name: 'status', type: "ENUM('PENDING','ACCEPTED','REJECTED','CANCELLED','WON','LOST','VOID','SETTLED')", desc: 'Bet status' },
        { name: 'idempotency_key', type: 'VARCHAR(64)', unique: true, desc: 'Duplicate prevention' },
        { name: 'request_id', type: 'VARCHAR(64)', desc: 'Correlation ID' },
        { name: 'accepted_at', type: 'TIMESTAMP', nullable: true, desc: 'When accepted' },
      ],
      indexes: ['member_id', 'draw_id', 'agent_id', 'status', 'idempotency_key', 'request_id', 'created_at']
    },
    {
      module: 'Ledger',
      name: 'ledger_entries',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'account_id', type: 'BIGINT UNSIGNED', fk: 'financial_accounts.id', desc: 'Account affected' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'transaction_type', type: "ENUM('CREDIT','DEBIT','BET_HOLD','BET_RELEASE','WIN','LOSS','COMMISSION','ADJUSTMENT','REVERSAL','REFUND','SETTLEMENT','TRANSFER_IN','TRANSFER_OUT')", desc: 'Entry type' },
        { name: 'amount', type: 'DECIMAL(18,4)', desc: 'Signed amount' },
        { name: 'currency', type: 'CHAR(3)', desc: 'ISO 4217' },
        { name: 'balance_before', type: 'DECIMAL(18,4)', desc: 'Balance before entry' },
        { name: 'balance_after', type: 'DECIMAL(18,4)', desc: 'Balance after entry' },
        { name: 'reference_type', type: 'VARCHAR(64)', nullable: true, desc: 'e.g. bet, settlement' },
        { name: 'reference_id', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Related record ID' },
        { name: 'idempotency_key', type: 'VARCHAR(64)', unique: true, desc: 'Prevent duplicate entries' },
        { name: 'actor_id', type: 'BIGINT UNSIGNED', desc: 'Who initiated' },
        { name: 'description', type: 'TEXT', nullable: true, desc: 'Human-readable note' },
        { name: 'metadata', type: 'JSON', nullable: true, desc: 'Additional context' },
        { name: 'request_id', type: 'VARCHAR(64)', desc: 'Correlation ID' },
        { name: 'created_at', type: 'TIMESTAMP', desc: 'Immutable timestamp' },
      ],
      indexes: ['account_id', 'organization_id', 'transaction_type', 'reference_type+reference_id', 'idempotency_key', 'request_id', 'created_at']
    },
    {
      module: 'Rate',
      name: 'rate_versions',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'version_number', type: 'INT UNSIGNED', desc: 'Sequential version' },
        { name: 'effective_from', type: 'TIMESTAMP', desc: 'Start of validity' },
        { name: 'effective_until', type: 'TIMESTAMP', nullable: true, desc: 'End of validity (null=current)' },
        { name: 'status', type: "ENUM('DRAFT','ACTIVE','SUPERSEDED','ARCHIVED')", desc: 'Version status' },
        { name: 'created_by', type: 'BIGINT UNSIGNED', desc: 'Who created' },
        { name: 'approved_by', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Who approved' },
      ],
      indexes: ['organization_id', 'status', '(effective_from, effective_until)']
    },
    {
      module: 'Settlement',
      name: 'settlements',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'draw_id', type: 'BIGINT UNSIGNED', fk: 'draws.id', desc: 'Related draw' },
        { name: 'period_type', type: "ENUM('PER_DRAW','DAILY','WEEKLY','MONTHLY','CUSTOM')", desc: 'Settlement period' },
        { name: 'period_start', type: 'TIMESTAMP', desc: 'Period start' },
        { name: 'period_end', type: 'TIMESTAMP', desc: 'Period end' },
        { name: 'gross_amount', type: 'DECIMAL(18,4)', desc: 'Total bets' },
        { name: 'payout_amount', type: 'DECIMAL(18,4)', desc: 'Total winnings' },
        { name: 'commission_amount', type: 'DECIMAL(18,4)', desc: 'Total commission' },
        { name: 'net_amount', type: 'DECIMAL(18,4)', desc: 'Net result' },
        { name: 'status', type: "ENUM('OPEN','CALCULATING','CALCULATED','REVIEW','APPROVED','LOCKED','REVERSED')", desc: 'Settlement state' },
        { name: 'approved_by', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Approver' },
        { name: 'locked_at', type: 'TIMESTAMP', nullable: true, desc: 'Lock timestamp' },
        { name: 'idempotency_key', type: 'VARCHAR(64)', unique: true, desc: 'Prevent double settlement' },
      ],
      indexes: ['organization_id', 'draw_id', 'status', 'period_start', 'period_end']
    },
    {
      module: 'Audit',
      name: 'audit_logs',
      columns: [
        { name: 'id', type: 'BIGINT UNSIGNED', pk: true, desc: 'Primary key' },
        { name: 'organization_id', type: 'BIGINT UNSIGNED', desc: 'Tenant' },
        { name: 'actor_id', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Who performed action' },
        { name: 'action', type: 'VARCHAR(128)', desc: 'Action performed' },
        { name: 'resource_type', type: 'VARCHAR(64)', desc: 'Type of resource' },
        { name: 'resource_id', type: 'BIGINT UNSIGNED', nullable: true, desc: 'Resource identifier' },
        { name: 'before_state', type: 'JSON', nullable: true, desc: 'State before change' },
        { name: 'after_state', type: 'JSON', nullable: true, desc: 'State after change' },
        { name: 'reason', type: 'TEXT', nullable: true, desc: 'Reason for action' },
        { name: 'ip_address', type: 'VARCHAR(45)', desc: 'Client IP' },
        { name: 'user_agent', type: 'TEXT', nullable: true, desc: 'Client UA' },
        { name: 'request_id', type: 'VARCHAR(64)', desc: 'Correlation ID' },
        { name: 'created_at', type: 'TIMESTAMP', desc: 'When it happened' },
      ],
      indexes: ['organization_id', 'actor_id', 'action', 'resource_type+resource_id', 'request_id', 'created_at']
    },
  ];

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Database Schema — Key Tables</h3>
        <p className="text-sm text-slate-400 mb-2">
          Complete normalized relational design with proper foreign keys, indexes, constraints, and audit fields.
          All financial columns use DECIMAL(18,4) — never FLOAT or DOUBLE.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="badge badge-emerald">~45 tables total</span>
          <span className="badge badge-cyan">Closure table hierarchy</span>
          <span className="badge badge-violet">ULID public IDs</span>
          <span className="badge badge-amber">DECIMAL(18,4) finance</span>
          <span className="badge badge-rose">Immutable ledger</span>
        </div>
      </div>

      {/* Table details */}
      {tables.map((table, ti) => (
        <div key={ti} className="section-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="badge badge-slate">{table.module}</span>
              <h4 className="text-sm font-bold text-white font-mono">{table.name}</h4>
            </div>
            <span className="text-[11px] text-slate-500">{table.columns.length} columns</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Constraints</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {table.columns.map((col, ci) => (
                  <tr key={ci}>
                    <td className="font-mono text-xs text-emerald-400">{col.name}</td>
                    <td className="font-mono text-xs text-cyan-400">{col.type}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {col.pk && <span className="badge badge-amber">PK</span>}
                        {col.fk && <span className="badge badge-violet">FK</span>}
                        {col.unique && <span className="badge badge-cyan">UQ</span>}
                        {col.nullable && <span className="badge badge-slate">NULL</span>}
                        {col.default && <span className="badge badge-emerald">DEF</span>}
                      </div>
                    </td>
                    <td className="text-xs text-slate-400">{col.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {table.indexes.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Indexes</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {table.indexes.map((idx, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-400 font-mono">
                    idx_{table.name}_{idx.replace(/[()]/g, '').replace(/\+/g, '_')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Design Decisions */}
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-3">Database Design Decisions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: 'Primary Keys', a: 'BIGINT UNSIGNED auto-increment internally. ULID (CHAR(26)) for public-facing IDs via API.' },
            { q: 'Hierarchy Model', a: 'Closure Table for O(1) ancestor/descendant queries. Materialized path for display.' },
            { q: 'Financial Precision', a: 'DECIMAL(18,4) for all money. 4 decimal places supports most currencies with sub-unit precision.' },
            { q: 'Soft Deletes', a: 'Used for users and configurations. NEVER for financial records (ledger, bets, settlements).' },
            { q: 'JSON Columns', a: 'Used sparingly for flexible configuration. Never for queryable financial data.' },
            { q: 'Timestamps', a: 'All stored as UTC TIMESTAMP. Converted at presentation layer.' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40">
              <span className="text-xs font-semibold text-emerald-400">{item.q}</span>
              <p className="text-xs text-slate-400 mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
