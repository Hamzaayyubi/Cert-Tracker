import React from 'react';

/**
 * Reusable Card component using the SaaS design system tokens.
 * Props:
 *   - className: additional classes to merge
 *   - children: content
 *   - glow: if true, adds the glow shadow on hover
 */
const Card = ({ children, className = '', glow = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-dark-card
        border border-gray-200 dark:border-dark-border
        rounded-2xl shadow-sm
        ${glow ? 'hover:shadow-glow' : 'hover:shadow-soft'}
        transition-all duration-[var(--transition-duration-default)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
