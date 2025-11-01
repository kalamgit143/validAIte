import React, { useState } from 'react';
import {
  FolderOpen,
  Plus,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  AlertCircle,
  ChevronRight,
  Settings,
  Archive,
  X,
  CheckCircle,
  LogOut,
  UserPlus,
  Trash2
} from 'lucide-react';
import { NIST_TEVV_ROLES } from '../utils/archetypes';

interface Project {
  id: string;
  project_name: string;
  project_description: string;
  status: string;
  archetype_code: string;
  risk_tier: string;
  current_stage: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
}

interface User {
  email: string;
  full_name: string;
  role: string;
  tenant_id: string;
}

interface ProjectMember {
  email: string;
  role: string;
}

interface ProjectsListProps {
  user: User;
  onSelectProject: (projectId: string) => void;
  onLogout: () => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ user, onSelectProject, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    project_name: '',
    project_description: ''
  });
  const [projectMembers, setProjectMembers] = useState<ProjectMember[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('TEVV Engineer');

  const availableUsers = [
    { email: 'john.doe@validaite.com', full_name: 'John Doe', role: 'AI Quality Engineer' },
    { email: 'jane.smith@validaite.com', full_name: 'Jane Smith', role: 'TEVV Engineer' },
    { email: 'mike.johnson@validaite.com', full_name: 'Mike Johnson', role: 'AI SecOps Engineer' },
    { email: 'sarah.williams@validaite.com', full_name: 'Sarah Williams', role: 'Data & Ethics Manager' },
    { email: 'david.brown@validaite.com', full_name: 'David Brown', role: 'MLOps & Reliability Engineer' },
  ];

  const mockProjects: Project[] = [
    {
      id: '1',
      project_name: 'Insurance Policy Assistant',
      project_description: 'AI-powered insurance policy recommendation and premium calculation system',
      status: 'active',
      archetype_code: 'A2-RAG-ENT-PII',
      risk_tier: 'HIGH',
      current_stage: 'Risk Identification',
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T15:45:00Z',
      member_count: 5
    },
    {
      id: '2',
      project_name: 'Customer Support Chatbot',
      project_description: 'GenAI chatbot for handling customer inquiries and support tickets',
      status: 'active',
      archetype_code: 'A1-CHAT-STD',
      risk_tier: 'MODERATE',
      current_stage: 'Dataset Generation',
      created_at: '2024-02-01T09:00:00Z',
      updated_at: '2024-02-10T11:20:00Z',
      member_count: 3
    },
    {
      id: '3',
      project_name: 'Medical Diagnosis Assistant',
      project_description: 'AI system for supporting medical professionals in diagnostic processes',
      status: 'active',
      archetype_code: 'A5-DECISION-CRITICAL',
      risk_tier: 'CRITICAL',
      current_stage: 'Metrics Definition',
      created_at: '2024-01-20T14:15:00Z',
      updated_at: '2024-02-15T16:30:00Z',
      member_count: 8
    }
  ];

  const canCreateProjects = ['Quality & Compliance Manager'].includes(user.role);

  const filteredProjects = mockProjects.filter(project =>
    project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.project_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskTierColor = (tier: string) => {
    switch (tier) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300';
      case 'HIGH': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddMember = () => {
    if (selectedUserEmail && !projectMembers.some(m => m.email === selectedUserEmail)) {
      setProjectMembers([...projectMembers, { email: selectedUserEmail, role: newMemberRole }]);
      setSelectedUserEmail('');
      setNewMemberRole('TEVV Engineer');
    }
  };

  const handleRemoveMember = (email: string) => {
    setProjectMembers(projectMembers.filter(m => m.email !== email));
  };

  const handleCreateProject = () => {
    console.log('Creating project:', newProject);
    console.log('Project members:', projectMembers);
    setShowCreateModal(false);
    setNewProject({ project_name: '', project_description: '' });
    setProjectMembers([]);
  };

  const getRoleBadgeColor = (role: string) => {
    const roleObj = NIST_TEVV_ROLES.find(r => r.name === role);
    switch (roleObj?.color) {
      case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'blue': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'purple': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cyan': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.full_name}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Role: {user.role} | Organization: {user.tenant_id}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {canCreateProjects && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Project</span>
                </button>
              )}

              <button
                onClick={onLogout}
                className="p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors border-2 border-red-200 dark:border-red-800"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or description..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{mockProjects.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Projects</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {mockProjects.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Active</div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {mockProjects.filter(p => p.risk_tier === 'HIGH' || p.risk_tier === 'CRITICAL').length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">High Risk</div>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {mockProjects.reduce((sum, p) => sum + (p.member_count || 0), 0)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Team Members</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.project_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.project_description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${getRiskTierColor(project.risk_tier)}`}>
                    {project.risk_tier}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-600 dark:text-gray-400">Archetype:</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{project.archetype_code || 'Not Set'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-gray-600 dark:text-gray-400">Stage:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{project.current_stage}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-gray-600 dark:text-gray-400">Team:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{project.member_count} members</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Updated:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formatDate(project.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by creating your first project'}
            </p>
            {canCreateProjects && !searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Project</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full border-2 border-gray-200 dark:border-gray-700 my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProject.project_name}
                  onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
                  placeholder="e.g., Insurance Policy Assistant"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Project Description
                </label>
                <textarea
                  value={newProject.project_description}
                  onChange={(e) => setNewProject({ ...newProject, project_description: e.target.value })}
                  placeholder="Describe the purpose and scope of this AI project..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Team Members Section */}
              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Team Members</span>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Add team members and assign their roles for this project
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {projectMembers.length} member{projectMembers.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Add Member Form */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Select User
                      </label>
                      <select
                        value={selectedUserEmail}
                        onChange={(e) => setSelectedUserEmail(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Choose a user...</option>
                        {availableUsers
                          .filter(u => !projectMembers.some(m => m.email === u.email))
                          .map((user) => (
                            <option key={user.email} value={user.email}>
                              {user.full_name} ({user.role})
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                          {NIST_TEVV_ROLES.map((role) => (
                            <option key={role.id} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={handleAddMember}
                          disabled={!selectedUserEmail}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span className="text-sm font-medium">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members List */}
                {projectMembers.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {projectMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              {member.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {member.email}
                            </p>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getRoleBadgeColor(member.role)}`}>
                              {member.role}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveMember(member.email)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {projectMembers.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-700/30 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No team members added yet
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">NIST AI RMF Workflow</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Once created, your project will start at the Application Setup stage. You'll be guided through all 10 stages of the NIST AI Risk Management Framework.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t-2 border-gray-200 dark:border-gray-700 flex-shrink-0">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProject.project_name.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
