'use client';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Loading state component with customizable size and message
 * 
 * @param props - Component props
 * @returns Loading state component
 */
export default function LoadingState({ 
  message = 'Loading...', 
  size = 'medium' 
}: LoadingStateProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`${sizeClasses[size]} border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full animate-spin mb-2`}
      />
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
}

