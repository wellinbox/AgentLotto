import { mockAuditLogs } from '../data/mockData';
import { Shield, Search, Filter } from 'lucide-react';

export default function AuditLogs() {
  const actionColors: Record<string, string> = {
    USER_CREATED: 'bg-green-100 text-green-700',
    RATE_CHANGED: 'bg-blue-100 text-blue-700',
    CREDIT_ALLOCATED: 'bg-purple-100 text-purple-700',
    USER_SUSPENDED: 'bg-red-100 text-red-700',
    SETTLEMENT_LOCKED: 'bg-indigo-100 text-indigo-700',
    BET_ACCEPTED: 'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
          <p className="text-sm text-gray-500">Tamper-resistant audit trail for all system actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-emerald-500" />
          <span className="text-xs text-emerald-600 font-medium">Immutable • Tamper-Resistant</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by user, action, or target..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400" />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option>All Actions</option>
            <option>User Management</option>
            <option>Rate Changes</option>
            <option>Credit Operations</option>
            <option>Settlement</option>
            <option>Security Events</option>
          </select>
          <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Timestamp</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Action</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Target</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Before</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">After</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">IP</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Reason</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono text-xs">{log.userId}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${actionColors[log.action] || 'bg-gray-100 text-gray-700'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{log.target}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px] truncate">{log.before}</td>
                  <td className="px-4 py-3 text-xs text-gray-700 max-w-[150px] truncate">{log.after}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{log.ip}</td>
                  <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px] truncate">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {mockAuditLogs.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Prev</button>
            <button className="px-3 py-1 border rounded bg-emerald-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Audit Policy */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-2">🔒 Audit Log Policy</h3>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• All audit entries are append-only — cannot be modified or deleted</li>
          <li>• Logs include: user, action, target, before/after state, IP, device, timestamp, reason</li>
          <li>• Security events (failed login, privilege escalation attempts) are flagged automatically</li>
          <li>• Financial operations always include full before/after state capture</li>
          <li>• Audit retention period is configurable via system settings</li>
          <li>• Logs are stored with integrity verification (hash chain)</li>
        </ul>
      </div>
    </div>
  );
}
