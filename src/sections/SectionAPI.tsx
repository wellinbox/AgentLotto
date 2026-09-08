export default function SectionAPI() {
  const endpoints = [
    { group: 'Authentication', color: 'emerald', routes: [
      { method: 'POST', path: '/api/v1/auth/login', auth: 'None', perm: '—', desc: 'Login, returns token' },
      { method: 'POST', path: '/api/v1/auth/logout', auth: 'Bearer', perm: '—', desc: 'Invalidate token' },
      { method: 'POST', path: '/api/v1/auth/refresh', auth: 'Bearer', perm: '—', desc: 'Refresh token' },
      { method: 'POST', path: '/api/v1/auth/2fa/verify', auth: 'Bearer', perm: '—', desc: 'Verify 2FA code' },
      { method: 'POST', path: '/api/v1/auth/password/reset', auth: 'None', perm: '—', desc: 'Request password reset' },
    ]},
    { group: 'Users', color: 'cyan', routes: [
      { method: 'GET', path: '/api/v1/users', auth: 'Bearer', perm: 'user.view', desc: 'List users (scoped)' },
      { method: 'POST', path: '/api/v1/users', auth: 'Bearer', perm: 'user.create', desc: 'Create user' },
      { method: 'GET', path: '/api/v1/users/{id}', auth: 'Bearer', perm: 'user.view', desc: 'Get user detail' },
      { method: 'PUT', path: '/api/v1/users/{id}', auth: 'Bearer', perm: 'user.update', desc: 'Update user' },
      { method: 'POST', path: '/api/v1/users/{id}/suspend', auth: 'Bearer', perm: 'user.suspend', desc: 'Suspend user' },
      { method: 'POST', path: '/api/v1/users/{id}/activate', auth: 'Bearer', perm: 'user.update', desc: 'Activate user' },
    ]},
    { group: 'Hierarchy', color: 'violet', routes: [
      { method: 'GET', path: '/api/v1/hierarchy/tree', auth: 'Bearer', perm: 'hierarchy.view', desc: 'Get hierarchy tree' },
      { method: 'GET', path: '/api/v1/hierarchy/{id}/descendants', auth: 'Bearer', perm: 'hierarchy.view', desc: 'Get descendants' },
      { method: 'GET', path: '/api/v1/hierarchy/{id}/ancestors', auth: 'Bearer', perm: 'hierarchy.view', desc: 'Get ancestors' },
    ]},
    { group: 'Products & Draws', color: 'amber', routes: [
      { method: 'GET', path: '/api/v1/products', auth: 'Bearer', perm: 'product.view', desc: 'List products' },
      { method: 'POST', path: '/api/v1/products', auth: 'Bearer', perm: 'product.manage', desc: 'Create product' },
      { method: 'GET', path: '/api/v1/draws', auth: 'Bearer', perm: 'draw.view', desc: 'List draws' },
      { method: 'POST', path: '/api/v1/draws', auth: 'Bearer', perm: 'draw.manage', desc: 'Create draw' },
      { method: 'POST', path: '/api/v1/draws/{id}/open', auth: 'Bearer', perm: 'draw.open', desc: 'Open draw for betting' },
      { method: 'POST', path: '/api/v1/draws/{id}/close', auth: 'Bearer', perm: 'draw.close', desc: 'Close draw' },
    ]},
    { group: 'Rates', color: 'rose', routes: [
      { method: 'GET', path: '/api/v1/rates/matrix', auth: 'Bearer', perm: 'rate.view', desc: 'Get rate matrix' },
      { method: 'POST', path: '/api/v1/rates', auth: 'Bearer', perm: 'rate.create', desc: 'Create rate config' },
      { method: 'PUT', path: '/api/v1/rates/{id}', auth: 'Bearer', perm: 'rate.update', desc: 'Update rate' },
      { method: 'POST', path: '/api/v1/rates/{id}/approve', auth: 'Bearer', perm: 'rate.approve', desc: 'Approve rate change' },
      { method: 'GET', path: '/api/v1/rates/resolve', auth: 'Bearer', perm: 'rate.view', desc: 'Resolve effective rate' },
    ]},
    { group: 'Betting', color: 'emerald', routes: [
      { method: 'POST', path: '/api/v1/bets', auth: 'Bearer', perm: 'bet.create', desc: 'Place bet (idempotent)', idem: true },
      { method: 'GET', path: '/api/v1/bets', auth: 'Bearer', perm: 'bet.view', desc: 'List bets (scoped)' },
      { method: 'GET', path: '/api/v1/bets/{id}', auth: 'Bearer', perm: 'bet.view', desc: 'Get bet detail' },
      { method: 'POST', path: '/api/v1/bets/{id}/cancel', auth: 'Bearer', perm: 'bet.cancel', desc: 'Cancel bet' },
    ]},
    { group: 'Credit & Ledger', color: 'cyan', routes: [
      { method: 'GET', path: '/api/v1/credit/accounts', auth: 'Bearer', perm: 'credit.view', desc: 'List accounts' },
      { method: 'POST', path: '/api/v1/credit/transfer', auth: 'Bearer', perm: 'credit.allocate', desc: 'Transfer credit', idem: true },
      { method: 'POST', path: '/api/v1/credit/adjust', auth: 'Bearer', perm: 'credit.adjust', desc: 'Adjust credit', idem: true },
      { method: 'GET', path: '/api/v1/ledger', auth: 'Bearer', perm: 'credit.view', desc: 'View ledger entries' },
    ]},
    { group: 'Settlement', color: 'violet', routes: [
      { method: 'POST', path: '/api/v1/settlements/calculate', auth: 'Bearer', perm: 'settlement.calculate', desc: 'Calculate settlement', idem: true },
      { method: 'GET', path: '/api/v1/settlements', auth: 'Bearer', perm: 'settlement.view', desc: 'List settlements' },
      { method: 'POST', path: '/api/v1/settlements/{id}/approve', auth: 'Bearer', perm: 'settlement.approve', desc: 'Approve settlement' },
      { method: 'POST', path: '/api/v1/settlements/{id}/lock', auth: 'Bearer', perm: 'settlement.lock', desc: 'Lock settlement' },
    ]},
    { group: 'Reports & Audit', color: 'amber', routes: [
      { method: 'GET', path: '/api/v1/reports/transactions', auth: 'Bearer', perm: 'report.view', desc: 'Transaction report' },
      { method: 'GET', path: '/api/v1/reports/commission', auth: 'Bearer', perm: 'report.view', desc: 'Commission report' },
      { method: 'POST', path: '/api/v1/reports/export', auth: 'Bearer', perm: 'report.export', desc: 'Queue report export' },
      { method: 'GET', path: '/api/v1/audit-logs', auth: 'Bearer', perm: 'audit.view', desc: 'View audit logs' },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">API Architecture — RESTful, Versioned, Scoped</h3>
        <p className="text-sm text-slate-400 mb-4">
          All APIs are versioned (<code className="text-cyan-400">/api/v1/</code>), authenticated via Sanctum tokens, 
          and enforce permission + scope checks. Financial endpoints require <strong className="text-amber-400">idempotency keys</strong>.
        </p>
      </div>

      {/* API Endpoints */}
      {endpoints.map((group, gi) => (
        <div key={gi} className="section-card">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge badge-${group.color}`}>{group.group}</span>
            <span className="text-xs text-slate-500">{group.routes.length} endpoints</span>
          </div>
          <div className="overflow-x-auto">
            <table className="spec-table text-xs">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Endpoint</th>
                  <th>Permission</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {group.routes.map((route, ri) => (
                  <tr key={ri}>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        route.method === 'GET' ? 'bg-cyan-500/20 text-cyan-400' :
                        route.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>{route.method}</span>
                    </td>
                    <td className="font-mono text-slate-300">{route.path}</td>
                    <td className="font-mono text-violet-400">{route.perm}</td>
                    <td className="text-slate-400">
                      {route.desc}
                      {route.idem && <span className="badge badge-amber ml-1">IDEM</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Response Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="section-card">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">Success Response</h3>
          <div className="code-block text-xs">
            {'{'}{'\n'}
            &nbsp;&nbsp;<span className="string">"success"</span>: <span className="keyword">true</span>,{'\n'}
            &nbsp;&nbsp;<span className="string">"data"</span>: {'{'} ... {'}'},{'\n'}
            &nbsp;&nbsp;<span className="string">"meta"</span>: {'{'}{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"request_id"</span>: <span className="string">"req_abc123"</span>,{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"timestamp"</span>: <span className="string">"2026-02-15T14:32:07Z"</span>,{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"pagination"</span>: {'{'} ... {'}'}{'\n'}
            &nbsp;&nbsp;{'}'}{'\n'}
            {'}'}
          </div>
        </div>
        <div className="section-card">
          <h3 className="text-sm font-semibold text-rose-400 mb-2">Error Response</h3>
          <div className="code-block text-xs">
            {'{'}{'\n'}
            &nbsp;&nbsp;<span className="string">"success"</span>: <span className="keyword">false</span>,{'\n'}
            &nbsp;&nbsp;<span className="string">"error"</span>: {'{'}{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"code"</span>: <span className="string">"DRAW_CLOSED"</span>,{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"message"</span>: <span className="string">"Draw no longer..."</span>,{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">"details"</span>: {'{'} ... {'}'}{'\n'}
            &nbsp;&nbsp;{'}'}{'\n'}
            {'}'}
          </div>
        </div>
      </div>

      {/* Error Catalog */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Error Code Catalog</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            'AUTH_REQUIRED', 'FORBIDDEN', 'INVALID_SCOPE', 'ACCOUNT_SUSPENDED',
            'DRAW_CLOSED', 'BETTING_TYPE_DISABLED', 'RATE_NOT_AVAILABLE', 'RATE_EXCEEDS_PARENT',
            'LIMIT_EXCEEDED', 'INSUFFICIENT_CREDIT', 'EXPOSURE_LIMIT_EXCEEDED', 'DUPLICATE_REQUEST',
            'BET_NOT_FOUND', 'SETTLEMENT_LOCKED', 'RESULT_ALREADY_PUBLISHED', 'INVALID_NUMBER_FORMAT',
          ].map((code, i) => (
            <code key={i} className="px-2 py-1 rounded bg-rose-500/5 border border-rose-500/20 text-[11px] text-rose-400 text-center">
              {code}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}
