import { supabase } from '../lib/supabase';

export type AccessLevel = 'read' | 'edit' | 'govern';

export interface ComponentPermission {
  component_id: string;
  access_level: AccessLevel;
  description: string;
}

export interface UserPermissions {
  role: string;
  permissions: Map<string, ComponentPermission>;
}

const accessLevelHierarchy: Record<AccessLevel, number> = {
  read: 1,
  edit: 2,
  govern: 3,
};

export const hasPermission = (
  userPermissions: UserPermissions | null,
  componentId: string,
  requiredLevel: AccessLevel = 'read'
): boolean => {
  if (!userPermissions) return false;

  const permission = userPermissions.permissions.get(componentId);
  if (!permission) return false;

  const userLevel = accessLevelHierarchy[permission.access_level];
  const requiredLevelValue = accessLevelHierarchy[requiredLevel];

  return userLevel >= requiredLevelValue;
};

export const getUserPermissions = async (userEmail: string): Promise<UserPermissions | null> => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', userEmail)
      .maybeSingle();

    if (userError || !user) {
      console.error('Error fetching user:', userError);
      return null;
    }

    const { data: permissions, error: permError } = await supabase
      .from('role_permissions')
      .select('component_id, access_level, description')
      .eq('role_name', user.role);

    if (permError) {
      console.error('Error fetching permissions:', permError);
      return null;
    }

    const permissionMap = new Map<string, ComponentPermission>();
    permissions?.forEach((perm) => {
      permissionMap.set(perm.component_id, perm);
    });

    return {
      role: user.role,
      permissions: permissionMap,
    };
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return null;
  }
};

export const getAccessLevelIcon = (level: AccessLevel) => {
  switch (level) {
    case 'read':
      return '👁️';
    case 'edit':
      return '✏️';
    case 'govern':
      return '🔒';
  }
};

export const getAccessLevelColor = (level: AccessLevel) => {
  switch (level) {
    case 'read':
      return 'text-green-600 dark:text-green-400';
    case 'edit':
      return 'text-blue-600 dark:text-blue-400';
    case 'govern':
      return 'text-purple-600 dark:text-purple-400';
  }
};

export const componentIdMap: Record<string, string> = {
  'application-setup': 'application_setup',
  'risk-identification': 'risk_identification',
  'metrics-definition': 'metrics_definition',
  'dataset-generation': 'dataset_generation',
  'test-lab': 'test_lab',
  'trust-score': 'trust_score',
  'explainability': 'explainability',
  'trust-matrix': 'trust_matrix',
  'authorization': 'authorization',
  'continuous-monitoring': 'monitoring',
};

export const getComponentPermission = (
  userPermissions: UserPermissions | null,
  routeId: string
): ComponentPermission | null => {
  if (!userPermissions) return null;

  const componentId = componentIdMap[routeId] || routeId;
  return userPermissions.permissions.get(componentId) || null;
};
