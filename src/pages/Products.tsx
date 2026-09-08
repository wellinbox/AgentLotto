import { mockProducts, mockDraws, mockBettingTypes } from '../data/mockData';
import { Plus, Edit, Eye } from 'lucide-react';

export default function Products() {
  const getDrawsForProduct = (productId: string) => mockDraws.filter(d => d.productId === productId);
  const getBetTypesForProduct = (productId: string) => mockBettingTypes.filter(bt => bt.productId === productId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products & Draws</h1>
          <p className="text-sm text-gray-500">Lottery product configuration, draw management, and betting types</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
          <Plus size={16} /> New Product
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><Edit size={16} /></button>
            </div>
            <p className="text-xs text-gray-500 mb-2">{product.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-0.5 rounded">Code: {product.code}</span>
              <span className={`px-2 py-0.5 rounded ${product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {product.status}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>{getDrawsForProduct(product.id).length} draws</span> • <span>{getBetTypesForProduct(product.id).length} betting types</span>
            </div>
          </div>
        ))}
      </div>

      {/* Draws */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Draws</h3>
          <button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1">
            <Plus size={12} /> Schedule Draw
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Draw ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Open</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Close</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Result</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockDraws.map((draw) => {
                const product = mockProducts.find(p => p.id === draw.productId);
                return (
                  <tr key={draw.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{draw.id}</td>
                    <td className="px-4 py-3 font-medium">{draw.name}</td>
                    <td className="px-4 py-3 text-xs">{product?.name}</td>
                    <td className="px-4 py-3 text-xs">{draw.drawDate}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(draw.openAt).toLocaleTimeString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(draw.closeAt).toLocaleTimeString()}</td>
                    <td className="px-4 py-3 font-mono font-bold">{draw.result || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        draw.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                        draw.status === 'SETTLED' ? 'bg-blue-100 text-blue-700' :
                        draw.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-700' :
                        draw.status === 'RESULT_PUBLISHED' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{draw.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Betting Types */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Betting Types</h3>
          <button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1">
            <Plus size={12} /> Add Type
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Code</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Format</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Min Amt</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Max Amt</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Max Exposure</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBettingTypes.map((bt) => (
                <tr key={bt.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{bt.id}</td>
                  <td className="px-4 py-3 font-medium">{bt.name}</td>
                  <td className="px-4 py-3"><span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{bt.code}</span></td>
                  <td className="px-4 py-3">{bt.numberFormat}-digit</td>
                  <td className="px-4 py-3 text-right">₱{bt.minAmount}</td>
                  <td className="px-4 py-3 text-right">₱{bt.maxAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">₱{bt.maxMemberExposure.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded ${bt.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {bt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Draw State Machine */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Draw State Machine</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {['DRAFT', 'SCHEDULED', 'OPEN', 'CLOSING', 'CLOSED', 'RESULT_PENDING', 'RESULT_PUBLISHED', 'SETTLEMENT_PENDING', 'SETTLED'].map((state, i) => (
            <div key={state} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg border ${
                state === 'OPEN' ? 'bg-green-50 border-green-200 text-green-700' :
                state === 'SETTLED' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                'bg-gray-50 border-gray-200 text-gray-600'
              }`}>{state}</span>
              {i < 8 && <span className="text-gray-300">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
