import { useState } from 'react';
import { mockHierarchy } from '../data/mockData';
import { HierarchyNode } from '../types';
import { ChevronRight, ChevronDown, Users, Wallet, AlertTriangle, Crown, Shield, Briefcase, User } from 'lucide-react';

function TreeNode({ node, depth = 0, selectedId, onSelect }: { node: HierarchyNode; depth?: number; selectedId: string | null; onSelect: (node: HierarchyNode) => void }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedId === node.id;

  const roleIcons: Record<string, typeof Crown> = {
    supersenior: Crown,
    master: Shield,
    agent: Briefcase,
    member: User,
  };

  const roleColors: Record<string, string> = {
    supersenior: 'text-red-500 bg-red-50',
    master: 'text-blue-500 bg-blue-50',
    agent: 'text-purple-500 bg-purple-50',
    member: 'text-emerald-500 bg-emerald-50',
  };

  const Icon = roleIcons[node.role] || User;

  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all ${
          isSelected ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-gray-50'
        }`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => onSelect(node)}
      >
        {hasChildren ? (
          <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className="w-4"></span>
        )}
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${roleColors[node.role]}`}>
          <Icon size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800 truncate">{node.name}</span>
            <span className="text-xs text-gray-400">{node.id}</span>
            {node.status === 'suspended' && (
              <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Suspended</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="capitalize">{node.role}</span>
            {node.memberCount > 0 && <span>• {node.memberCount} members</span>}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-500">
          <span title="Credit Limit">💰 {formatCurrency(node.creditLimit)}</span>
          <span title="Exposure">📊 {formatCurrency(node.exposure)}</span>
        </div>
      </div>

      {expanded && hasChildren && (
        <div className="border-l border-gray-200 ml-6">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AgentTree() {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
  const root = mockHierarchy;

  const formatCurrency = (val: number) => `₱${val.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agent Hierarchy</h1>
          <p className="text-sm text-gray-500">Visual representation of the hierarchical structure</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></span> Supersenior</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></span> Master</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-100 border border-purple-300"></span> Agent</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300"></span> Member</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree View */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Organization Tree</h3>
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            <TreeNode node={root} selectedId={selectedNode?.id || null} onSelect={setSelectedNode} />
          </div>
        </div>

        {/* Node Details */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Users size={24} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedNode.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{selectedNode.role} • {selectedNode.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Status</p>
                  <p className={`text-sm font-semibold capitalize ${selectedNode.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedNode.status}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Members</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedNode.memberCount}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Credit Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Credit Limit</span>
                    <span className="font-medium">{formatCurrency(selectedNode.creditLimit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Allocated</span>
                    <span className="font-medium">{formatCurrency(selectedNode.allocatedCredit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Used</span>
                    <span className="font-medium text-orange-600">{formatCurrency(selectedNode.usedCredit)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${(selectedNode.usedCredit / selectedNode.creditLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Risk Exposure</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Current Exposure</span>
                    <span className="font-medium text-red-600">{formatCurrency(selectedNode.exposure)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Utilization</span>
                    <span className="font-medium">{((selectedNode.exposure / selectedNode.creditLimit) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {selectedNode.exposure / selectedNode.creditLimit > 0.4 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-700">Exposure utilization exceeds 40%. Monitor closely.</p>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">View Transactions</button>
                  <button className="text-xs px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">View Settlement</button>
                  <button className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100">Allocate Credit</button>
                  <button className="text-xs px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100">Adjust Rate</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Users size={48} className="text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm">Click a node to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
