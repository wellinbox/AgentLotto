import { useAuth } from '../App';
import { dashboardStats, mockBets, mockSettlements } from '../data/mockData';
import { Users, Receipt, Wallet, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const chartData = [
  { name: 'Mon', bets: 4200, payouts: 2800 },
  { name: 'Tue', bets: 3800, payouts: 2400 },
  { name: 'Wed', bets: 5100, payouts: 3200 },
  { name: 'Thu', bets: 4600, payouts: 2900 },
  { name: 'Fri', bets: 6200, payouts: 3800 },
  { name: 'Sat', bets: 7800, payouts: 4500 },
  { name: 'Sun', bets: 5200, payouts: 3100 },
];

const pieData = [
  { name: '2-Digit Top', value: 35, color: '#10b981' },
  { name: '2-Digit Bottom', value: 25, color: '#3b82f6' },
  { name: '3-Digit', value: 20, color: '#8b5cf6' },
  { name: '3-Digit Top', value: 12, color: '#f59e0b' },
  { name: '4-Digit Jackpot', value: 8, color: '#ef4444' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const stats = dashboardStats;

  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  const StatCard = ({ icon: Icon, label, value, color, subtext }: { icon: typeof Users; label: string; value: string; color: string; subtext?: string }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{label}</span>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.displayName}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Server Time (UTC)</p>
          <p className="text-lg font-mono font-semibold text-gray-700">{new Date().toISOString().slice(0, 19).replace('T', ' ')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Masters" value={stats.totalMasters.toString()} color="bg-blue-500" subtext="Active accounts" />
        <StatCard icon={Users} label="Total Agents" value={stats.totalAgents.toString()} color="bg-purple-500" subtext={`${stats.totalAgents} active`} />
        <StatCard icon={Users} label="Total Members" value={stats.totalMembers.toString()} color="bg-emerald-500" subtext="Registered players" />
        <StatCard icon={Receipt} label="Transactions Today" value={stats.totalTransactions.toString()} color="bg-orange-500" subtext={formatCurrency(stats.totalAmount)} />
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Credit Allocated" value={formatCurrency(stats.creditAllocated)} color="bg-indigo-500" subtext="Total system credit" />
        <StatCard icon={DollarSign} label="Credit Used" value={formatCurrency(stats.creditUsed)} color="bg-amber-500" subtext={`${((stats.creditUsed / stats.creditAllocated) * 100).toFixed(1)}% utilization`} />
        <StatCard icon={TrendingUp} label="Total Exposure" value={formatCurrency(stats.totalExposure)} color="bg-red-500" subtext="Current risk exposure" />
        <StatCard icon={CheckCircle} label="Net Result" value={formatCurrency(stats.netResult)} color="bg-teal-500" subtext="After settlements" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="bets" fill="#10b981" radius={[4, 4, 0, 0]} name="Bets" />
              <Bar dataKey="payouts" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Payouts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bet Type Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name}</span>
                <span className="ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Settlements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {mockBets.slice(0, 5).map((bet) => (
              <div key={bet.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{bet.transactionId}</p>
                  <p className="text-xs text-gray-400">Number: {bet.betNumber} | Amount: {formatCurrency(bet.amount)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  bet.status === 'WON' ? 'bg-green-100 text-green-700' :
                  bet.status === 'LOST' ? 'bg-red-100 text-red-700' :
                  bet.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {bet.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settlement Status</h3>
          <div className="space-y-3">
            {mockSettlements.map((stl) => (
              <div key={stl.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{stl.id} — {stl.scope}</p>
                  <p className="text-xs text-gray-400">{stl.periodStart} to {stl.periodEnd}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">{formatCurrency(stl.netAmount)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    stl.status === 'LOCKED' ? 'bg-green-100 text-green-700' :
                    stl.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' :
                    stl.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {stl.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">System Notice</p>
          <p className="text-xs text-amber-600 mt-1">
            This is a demonstration platform. All regulatory requirements (KYC/AML, age restrictions, responsible gaming, jurisdictional rules) must be validated before production deployment.
            Settlement STL-003 is pending review. 2 pending adjustments require approval.
          </p>
        </div>
      </div>

      {/* Pending Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
          <Clock size={20} className="text-orange-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">{stats.pendingSettlement} Pending Settlements</p>
            <p className="text-xs text-gray-400">Require review & approval</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">2 Pending Adjustments</p>
            <p className="text-xs text-gray-400">Maker-checker workflow</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-500" />
          <div>
            <p className="text-sm font-medium text-gray-700">{stats.completedSettlement} Completed</p>
            <p className="text-xs text-gray-400">Locked & finalized</p>
          </div>
        </div>
      </div>
    </div>
  );
}
