import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookMarked, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">TrendAnalyzer</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Tableau de bord</span>
                </Link>
                <Link
                  to="/analyze"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Analyser</span>
                </Link>
                <Link
                  to="/saved"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <BookMarked className="h-5 w-5" />
                  <span>Sujets Sauvegardés</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;