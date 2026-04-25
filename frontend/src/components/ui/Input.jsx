import React from 'react';

/**
 * Reusable Input component using the SaaS design system.
 * Props:
 *   - label: optional label text
 *   - icon: optional icon element rendered inside the input
 *   - error: optional error message string
 *   - All standard <input> props are forwarded
 */
const Input = ({ label, icon, error, className = '', id, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`
            block w-full rounded-xl border
            bg-white dark:bg-dark-surface
            border-gray-300 dark:border-dark-border
            text-gray-900 dark:text-text-primary
            placeholder-gray-400 dark:placeholder-text-muted
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            transition-all duration-[var(--transition-duration-default)]
            py-2.5 ${icon ? 'pl-10' : 'pl-3'} pr-3 text-sm
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
