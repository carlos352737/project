import React from 'react';
import { Search } from 'lucide-react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';

export function UrlAnalyzer() {
  const { isLoading, error, auditUrl } = useAccessibilityStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    if (url) {
      await auditUrl(url);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Analyze Website</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              name="url"
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
              required
              aria-describedby="url-description"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <p id="url-description" className="mt-1 text-sm text-gray-500">
            Enter the URL of the website you want to analyze
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Website'}
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}