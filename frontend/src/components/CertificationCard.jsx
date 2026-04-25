import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Edit2, Trash2, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * CertificationCard — uses the SaaS design tokens:
 * dark.card bg, dark.border, primary progress bar, shadow-soft hover
 */
const CertificationCard = ({ cert, onDelete }) => {
  const progressColor =
    cert.progress === 100
      ? 'bg-secondary'
      : cert.progress >= 50
      ? 'bg-primary'
      : 'bg-amber-500';
      
  const handleShare = () => {
    if (!cert.shareId) {
      toast.error('Share ID not available for this certification');
      return;
    }
    const shareUrl = `${window.location.origin}/share/${cert.shareId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm hover:shadow-soft transition-all group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Link
            to={`/certifications/${cert._id}`}
            className="text-lg font-bold text-gray-900 dark:text-text-primary group-hover:text-primary transition-colors truncate pr-2"
            title={cert.title}
          >
            {cert.title}
          </Link>
          <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary">
            {cert.provider}
          </span>
        </div>

        {/* Exam Date */}
        {cert.examDate && (
          <div className="flex items-center gap-1.5 text-sm text-text-muted dark:text-text-secondary mb-4">
            <Calendar size={14} />
            <span>{new Date(cert.examDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-600 dark:text-text-secondary">Progress</span>
            <span className="text-xs font-bold text-gray-800 dark:text-text-primary">{cert.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 overflow-hidden">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${cert.progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2">
          <Link
            to={`/certifications/${cert._id}/edit`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-gray-200 dark:border-dark-border text-gray-700 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface px-3 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Edit2 size={14} /> Edit
          </Link>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-1.5 bg-transparent border border-gray-200 dark:border-dark-border text-gray-700 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface px-3 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
          <button
            onClick={() => onDelete(cert._id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 dark:bg-red-900/10 border border-transparent text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/25 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
