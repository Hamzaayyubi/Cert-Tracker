import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Calendar, CheckCircle, Award, Target, ExternalLink } from 'lucide-react';

const SharedCertification = () => {
  const { shareId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSharedCert = async () => {
      try {
        const res = await api.get(`/certifications/share/${shareId}`);
        if (res.data.success) {
          setCert(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching shared certification:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedCert();
  }, [shareId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-text-muted animate-pulse">Loading shared certification...</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-white dark:bg-dark-card p-10 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-text-primary mb-4">Certification Not Found</h2>
          <p className="text-text-muted dark:text-text-secondary mb-8">
            The link might be invalid, expired, or the certification is no longer public.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const progressColor = cert.progress === 100 ? 'bg-secondary' : 'bg-primary';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Public Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20">
          <ExternalLink size={14} /> Shared Publicly
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-dark-card shadow-soft rounded-3xl overflow-hidden border border-gray-200 dark:border-dark-border">
        {/* Header Section */}
        <div className="px-6 py-10 sm:p-12 border-b border-gray-100 dark:border-dark-border">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary">
                  {cert.provider}
                </span>
                {cert.progress === 100 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary">
                    Completed
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-text-primary flex items-center gap-4">
                <Award className="text-primary flex-shrink-0" size={40} />
                {cert.title}
              </h1>
            </div>

            {cert.examDate && (
              <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-5 flex items-center gap-4 border border-gray-100 dark:border-dark-border flex-shrink-0">
                <Calendar className="text-text-muted" size={24} />
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Exam Date</p>
                  <p className="font-bold text-gray-900 dark:text-text-primary">
                    {new Date(cert.examDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-900 dark:text-text-primary flex items-center gap-2">
                <Target className="text-primary" size={24} /> Current Progress
              </span>
              <span className="text-2xl font-black text-primary">{cert.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className={`${progressColor} h-full rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                style={{ width: `${cert.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Milestones & Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-dark-border">
          {/* Milestones */}
          <div className="p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary mb-6 flex items-center gap-2">
              Milestones
            </h2>
            {cert.milestones.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-100 dark:border-dark-border rounded-2xl">
                <p className="text-text-muted">No milestones listed.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cert.milestones.map((milestone) => (
                  <li key={milestone._id}
                    className={`flex items-center p-4 rounded-2xl border transition-all ${
                      milestone.completed
                        ? 'bg-secondary/5 border-secondary/20 dark:bg-secondary/5'
                        : 'bg-gray-50 dark:bg-dark-surface border-gray-100 dark:border-dark-border opacity-75'
                    }`}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                      milestone.completed ? 'bg-secondary border-secondary' : 'border-gray-300 dark:border-text-muted'
                    }`}>
                      {milestone.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${milestone.completed ? 'text-gray-600 dark:text-text-secondary' : 'text-gray-800 dark:text-text-primary'}`}>
                      {milestone.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Completed Topics */}
          <div className="p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary mb-6">Completed Topics</h2>
            {cert.completedTopics.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-100 dark:border-dark-border rounded-2xl">
                <p className="text-text-muted">No topics marked as completed.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {cert.completedTopics.map((topic, index) => (
                  <span key={index} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold bg-white dark:bg-dark-surface text-gray-800 dark:text-text-primary border border-gray-200 dark:border-dark-border shadow-sm">
                    <CheckCircle size={16} className="text-secondary" />
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center pt-8">
        <p className="text-sm text-text-muted">
          Powered by <span className="font-bold text-primary">Certification Tracker</span>
        </p>
      </div>
    </div>
  );
};

export default SharedCertification;
