export default function SectionInfrastructure() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Infrastructure Architecture</h3>
        <p className="text-sm text-slate-400 mb-4">
          Production deployment using Docker containers, with clear separation of concerns. 
          Each service runs independently and can scale horizontally.
        </p>
      </div>

      {/* Docker Architecture */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Docker Service Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { service: 'nginx', role: 'Reverse proxy, SSL, static assets', port: '80/443', color: 'emerald' },
            { service: 'frontend', role: 'Next.js SSR + API routes', port: '3000', color: 'cyan' },
            { service: 'backend', role: 'Laravel API (PHP-FPM)', port: '9000', color: 'violet' },
            { service: 'mysql', role: 'Primary database', port: '3306', color: 'amber' },
            { service: 'redis', role: 'Cache, queue, sessions', port: '6379', color: 'rose' },
            { service: 'queue-worker', role: 'Laravel queue processor', port: '—', color: 'emerald' },
            { service: 'scheduler', role: 'Cron jobs (settlement, reports)', port: '—', color: 'cyan' },
            { service: 'horizon', role: 'Queue monitoring dashboard', port: '—', color: 'violet' },
          ].map((svc, i) => (
            <div key={i} className={`p-3 rounded-lg bg-${svc.color}-500/5 border border-${svc.color}-500/20`}>
              <p className="text-xs font-bold text-white font-mono">{svc.service}</p>
              <p className="text-[11px] text-slate-400 mt-1">{svc.role}</p>
              <p className="text-[10px] text-slate-500 mt-1">Port: {svc.port}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Production Flow */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-4">Request Flow — Production</h3>
        <div className="flex flex-col items-center gap-1 py-4">
          {[
            { label: 'Client (Browser / Mobile)', color: 'bg-slate-700/50 border-slate-600' },
            { label: '↓ HTTPS ↓' },
            { label: 'Cloudflare (CDN + WAF + DDoS)', color: 'bg-amber-500/10 border-amber-500/30' },
            { label: '↓' },
            { label: 'Nginx (SSL termination, rate limit)', color: 'bg-emerald-500/10 border-emerald-500/30' },
            { label: '↓' },
            { label: 'Next.js (SSR + Static + API proxy)', color: 'bg-cyan-500/10 border-cyan-500/30' },
            { label: '↓' },
            { label: 'Laravel API (PHP-FPM)', color: 'bg-violet-500/10 border-violet-500/30' },
            { label: '↓' },
            { label: 'MySQL 8 + Redis', color: 'bg-rose-500/10 border-rose-500/30' },
          ].map((item, i) => (
            item.color ? (
              <div key={i} className={`w-full max-w-md px-4 py-2 rounded-lg border ${item.color} text-center text-xs font-medium text-white`}>
                {item.label}
              </div>
            ) : (
              <span key={i} className="text-xs text-slate-600">{item.label}</span>
            )
          ))}
        </div>
      </div>

      {/* Environment Separation */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Environment Separation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { env: 'Development', details: ['Docker Compose', 'Local MySQL/Redis', 'Debug mode', 'Seed data', 'No real transactions'] },
            { env: 'Staging', details: ['Mirror of production', 'Real infrastructure', 'Test data only', 'Full test suite', 'Performance testing'] },
            { env: 'Production', details: ['Hardened config', 'SSL required', 'No debug', 'Real transactions', 'Monitoring active'] },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <p className={`text-sm font-bold mb-2 ${
                i === 0 ? 'text-cyan-400' : i === 1 ? 'text-amber-400' : 'text-emerald-400'
              }`}>{item.env}</p>
              <ul className="text-xs text-slate-400 space-y-1">
                {item.details.map((d, j) => (
                  <li key={j} className="flex items-center gap-1.5">
                    <span className="text-slate-600">•</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Backup & DR */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Backup & Disaster Recovery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-emerald-400 font-semibold mb-2">Backup Strategy</p>
            <div className="space-y-2">
              {[
                { item: 'Automated daily full backup', detail: 'mysqldump + compression + encryption' },
                { item: 'Binary log for PITR', detail: 'Point-in-time recovery to any second' },
                { item: 'Off-site replication', detail: 'Encrypted backup to separate region' },
                { item: 'Retention: 30 days', detail: 'Configurable per compliance requirements' },
                { item: 'Restore testing', detail: 'Monthly automated restore verification' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                  <div>
                    <p className="text-xs text-white">{b.item}</p>
                    <p className="text-[11px] text-slate-500">{b.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-rose-400 font-semibold mb-2">Recovery Targets</p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-800/40">
                <p className="text-xs text-slate-400">RPO (Recovery Point Objective)</p>
                <p className="text-lg font-bold text-white">&lt; 1 minute</p>
                <p className="text-[11px] text-slate-500">Via binary log replication</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/40">
                <p className="text-xs text-slate-400">RTO (Recovery Time Objective)</p>
                <p className="text-lg font-bold text-white">&lt; 15 minutes</p>
                <p className="text-[11px] text-slate-500">Automated failover procedure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Observability */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Observability Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { area: 'Application Logs', tool: 'Structured JSON → Log channel', detail: 'Request ID correlation' },
            { area: 'Error Tracking', tool: 'Sentry / Flare', detail: 'Exception tracking + alerting' },
            { area: 'Queue Monitoring', tool: 'Laravel Horizon', detail: 'Job throughput, failures, wait times' },
            { area: 'Database Monitoring', tool: 'Slow query log + EXPLAIN', detail: 'Query performance analysis' },
            { area: 'APM', tool: 'Telescope / New Relic', detail: 'Request tracing, bottlenecks' },
            { area: 'Uptime', tool: 'Health check endpoints', detail: '/api/health, /api/ready' },
            { area: 'Audit Monitor', tool: 'Custom dashboard', detail: 'Security event alerting' },
            { area: 'Financial Monitor', tool: 'Reconciliation reports', detail: 'Ledger balance verification' },
          ].map((item, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-semibold text-white">{item.area}</p>
              <p className="text-[11px] text-cyan-400">{item.tool}</p>
              <p className="text-[10px] text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
