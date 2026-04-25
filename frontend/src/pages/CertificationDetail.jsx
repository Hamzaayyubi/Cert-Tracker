import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit, Calendar, CheckCircle, Award, Target } from 'lucide-react';

const CertificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCert = async () => {
    try {
      const res = await api.get(`/certifications/${id}`);
      if (res.data.success) setCert(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch certification details');
      navigate('/');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchCert(); }, [id]);

  const toggleMilestone = async (milestoneId, currentStatus) => {
    try {
      const res = await api.put(`/certifications/${id}/milestones/${milestoneId}`, { completed: !currentStatus });
      if (res.data.success) {
        setCert(res.data.data);
        toast.success(currentStatus ? 'Milestone unmarked' : 'Milestone completed!');
      }
    } catch { toast.error('Failed to update milestone'); }
  };

  const updateProgress = async (newProgress) => {
    try {
      const res = await api.put(`/certifications/${id}/progress`, { progress: newProgress });
      if (res.data.success) { setCert(res.data.data); toast.success('Progress updated'); }
    } catch { toast.error('Failed to update progress'); }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  if (!cert) return null;

  const progressColor = cert.progress === 100 ? 'bg-secondary' : 'bg-primary';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white dark:bg-dark-card p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border">
        <Link to="/" className="text-text-muted hover:text-primary flex items-center gap-2 transition-colors font-medium text-sm">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <Link to={`/certifications/${id}/edit`}
          className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Edit size={16} /> Edit
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-dark-card shadow-soft rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border">
        {/* Header Section */}
        <div className="px-6 py-8 sm:p-10 border-b border-gray-100 dark:border-dark-border">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
                  {cert.provider}
                </span>
                {cert.progress === 100 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary">
                    Completed
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-text-primary flex items-center gap-3">
                <Award className="text-primary flex-shrink-0" size={32} />
                {cert.title}
              </h1>
            </div>

            {cert.examDate && (
              <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-dark-border flex-shrink-0">
                <Calendar className="text-text-muted" size={22} />
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Exam Date</p>
                  <p className="font-semibold text-gray-900 dark:text-text-primary text-sm">
                    {new Date(cert.examDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-gray-900 dark:text-text-primary flex items-center gap-2">
                <Target className="text-primary" size={20} /> Overall Progress
              </span>
              <span className="text-xl font-bold text-primary">{cert.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3.5 mb-6 overflow-hidden">
              <div className={`${progressColor} h-3.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${cert.progress}%` }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[0, 25, 50, 75, 100].map(val => (
                <button key={val} onClick={() => updateProgress(val)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    cert.progress === val
                      ? val === 100 ? 'bg-secondary text-white shadow-sm' : 'bg-primary text-white shadow-sm'
                      : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-card border border-gray-200 dark:border-dark-border'
                  }`}>
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones & Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-dark-border">
          {/* Milestones */}
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary mb-6">Milestones</h2>
            {cert.milestones.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-xl">
                <p className="text-text-muted">No milestones set yet.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {cert.milestones.map((milestone) => (
                  <li key={milestone._id}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      milestone.completed
                        ? 'bg-secondary/5 border-secondary/20 dark:bg-secondary/5'
                        : 'bg-white dark:bg-dark-surface border-gray-200 dark:border-dark-border hover:shadow-sm hover:border-primary/30'
                    }`}
                    onClick={() => toggleMilestone(milestone._id, milestone.completed)}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                      milestone.completed ? 'bg-secondary border-secondary' : 'border-gray-300 dark:border-text-muted'
                    }`}>
                      {milestone.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`flex-1 text-sm ${milestone.completed ? 'text-text-muted line-through' : 'text-gray-800 dark:text-text-primary font-medium'}`}>
                      {milestone.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Completed Topics */}
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary mb-6">Completed Topics</h2>
            {cert.completedTopics.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-xl">
                <p className="text-text-muted">No topics completed yet.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {cert.completedTopics.map((topic, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium bg-white dark:bg-dark-surface text-gray-800 dark:text-text-primary border border-gray-200 dark:border-dark-border shadow-sm">
                    <CheckCircle size={14} className="text-secondary" />
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDetail;
