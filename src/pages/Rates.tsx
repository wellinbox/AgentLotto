import { mockRateProfiles, mockBettingTypes, mockProducts } from '../data/mockData';
import { Edit, Plus, History, AlertTriangle } from 'lucide-react';

export default function Rates() {
  const formatRate = (rate: number) => `${(rate * 100).toFixed(0)}%`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rate Management</h1>
          <p className="text-sm text-gray-500">Hierarchical rate configuration with versioning</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <History size={16} /> Version History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
            <Plus size={16} /> New Rate Profile
          </button>
        </div>
      </div>

      {/* Rate Inheritance Model */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Rate Inheritance Model</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'System Maximum', rate: '90%', color: 'from-red-500 to-red-600' },
            { label: 'Master Allowed', rate: '85%', color: 'from-blue-500 to-blue-600' },
            { label: 'Agent Allowed', rate: '82%', color: 'from-purple-500 to-purple-600' },
            { label: 'Member Effective', rate: '82%', color: 'from-emerald-500 to-emerald-600' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`bg-gradient-to-br ${item.color} rounded-lg px-4 py-3 text-center min-w-[120px]`}>
                <p className="text-xs opacity-80">{item.label}</p>
                <p className="text-xl font-bold">{item.rate}</p>
              </div>
              {i < 3 && <span className="text-2xl text-slate-400">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <AlertTriangle size={14} />
          <span>Child rate cannot exceed parent allowed rate unless explicitly permitted by business rules.</span>
        </div>
      </div>

      {/* Rate Profiles */}
      {mockRateProfiles.map((profile) => (
        <div key={profile.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{profile.name}</h3>
              <p className="text-xs text-gray-500">Effective: {profile.effectiveDate} | ID: {profile.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
              <button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1">
                <Edit size={12} /> Edit
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Product</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-600">Betting Type</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Effective Rate</th>
                  <th className="text-right px-4 py-2 font-medium text-gray-600">Max Allowed</th>
                  <th className="text-center px-4 py-2 font-medium text-gray-600">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {profile.items.map((item) => {
                  const bt = mockBettingTypes.find(b => b.id === item.bettingTypeId);
                  const pr = mockProducts.find(p => p.id === item.productId);
                  const utilization = (item.rate / item.maxRate) * 100;
                  return (
                    <tr key={item.id} className="border-b border-gray-50">
                      <td className="px-4 py-2">{pr?.name || item.productId}</td>
                      <td className="px-4 py-2">{bt?.name || item.bettingTypeId}</td>
                      <td className="px-4 py-2 text-right font-semibold text-emerald-600">{formatRate(item.rate)}</td>
                      <td className="px-4 py-2 text-right text-gray-500">{formatRate(item.maxRate)}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div className={`h-2 rounded-full ${utilization > 90 ? 'bg-red-500' : utilization > 70 ? 'bg-yellow-500' : 'bg-emerald-500'}`} style={{ width: `${utilization}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500">{utilization.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Rate Versioning Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">📋 Rate Versioning Policy</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Every rate change creates a new version with effective date</li>
          <li>• Historical transactions retain the rate version at time of acceptance</li>
          <li>• Past transactions are never recalculated using current rates</li>
          <li>• Rate profiles are immutable once effective — changes create new versions</li>
          <li>• All rate changes are recorded in the audit log</li>
        </ul>
      </div>
    </div>
  );
}
