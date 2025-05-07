import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Alert = ({ status = 'info', msg, onClose }) => {
  // Define styles based on status
  const styles = {
    success: {
      containerClass: 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800',
      iconClass: 'text-green-500 dark:text-green-400',
      textClass: 'text-green-800 dark:text-green-200',
      icon: <CheckCircle className="h-5 w-5" />
    },
    error: {
      containerClass: 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800',
      iconClass: 'text-red-500 dark:text-red-400',
      textClass: 'text-red-800 dark:text-red-200',
      icon: <AlertCircle className="h-5 w-5" />
    },
    warning: {
      containerClass: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-800',
      iconClass: 'text-yellow-500 dark:text-yellow-400',
      textClass: 'text-yellow-800 dark:text-yellow-200',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    info: {
      containerClass: 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800',
      iconClass: 'text-blue-500 dark:text-blue-400',
      textClass: 'text-blue-800 dark:text-blue-200',
      icon: <Info className="h-5 w-5" />
    }
  };

  const { containerClass, iconClass, textClass, icon } = styles[status] || styles.info;

  return (
    <div 
      className={`flex items-start rounded-lg border p-4 mb-4 shadow-sm transition-colors duration-300 ${containerClass}`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${iconClass}`}>
        {icon}
      </div>
      <div className={`ml-3 flex-1 ${textClass}`}>
        {msg}
      </div>
      {onClose && (
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring ${iconClass} hover:bg-background/10`}
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};