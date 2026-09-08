export default function SectionSecurity() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Security Architecture</h3>
        <p className="text-sm text-slate-400 mb-4">
          Security is implemented at every layer: <strong className="text-emerald-400">Authentication</strong> (who), 
          <strong className="text-cyan-400"> Authorization</strong> (what), <strong className="text-violet-400">Scope</strong> (where), 
          and <strong className="text-amber-400">Audit</strong> (trace). Defense in depth — no single point of failure.
        </p>
      </div>

      {/* Permission Matrix */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">RBAC Permission Matrix</h3>
        <div className="overflow-x-auto">
          <table className="spec-table text-xs">
            <thead>
              <tr>
                <th>Permission</th>
                <th>SUPERSENIOR</th>
                <th>MASTER</th>
                <th>AGENT</th>
                <th>MEMBER</th>
                <th>Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                { perm: 'user.create', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'DOWNLINE' },
                { perm: 'user.view', ss: '✓', m: '✓', a: '✓', mem: 'SELF', scope: 'VARIES' },
                { perm: 'user.suspend', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'DOWNLINE' },
                { perm: 'hierarchy.view', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'VARIES' },
                { perm: 'product.manage', ss: '✓', m: '—', a: '—', mem: '—', scope: 'GLOBAL' },
                { perm: 'draw.manage', ss: '✓', m: '✓', a: '—', mem: '—', scope: 'DOWNLINE' },
                { perm: 'rate.create', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'DOWNLINE' },
                { perm: 'rate.approve', ss: '✓', m: '✓', a: '—', mem: '—', scope: 'DOWNLINE' },
                { perm: 'credit.allocate', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'DOWNLINE' },
                { perm: 'credit.adjust', ss: '✓', m: '—', a: '—', mem: '—', scope: 'GLOBAL' },
                { perm: 'bet.create', ss: '—', m: '—', a: '—', mem: '✓', scope: 'SELF' },
                { perm: 'bet.view', ss: '✓', m: '✓', a: '✓', mem: 'SELF', scope: 'VARIES' },
                { perm: 'bet.cancel', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'DOWNLINE' },
                { perm: 'result.manage', ss: '✓', m: '✓', a: '—', mem: '—', scope: 'DOWNLINE' },
                { perm: 'settlement.calculate', ss: '✓', m: '✓', a: '—', mem: '—', scope: 'DOWNLINE' },
                { perm: 'settlement.approve', ss: '✓', m: '✓', a: '—', mem: '—', scope: 'DOWNLINE' },
                { perm: 'settlement.lock', ss: '✓', m: '—', a: '—', mem: '—', scope: 'GLOBAL' },
                { perm: 'audit.view', ss: '✓', m: '✓', a: '✓', mem: '—', scope: 'VARIES' },
                { perm: 'report.export', ss: '✓', m: '✓', a: '✓', mem: 'SELF', scope: 'VARIES' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="font-mono text-emerald-400">{row.perm}</td>
                  <td className={row.ss === '✓' ? 'text-emerald-400' : 'text-slate-600'}>{row.ss}</td>
                  <td className={row.m === '✓' ? 'text-emerald-400' : 'text-slate-600'}>{row.m}</td>
                  <td className={row.a === '✓' ? 'text-emerald-400' : 'text-slate-600'}>{row.a}</td>
                  <td className={row.mem === '✓' || row.mem === 'SELF' ? 'text-emerald-400' : 'text-slate-600'}>{row.mem}</td>
                  <td><span className="badge badge-slate">{row.scope}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Layers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="section-card">
          <h3 className="text-sm font-semibold text-white mb-3">Authentication</h3>
          <div className="space-y-2">
            {[
              { item: 'Argon2id password hashing', detail: 'memory_cost=65536, time_cost=4, threads=2' },
              { item: 'Laravel Sanctum tokens', detail: 'SHA-256 hashed, rotatable, expirable' },
              { item: 'Optional 2FA (TOTP)', detail: 'RFC 6238, backup codes provided' },
              { item: 'Session security', detail: 'HTTP-only, Secure, SameSite=Strict cookies' },
              { item: 'Brute-force protection', detail: 'Max 5 attempts / 15min / IP+account' },
              { item: 'Password reset', detail: 'Time-limited token, single-use, invalidated on use' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                <div>
                  <p className="text-xs text-white">{s.item}</p>
                  <p className="text-[11px] text-slate-500">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h3 className="text-sm font-semibold text-white mb-3">Authorization</h3>
          <div className="space-y-2">
            {[
              { item: 'RBAC + Scope-Based Access', detail: 'Permissions checked server-side on every request' },
              { item: 'Middleware enforcement', detail: 'auth → permission → scope → hierarchy' },
              { item: 'Policy classes', detail: 'Per-resource authorization (UserPolicy, BetPolicy, etc.)' },
              { item: 'IDOR prevention', detail: 'Scope validation rejects cross-tenant/cross-hierarchy access' },
              { item: 'Mass assignment protection', detail: 'Laravel $fillable, never $guarded = []' },
              { item: 'API rate limiting', detail: 'Different limits per endpoint category' },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-cyan-400 text-xs mt-0.5">✓</span>
                <div>
                  <p className="text-xs text-white">{s.item}</p>
                  <p className="text-[11px] text-slate-500">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Matrix */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Threat Model & Mitigations</h3>
        <div className="overflow-x-auto">
          <table className="spec-table text-xs">
            <thead>
              <tr>
                <th>Threat</th>
                <th>Category</th>
                <th>Mitigation</th>
                <th>Layer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { threat: 'IDOR — accessing other user data', cat: 'Access Control', mit: 'Scope middleware + policy checks', layer: 'API + Service' },
                { threat: 'Privilege escalation', cat: 'Access Control', mit: 'Server-side permission check on every action', layer: 'Middleware' },
                { threat: 'SQL injection', cat: 'Injection', mit: 'Eloquent ORM, parameterized queries', layer: 'Repository' },
                { threat: 'XSS', cat: 'Injection', mit: 'Output encoding, CSP headers, React escaping', layer: 'Frontend + Headers' },
                { threat: 'CSRF', cat: 'Session', mit: 'Sanctum token auth (stateless), CSRF for cookie auth', layer: 'Middleware' },
                { threat: 'Double spending', cat: 'Financial', mit: 'Row locking + idempotency keys', layer: 'Service + DB' },
                { threat: 'Replay attacks', cat: 'Financial', mit: 'Idempotency keys, short token TTL', layer: 'API' },
                { threat: 'Rate manipulation', cat: 'Financial', mit: 'Server-side validation, parent constraint check', layer: 'Service' },
                { threat: 'Brute force login', cat: 'Auth', mit: 'Throttle middleware, account lockout', layer: 'Middleware' },
                { threat: 'Cross-tenant access', cat: 'Isolation', mit: 'organization_id on every query + middleware', layer: 'Repository' },
                { threat: 'Audit bypass', cat: 'Audit', mit: 'Audit middleware on all mutations, tamper-evident', layer: 'Middleware' },
                { threat: 'Time manipulation', cat: 'Business', mit: 'Server time authoritative, never trust client', layer: 'Service' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="text-slate-300">{row.threat}</td>
                  <td><span className="badge badge-rose">{row.cat}</span></td>
                  <td className="text-slate-400">{row.mit}</td>
                  <td><span className="badge badge-slate">{row.layer}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Rate Limits */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">API Rate Limiting</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { endpoint: 'Authentication', limit: '5/min', desc: 'Login, register, reset' },
            { endpoint: 'Member API', limit: '60/min', desc: 'Betting, viewing' },
            { endpoint: 'Agent API', limit: '120/min', desc: 'Management, reports' },
            { endpoint: 'Master API', limit: '120/min', desc: 'Management, reports' },
            { endpoint: 'Admin API', limit: '200/min', desc: 'Configuration' },
            { endpoint: 'Financial API', limit: '30/min', desc: 'Credit, settlement, adjustment' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-semibold text-white">{item.endpoint}</p>
              <p className="text-lg font-bold text-emerald-400 font-mono">{item.limit}</p>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Compliance Integration Points</h3>
        <p className="text-xs text-slate-400 mb-3">
          The architecture provides clear integration points for regulatory requirements without hard-coding any specific regulation:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['KYC Verification', 'AML Monitoring', 'Age Verification', 'Responsible Gaming', 'Self-Exclusion', 'Geolocation', 'Taxation', 'Regulatory Reporting', 'Data Retention'].map((item, i) => (
            <div key={i} className="px-3 py-2 rounded-md bg-amber-500/5 border border-amber-500/20 text-xs text-amber-400 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
