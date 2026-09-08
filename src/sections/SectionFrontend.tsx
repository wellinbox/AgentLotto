export default function SectionFrontend() {
  return (
    <div className="space-y-6">
      <div className="section-card">
        <h3 className="text-lg font-semibold text-white mb-2">Frontend Architecture — Next.js + React + TypeScript</h3>
        <p className="text-sm text-slate-400 mb-4">
          Role-aware layouts with server-side rendering. Backend authorization remains authoritative — 
          frontend route protection is UX convenience only, never a security boundary.
        </p>
      </div>

      {/* Route Structure */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Route Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-emerald-400 font-semibold mb-2">Admin Routes (Supersenior/Master/Agent)</p>
            <div className="code-block text-xs">
              <span className="comment">// Role-aware layout</span>{'\n'}
              /dashboard{'\n'}
              /hierarchy{'\n'}
              /users{'\n'}
              /products{'\n'}
              /draws{'\n'}
              /rates{'\n'}
              /credit{'\n'}
              /transactions{'\n'}
              /settlements{'\n'}
              /commissions{'\n'}
              /reports{'\n'}
              /audit-logs{'\n'}
              /settings
            </div>
          </div>
          <div>
            <p className="text-xs text-cyan-400 font-semibold mb-2">Member Routes (Betting Interface)</p>
            <div className="code-block text-xs">
              <span className="comment">// Simplified betting UX</span>{'\n'}
              /member/dashboard{'\n'}
              /member/lottery{'\n'}
              /member/bet{'\n'}
              /member/bets/history{'\n'}
              /member/results{'\n'}
              /member/wallet{'\n'}
              /member/profile
            </div>
          </div>
        </div>
      </div>

      {/* State Management */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">State Management Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { scope: 'Server State', tools: 'React Query / SWR', data: 'API data, caching, pagination, optimistic updates' },
            { scope: 'Auth State', tools: 'Context + HttpOnly cookie', data: 'User profile, permissions, hierarchy context' },
            { scope: 'UI State', tools: 'Local component state', data: 'Forms, modals, filters, bet slip' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-semibold text-emerald-400">{item.scope}</p>
              <p className="text-[11px] text-cyan-400 mt-1">{item.tools}</p>
              <p className="text-[11px] text-slate-400 mt-1">{item.data}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Avoid unnecessary global state. Server state is cached via React Query. Auth state uses secure context. 
          UI state stays local to components.
        </p>
      </div>

      {/* Component Architecture */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Component Architecture</h3>
        <div className="code-block text-xs">
          <span className="comment">// Project structure</span>{'\n'}
          src/{'\n'}
          ├── app/ <span className="comment">// Next.js App Router</span>{'\n'}
          │&nbsp;&nbsp; ├── (auth)/ <span className="comment">// Login, register, reset</span>{'\n'}
          │&nbsp;&nbsp; ├── (admin)/ <span className="comment">// Admin layout + routes</span>{'\n'}
          │&nbsp;&nbsp; └── (member)/ <span className="comment">// Member layout + routes</span>{'\n'}
          ├── components/{'\n'}
          │&nbsp;&nbsp; ├── ui/ <span className="comment">// Buttons, inputs, modals, tables</span>{'\n'}
          │&nbsp;&nbsp; ├── layout/ <span className="comment">// Sidebar, header, breadcrumbs</span>{'\n'}
          │&nbsp;&nbsp; ├── data-display/ <span className="comment">// Cards, stats, badges</span>{'\n'}
          │&nbsp;&nbsp; └── forms/ <span className="comment">// Form components with validation</span>{'\n'}
          ├── hooks/ <span className="comment">// Custom hooks (useAuth, usePermissions)</span>{'\n'}
          ├── lib/ <span className="comment">// API client, utils, constants</span>{'\n'}
          ├── services/ <span className="comment">// API service functions</span>{'\n'}
          └── types/ <span className="comment">// TypeScript interfaces</span>
        </div>
      </div>

      {/* Role-Specific Dashboards */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">Role-Specific Dashboard Widgets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-xs font-semibold text-emerald-400 mb-2">Supersenior Dashboard</p>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Total Masters / Agents / Members</li>
              <li>• Total betting volume (today/week/month)</li>
              <li>• Gross result & commission</li>
              <li>• Outstanding credit & exposure</li>
              <li>• Open draws & settlement status</li>
              <li>• Risk alerts & anomalies</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <p className="text-xs font-semibold text-cyan-400 mb-2">Master Dashboard</p>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Agent count & status</li>
              <li>• Downline betting volume</li>
              <li>• Credit allocated vs used</li>
              <li>• Commission earned</li>
              <li>• Pending settlements</li>
              <li>• Agent performance metrics</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
            <p className="text-xs font-semibold text-violet-400 mb-2">Agent Dashboard</p>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Member count & active members</li>
              <li>• Member betting activity</li>
              <li>• Credit balance & allocation</li>
              <li>• Exposure summary</li>
              <li>• Recent transactions</li>
              <li>• Open draws available</li>
            </ul>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs font-semibold text-amber-400 mb-2">Member Dashboard</p>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• Available products & draws</li>
              <li>• Quick bet interface</li>
              <li>• Recent bets & status</li>
              <li>• Win/loss summary</li>
              <li>• Wallet/credit balance</li>
              <li>• Results history</li>
            </ul>
          </div>
        </div>
      </div>

      {/* UX Principles */}
      <div className="section-card">
        <h3 className="text-sm font-semibold text-white mb-3">UX Design Principles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { principle: 'Confirmation Dialogs', detail: 'All destructive/high-risk actions' },
            { principle: 'Loading States', detail: 'Skeleton screens, spinners' },
            { principle: 'Empty States', detail: 'Guidance when no data' },
            { principle: 'Error States', detail: 'Clear messages + retry' },
            { principle: 'Mobile First', detail: 'Member betting prioritizes mobile' },
            { principle: 'Keyboard Nav', detail: 'Full keyboard accessibility' },
            { principle: 'Dark Mode', detail: 'Default dark, professional' },
            { principle: 'Pagination', detail: 'Server-side, never load all' },
          ].map((item, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <p className="text-xs font-semibold text-white">{item.principle}</p>
              <p className="text-[11px] text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
