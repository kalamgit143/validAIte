// Authentication and User Management Types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  tenantId: string;
  organizationId?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
  mfaEnabled: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'analyst' | 'viewer' | 'guest';
  permissions: Permission[];
  isCustom: boolean;
}

export interface Permission {
  id: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute' | 'approve';
  scope: 'own' | 'team' | 'organization' | 'tenant' | 'global';
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'starter' | 'professional' | 'enterprise' | 'custom';
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
  settings: TenantSettings;
  billing: BillingInfo;
  usage: UsageMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface TenantSettings {
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    customDomain?: string;
  };
  security: {
    mfaRequired: boolean;
    sessionTimeout: number;
    ipWhitelist?: string[];
    ssoEnabled: boolean;
    ssoProvider?: string;
  };
  features: {
    maxApplications: number;
    maxUsers: number;
    maxDataRetentionDays: number;
    advancedAnalytics: boolean;
    customIntegrations: boolean;
    prioritySupport: boolean;
  };
  compliance: {
    frameworks: string[];
    dataResidency: string;
    auditRetention: number;
  };
}

export interface BillingInfo {
  plan: string;
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: string;
  paymentMethod: string;
  billingAddress: Address;
  invoices: Invoice[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
}

export interface UsageMetrics {
  currentPeriod: {
    requests: number;
    evaluations: number;
    storage: number;
    users: number;
  };
  limits: {
    maxRequests: number;
    maxEvaluations: number;
    maxStorage: number;
    maxUsers: number;
  };
  billingPeriod: {
    start: string;
    end: string;
  };
}

export interface Team {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  members: TeamMember[];
  applications: string[];
  permissions: TeamPermission[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface TeamMember {
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: string;
  invitedBy: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface TeamPermission {
  resource: string;
  actions: string[];
  scope: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    slack: boolean;
    frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  };
  dashboard: {
    defaultView: string;
    widgets: string[];
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantDomain?: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  tenantName: string;
  tenantDomain: string;
  plan: string;
  acceptTerms: boolean;
}

export interface InviteData {
  email: string;
  role: string;
  teamIds?: string[];
  message?: string;
}