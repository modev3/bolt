import React from 'react';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to TrendAnalyzer</h1>
        <button
          onClick={() => window.location.href = '/analyze'}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Sparkles className="h-5 w-5" />
          <span>New Analysis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Analyses</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No analyses yet. Start by analyzing a new topic!</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved Topics</h2>
          <div className="space-y-4">
            <p className="text-gray-600">No saved topics yet. Save topics to track them later!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;