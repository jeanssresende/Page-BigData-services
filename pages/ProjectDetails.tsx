import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../services/mockData';
import { CheckCircle, Circle, ArrowLeft, Download, MessageSquare, Send, User } from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = MOCK_PROJECTS.find(p => p.id === id);
  const [message, setMessage] = useState('');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-slate-700">Projeto não encontrado</h2>
        <Link to="/dashboard" className="mt-4 text-primary-600 hover:underline">Voltar ao painel</Link>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if(message.trim()) {
      alert("Mensagem enviada ao especialista responsável!");
      setMessage("");
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Back */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar para Projetos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header Card */}
            <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
              <div className="bg-primary-900 px-6 py-6 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white">{project.title}</h1>
                  <p className="text-primary-200 mt-1 text-sm">ID: {project.id} • Submissão: {new Date(project.submissionDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-500 text-white shadow-sm">
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="px-6 py-6 sm:px-8">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Descrição do Pedido</h3>
                <p className="text-slate-700 leading-relaxed text-justify">{project.description}</p>
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-4">
                  <h3 className="text-sm font-medium text-slate-500">Documentos:</h3>
                  <button className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium bg-primary-50 px-3 py-1 rounded-lg">
                    <Download size={16} className="mr-1" /> Proposta_Técnica.pdf
                  </button>
                  {project.progress === 100 && (
                    <button className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium bg-primary-50 px-3 py-1 rounded-lg">
                      <Download size={16} className="mr-1" /> Relatório_Final.pdf
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-xl shadow-md border border-slate-100 px-6 py-8 sm:px-8">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Acompanhamento do Processo</h2>
              <div className="relative">
                <div className="absolute left-4 md:left-9 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-12">
                  {project.timeline.map((event, index) => (
                    <div key={index} className="relative flex items-start group">
                      <div className={`absolute left-0 md:left-5 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border-4 z-10 ${
                        event.completed 
                          ? 'bg-secondary-500 border-primary-50 text-white shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-300'
                      }`}>
                        {event.completed ? <CheckCircle size={16} fill="currentColor" className="text-white" /> : <Circle size={12} />}
                      </div>
                      <div className="ml-12 md:ml-20 w-full">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                          <h3 className={`text-lg font-bold ${event.completed ? 'text-primary-900' : 'text-slate-500'}`}>
                            {event.title}
                          </h3>
                          {event.completed && (
                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
                              Concluído em: {new Date(event.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${event.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat / Sidebar Column */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-[600px] sticky top-24">
                <div className="bg-primary-800 p-4 border-b border-primary-700">
                   <h3 className="text-white font-bold flex items-center gap-2">
                     <MessageSquare size={20} className="text-secondary-400"/> Fale com o Especialista
                   </h3>
                   <p className="text-xs text-primary-200 mt-1">Tire dúvidas sobre esta etapa do projeto.</p>
                </div>
                
                {/* Mock Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4">
                   <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0">
                       <User size={16} className="text-primary-700"/>
                     </div>
                     <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm border border-slate-200 text-sm text-slate-700">
                       <p className="font-bold text-xs text-primary-600 mb-1">Especialista Bioinformática</p>
                       <p>Olá! Recebemos sua amostra. A extração de DNA será iniciada amanhã.</p>
                       <span className="text-[10px] text-slate-400 mt-1 block text-right">Ontem 14:00</span>
                     </div>
                   </div>

                   <div className="flex gap-3 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                       <User size={16} className="text-secondary-700"/>
                     </div>
                     <div className="bg-secondary-50 p-3 rounded-tl-xl rounded-br-xl rounded-bl-xl shadow-sm border border-secondary-100 text-sm text-slate-700">
                       <p>Ótimo! Por favor me avise se o QC estiver ok.</p>
                       <span className="text-[10px] text-slate-400 mt-1 block text-right">Ontem 14:30</span>
                     </div>
                   </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <form onSubmit={handleSendMessage} className="relative">
                    <input 
                      type="text" 
                      placeholder="Digite sua mensagem..."
                      className="w-full pl-4 pr-12 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;