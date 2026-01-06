import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Database, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary-500 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg text-primary-500">
                <Database size={28} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Big Data</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="hover:text-secondary-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Início
              </Link>
              <Link to="/#services" className="hover:text-secondary-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Serviços
              </Link>
              <Link to="/publications" className="hover:text-secondary-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Trabalhos Publicados
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to={user.role === 'specialist' ? '/specialist' : '/dashboard'} 
                  className={`flex items-center gap-2 hover:text-secondary-300 font-medium px-4 py-2 ${user.role === 'specialist' ? 'bg-primary-700 rounded-lg' : ''}`}
                >
                  {user.role === 'specialist' ? <ShieldCheck size={18}/> : <UserIcon size={18} />}
                  {user.role === 'specialist' ? 'Painel Especialista' : 'Área do Cliente'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-primary-100 hover:text-secondary-300 p-2 rounded-full transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
                {user.role !== 'specialist' && (
                  <Link
                    to="/request"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-secondary-900"
                  >
                    Orçamento
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white border border-primary-400 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
              >
                Login / Entrar
              </Link>
            )}
            {!user && (
               <Link
                  to="/request"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-secondary-900"
                >
                  Solicitar Orçamento
                </Link>
            )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-600 border-t border-primary-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:text-secondary-300">Início</Link>
            <Link to="/#services" className="block px-3 py-2 rounded-md text-base font-medium hover:text-secondary-300">Serviços</Link>
            <Link to="/publications" className="block px-3 py-2 rounded-md text-base font-medium hover:text-secondary-300">Publicações</Link>
            {user ? (
              <>
                <Link to={user.role === 'specialist' ? '/specialist' : '/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium text-secondary-300 bg-primary-700">
                   {user.role === 'specialist' ? 'Painel Especialista' : 'Meu Painel'}
                </Link>
                {user.role !== 'specialist' && (
                  <Link to="/request" className="block px-3 py-2 rounded-md text-base font-medium text-white">Novo Projeto</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-300">Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-secondary-300 font-bold">Fazer Login</Link>
                <Link to="/request" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-secondary-500">Solicitar Orçamento</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;