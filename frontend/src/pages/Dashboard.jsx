import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import api from '../services/api';
import CertificationCard from '../components/CertificationCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, Filter, Plus, TrendingUp, Award, BookOpen, Download, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Download/export handler
  const handleExport = async (format) => {
    setShowExportMenu(false);
    setExporting(true);
    try {
      const response = await api.get(`/certifications/export?format=${format}`, {
        responseType: 'blob',
      });
      const ext = format === 'pdf' ? 'pdf' : format === 'csv' ? 'csv' : 'json';
      const mimeMap = { pdf: 'application/pdf', csv: 'text/csv', json: 'application/json' };
      const blob = new Blob([response.data], { type: mimeMap[format] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certifications.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (err) {
      toast.error('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const fetchCertifications = async () => {
    try {
      const response = await api.get('/certifications');
      if (response.data.success) {
        const certs = response.data.data;
        setCertifications(certs);
        checkUpcomingExams(certs);
      }
    } catch (err) {
      toast.error('Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const checkUpcomingExams = (certs) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    certs.forEach(cert => {
      if (cert.examDate && cert.progress < 100) {
        const examDate = new Date(cert.examDate);
        if (examDate >= today && examDate <= nextWeek) {
          toast(`Upcoming Exam: ${cert.title} on ${examDate.toLocaleDateString()}`, {
            icon: '⏰',
            duration: 6000,
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchCertifications();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        const response = await api.delete(`/certifications/${id}`);
        if (response.data.success) {
          setCertifications(certifications.filter((cert) => cert._id !== id));
          toast.success('Certification deleted');
        }
      } catch (err) {
        toast.error('Failed to delete certification');
      }
    }
  };

  // Filtering
  const filteredCerts = certifications.filter(cert => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'Completed') return matchesSearch && cert.progress === 100;
    if (filterStatus === 'In Progress') return matchesSearch && cert.progress < 100;
    return matchesSearch;
  });

  // Analytics
  const completedCount = certifications.filter(c => c.progress === 100).length;
  const avgProgress = certifications.length > 0
    ? Math.round(certifications.reduce((acc, curr) => acc + curr.progress, 0) / certifications.length)
    : 0;

  const chartData = certifications.map(c => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '…' : c.title,
    progress: c.progress,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-text-secondary">
            Welcome back, <span className="font-semibold text-gray-700 dark:text-text-primary">{user?.name}</span>. Here is your learning overview.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {/* Export Dropdown */}
          {certifications.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={exporting}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-dark-border text-gray-700 dark:text-text-secondary bg-white dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-card transition-colors disabled:opacity-50"
              >
                <Download size={16} className="mr-2" />
                {exporting ? 'Exporting…' : 'Export'}
                <ChevronDown size={14} className="ml-1" />
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-soft z-20 py-1 animate-in fade-in">
                  {['json', 'csv', 'pdf'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleExport(fmt)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors flex items-center gap-2"
                    >
                      <Download size={14} />
                      Download as {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <Link
            to="/certifications/new"
            className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Add Certification
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      {certifications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border flex items-center">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-text-secondary">Total Certifications</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-text-primary">{certifications.length}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border flex items-center">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-secondary/10 text-secondary mr-4">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-text-secondary">Completed</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-text-primary">{completedCount}</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border flex items-center">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-primary/10 text-primary mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-text-secondary">Average Progress</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-text-primary">{avgProgress}%</h3>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {certifications.length > 0 && (
        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-bold text-gray-900 dark:text-text-primary mb-6">Progress Overview</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    color: isDark ? '#e5e7eb' : '#111827',
                  }}
                />
                <Bar dataKey="progress" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.progress === 100 ? '#22c55e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search certifications or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-dark-border rounded-xl bg-white dark:bg-dark-surface text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-colors"
          />
        </div>
        <div className="relative inline-flex">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={16} className="text-text-muted" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary text-sm rounded-xl appearance-none transition-colors"
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Card Grid */}
      {filteredCerts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-text-muted" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-text-primary">No certifications found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-text-secondary">
            {searchQuery ? 'Try adjusting your search or filter.' : 'Get started by adding your first certification.'}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <Link
                to="/certifications/new"
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                Add Certification
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCerts.map((cert) => (
            <CertificationCard key={cert._id} cert={cert} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
