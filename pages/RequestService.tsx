import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICE_OPTIONS } from '../services/mockData';
import { UploadCloud, CheckSquare, Square, Info, User, Mail, Lock, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RequestService: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  
  // Auth Form State for new users
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  // Project Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    sampleCount: 1,
    organism: '',
    experimentalDesign: '',
    objectives: '',
    hypothesis: '',
  });

  const handleServiceToggle = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      return;
    }

    // Logic: 
    // 1. If user is already logged in, submit directly.
    // 2. If not logged in, simulate login/signup then submit.
    
    if (!user) {
      if (!authData.email || !authData.password) {
        alert("Por favor, preencha seus dados de acesso para criar a conta e acompanhar o pedido.");
        return;
      }
      // Mock Login/Signup
      login(authData.email);
    }

    // Mock Submission
    alert('Orçamento solicitado com sucesso! Você será redirecionado para o painel de acompanhamento.');
    navigate('/dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Solicitação de Orçamento Personalizado</h1>
          <p className="mt-4 text-lg text-slate-600">
            Descreva seu projeto para que nossos especialistas possam elaborar uma proposta técnica detalhada.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Services */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-100">
            <div className="bg-primary-600 px-6 py-4 border-b border-primary-500">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="bg-white text-primary-600 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                Seleção de Serviços
              </h2>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm text-slate-500 mb-4">Selecione um ou mais serviços que deseja incluir no orçamento:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_OPTIONS.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`cursor-pointer border rounded-xl p-4 flex items-start gap-3 transition-all ${
                      selectedServices.includes(service.id) 
                        ? 'border-secondary-500 bg-secondary-50 ring-1 ring-secondary-500' 
                        : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`mt-1 ${selectedServices.includes(service.id) ? 'text-secondary-600' : 'text-slate-300'}`}>
                      {selectedServices.includes(service.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{service.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{service.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Project Details */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-100">
            <div className="bg-primary-600 px-6 py-4 border-b border-primary-500">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="bg-white text-primary-600 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                Detalhes do Projeto
              </h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700">Título do Projeto</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                    placeholder="Ex: Análise Transcriptômica em Soja"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="organism" className="block text-sm font-medium text-slate-700">Organismo Modelo</label>
                  <input
                    type="text"
                    name="organism"
                    id="organism"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                    placeholder="Ex: Homo sapiens, Mus musculus..."
                    value={formData.organism}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label htmlFor="sampleCount" className="block text-sm font-medium text-slate-700">Número Estimado de Amostras</label>
                  <input
                    type="number"
                    name="sampleCount"
                    id="sampleCount"
                    min="1"
                    required
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                    value={formData.sampleCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700">Arquivos (Opcional)</label>
                   <div className="mt-1 border border-slate-300 border-dashed rounded-md p-3 flex justify-center hover:bg-slate-50 cursor-pointer">
                      <span className="flex items-center text-sm text-slate-500 gap-2">
                        <UploadCloud size={18} /> Anexar Documentos
                      </span>
                   </div>
                </div>
              </div>

              <div>
                <label htmlFor="experimentalDesign" className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                  Desenho Experimental 
                  <span title="Descreva grupos, tratamentos e réplicas">
                    <Info size={14} className="text-slate-400" />
                  </span>
                </label>
                <textarea
                  name="experimentalDesign"
                  id="experimentalDesign"
                  rows={3}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="Descreva os grupos (ex: Controle vs Tratado), número de réplicas biológicas e tipo de material..."
                  value={formData.experimentalDesign}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="objectives" className="block text-sm font-medium text-slate-700">Objetivo Principal e Hipótese</label>
                <textarea
                  name="objectives"
                  id="objectives"
                  rows={3}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-3"
                  placeholder="O que você espera encontrar? Qual a pergunta biológica central?"
                  value={formData.objectives}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Identification / Auth */}
          {!user && (
            <div className="bg-slate-800 shadow-lg rounded-2xl overflow-hidden border border-slate-700">
               <div className="bg-slate-900 px-6 py-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Identificação para Acompanhamento
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-slate-300 mb-6">
                  Para enviar o pedido e acompanhar o status em tempo real, precisamos criar seu acesso seguro.
                </p>

                <div className="flex gap-4 mb-6">
                  <button 
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${authMode === 'signup' ? 'bg-secondary-500 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                  >
                    Criar Nova Conta
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${authMode === 'login' ? 'bg-secondary-500 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                  >
                    Já tenho conta
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {authMode === 'signup' && (
                     <>
                      <div className="col-span-1 md:col-span-2">
                         <label className="block text-sm font-medium text-slate-300 mb-1">Nome Completo</label>
                         <div className="relative">
                           <User className="absolute left-3 top-3 text-slate-500" size={18} />
                           <input type="text" name="name" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 pl-10 text-white focus:ring-secondary-500 focus:border-secondary-500" placeholder="Seu nome" value={authData.name} onChange={handleAuthChange} />
                         </div>
                      </div>
                      <div className="col-span-1 md:col-span-2">
                         <label className="block text-sm font-medium text-slate-300 mb-1">Instituição / Empresa</label>
                         <div className="relative">
                           <Building2 className="absolute left-3 top-3 text-slate-500" size={18} />
                           <input type="text" name="company" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 pl-10 text-white focus:ring-secondary-500 focus:border-secondary-500" placeholder="Onde você trabalha?" value={authData.company} onChange={handleAuthChange} />
                         </div>
                      </div>
                     </>
                   )}
                   
                   <div className={authMode === 'login' ? "col-span-1 md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input type="email" name="email" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 pl-10 text-white focus:ring-secondary-500 focus:border-secondary-500" placeholder="email@exemplo.com" value={authData.email} onChange={handleAuthChange} />
                      </div>
                   </div>
                   
                   <div className={authMode === 'login' ? "col-span-1 md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input type="password" name="password" className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 pl-10 text-white focus:ring-secondary-500 focus:border-secondary-500" placeholder="******" value={authData.password} onChange={handleAuthChange} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-6">
             <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
              >
                {user ? 'Enviar Solicitação de Orçamento' : (authMode === 'signup' ? 'Cadastrar e Solicitar Orçamento' : 'Entrar e Solicitar Orçamento')}
              </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RequestService;