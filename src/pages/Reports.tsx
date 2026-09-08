import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, FileText, Filter } from 'lucide-react';

const transactionReport = [
  { date: 'Jun 10', amount: 32000, count: 45 },
  { date: 'Jun 11', amount: 28000, count: 38 },
  { date: 'Jun 12', amount: 41000, count: 52 },
  { date: 'Jun 13', amount: 36000, count: 48 },
  { date: 'Jun 14', amount: 45000, count: 61 },
  { date: 'Jun 15', amount: 52000, count: 72 },
  { date: 'Jun 16', amount: 38000, count: 50 },
];

const agentPerformance = [
  { agent: 'Agent A1', bets: 125000, commission: 6250, members: 2 },
  { agent: 'Agent A2', bets: 98000, commission: 4900, members: 2 },
  { agent: 'Agent B1', bets: 75000, commission: 3750, members: 0 },
];

export default function Reports() {
  const [reportType, setReportType] = useState('transaction');

  const reportTypes = [
    { id: 'transaction', label: 'Transaction Report' },
    { id: 'credit', label: 'Credit Report' },
    { id: 'agent', label: 'Agent Report' },
    { id: 'commission', label: 'Commission Report' },
    { id: 'settlement', label: 'Settlement Report' },
    { id: 'exposure', label: 'Exposure Report' },
    { id: 'audit', label: 'Audit Report' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-sm text-gray-500">Comprehensive reporting with export capabilities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((rt) => (
          <button
            key={rt.id}
            onClick={() => setReportType(rt.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              reportType === rt.id
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-3 items-center">
        <Filter size={16} className="text-gray-400" />
        <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" defaultValue="2026-06-10" />
        <span className="text-gray-400">to</span>
        <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" defaultValue="2026-06-16" />
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option>All Masters</option>
          <option>Master Alpha</option>
          <option>Master Beta</option>
        </select>
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option>All Products</option>
          <option>Daily Lottery</option>
          <option>Weekly Jackpot</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Apply</button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transactionReport}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Count Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactionReport}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Count" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Agent Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Agent</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Total Bets</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Commission Earned</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Members</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Avg per Member</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((agent) => (
                <tr key={agent.agent} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{agent.agent}</td>
                  <td className="px-4 py-3 text-right">₱{agent.bets.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-emerald-600 font-medium">₱{agent.commission.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{agent.members}</td>
                  <td className="px-4 py-3 text-right">₱{agent.members > 0 ? (agent.bets / agent.members).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-3">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <FileText size={16} className="text-green-600" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <FileText size={16} className="text-blue-600" /> Export Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <FileText size={16} className="text-red-600" /> Export PDF
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">All exports respect authorization scope. Data is filtered by user permissions.</p>
      </div>
    </div>
  );
}
