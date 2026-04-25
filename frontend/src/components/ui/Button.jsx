import React from 'react';

/**
 * Reusable Button component using the SaaS design system.
 * Variants: primary (default), secondary, outline, danger, ghost
 */
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-[var(--transition-duration-default)] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm',
    secondary:
      'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary shadow-sm',
    outline:
      'bg-transparent border border-gray-300 dark:border-dark-border text-gray-700 dark:text-text-primary hover:bg-gray-50 dark:hover:bg-dark-card focus:ring-primary',
    danger:
      'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm',
    ghost:
      'bg-transparent text-gray-600 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card focus:ring-primary',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
