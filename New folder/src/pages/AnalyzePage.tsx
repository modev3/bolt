import React, { useState } from 'react';
import { Sparkles, Save } from 'lucide-react';
import { analyzeTrend, AnalysisOptions } from '../lib/gemini';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

const AnalyzePage = () => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useAuthStore();
  
  const [options, setOptions] = useState<AnalysisOptions>({
    includeMarketSize: true,
    includeCompetitors: false,
    includeMonetization: false,
    includeDemographics: false,
    language: 'fr',
    customPrompt: '',
  });

  const getUserProfile = async () => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_id', user?.id)
      .maybeSingle();

    if (profileError) {
      throw new Error('Failed to fetch user profile. Please try again.');
    }
    
    if (!profile) {
      throw new Error('User profile not found. Please try logging out and back in.');
    }

    return profile;
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      // First get the analysis result
      const analysis = await analyzeTrend(topic, options);
      
      // Only try to save to database if we have a user and the analysis was successful
      if (user && analysis) {
        try {
          const profile = await getUserProfile();
          
          const { error: analysisError } = await supabase
            .from('analyses')
            .insert([{
              user_id: profile.id,
              topic: topic.trim(),
              analysis_result: analysis,
            }]);

          if (analysisError) {
            console.error('Failed to save analysis:', analysisError);
            // Don't throw here - we still want to show the analysis result
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Don't throw here - we still want to show the analysis result
        }
      }

      // Set the result even if saving to database failed
      setResult(analysis);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error 
        ? err.message 
        : 'Failed to analyze topic. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTopic = async () => {
    if (!user || !topic.trim()) return;

    setSaveLoading(true);
    setError('');

    try {
      const profile = await getUserProfile();

      const { error: saveError } = await supabase
        .from('saved_topics')
        .insert([{
          user_id: profile.id,
          topic: topic.trim(),
          notes: 'Saved from analysis',
        }]);

      if (saveError) {
        throw saveError;
      }
    } catch (err) {
      console.error('Failed to save topic:', err);
      setError(err instanceof Error 
        ? err.message 
        : 'Failed to save topic. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Analyser une Tendance</h1>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Sujet à analyser
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="ex: mode durable, outils de travail à distance, alimentation végétale"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Options d'analyse</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeMarketSize}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeMarketSize: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Taille du marché</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeCompetitors}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeCompetitors: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Analyse des concurrents</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeMonetization}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeMonetization: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Stratégies de monétisation</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeDemographics}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeDemographics: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Analyse démographique</span>
              </label>
            </div>

            <div>
              <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700">
                Instructions supplémentaires (optionnel)
              </label>
              <textarea
                id="customPrompt"
                value={options.customPrompt}
                onChange={(e) => setOptions(prev => ({ ...prev, customPrompt: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                placeholder="Ajoutez des instructions spécifiques pour l'analyse..."
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <Sparkles className="h-5 w-5" />
              <span>{loading ? 'Analyse en cours...' : 'Analyser'}</span>
            </button>
            {user && result && (
              <button
                type="button"
                onClick={handleSaveTopic}
                disabled={saveLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                <span>{saveLoading ? 'Saving...' : 'Sauvegarder'}</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Résultats de l'Analyse</h2>
          <div className="prose max-w-none">
            {result.split('\n').map((line, index) => (
              <p key={index} className="mb-4">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;