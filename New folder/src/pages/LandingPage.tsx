import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Target, BarChart3, Lock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Découvrez les Tendances de Demain
              <span className="text-indigo-600"> Aujourd'hui</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Analysez les marchés émergents, identifiez les opportunités inexploitées et prenez des décisions éclairées grâce à notre outil d'analyse de tendances alimenté par l'IA.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Commencer Gratuitement
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Se Connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Fonctionnalités Principales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyse de Marché</h3>
              <p className="text-gray-600">Obtenez des insights détaillés sur la taille du marché et les projections de croissance.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyse Concurrentielle</h3>
              <p className="text-gray-600">Identifiez vos concurrents et leurs stratégies pour mieux vous positionner.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Données Démographiques</h3>
              <p className="text-gray-600">Comprenez votre public cible et leurs comportements d'achat.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rapports Personnalisés</h3>
              <p className="text-gray-600">Générez des rapports détaillés adaptés à vos besoins spécifiques.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à découvrir les opportunités de demain ?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Rejoignez des milliers d'entrepreneurs qui utilisent notre plateforme pour identifier les tendances émergentes.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Commencer Maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;