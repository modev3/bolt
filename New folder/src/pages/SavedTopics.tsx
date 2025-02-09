import React from 'react';
import { BookMarked } from 'lucide-react';

const SavedTopics = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Topics</h1>
        <button
          onClick={() => window.location.href = '/analyze'}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <BookMarked className="h-5 w-5" />
          <span>New Analysis</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <p className="text-gray-600">No saved topics yet. Analyze topics and save them for later reference!</p>
        </div>
      </div>
    </div>
  );
};

export default SavedTopics;