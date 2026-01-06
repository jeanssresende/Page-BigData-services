import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, FileText, ArrowRight } from 'lucide-react';
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
      colorClass = 'bg-blue-100 text-blue-800 border border-blue-200';
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

const SpecialistDashboard: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && project.status === ProjectStatus.PENDING;
    if (filter === 'active') return matchesSearch && [ProjectStatus.PROCESSING, ProjectStatus.SEQUENCING, ProjectStatus.ANALYZING, ProjectStatus.SAMPLES_RECEIVED].includes(project.status);
    if (filter === 'completed') return matchesSearch && project.status === ProjectStatus.COMPLETED;
    
    return matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Painel do Especialista</h1>
            <p className="text-slate-500 mt-1">Gerencie solicitações, orçamentos e análises.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white p-2 rounded-lg border border-slate-200 flex items-center shadow-sm">
             <div className="bg-primary-100 p-2 rounded-md mr-3">
               <User className="text-primary-700" size={20}/>
             </div>
             <div>
               <p className="text-xs text-slate-500 font-bold uppercase">Logado como</p>
               <p className="text-sm font-bold text-slate-800">{user?.name}</p>
             </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Todos os Projetos
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Pendentes
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Em Andamento
            </button>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por ID, cliente ou título..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Projeto / Cliente</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Serviço</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data Submissão</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{project.title}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <User size={12}/> {project.clientName || 'Cliente Anônimo'}
                      </span>
                      <span className="text-[10px] text-slate-400">ID: {project.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-slate-400 mr-2"/>
                      <span className="text-sm text-slate-700">{project.serviceType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar size={16} className="mr-2 text-slate-400"/>
                      {new Date(project.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/specialist/project/${project.id}`} 
                      className="text-primary-600 hover:text-primary-900 flex items-center gap-1 font-bold"
                    >
                      Gerenciar <ArrowRight size={16}/>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProjects.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              Nenhum projeto encontrado com os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistDashboard;