import { useState } from 'react';
import { mockBets, mockProducts, mockDraws, mockBettingTypes } from '../data/mockData';
import { Search, Filter, Download, Eye } from 'lucide-react';

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBet, setSelectedBet] = useState<string | null>(null);

  const filteredBets = mockBets.filter(b => {
    const matchSearch = search === '' || b.transactionId.toLowerCase().includes(search.toLowerCase()) || b.betNumber.includes(search);
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  const getProductName = (id: string) => mockProducts.find(p => p.id === id)?.name || id;
  const getDrawName = (id: string) => mockDraws.find(d => d.id === id)?.name || id;
  const getBetTypeName = (id: string) => mockBettingTypes.find(bt => bt.id === id)?.name || id;

  const selectedBetData = mockBets.find(b => b.id === selectedBet);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <p className="text-sm text-gray-500">All betting transactions with full audit trail</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Transaction ID or Number..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="all">All Status</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
            <option value="VOID">Void</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Transaction ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Draw</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Number</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Amount</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Rate</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBets.map((bet) => (
                <tr key={bet.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{bet.transactionId}</td>
                  <td className="px-4 py-3">{getProductName(bet.productId)}</td>
                  <td className="px-4 py-3 text-xs">{getDrawName(bet.drawId)}</td>
                  <td className="px-4 py-3">{getBetTypeName(bet.bettingTypeId)}</td>
                  <td className="px-4 py-3 font-mono font-bold">{bet.betNumber}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(bet.amount)}</td>
                  <td className="px-4 py-3 text-right text-emerald-600">{(bet.effectiveRate * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      bet.status === 'WON' ? 'bg-green-100 text-green-700' :
                      bet.status === 'LOST' ? 'bg-red-100 text-red-700' :
                      bet.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{bet.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setSelectedBet(bet.id)} className="text-blue-500 hover:text-blue-700">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredBets.length} of {mockBets.length} transactions</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Prev</button>
            <button className="px-3 py-1 border rounded bg-emerald-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBetData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBet(null)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Transaction ID</span><span className="font-mono">{selectedBetData.transactionId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Member</span><span>{selectedBetData.memberId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Agent</span><span>{selectedBetData.agentId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Master</span><span>{selectedBetData.masterId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Product</span><span>{getProductName(selectedBetData.productId)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Draw</span><span>{getDrawName(selectedBetData.drawId)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Betting Type</span><span>{getBetTypeName(selectedBetData.bettingTypeId)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Number</span><span className="font-mono font-bold">{selectedBetData.betNumber}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold">{formatCurrency(selectedBetData.amount)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Effective Rate</span><span className="text-emerald-600">{(selectedBetData.effectiveRate * 100).toFixed(0)}%</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Rate Version</span><span>{selectedBetData.rateVersionId}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Status</span><span className="font-medium">{selectedBetData.status}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Created</span><span className="text-xs">{new Date(selectedBetData.createdAt).toLocaleString()}</span></div>
            </div>
            <button onClick={() => setSelectedBet(null)} className="mt-5 w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
