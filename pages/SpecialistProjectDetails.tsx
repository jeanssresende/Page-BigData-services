import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../services/mockData';
import { ProjectStatus } from '../types';
import { ArrowLeft, DollarSign, Calendar, Video, Save, Send, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

const SpecialistProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Em uma app real, buscaria do backend. Aqui usamos o mock e "clonamos" para simular estado local
  const projectInitial = MOCK_PROJECTS.find(p => p.id === id);

  const [budget, setBudget] = useState(projectInitial?.budget || '');
  const [status, setStatus] = useState<ProjectStatus>(projectInitial?.status || ProjectStatus.PENDING);
  const [progress, setProgress] = useState(projectInitial?.progress || 0);
  const [meetingDate, setMeetingDate] = useState(projectInitial?.meetingDate || '');
  const [meetingLink, setMeetingLink] = useState(projectInitial?.meetingLink || '');
  const [adminNote, setAdminNote] = useState('');

  if (!projectInitial) {
    return <div className="p-10 text-center">Projeto não encontrado.</div>;
  }

  const handleUpdateBudget = () => {
    alert(`Orçamento de ${budget} enviado para o cliente ${projectInitial.clientName}.`);
  };

  const handleScheduleMeeting = () => {
    alert(`Reunião agendada para ${meetingDate}. Convite enviado.`);
  };

  const handleUpdateStatus = () => {
    alert(`Status atualizado para: ${status}. Progresso: ${progress}%`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link to="/specialist" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar ao Painel
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{projectInitial.title}</h1>
              <p className="text-slate-500 mt-1">Cliente: <span className="font-semibold text-slate-700">{projectInitial.clientName}</span> • {projectInitial.email}</p>
            </div>
            <div className="text-right">
              <span className="block text-sm text-slate-400">ID do Projeto</span>
              <span className="font-mono font-bold text-slate-700">{projectInitial.id}</span>
            </div>
          </div>
          <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
             <h3 className="font-bold text-sm text-slate-700 mb-2">Descrição da Solicitação:</h3>
             <p className="text-slate-600 text-sm leading-relaxed">{projectInitial.description}</p>
             <div className="mt-4 flex gap-4 text-sm text-slate-500">
                <span><strong>Amostras:</strong> 30 (Estimado)</span>
                <span><strong>Organismo:</strong> Homo sapiens</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Coluna 1: Gestão Financeira e Agenda */}
          <div className="space-y-8">
            
            {/* Orçamento */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
                 <h2 className="font-bold text-green-900 flex items-center gap-2">
                   <DollarSign size={20}/> Orçamento e Proposta
                 </h2>
                 {budget && <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded font-bold">Enviado</span>}
               </div>
               <div className="p-6">
                 <label className="block text-sm font-medium text-slate-700 mb-2">Valor Total do Projeto</label>
                 <div className="flex gap-2">
                   <input 
                    type="text" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="R$ 0,00"
                    className="flex-1 rounded-md border-slate-300 shadow-sm border p-2 focus:ring-green-500 focus:border-green-500"
                   />
                   <button 
                    onClick={handleUpdateBudget}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2"
                   >
                     <Send size={16}/> Enviar
                   </button>
                 </div>
                 <p className="text-xs text-slate-400 mt-2">O cliente receberá uma notificação para aprovação.</p>
               </div>
            </div>

            {/* Agendamento */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
                 <h2 className="font-bold text-purple-900 flex items-center gap-2">
                   <Calendar size={20}/> Agendar Reunião
                 </h2>
               </div>
               <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data e Hora</label>
                    <input 
                      type="datetime-local" 
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full rounded-md border-slate-300 shadow-sm border p-2 text-sm"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Link da Videoconferência (Meet/Zoom)</label>
                    <div className="flex gap-2 items-center">
                       <Video className="text-slate-400" size={18}/>
                       <input 
                        type="text" 
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="https://meet.google.com/..."
                        className="flex-1 rounded-md border-slate-300 shadow-sm border p-2 text-sm"
                      />
                    </div>
                 </div>
                 <button 
                  onClick={handleScheduleMeeting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors mt-2"
                 >
                   Confirmar Agendamento
                 </button>
               </div>
            </div>

          </div>

          {/* Coluna 2: Status e Execução */}
          <div className="space-y-8">
            
             {/* Controle de Status */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                 <h2 className="font-bold text-blue-900 flex items-center gap-2">
                   <Clock size={20}/> Andamento da Análise
                 </h2>
               </div>
               <div className="p-6 space-y-6">
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Fase Atual</label>
                   <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full rounded-md border-slate-300 shadow-sm border p-2 bg-white"
                   >
                     {Object.values(ProjectStatus).map((s) => (
                       <option key={s} value={s}>{s}</option>
                     ))}
                   </select>
                 </div>

                 <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">Progresso ({progress}%)</label>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={progress} 
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Notas Técnicas (Interno)</label>
                    <textarea 
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border-slate-300 shadow-sm border p-2 text-sm"
                      placeholder="Observações sobre a qualidade da amostra, bioinformática, etc."
                    />
                 </div>

                 <button 
                  onClick={handleUpdateStatus}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"
                 >
                   <Save size={16}/> Atualizar Status do Projeto
                 </button>

               </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-slate-900 mb-4">Decisão Inicial</h3>
               <div className="flex gap-4">
                  <button className="flex-1 border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                    <XCircle size={18}/> Rejeitar Pedido
                  </button>
                  <button className="flex-1 bg-primary-600 text-white hover:bg-primary-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle size={18}/> Aceitar Pedido
                  </button>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SpecialistProjectDetails;