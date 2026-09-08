import { User, Product, Draw, BettingType, RateProfile, Bet, CreditAccount, LedgerEntry, Settlement, Commission, AuditLog, HierarchyNode } from '../types';

export const mockUsers: User[] = [
  { id: 'SS-001', username: 'supersenior', displayName: 'System Operator', role: 'supersenior', parentId: null, status: 'active', creditLimit: 10000000, allocatedCredit: 5000000, usedCredit: 2500000, exposure: 1200000, createdAt: '2026-01-01' },
  { id: 'MS-001', username: 'master_a', displayName: 'Master Alpha', role: 'master', parentId: 'SS-001', status: 'active', creditLimit: 2000000, allocatedCredit: 1500000, usedCredit: 800000, exposure: 450000, createdAt: '2026-01-15' },
  { id: 'MS-002', username: 'master_b', displayName: 'Master Beta', role: 'master', parentId: 'SS-001', status: 'active', creditLimit: 1500000, allocatedCredit: 1000000, usedCredit: 600000, exposure: 320000, createdAt: '2026-02-01' },
  { id: 'AG-001', username: 'agent_a1', displayName: 'Agent A1', role: 'agent', parentId: 'MS-001', status: 'active', creditLimit: 500000, allocatedCredit: 400000, usedCredit: 250000, exposure: 150000, createdAt: '2026-02-10' },
  { id: 'AG-002', username: 'agent_a2', displayName: 'Agent A2', role: 'agent', parentId: 'MS-001', status: 'active', creditLimit: 300000, allocatedCredit: 250000, usedCredit: 180000, exposure: 95000, createdAt: '2026-02-15' },
  { id: 'AG-003', username: 'agent_b1', displayName: 'Agent B1', role: 'agent', parentId: 'MS-002', status: 'suspended', creditLimit: 400000, allocatedCredit: 300000, usedCredit: 200000, exposure: 110000, createdAt: '2026-03-01' },
  { id: 'MB-001', username: 'member_001', displayName: 'Player One', role: 'member', parentId: 'AG-001', status: 'active', creditLimit: 50000, allocatedCredit: 40000, usedCredit: 25000, exposure: 12000, createdAt: '2026-03-05' },
  { id: 'MB-002', username: 'member_002', displayName: 'Player Two', role: 'member', parentId: 'AG-001', status: 'active', creditLimit: 30000, allocatedCredit: 20000, usedCredit: 15000, exposure: 8000, createdAt: '2026-03-10' },
  { id: 'MB-003', username: 'member_003', displayName: 'Player Three', role: 'member', parentId: 'AG-002', status: 'active', creditLimit: 25000, allocatedCredit: 18000, usedCredit: 10000, exposure: 5000, createdAt: '2026-03-15' },
  { id: 'MB-004', username: 'member_004', displayName: 'Player Four', role: 'member', parentId: 'AG-002', status: 'active', creditLimit: 40000, allocatedCredit: 35000, usedCredit: 22000, exposure: 11000, createdAt: '2026-03-20' },
];

export const mockProducts: Product[] = [
  { id: 'PRD-001', name: 'Daily Lottery', code: 'DL', status: 'active', description: 'Daily draw lottery product' },
  { id: 'PRD-002', name: 'Weekly Jackpot', code: 'WJ', status: 'active', description: 'Weekly jackpot lottery' },
  { id: 'PRD-003', name: 'Special Draw', code: 'SD', status: 'inactive', description: 'Special event lottery' },
];

export const mockDraws: Draw[] = [
  { id: 'DRW-001', productId: 'PRD-001', name: 'Daily Draw #1245', drawDate: '2026-06-15', openAt: '2026-06-15T08:00:00Z', closeAt: '2026-06-15T17:00:00Z', resultAt: '2026-06-15T18:00:00Z', status: 'SETTLED', result: '4523' },
  { id: 'DRW-002', productId: 'PRD-001', name: 'Daily Draw #1246', drawDate: '2026-06-16', openAt: '2026-06-16T08:00:00Z', closeAt: '2026-06-16T17:00:00Z', resultAt: '2026-06-16T18:00:00Z', status: 'OPEN', result: null },
  { id: 'DRW-003', productId: 'PRD-002', name: 'Weekly Jackpot #52', drawDate: '2026-06-18', openAt: '2026-06-18T00:00:00Z', closeAt: '2026-06-18T20:00:00Z', resultAt: '2026-06-18T21:00:00Z', status: 'SCHEDULED', result: null },
  { id: 'DRW-004', productId: 'PRD-001', name: 'Daily Draw #1244', drawDate: '2026-06-14', openAt: '2026-06-14T08:00:00Z', closeAt: '2026-06-14T17:00:00Z', resultAt: '2026-06-14T18:00:00Z', status: 'RESULT_PUBLISHED', result: '7891' },
];

