import React, { useState, useEffect } from 'react';
import {
  Shield,
  Eye,
  Edit2,
  Lock,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Database,
  Activity,
  Users,
  FileText,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type AccessLevel = 'read' | 'edit' | 'govern';

interface WorkflowComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  sequence_order: number;
  created_at: string;
}

interface RolePermission {
  id: string;
  role_name: string;
  component_id: string;
  access_level: AccessLevel;
  description: string;
  created_at: string;
}

interface ActivityLog {
  id: string;
  user_email: string;
  user_role: string;
  component_id: string;
  action_type: string;
  resource_type: string;
  resource_id: string;
  metadata: any;
  tenant_id: string;
  created_at: string;
}

interface PermissionMatrix {
  [componentId: string]: {
    [roleName: string]: RolePermission;
  };
}

const AccessControlAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'activity' | 'test'>('matrix');
  const [components, setComponents] = useState<WorkflowComponent[]>([]);
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionMatrix>({});

  const roles = [
    'CIO',
    'CISO',
    'Quality & Compliance Manager',
    'TEVV Engineer',
    'Data & Ethics Manager',
    'MLOps & Reliability Engineer',
    'AI Governance Auditor'
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    buildPermissionMatrix();
  }, [components, permissions]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [componentsResult, permissionsResult, logsResult] = await Promise.all([
        supabase
          .from('workflow_components')
          .select('*')
          .order('sequence_order', { ascending: true }),
        supabase
          .from('role_permissions')
          .select('*')
          .order('role_name', { ascending: true }),
        supabase
          .from('user_activity_log')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)
      ]);

      if (componentsResult.error) throw componentsResult.error;
      if (permissionsResult.error) throw permissionsResult.error;

      setComponents(componentsResult.data || []);
      setPermissions(permissionsResult.data || []);
      setActivityLogs(logsResult.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
      console.error('Error loading access control data:', err);
    } finally {
      setLoading(false);
    }
  };

  const buildPermissionMatrix = () => {
    const matrix: PermissionMatrix = {};

    components.forEach((component) => {
      matrix[component.id] = {};
    });

    permissions.forEach((permission) => {
      if (matrix[permission.component_id]) {
        matrix[permission.component_id][permission.role_name] = permission;
      }
    });

    setPermissionMatrix(matrix);
  };

  const getAccessIcon = (level: AccessLevel) => {
    switch (level) {
      case 'read':
        return { icon: Eye, label: 'Read', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
      case 'edit':
        return { icon: Edit2, label: 'Edit', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'govern':
        return { icon: Lock, label: 'Govern', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' };
    }
  };

  const getRoleStats = () => {
    const stats: Record<string, { read: number; edit: number; govern: number }> = {};

    roles.forEach((role) => {
      stats[role] = { read: 0, edit: 0, govern: 0 };
    });

    permissions.forEach((perm) => {
      if (stats[perm.role_name]) {
        stats[perm.role_name][perm.access_level]++;
      }
    });

    return stats;
  };

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      searchTerm === '' ||
      log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.component_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || log.user_role === filterRole;

    return matchesSearch && matchesRole;
  });

  const renderMatrix = () => {
    const stats = getRoleStats();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Workflow Components</div>
                <div className="text-3xl font-bold mt-1">{components.length}</div>
              </div>
              <Database className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Total Roles</div>
                <div className="text-3xl font-bold mt-1">{roles.length}</div>
              </div>
              <Users className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Permission Mappings</div>
                <div className="text-3xl font-bold mt-1">{permissions.length}</div>
              </div>
              <Shield className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Activity Logs</div>
                <div className="text-3xl font-bold mt-1">{activityLogs.length}</div>
              </div>
              <Activity className="w-10 h-10 opacity-80" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Live Permission Matrix from Database</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="sticky left-0 z-10 px-6 py-3 text-left bg-gray-50 dark:bg-gray-700">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Component
                    </span>
                  </th>
                  {roles.map((role) => (
                    <th key={role} className="px-4 py-3 text-center min-w-[140px]">
                      <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {role}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        R:{stats[role].read} E:{stats[role].edit} G:{stats[role].govern}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {components.map((component, idx) => (
                  <tr
                    key={component.id}
                    className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}
                  >
                    <td className="sticky left-0 z-10 px-6 py-4 bg-inherit">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {component.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {component.id}
                      </div>
                    </td>
                    {roles.map((role) => {
                      const permission = permissionMatrix[component.id]?.[role];
                      if (!permission) {
                        return (
                          <td key={role} className="px-4 py-4 text-center">
                            <div className="text-gray-400 text-xs">No access</div>
                          </td>
                        );
                      }

                      const accessInfo = getAccessIcon(permission.access_level);
                      const Icon = accessInfo.icon;

                      return (
                        <td key={role} className="px-4 py-4 text-center" title={permission.description}>
                          <div className="flex justify-center">
                            <div className={`p-2 rounded-lg ${accessInfo.bg}`}>
                              <Icon className={`w-4 h-4 ${accessInfo.color}`} />
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {accessInfo.label}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderActivityLog = () => {
    return (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email, action, or component..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredLogs.length} of {activityLogs.length} logs
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    Component
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                    Resource
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No activity logs found
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{new Date(log.created_at).toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.user_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {log.user_role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          log.action_type === 'create' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                          log.action_type === 'update' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          log.action_type === 'delete' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                          'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
                        }`}>
                          {log.action_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.component_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div>{log.resource_type}</div>
                        {log.resource_id && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {log.resource_id.substring(0, 8)}...
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <span>Access Control Administration</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Live view of database-enforced access control matrix and activity logs
              </p>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-800 dark:text-red-400">Error loading data</div>
                <div className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</div>
              </div>
            </div>
          )}

          {!error && components.length > 0 && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-green-800 dark:text-green-400">Backend Enforcement Active</div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Access control matrix is enforced at the database level with RLS policies and permission checks
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'matrix'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>Permission Matrix</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'activity'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Activity Log</span>
              </div>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-gray-600 dark:text-gray-400">Loading access control data...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'matrix' && renderMatrix()}
            {activeTab === 'activity' && renderActivityLog()}
          </>
        )}
      </div>
    </div>
  );
};

export default AccessControlAdmin;
