import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { MOCK_PUBLICATIONS } from '../services/mockData';

const Publications: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar para Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-primary-900 p-8 sm:p-12 text-white">
            <BookOpen size={48} className="mb-4 text-primary-400" />
            <h1 className="text-3xl font-bold mb-4">Trabalhos Publicados</h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              Nossos pipelines de análise já contribuíram para descobertas relevantes em endocrinologia e oncologia. Abaixo, destacamos as principais publicações onde aplicamos nossas soluções em bioinformática e estatística.
            </p>
          </div>

          <div className="p-8 sm:p-12">
            <div className="space-y-8">
              {MOCK_PUBLICATIONS.map((pub) => (
                <div key={pub.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-slate-100 border border-slate-200 rounded flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-slate-400 transform -rotate-90 whitespace-nowrap">PAPER</span>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                      {pub.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                      {pub.title}
                    </h3>
                    <div className="text-slate-600 text-sm mb-3">
                      <span className="font-semibold italic">{pub.journal}</span> • {pub.year}
                    </div>
                    <a href={pub.link} className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium">
                      Ler Artigo <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <p className="text-slate-600 mb-4">Tem dados para publicar? Podemos ajudar a elevar o fator de impacto do seu trabalho.</p>
              <Link to="/request" className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-colors">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publications;