export const mockBettingTypes: BettingType[] = [
  { id: 'BT-001', productId: 'PRD-001', name: '2-Digit Top', code: '2DT', numberFormat: '2', minAmount: 10, maxAmount: 5000, maxNumberAmount: 20000, maxMemberExposure: 50000, maxAgentExposure: 200000, status: 'active' },
  { id: 'BT-002', productId: 'PRD-001', name: '2-Digit Bottom', code: '2DB', numberFormat: '2', minAmount: 10, maxAmount: 5000, maxNumberAmount: 20000, maxMemberExposure: 50000, maxAgentExposure: 200000, status: 'active' },
  { id: 'BT-003', productId: 'PRD-001', name: '3-Digit', code: '3D', numberFormat: '3', minAmount: 10, maxAmount: 10000, maxNumberAmount: 50000, maxMemberExposure: 100000, maxAgentExposure: 500000, status: 'active' },
  { id: 'BT-004', productId: 'PRD-001', name: '3-Digit Top', code: '3DT', numberFormat: '3', minAmount: 10, maxAmount: 8000, maxNumberAmount: 40000, maxMemberExposure: 80000, maxAgentExposure: 400000, status: 'active' },
  { id: 'BT-005', productId: 'PRD-002', name: '4-Digit Jackpot', code: '4DJ', numberFormat: '4', minAmount: 50, maxAmount: 20000, maxNumberAmount: 100000, maxMemberExposure: 200000, maxAgentExposure: 1000000, status: 'active' },
];

export const mockRateProfiles: RateProfile[] = [
  {
    id: 'RP-001', name: 'Standard Rate Profile v2', effectiveDate: '2026-06-01',
    items: [
      { id: 'RPI-001', productId: 'PRD-001', bettingTypeId: 'BT-001', rate: 0.85, maxRate: 0.90 },
      { id: 'RPI-002', productId: 'PRD-001', bettingTypeId: 'BT-002', rate: 0.80, maxRate: 0.85 },
      { id: 'RPI-003', productId: 'PRD-001', bettingTypeId: 'BT-003', rate: 0.70, maxRate: 0.75 },
      { id: 'RPI-004', productId: 'PRD-001', bettingTypeId: 'BT-004', rate: 0.72, maxRate: 0.78 },
      { id: 'RPI-005', productId: 'PRD-002', bettingTypeId: 'BT-005', rate: 0.60, maxRate: 0.65 },
    ]
  },
  {
    id: 'RP-002', name: 'Premium Rate Profile v1', effectiveDate: '2026-05-01',
    items: [
      { id: 'RPI-006', productId: 'PRD-001', bettingTypeId: 'BT-001', rate: 0.82, maxRate: 0.90 },
      { id: 'RPI-007', productId: 'PRD-001', bettingTypeId: 'BT-002', rate: 0.78, maxRate: 0.85 },
      { id: 'RPI-008', productId: 'PRD-001', bettingTypeId: 'BT-003', rate: 0.68, maxRate: 0.75 },
      { id: 'RPI-009', productId: 'PRD-001', bettingTypeId: 'BT-004', rate: 0.70, maxRate: 0.78 },
      { id: 'RPI-010', productId: 'PRD-002', bettingTypeId: 'BT-005', rate: 0.58, maxRate: 0.65 },
    ]
  }
];

