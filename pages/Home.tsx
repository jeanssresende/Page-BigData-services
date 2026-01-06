import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dna, Microscope, FileJson, Activity, Shield, FileSignature, CheckCircle, Lock, ChevronDown, ChevronRight, CornerDownRight, BarChart } from 'lucide-react';
import { SERVICE_OPTIONS } from '../services/mockData';
import { ServiceOption, SubService } from '../types';

const IconMap = {
  Dna: Dna,
  Microscope: Microscope,
  FileJson: FileJson,
  Activity: Activity,
  Shield: Shield,
  FileSignature: FileSignature
};

const Home: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICE_OPTIONS[0].id);
  const [activeSubServiceId, setActiveSubServiceId] = useState<string | null>(null);
  
  const activeService = SERVICE_OPTIONS.find(s => s.id === activeServiceId) || SERVICE_OPTIONS[0];
  const activeSubService = activeService.subServices?.find(s => s.id === activeSubServiceId);
  const ActiveIcon = IconMap[activeService.iconName];

  const handleServiceClick = (id: string) => {
    setActiveServiceId(id);
    setActiveSubServiceId(null); // Reset sub-service when changing main category
  };

  const handleSubServiceClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent button click
    setActiveSubServiceId(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Big Data <br/>
              <span className="text-secondary-400 text-3xl md:text-5xl">Serviços Especializados em Bioinformática</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed text-justify">
              Aceleramos sua pesquisa traduzindo a complexidade de dados de Genômica, Transcriptômica, Proteômica e Imunogenômica em respostas biológicas claras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/request" 
                className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-white bg-secondary-500 hover:bg-secondary-600 transition-all shadow-lg hover:shadow-secondary-500/30"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-2 -mr-1" size={20} />
              </Link>
              <Link 
                to="/publications" 
                className="inline-flex justify-center items-center px-8 py-3 border-2 border-secondary-400 text-base font-bold rounded-full text-secondary-400 hover:bg-secondary-400 hover:text-primary-900 transition-colors"
              >
                Ver Publicações
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Vertical Menu */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-900 sm:text-4xl">Catálogo de Serviços</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              Explore nossas áreas de atuação. Selecione um serviço e navegue pelas subdivisões para detalhes específicos.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
            {/* Vertical Menu (Sidebar) */}
            <div className="lg:w-1/3 flex flex-col gap-3">
              {SERVICE_OPTIONS.map((service) => {
                 const isServiceActive = activeServiceId === service.id;
                 return (
                  <div key={service.id} className="flex flex-col">
                    <button
                      onClick={() => handleServiceClick(service.id)}
                      className={`text-left px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        isServiceActive
                          ? 'bg-primary-600 text-white shadow-lg z-10'
                          : 'bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 border border-slate-100'
                      }`}
                    >
                      <span className="font-bold text-lg">{service.title}</span>
                      {isServiceActive ? <ChevronDown size={20} /> : <ChevronRight size={20} className="text-slate-400 group-hover:text-primary-500" />}
                    </button>
                    
                    {/* Sub-menu (Subdivisions) */}
                    {isServiceActive && service.subServices && (
                      <div className="bg-primary-50 mx-2 rounded-b-xl border-l-2 border-r-2 border-b-2 border-primary-100 p-2 shadow-inner animate-fadeIn">
                         <ul className="space-y-1">
                           {service.subServices.map((sub) => {
                             const isSubActive = activeSubServiceId === sub.id;
                             return (
                               <li key={sub.id}>
                                 <button 
                                  onClick={(e) => handleSubServiceClick(sub.id, e)}
                                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isSubActive 
                                      ? 'bg-primary-200 text-primary-900' 
                                      : 'text-primary-700 hover:bg-primary-100'
                                  }`}
                                 >
                                   <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isSubActive ? 'bg-secondary-600' : 'bg-secondary-400'}`}></div>
                                   {sub.title}
                                 </button>
                               </li>
                             );
                           })}
                         </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="lg:w-2/3 bg-white rounded-2xl p-8 shadow-xl border border-slate-100 flex flex-col">
              
              {/* Header of Card */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                  <ActiveIcon size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                    <span className="uppercase tracking-wider font-semibold">{activeService.title}</span>
                    {activeSubService && (
                      <>
                        <ChevronRight size={14} />
                        <span className="text-secondary-600 font-bold">{activeSubService.title}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {activeSubService ? activeSubService.title : activeService.title}
                  </h3>
                </div>
              </div>

              {/* Dynamic Content Body */}
              <div className="prose prose-slate max-w-none text-slate-600 mb-8 flex-grow">
                {activeSubService ? (
                  // Render Sub-Service Specific Content
                  <div className="animate-fadeIn">
                    <p className="text-justify leading-relaxed text-lg mb-6">
                      {activeSubService.description}
                    </p>
                    
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CornerDownRight size={20} className="text-secondary-500"/>
                        Destaques da Análise:
                      </h4>
                      <ul className="grid grid-cols-1 gap-3 list-none p-0 m-0">
                        {activeSubService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <CheckCircle size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Render General Service Content (Default)
                  <div className="animate-fadeIn flex flex-col h-full">
                     <p className="whitespace-pre-line text-justify leading-relaxed text-lg">
                      {activeService.fullDescription}
                    </p>
                    
                    <h4 className="font-bold text-slate-900 mt-6 mb-3">Principais Análises Incluídas:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 mb-8">
                      {activeService.topics.slice(0, 8).map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={16} className="text-secondary-500 mt-1 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                )}
              </div>

              {/* Card Footer */}
              {!activeSubService && (
                <div className="mt-4 text-center text-sm text-slate-400">
                  <p>Selecione uma subdivisão no menu ao lado para ver detalhes específicos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Separate Section */}
      <section className="bg-primary-50 py-16 border-t border-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">Encontrou o que precisava?</h2>
            <p className="text-slate-600 mb-8">
              Nossa equipe está pronta para desenhar o pipeline ideal para seus dados. 
              Solicite um orçamento personalizado agora mesmo.
            </p>
            <Link 
              to="/request" 
              className="inline-flex justify-center items-center px-10 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-full shadow-lg transition-all hover:shadow-secondary-500/40 transform hover:-translate-y-1 text-lg"
            >
              Solicitar Orçamento
              <ArrowRight className="ml-2" size={24} />
            </Link>
        </div>
      </section>

      {/* LGPD & Security Section */}
      <section className="py-20 bg-primary-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Shield size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-700/50 px-4 py-2 rounded-full mb-6 border border-primary-600">
                <Lock size={16} className="text-secondary-400" />
                <span className="text-sm font-semibold text-secondary-100">Segurança de Dados</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Compromisso com a Privacidade e LGPD</h2>
              <div className="space-y-4 text-primary-100 text-lg text-justify">
                <p>
                  Entendemos a sensibilidade dos dados genômicos e clínicos. Nossa plataforma foi construída seguindo rigorosamente os princípios da <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
                </p>
                <p>
                  Todos os dados submetidos passam por processos de anonimização antes da análise. Utilizamos criptografia de ponta a ponta e servidores seguros para garantir que a integridade e a confidencialidade da sua pesquisa sejam preservadas em todas as etapas.
                </p>
              </div>
            </div>
            <div className="bg-primary-900/50 p-8 rounded-2xl border border-primary-700 backdrop-blur-sm">
              <ul className="space-y-6">
                <li className="flex gap-4">
                   <div className="bg-primary-800 p-3 rounded-lg h-fit border border-primary-600">
                     <Shield className="text-secondary-400" size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-white text-lg">Proteção Total</h4>
                     <p className="text-sm text-primary-200">Protocolos de segurança robustos para armazenamento e transferência de dados.</p>
                   </div>
                </li>
                <li className="flex gap-4">
                   <div className="bg-primary-800 p-3 rounded-lg h-fit border border-primary-600">
                     <FileSignature className="text-secondary-400" size={24} />
                   </div>
                   <div>
                     <h4 className="font-bold text-white text-lg">Confidencialidade</h4>
                     <p className="text-sm text-primary-200">Acordos de confidencialidade (NDA) disponíveis para todos os projetos.</p>
                   </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;