import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText, ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROJECTS } from '../services/mockData';
import { ProjectStatus } from '../types';

const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  let colorClass = 'bg-gray-100 text-gray-800';
  
  switch (status) {
    case ProjectStatus.COMPLETED:
      colorClass = 'bg-green-100 text-green-800 border border-green-200';
      break;
    case ProjectStatus.PROCESSING:
    case ProjectStatus.SEQUENCING:
    case ProjectStatus.ANALYZING:
      colorClass = 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse';
      break;
    case ProjectStatus.SAMPLES_RECEIVED:
      colorClass = 'bg-purple-100 text-purple-800 border border-purple-200';
      break;
    case ProjectStatus.PENDING:
      colorClass = 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      break;
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
      {status}
    </span>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Olá, {user.name}</h1>
            <p className="text-slate-500 mt-1">Bem-vindo ao seu painel de projetos.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/request" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-all"
            >
              <Plus size={18} className="mr-2" />
              Solicitar Nova Análise
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-slate-100">
            <dt className="text-sm font-medium text-slate-500 truncate">Projetos Ativos</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">2</dd>
          </div>
          <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-slate-100">
            <dt className="text-sm font-medium text-slate-500 truncate">Aguardando Amostras</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">1</dd>
          </div>
          <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6 border border-slate-100">
            <dt className="text-sm font-medium text-slate-500 truncate">Concluídos</dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">14</dd>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-4">Projetos Recentes</h2>
        
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-200">
            {MOCK_PROJECTS.map((project) => (
              <li key={project.id} className="hover:bg-slate-50 transition-colors">
                <Link to={`/project/${project.id}`} className="block">
                  <div className="px-6 py-6 sm:px-8">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center truncate gap-4">
                        <p className="text-lg font-semibold text-primary-600 truncate">{project.title}</p>
                        <StatusBadge status={project.status} />
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-500">
                          ID: {project.id}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:flex sm:justify-between">
                      <div className="sm:flex sm:gap-6">
                        <p className="flex items-center text-sm text-slate-500">
                          <FileText className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                          {project.serviceType}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                          Submetido em {new Date(project.submissionDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-primary-600 sm:mt-0 font-medium">
                        Ver Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                    {/* Simple Progress Bar */}
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;