export const mockBets: Bet[] = [
  { id: 'BET-001', transactionId: 'TXN-20260615-0001', memberId: 'MB-001', agentId: 'AG-001', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-001', bettingTypeId: 'BT-001', betNumber: '45', amount: 500, effectiveRate: 0.85, rateVersionId: 'RV-001', status: 'WON', createdAt: '2026-06-15T10:30:00Z' },
  { id: 'BET-002', transactionId: 'TXN-20260615-0002', memberId: 'MB-001', agentId: 'AG-001', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-001', bettingTypeId: 'BT-003', betNumber: '452', amount: 1000, effectiveRate: 0.70, rateVersionId: 'RV-001', status: 'LOST', createdAt: '2026-06-15T11:15:00Z' },
  { id: 'BET-003', transactionId: 'TXN-20260615-0003', memberId: 'MB-002', agentId: 'AG-001', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-001', bettingTypeId: 'BT-002', betNumber: '23', amount: 300, effectiveRate: 0.80, rateVersionId: 'RV-001', status: 'WON', createdAt: '2026-06-15T12:00:00Z' },
  { id: 'BET-004', transactionId: 'TXN-20260616-0001', memberId: 'MB-003', agentId: 'AG-002', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-002', bettingTypeId: 'BT-001', betNumber: '67', amount: 800, effectiveRate: 0.85, rateVersionId: 'RV-001', status: 'ACCEPTED', createdAt: '2026-06-16T09:00:00Z' },
  { id: 'BET-005', transactionId: 'TXN-20260616-0002', memberId: 'MB-004', agentId: 'AG-002', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-002', bettingTypeId: 'BT-004', betNumber: '891', amount: 2000, effectiveRate: 0.72, rateVersionId: 'RV-001', status: 'ACCEPTED', createdAt: '2026-06-16T09:30:00Z' },
  { id: 'BET-006', transactionId: 'TXN-20260614-0001', memberId: 'MB-001', agentId: 'AG-001', masterId: 'MS-001', superseniorId: 'SS-001', productId: 'PRD-001', drawId: 'DRW-004', bettingTypeId: 'BT-001', betNumber: '78', amount: 600, effectiveRate: 0.85, rateVersionId: 'RV-001', status: 'WON', createdAt: '2026-06-14T10:00:00Z' },
];

export const mockCreditAccounts: CreditAccount[] = [
  { id: 'CA-001', userId: 'SS-001', creditLimit: 10000000, allocatedCredit: 5000000, usedCredit: 2500000, availableCredit: 2500000, exposure: 1200000, availableExposure: 3800000 },
  { id: 'CA-002', userId: 'MS-001', creditLimit: 2000000, allocatedCredit: 1500000, usedCredit: 800000, availableCredit: 700000, exposure: 450000, availableExposure: 1050000 },
  { id: 'CA-003', userId: 'MS-002', creditLimit: 1500000, allocatedCredit: 1000000, usedCredit: 600000, availableCredit: 400000, exposure: 320000, availableExposure: 680000 },
  { id: 'CA-004', userId: 'AG-001', creditLimit: 500000, allocatedCredit: 400000, usedCredit: 250000, availableCredit: 150000, exposure: 150000, availableExposure: 250000 },
  { id: 'CA-005', userId: 'AG-002', creditLimit: 300000, allocatedCredit: 250000, usedCredit: 180000, availableCredit: 70000, exposure: 95000, availableExposure: 155000 },
];

export const mockLedgerEntries: LedgerEntry[] = [
  { id: 'LE-001', accountId: 'CA-004', type: 'INITIAL_CREDIT', amount: 400000, balanceBefore: 0, balanceAfter: 400000, reference: 'Initial allocation from MS-001', createdBy: 'MS-001', createdAt: '2026-02-10T00:00:00Z' },
  { id: 'LE-002', accountId: 'CA-004', type: 'BET_DEBIT', amount: -500, balanceBefore: 400000, balanceAfter: 399500, reference: 'TXN-20260615-0001', createdBy: 'MB-001', createdAt: '2026-06-15T10:30:00Z' },
  { id: 'LE-003', accountId: 'CA-004', type: 'SETTLEMENT_CREDIT', amount: 425, balanceBefore: 399500, balanceAfter: 399925, reference: 'Settlement DRW-001', createdBy: 'SYSTEM', createdAt: '2026-06-15T19:00:00Z' },
  { id: 'LE-004', accountId: 'CA-004', type: 'BET_DEBIT', amount: -1000, balanceBefore: 399925, balanceAfter: 398925, reference: 'TXN-20260615-0002', createdBy: 'MB-001', createdAt: '2026-06-15T11:15:00Z' },
  { id: 'LE-005', accountId: 'CA-004', type: 'ADJUSTMENT', amount: 5000, balanceBefore: 398925, balanceAfter: 403925, reference: 'Credit top-up approved by MS-001', createdBy: 'MS-001', createdAt: '2026-06-15T14:00:00Z' },
];

export const mockSettlements: Settlement[] = [
  { id: 'STL-001', periodStart: '2026-06-14', periodEnd: '2026-06-14', scope: 'DAILY', grossAmount: 45000, payoutAmount: 28000, commissionAmount: 4200, netAmount: 12800, status: 'LOCKED', approvedBy: 'SS-001', approvedAt: '2026-06-15T08:00:00Z', lockedAt: '2026-06-15T09:00:00Z' },
  { id: 'STL-002', periodStart: '2026-06-15', periodEnd: '2026-06-15', scope: 'DAILY', grossAmount: 52000, payoutAmount: 31000, commissionAmount: 5100, netAmount: 15900, status: 'APPROVED', approvedBy: 'SS-001', approvedAt: '2026-06-16T08:00:00Z', lockedAt: null },
  { id: 'STL-003', periodStart: '2026-06-16', periodEnd: '2026-06-16', scope: 'DAILY', grossAmount: 38000, payoutAmount: 22000, commissionAmount: 3800, netAmount: 12200, status: 'CALCULATED', approvedBy: null, approvedAt: null, lockedAt: null },
  { id: 'STL-004', periodStart: '2026-06-09', periodEnd: '2026-06-15', scope: 'WEEKLY', grossAmount: 310000, payoutAmount: 185000, commissionAmount: 31000, netAmount: 94000, status: 'REVIEW', approvedBy: null, approvedAt: null, lockedAt: null },
];

export const mockCommissions: Commission[] = [
  { id: 'COM-001', transactionId: 'TXN-20260615-0001', beneficiaryId: 'AG-001', beneficiaryLevel: 'agent', calculationRule: 'percentage_of_bet', rate: 0.05, baseAmount: 500, commissionAmount: 25, status: 'distributed' },
  { id: 'COM-002', transactionId: 'TXN-20260615-0001', beneficiaryId: 'MS-001', beneficiaryLevel: 'master', calculationRule: 'percentage_of_bet', rate: 0.02, baseAmount: 500, commissionAmount: 10, status: 'distributed' },
  { id: 'COM-003', transactionId: 'TXN-20260615-0002', beneficiaryId: 'AG-001', beneficiaryLevel: 'agent', calculationRule: 'percentage_of_bet', rate: 0.05, baseAmount: 1000, commissionAmount: 50, status: 'distributed' },
  { id: 'COM-004', transactionId: 'TXN-20260615-0002', beneficiaryId: 'MS-001', beneficiaryLevel: 'master', calculationRule: 'percentage_of_bet', rate: 0.02, baseAmount: 1000, commissionAmount: 20, status: 'distributed' },
  { id: 'COM-005', transactionId: 'TXN-20260616-0001', beneficiaryId: 'AG-002', beneficiaryLevel: 'agent', calculationRule: 'percentage_of_bet', rate: 0.05, baseAmount: 800, commissionAmount: 40, status: 'pending' },
  { id: 'COM-006', transactionId: 'TXN-20260616-0001', beneficiaryId: 'MS-001', beneficiaryLevel: 'master', calculationRule: 'percentage_of_bet', rate: 0.02, baseAmount: 800, commissionAmount: 16, status: 'pending' },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'AL-001', userId: 'SS-001', action: 'USER_CREATED', target: 'MS-001', before: 'N/A', after: 'Master Alpha created', ip: '192.168.1.1', device: 'Chrome/Windows', timestamp: '2026-01-15T10:00:00Z', reason: 'New master onboarding' },
  { id: 'AL-002', userId: 'MS-001', action: 'RATE_CHANGED', target: 'AG-001', before: 'Rate: 0.80', after: 'Rate: 0.85', ip: '192.168.1.10', device: 'Chrome/MacOS', timestamp: '2026-06-10T14:30:00Z', reason: 'Market adjustment' },
  { id: 'AL-003', userId: 'SS-001', action: 'CREDIT_ALLOCATED', target: 'MS-001', before: 'Allocated: 1,000,000', after: 'Allocated: 1,500,000', ip: '192.168.1.1', device: 'Chrome/Windows', timestamp: '2026-06-12T09:00:00Z', reason: 'Increased capacity' },
  { id: 'AL-004', userId: 'MS-001', action: 'USER_SUSPENDED', target: 'AG-003', before: 'active', after: 'suspended', ip: '192.168.1.10', device: 'Chrome/MacOS', timestamp: '2026-06-14T16:00:00Z', reason: 'Policy violation' },
  { id: 'AL-005', userId: 'SS-001', action: 'SETTLEMENT_LOCKED', target: 'STL-001', before: 'APPROVED', after: 'LOCKED', ip: '192.168.1.1', device: 'Chrome/Windows', timestamp: '2026-06-15T09:00:00Z', reason: 'Period settlement finalized' },
  { id: 'AL-006', userId: 'SYSTEM', action: 'BET_ACCEPTED', target: 'TXN-20260615-0001', before: 'N/A', after: 'Bet accepted: 500 on 45', ip: '192.168.1.50', device: 'API', timestamp: '2026-06-15T10:30:00Z', reason: 'Automated' },
];

export const mockHierarchy: HierarchyNode = {
  id: 'SS-001', name: 'System Operator', role: 'supersenior', status: 'active',
  creditLimit: 10000000, allocatedCredit: 5000000, usedCredit: 2500000, exposure: 1200000, memberCount: 4,
  children: [
    {
      id: 'MS-001', name: 'Master Alpha', role: 'master', status: 'active',
      creditLimit: 2000000, allocatedCredit: 1500000, usedCredit: 800000, exposure: 450000, memberCount: 4,
      children: [
        {
          id: 'AG-001', name: 'Agent A1', role: 'agent', status: 'active',
          creditLimit: 500000, allocatedCredit: 400000, usedCredit: 250000, exposure: 150000, memberCount: 2,
          children: [
            { id: 'MB-001', name: 'Player One', role: 'member', status: 'active', creditLimit: 50000, allocatedCredit: 40000, usedCredit: 25000, exposure: 12000, memberCount: 0, children: [] },
            { id: 'MB-002', name: 'Player Two', role: 'member', status: 'active', creditLimit: 30000, allocatedCredit: 20000, usedCredit: 15000, exposure: 8000, memberCount: 0, children: [] },
          ]
        },
        {
          id: 'AG-002', name: 'Agent A2', role: 'agent', status: 'active',
          creditLimit: 300000, allocatedCredit: 250000, usedCredit: 180000, exposure: 95000, memberCount: 2,
          children: [
            { id: 'MB-003', name: 'Player Three', role: 'member', status: 'active', creditLimit: 25000, allocatedCredit: 18000, usedCredit: 10000, exposure: 5000, memberCount: 0, children: [] },
            { id: 'MB-004', name: 'Player Four', role: 'member', status: 'active', creditLimit: 40000, allocatedCredit: 35000, usedCredit: 22000, exposure: 11000, memberCount: 0, children: [] },
          ]
        }
      ]
    },
    {
      id: 'MS-002', name: 'Master Beta', role: 'master', status: 'active',
      creditLimit: 1500000, allocatedCredit: 1000000, usedCredit: 600000, exposure: 320000, memberCount: 0,
      children: [
        {
          id: 'AG-003', name: 'Agent B1', role: 'agent', status: 'suspended',
          creditLimit: 400000, allocatedCredit: 300000, usedCredit: 200000, exposure: 110000, memberCount: 0,
          children: []
        }
      ]
    }
  ]
};

export const dashboardStats = {
  totalMasters: 2,
  totalAgents: 3,
  totalMembers: 4,
  totalTransactions: 6,
  totalAmount: 5200,
  totalExposure: 1200000,
  creditAllocated: 5000000,
  creditUsed: 2500000,
  creditAvailable: 2500000,
  pendingSettlement: 2,
  completedSettlement: 2,
  totalCommission: 161,
  netResult: 128900,
};
