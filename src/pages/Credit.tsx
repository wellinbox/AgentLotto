import { mockCreditAccounts, mockLedgerEntries, mockUsers } from '../data/mockData';
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, AlertTriangle } from 'lucide-react';

export default function Credit() {
  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  const getUserName = (id: string) => mockUsers.find(u => u.id === id)?.displayName || id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Credit & Ledger</h1>
          <p className="text-sm text-gray-500">Immutable financial ledger with full audit trail</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
          <Plus size={16} /> Create Adjustment
        </button>
      </div>

      {/* Credit Hierarchy */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Credit Flow Hierarchy</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'Supersenior', credit: '₱10M', used: '₱2.5M' },
            { label: 'Master', credit: '₱2M', used: '₱800K' },
            { label: 'Agent', credit: '₱500K', used: '₱250K' },
            { label: 'Member', credit: '₱50K', used: '₱25K' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-3 text-center min-w-[110px]">
                <p className="text-xs opacity-70">{item.label}</p>
                <p className="text-sm font-bold">{item.credit}</p>
                <p className="text-xs text-emerald-400">Used: {item.used}</p>
              </div>
              {i < 3 && <span className="text-xl text-slate-400">↓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Credit Accounts */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Credit Accounts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Account</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Credit Limit</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Allocated</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Used</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Available</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Exposure</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {mockCreditAccounts.map((acc) => {
                const utilization = (acc.usedCredit / acc.creditLimit) * 100;
                return (
                  <tr key={acc.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{acc.id}</td>
                    <td className="px-4 py-3">{getUserName(acc.userId)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(acc.creditLimit)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(acc.allocatedCredit)}</td>
                    <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(acc.usedCredit)}</td>
                    <td className="px-4 py-3 text-right text-emerald-600">{formatCurrency(acc.availableCredit)}</td>
                    <td className="px-4 py-3 text-right text-red-600">{formatCurrency(acc.exposure)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                          <div className={`h-2 rounded-full ${utilization > 80 ? 'bg-red-500' : utilization > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} style={{ width: `${utilization}%` }}></div>
                        </div>
                        <span className="text-xs">{utilization.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ledger */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Ledger Entries (Immutable)</h3>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Read-Only Audit Trail</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Type</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">Amount</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">Before</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">After</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Reference</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">By</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {mockLedgerEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-50">
                  <td className="px-4 py-2 font-mono text-xs">{entry.id}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      entry.type === 'BET_DEBIT' ? 'bg-red-100 text-red-700' :
                      entry.type === 'SETTLEMENT_CREDIT' ? 'bg-green-100 text-green-700' :
                      entry.type === 'ADJUSTMENT' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{entry.type}</span>
                  </td>
                  <td className={`px-4 py-2 text-right font-medium ${entry.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    <span className="flex items-center justify-end gap-1">
                      {entry.amount >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {formatCurrency(Math.abs(entry.amount))}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right text-gray-500">{formatCurrency(entry.balanceBefore)}</td>
                  <td className="px-4 py-2 text-right font-medium">{formatCurrency(entry.balanceAfter)}</td>
                  <td className="px-4 py-2 text-xs text-gray-500 max-w-[200px] truncate">{entry.reference}</td>
                  <td className="px-4 py-2 text-xs">{entry.createdBy}</td>
                  <td className="px-4 py-2 text-xs text-gray-400">{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-800">Immutable Ledger Policy</p>
          <p className="text-xs text-red-600 mt-1">
            Ledger entries cannot be modified or deleted. All corrections must be made through the Adjustment workflow with proper authorization, reason, and approval.
            Direct balance manipulation is prohibited. Every financial movement creates a new ledger event.
          </p>
        </div>
      </div>
    </div>
  );
}
