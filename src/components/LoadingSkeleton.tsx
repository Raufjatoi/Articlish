
import React from 'react';

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'chart';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type, count = 1 }) => {
  const CardSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded w-2/3"></div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  const ChartSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="h-6 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 rounded-xl"></div>
    </div>
  );

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {type === 'card' && <CardSkeleton />}
          {type === 'list' && <ListSkeleton />}
          {type === 'chart' && <ChartSkeleton />}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
