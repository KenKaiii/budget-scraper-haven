import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const Notification = ({ message, type = 'error', onClose, action }) => {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-blue-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-blue-800';

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-md mt-4 relative`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3 w-full">
          <p className="text-sm font-medium">{message}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${textColor}`}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;