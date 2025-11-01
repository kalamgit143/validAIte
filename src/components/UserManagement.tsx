import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Mail,
  Shield,
  Crown,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MoreVertical,
  Copy,
  Download
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const users = [
    {
      id: 'user_001',
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@acme.com',
      avatar: null,
      role: 'Platform Admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T09:00:00Z',
      teams: ['AI Safety Team', 'Platform Engineering'],
      permissions: ['full_access'],
      mfaEnabled: true,
      loginCount: 247
    },
    {
      id: 'user_002',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@acme.com',
      avatar: null,
      role: 'AI Engineer',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2024-01-05T14:00:00Z',
      teams: ['AI Safety Team'],
      permissions: ['evaluations', 'models', 'datasets'],
      mfaEnabled: false,
      loginCount: 156
    },
    {
      id: 'user_003',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@acme.com',
      avatar: null,
      role: 'Compliance Manager',
      status: 'active',
      lastLogin: '2024-01-15T08:45:00Z',
      createdAt: '2024-01-08T11:00:00Z',
      teams: ['Compliance Team'],
      permissions: ['compliance', 'reports', 'audits'],
      mfaEnabled: true,
      loginCount: 89
    },
    {
      id: 'user_004',
      firstName: 'Alex',
      lastName: 'Kim',
      email: 'alex.kim@acme.com',
      avatar: null,
      role: 'Data Analyst',
      status: 'pending',
      lastLogin: null,
      createdAt: '2024-01-14T16:00:00Z',
      teams: [],
      permissions: ['analytics', 'datasets'],
      mfaEnabled: false,
      loginCount: 0
    }
  ];

  const roles = [
    {
      id: 'role_001',
      name: 'Platform Admin',
      description: 'Full platform access with administrative privileges',
      level: 'admin',
      userCount: 1,
      permissions: [
        'User Management',
        'System Configuration',
        'Billing & Plans',
        'Security Settings',
        'All AI Operations'
      ],
      isCustom: false
    },
    {
      id: 'role_002',
      name: 'AI Engineer',
      description: 'AI model development and evaluation access',
      level: 'manager',
      userCount: 3,
      permissions: [
        'Model Management',
        'Evaluations & Testing',
        'Dataset Management',
        'Playground Access',
        'Analytics (Read)'
      ],
      isCustom: false
    },
    {
      id: 'role_003',
      name: 'Compliance Manager',
      description: 'Compliance, governance, and audit access',
      level: 'manager',
      userCount: 2,
      permissions: [
        'Compliance Reports',
        'Audit Trail Access',
        'Risk Assessment',
        'Governance Controls',
        'Evidence Packs'
      ],
      isCustom: false
    },
    {
      id: 'role_004',
      name: 'Data Analyst',
      description: 'Analytics and reporting access',
      level: 'analyst',
      userCount: 4,
      permissions: [
        'Analytics Dashboard',
        'Report Generation',
        'Dataset Access (Read)',
        'Evaluation Results',
        'Basic Monitoring'
      ],
      isCustom: false
    }
  ];

  const teams = [
    {
      id: 'team_001',
      name: 'AI Safety Team',
      description: 'Responsible for AI safety, ethics, and bias detection',
      memberCount: 5,
      applications: ['Customer Support Bot', 'Content Generator'],
      lead: 'Madhu Ronanki',
      createdAt: '2024-01-01T09:00:00Z',
      permissions: ['safety_guardrails', 'bias_auditing', 'ethical_ai']
    },
    {
      id: 'team_002',
      name: 'Platform Engineering',
      description: 'Platform development and infrastructure management',
      memberCount: 8,
      applications: ['All Applications'],
      lead: 'Mike Johnson',
      createdAt: '2024-01-01T09:00:00Z',
      permissions: ['system_admin', 'infrastructure', 'monitoring']
    },
    {
      id: 'team_003',
      name: 'Compliance Team',
      description: 'Regulatory compliance and governance oversight',
      memberCount: 3,
      applications: ['All Applications'],
      lead: 'Emily Davis',
      createdAt: '2024-01-05T10:00:00Z',
      permissions: ['compliance_reports', 'audit_trail', 'governance']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleIcon = (level: string) => {
    switch (level) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'manager': return <Shield className="w-4 h-4" />;
      case 'analyst': return <Eye className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'manager': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'analyst': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage users, roles, and team access across your organization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowRoleModal(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Create Role</span>
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Teams</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teams.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MFA Enabled</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.filter(u => u.mfaEnabled).length}/{users.length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['users', 'roles', 'teams'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} ({tab === 'users' ? users.length : tab === 'roles' ? roles.length : teams.length})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Roles</option>
                  <option>Platform Admin</option>
                  <option>AI Engineer</option>
                  <option>Compliance Manager</option>
                  <option>Data Analyst</option>
                </select>

                <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {user.firstName} {user.lastName}
                            </h3>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {getStatusIcon(user.status)}
                              <span className="capitalize">{user.status}</span>
                            </div>
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role.includes('Admin') ? 'admin' : user.role.includes('Manager') ? 'manager' : 'analyst')}`}>
                              {getRoleIcon(user.role.includes('Admin') ? 'admin' : user.role.includes('Manager') ? 'manager' : 'analyst')}
                              <span>{user.role}</span>
                            </div>
                            {user.mfaEnabled && (
                              <div className="inline-flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                                <Shield className="w-3 h-3" />
                                <span>MFA</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Last Login</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Login Count</span>
                              <div className="font-medium text-gray-900 dark:text-white">{user.loginCount}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Teams</span>
                              <div className="font-medium text-gray-900 dark:text-white">{user.teams.length} teams</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 dark:text-gray-500">Created</span>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {user.teams.map((team, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                                {team}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role.level)}`}>
                          {getRoleIcon(role.level)}
                          <span className="capitalize">{role.level}</span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          {role.userCount} users
                        </span>
                        {role.isCustom && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            Custom
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Permissions</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        Edit
                      </button>
                      {role.isCustom && (
                        <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="space-y-4">
              {teams.map((team) => (
                <div key={team.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          {team.memberCount} members
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{team.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Team Lead</span>
                          <div className="font-medium text-gray-900 dark:text-white">{team.lead}</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Applications</span>
                          <div className="font-medium text-gray-900 dark:text-white">{team.applications.length} apps</div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-500">Created</span>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {new Date(team.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {team.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 text-xs rounded">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40">
                        Manage
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New User</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Add a new user to your organization
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="colleague@company.com"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role *
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>AI Engineer</option>
                    <option>Compliance Manager</option>
                    <option>Data Analyst</option>
                    <option>Platform Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Teams (Optional)
                </label>
                <div className="space-y-2">
                  {teams.map(team => (
                    <label key={team.id} className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{team.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  placeholder="Welcome to our AI governance team..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                User will be created and can log in immediately
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Role</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Define a new role with specific permissions
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior AI Engineer"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe the role and its responsibilities..."
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role Level *
                </label>
                <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select level...</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="engineer">Engineer</option>
                  <option value="analyst">Analyst</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Permissions *
                </label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {[
                    { id: 'user_management', label: 'User Management', description: 'Create, edit, and delete users' },
                    { id: 'project_management', label: 'Project Management', description: 'Create and manage projects' },
                    { id: 'evaluations', label: 'Run Evaluations', description: 'Execute trust evaluations' },
                    { id: 'datasets', label: 'Dataset Management', description: 'Create and edit datasets' },
                    { id: 'models', label: 'Model Configuration', description: 'Configure AI models' },
                    { id: 'compliance', label: 'Compliance Reports', description: 'Generate compliance reports' },
                    { id: 'analytics', label: 'View Analytics', description: 'Access analytics dashboards' },
                    { id: 'api_access', label: 'API Access', description: 'Use API endpoints' },
                  ].map(permission => (
                    <label key={permission.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" />
                      <div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{permission.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Role will be available for user assignment
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;