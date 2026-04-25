import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Plus, X } from 'lucide-react';

const CertificationForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '', provider: '', examDate: '', progress: 0, milestones: [], completedTopics: []
  });
  const [newMilestone, setNewMilestone] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      (async () => {
        try {
          const res = await api.get(`/certifications/${id}`);
          if (res.data.success) {
            const c = res.data.data;
            setFormData({ title: c.title || '', provider: c.provider || '', examDate: c.examDate ? c.examDate.substring(0, 10) : '', progress: c.progress || 0, milestones: c.milestones || [], completedTopics: c.completedTopics || [] });
          }
        } catch { setError('Failed to fetch certification details'); }
        finally { setLoading(false); }
      })();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setFormData({ ...formData, milestones: [...formData.milestones, { title: newMilestone.trim(), completed: false }] });
      setNewMilestone('');
    }
  };
  const handleRemoveMilestone = (i) => { const u = [...formData.milestones]; u.splice(i, 1); setFormData({ ...formData, milestones: u }); };
  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setFormData({ ...formData, completedTopics: [...formData.completedTopics, newTopic.trim()] });
      setNewTopic('');
    }
  };
  const handleRemoveTopic = (i) => { const u = [...formData.completedTopics]; u.splice(i, 1); setFormData({ ...formData, completedTopics: u }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEditMode) await api.put(`/certifications/${id}`, formData);
      else await api.post('/certifications', formData);
      toast.success(isEditMode ? 'Certification updated!' : 'Certification created!');
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Failed to save certification'); }
  };

  if (loading) return <div className="flex justify-center items-center h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  const inputClass = "block w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary py-2.5 px-3 text-sm transition-colors";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft border border-gray-200 dark:border-dark-border p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-text-primary mb-8">
          {isEditMode ? 'Edit Certification' : 'Add New Certification'}
        </h1>

        {error && <div className="bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 text-sm rounded-xl p-4 mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Certification Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className={inputClass} placeholder="AWS Solutions Architect" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Provider *</label>
              <input type="text" name="provider" required value={formData.provider} onChange={handleChange} className={inputClass} placeholder="e.g. AWS, CompTIA" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Exam Date</label>
              <input type="date" name="examDate" value={formData.examDate} onChange={handleChange} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Progress ({formData.progress}%)</label>
              <input type="range" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>
          </div>

          {/* Milestones */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-text-primary mb-4">Milestones</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)} placeholder="e.g. Finish Module 1" className={inputClass}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())} />
              <button type="button" onClick={handleAddMilestone} className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm">
                <Plus size={16} />
              </button>
            </div>
            <ul className="space-y-2">
              {formData.milestones.map((m, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-50 dark:bg-dark-surface px-4 py-2.5 rounded-xl border border-gray-100 dark:border-dark-border">
                  <span className={m.completed ? 'line-through text-text-muted' : 'text-gray-700 dark:text-text-primary'}>{m.title}</span>
                  <button type="button" onClick={() => handleRemoveMilestone(i)} className="text-red-400 hover:text-red-600 transition-colors"><X size={16} /></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-text-primary mb-4">Completed Topics</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="e.g. EC2 basics" className={inputClass}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTopic())} />
              <button type="button" onClick={handleAddTopic} className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm">
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.completedTopics.map((topic, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20">
                  {topic}
                  <button type="button" onClick={() => handleRemoveTopic(i)} className="hover:text-red-500 transition-colors"><X size={14} /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-5 flex justify-end gap-3">
            <button type="button" onClick={() => navigate('/')} className="py-2.5 px-5 rounded-xl text-sm font-medium text-gray-700 dark:text-text-secondary bg-transparent border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors">
              Cancel
            </button>
            <button type="submit" className="py-2.5 px-5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-sm transition-colors">
              {isEditMode ? 'Save Changes' : 'Create Certification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationForm;
