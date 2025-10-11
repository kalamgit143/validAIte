import React, { useState } from 'react';
import { HumanFeedback as HumanFeedbackType, AITrace } from '../types';
import { 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Star,
  Filter,
  Search,
  Calendar,
  Download,
  Eye,
  Edit,
  Tag,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';

const HumanFeedback: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feedback');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState('all');

  const feedbackData: HumanFeedbackType[] = [
    {
      id: 'fb_001',
      traceId: 'trace_001',
      feedback_type: 'rating',
      rating: {
        overall: 5,
        quality: 95,
        helpfulness: 98,
        accuracy: 96,
        safety: 100
      },
      feedback_metadata: {
        submitted_at: '2024-01-15T10:35:00Z',
        user_id: 'user_12345',
        session_context: {
          application: 'Customer Support Bot',
          prompt: 'How can I reset my password?',
          response: 'To reset your password, please follow these steps...'
        }
      }
    },
    {
      id: 'fb_002',
      traceId: 'trace_002',
      feedback_type: 'annotation',
      annotation: {
        annotator_id: 'expert_reviewer_01',
        annotation_task_id: 'task_002',
        labels: {
          quality: 72,
          creativity: 68,
          accuracy: 85,
          engagement: 65,
          needs_improvement: true,
          lacks_depth: true
        },
        confidence: 0.85,
        time_spent_seconds: 180
      },
      feedback_metadata: {
        submitted_at: '2024-01-15T09:20:00Z',
        user_id: 'expert_reviewer_01',
        session_context: {
          application: 'Content Generator',
          prompt: 'Write a blog post about AI ethics'
        }
      }
    },
    {
      id: 'fb_003',
      traceId: 'trace_003',
      feedback_type: 'correction',
      correction: {
        corrected_response: 'I found several potential improvements:\n1. Add input validation\n2. Use more descriptive variable names\n3. Consider edge cases for empty inputs\n4. Optimize the nested loop for better performance',
        correction_type: 'other',
        explanation: 'Added missing performance optimization suggestion'
      },
      rating: {
        overall: 4,
        quality: 82,
        helpfulness: 85,
        accuracy: 88,
        safety: 95
      },
      feedback_metadata: {
        submitted_at: '2024-01-15T08:45:00Z',
        user_id: 'dev_reviewer_02',
        session_context: {
          application: 'Code Review Assistant',
          prompt: 'Review this Python function for potential issues'
        }
      }
    }
  ];

  const annotationTasks = [
    {
      id: 'task_001',
      name: 'Customer Support Quality Review',
      description: 'Review customer support responses for quality and helpfulness',
      assignedTo: 'Madhu Ronanki',
      dueDate: '2024-01-20T23:59:59Z',
      progress: 75,
      totalSamples: 100,
      completedSamples: 75,
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: 'task_002',
      name: 'Content Bias Assessment',
      description: 'Assess marketing content for potential bias and inclusivity',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-18T23:59:59Z',
      progress: 40,
      totalSamples: 50,
      completedSamples: 20,
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: 'task_003',
      name: 'Code Review Accuracy Check',
      description: 'Verify accuracy of automated code review suggestions',
      assignedTo: 'Alex Kim',
      dueDate: '2024-01-25T23:59:59Z',
      progress: 100,
      totalSamples: 80,
      completedSamples: 80,
      status: 'completed',
      priority: 'low'
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400';
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'needs_review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Human Feedback</h2>
          <p className="text-gray-600 dark:text-gray-400">Collect and manage human feedback for model improvement</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Create Annotation Task
          </button>
        </div>
      </div>

      {/* Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{feedbackData.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(feedbackData.reduce((sum, fb) => sum + (fb.rating?.overall || 0), 0) / feedbackData.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positive Feedback</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round((feedbackData.filter(fb => fb.rating?.overall && fb.rating.overall >= 4).length / feedbackData.length) * 100)}%
              </p>
            </div>
            <ThumbsUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {annotationTasks.filter(task => task.status === 'in_progress').length}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {['feedback', 'annotation_tasks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'feedback' ? 'Feedback' : 'Annotation Tasks'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'feedback' ? (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                {feedbackData.map((feedback) => (
                  <div key={feedback.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{feedback.feedback_metadata.session_context.application}</span>
                            <div className="flex items-center space-x-1">
                              {feedback.rating && renderStars(feedback.rating.overall)}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400`}>
                              {feedback.feedback_type}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-mono">{feedback.traceId}</span> • 
                            <span className="ml-1">By: {feedback.feedback_metadata.user_id}</span> • 
                            <span className="ml-1">{new Date(feedback.feedback_metadata.submitted_at).toLocaleString()}</span>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="text-sm">
                              <strong className="text-gray-900 dark:text-white">Prompt:</strong>
                              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-1">
                                {feedback.feedback_metadata.session_context.prompt}
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              <strong className="text-gray-900 dark:text-white">Response:</strong>
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-1">
                                {feedback.feedback_metadata.session_context.response || 'Response not available'}
                              </div>
                            </div>
                            
                            {feedback.correction && (
                              <div className="text-sm">
                                <strong className="text-gray-900 dark:text-white">Correction:</strong>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg mt-1">
                                  {feedback.correction.explanation}
                                </div>
                              </div>
                            )}
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
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      {feedback.rating && Object.entries(feedback.rating).map(([metric, score]) => (
                        <div key={metric} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {typeof score === 'number' && score <= 5 ? score : `${score}%`}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">{metric}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Annotation Details */}
                    {feedback.annotation && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                          <strong>Annotation Task:</strong> {feedback.annotation.annotation_task_id} • 
                          <strong> Confidence:</strong> {(feedback.annotation.confidence * 100).toFixed(0)}% • 
                          <strong> Time Spent:</strong> {Math.floor(feedback.annotation.time_spent_seconds / 60)}m {feedback.annotation.time_spent_seconds % 60}s
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {annotationTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          <span className="capitalize">{task.status.replace('_', ' ')}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress: {task.completedSamples}/{task.totalSamples} samples</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>ID: {task.id}</span>
                      <span>Created: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-900/40">
                        View Details
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HumanFeedback;