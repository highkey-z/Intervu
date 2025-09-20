'use client';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-white">
          Progress
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-white">
          {current} of {total}
        </span>
      </div>
      
      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-3">
        <div
          className="bg-gray-800 dark:bg-gray-200 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < current
                ? 'bg-gray-800 dark:bg-gray-200'
                : i === current - 1
                ? 'bg-gray-600 dark:bg-gray-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

