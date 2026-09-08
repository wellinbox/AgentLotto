import { mockSettlements, mockCommissions } from '../data/mockData';
import { Lock, CheckCircle, Clock, AlertTriangle, Calculator } from 'lucide-react';

export default function Settlements() {
  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settlements</h1>
          <p className="text-sm text-gray-500">Period settlement calculation, review, and approval</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
          <Calculator size={16} /> Calculate New Settlement
        </button>
      </div>

      {/* Settlement Pipeline */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Settlement Pipeline</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['OPEN', 'CALCULATING', 'CALCULATED', 'REVIEW', 'APPROVED', 'LOCKED'].map((status, i) => (
            <div key={status} className="flex items-center">
              <div className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${
                status === 'LOCKED' ? 'bg-green-100 text-green-700' :
                status === 'APPROVED' ? 'bg-blue-100 text-blue-700' :
                status === 'REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {status}
              </div>
              {i < 5 && <div className="w-6 h-0.5 bg-gray-200 mx-1"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Settlement ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Period</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Scope</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Gross</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Payout</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Commission</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Net</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSettlements.map((stl) => (
                <tr key={stl.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{stl.id}</td>
                  <td className="px-4 py-3 text-xs">{stl.periodStart} → {stl.periodEnd}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{stl.scope}</span></td>
                  <td className="px-4 py-3 text-right">{formatCurrency(stl.grossAmount)}</td>
                  <td className="px-4 py-3 text-right text-red-600">{formatCurrency(stl.payoutAmount)}</td>
                  <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(stl.commissionAmount)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-600">{formatCurrency(stl.netAmount)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stl.status === 'LOCKED' ? 'bg-green-100 text-green-700' :
                      stl.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' :
                      stl.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                      stl.status === 'CALCULATED' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{stl.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {stl.status === 'CALCULATED' && (
                        <button className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100">Review</button>
                      )}
                      {stl.status === 'REVIEW' && (
                        <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">Approve</button>
                      )}
                      {stl.status === 'APPROVED' && (
                        <button className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 flex items-center gap-1">
                          <Lock size={12} /> Lock
                        </button>
                      )}
                      {stl.status === 'LOCKED' && (
                        <span className="text-xs text-gray-400">Finalized</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Distribution */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Commission Distribution</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Commission ID</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Transaction</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Beneficiary</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Level</th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">Rule</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">Rate</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">Base</th>
                <th className="text-right px-4 py-2 font-medium text-gray-600">Amount</th>
                <th className="text-center px-4 py-2 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockCommissions.map((com) => (
                <tr key={com.id} className="border-b border-gray-50">
                  <td className="px-4 py-2 font-mono text-xs">{com.id}</td>
                  <td className="px-4 py-2 font-mono text-xs">{com.transactionId}</td>
                  <td className="px-4 py-2">{com.beneficiaryId}</td>
                  <td className="px-4 py-2 capitalize">{com.beneficiaryLevel}</td>
                  <td className="px-4 py-2 text-xs">{com.calculationRule}</td>
                  <td className="px-4 py-2 text-right">{(com.rate * 100).toFixed(0)}%</td>
                  <td className="px-4 py-2 text-right">{formatCurrency(com.baseAmount)}</td>
                  <td className="px-4 py-2 text-right font-semibold text-emerald-600">{formatCurrency(com.commissionAmount)}</td>
                  <td className="px-4 py-2 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      com.status === 'distributed' ? 'bg-green-100 text-green-700' :
                      com.status === 'paid' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{com.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settlement Flow Diagram */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Settlement Flow</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {['Draw Result', '→', 'Win/Loss Calc', '→', 'Gross Result', '→', 'Commission Calc', '→', 'Hierarchy Dist', '→', 'Net Result', '→', 'Ledger Entry', '→', 'Settlement'].map((step, i) => (
            step === '→' ? (
              <span key={i} className="text-gray-300">→</span>
            ) : (
              <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">{step}</span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
