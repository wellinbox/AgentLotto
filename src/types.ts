export type UserRole = 'supersenior' | 'master' | 'agent' | 'member';

export type DrawStatus = 'DRAFT' | 'SCHEDULED' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'RESULT_PENDING' | 'RESULT_PUBLISHED' | 'SETTLEMENT_PENDING' | 'SETTLED' | 'CANCELLED';

export type SettlementStatus = 'OPEN' | 'CALCULATING' | 'CALCULATED' | 'REVIEW' | 'APPROVED' | 'LOCKED';

export type BetStatus = 'PENDING' | 'ACCEPTED' | 'VOID' | 'CANCELLED' | 'WON' | 'LOST';

export type CreditLedgerType = 'INITIAL_CREDIT' | 'CREDIT_ALLOCATION' | 'BET_DEBIT' | 'SETTLEMENT_CREDIT' | 'ADJUSTMENT' | 'REVERSAL' | 'WITHDRAWAL' | 'REFUND';

export interface User {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  parentId: string | null;
  status: 'active' | 'suspended' | 'inactive';
  creditLimit: number;
  allocatedCredit: number;
  usedCredit: number;
  exposure: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  description: string;
}

export interface Draw {
  id: string;
  productId: string;
  name: string;
  drawDate: string;
  openAt: string;
  closeAt: string;
  resultAt: string;
  status: DrawStatus;
  result: string | null;
}

export interface BettingType {
  id: string;
  productId: string;
  name: string;
  code: string;
  numberFormat: string;
  minAmount: number;
  maxAmount: number;
  maxNumberAmount: number;
  maxMemberExposure: number;
  maxAgentExposure: number;
  status: 'active' | 'inactive';
}

export interface RateProfile {
  id: string;
  name: string;
  effectiveDate: string;
  items: RateProfileItem[];
}

export interface RateProfileItem {
  id: string;
  productId: string;
  bettingTypeId: string;
  rate: number;
  maxRate: number;
}

export interface Bet {
  id: string;
  transactionId: string;
  memberId: string;
  agentId: string;
  masterId: string;
  superseniorId: string;
  productId: string;
  drawId: string;
  bettingTypeId: string;
  betNumber: string;
  amount: number;
  effectiveRate: number;
  rateVersionId: string;
  status: BetStatus;
  createdAt: string;
}

export interface CreditAccount {
  id: string;
  userId: string;
  creditLimit: number;
  allocatedCredit: number;
  usedCredit: number;
  availableCredit: number;
  exposure: number;
  availableExposure: number;
}

export interface LedgerEntry {
  id: string;
  accountId: string;
  type: CreditLedgerType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  createdBy: string;
  createdAt: string;
}

export interface Settlement {
  id: string;
  periodStart: string;
  periodEnd: string;
  scope: string;
  grossAmount: number;
  payoutAmount: number;
  commissionAmount: number;
  netAmount: number;
  status: SettlementStatus;
  approvedBy: string | null;
  approvedAt: string | null;
  lockedAt: string | null;
}

export interface Commission {
  id: string;
  transactionId: string;
  beneficiaryId: string;
  beneficiaryLevel: string;
  calculationRule: string;
  rate: number;
  baseAmount: number;
  commissionAmount: number;
  status: 'pending' | 'distributed' | 'paid';
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  target: string;
  before: string;
  after: string;
  ip: string;
  device: string;
  timestamp: string;
  reason: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'inactive';
  creditLimit: number;
  allocatedCredit: number;
  usedCredit: number;
  exposure: number;
  memberCount: number;
  children: HierarchyNode[];
}
