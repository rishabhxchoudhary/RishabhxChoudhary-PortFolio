import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaClock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface RateLimitInfo {
  core: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
    resetDate: string;
  };
  authenticated: boolean;
  error?: string;
}

const RateLimitMonitor = () => {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const fetchRateLimit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/github-rate-limit');
      const data = await response.json();
      setRateLimitInfo(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch rate limit info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchRateLimit();
      // Auto-refresh every 30 seconds when visible
      const interval = setInterval(fetchRateLimit, 30000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const getStatusColor = () => {
    if (!rateLimitInfo) return 'text-gray-500';
    const { remaining, limit } = rateLimitInfo.core;
    const percentage = (remaining / limit) * 100;

    if (percentage > 50) return 'text-green-500';
    if (percentage > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (!rateLimitInfo) return <FaClock />;
    const { remaining, limit } = rateLimitInfo.core;
    const percentage = (remaining / limit) * 100;

    if (percentage > 50) return <FaCheck className="text-green-500" />;
    if (percentage > 20) return <FaExclamationTriangle className="text-yellow-500" />;
    return <FaExclamationTriangle className="text-red-500" />;
  };

  const formatResetTime = (timestamp: number) => {
    const resetTime = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = resetTime.getTime() - now.getTime();
    const diffMins = Math.ceil(diffMs / (1000 * 60));

    if (diffMins <= 0) return 'Now';
    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="flex items-end space-x-2">
        {/* Toggle Button */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full shadow-lg
            transition-all duration-200 hover:scale-110
            ${rateLimitInfo?.authenticated
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-orange-600 hover:bg-orange-700'
            }
            text-white
          `}
          title={`GitHub API Rate Limit Monitor ${isVisible ? '(Click to hide)' : '(Click to show)'}`}
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>

        {/* Rate Limit Panel */}
        {isVisible && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[300px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                {getStatusIcon()}
                <span className="ml-2">GitHub API Status</span>
              </h3>
              <button
                onClick={fetchRateLimit}
                disabled={loading}
                className={`
                  px-2 py-1 text-xs rounded transition-colors
                  ${loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300'
                  }
                `}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {rateLimitInfo ? (
              <div className="space-y-2">
                {/* Authentication Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Authentication:</span>
                  <span className={`text-sm font-medium ${
                    rateLimitInfo.authenticated
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {rateLimitInfo.authenticated ? 'Authenticated (5000/hr)' : 'Unauthenticated (60/hr)'}
                  </span>
                </div>

                {/* Rate Limit Usage */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Requests:</span>
                  <span className={`text-sm font-medium ${getStatusColor()}`}>
                    {rateLimitInfo.core.remaining} / {rateLimitInfo.core.limit} remaining
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Used:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {rateLimitInfo.core.used}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reset in:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatResetTime(rateLimitInfo.core.reset)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (rateLimitInfo.core.remaining / rateLimitInfo.core.limit) * 100 > 50
                        ? 'bg-green-500'
                        : (rateLimitInfo.core.remaining / rateLimitInfo.core.limit) * 100 > 20
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{
                      width: `${(rateLimitInfo.core.remaining / rateLimitInfo.core.limit) * 100}%`
                    }}
                  />
                </div>

                {/* Warnings */}
                {!rateLimitInfo.authenticated && (
                  <div className="mt-3 p-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded text-xs text-orange-700 dark:text-orange-300">
                    💡 Add GITHUB_TOKEN to .env.local for 5000 requests/hour
                  </div>
                )}

                {rateLimitInfo.core.remaining < 100 && (
                  <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300">
                    ⚠️ Rate limit running low! Consider caching or reducing API calls.
                  </div>
                )}

                {/* Error Display */}
                {rateLimitInfo.error && (
                  <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-xs text-red-700 dark:text-red-300">
                    Error: {rateLimitInfo.error}
                  </div>
                )}

                {/* Last Updated */}
                {lastUpdated && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                Click refresh to check rate limit status
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RateLimitMonitor;
