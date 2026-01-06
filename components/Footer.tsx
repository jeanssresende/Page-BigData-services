import React from 'react';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-slate-300 border-t border-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-lg font-bold mb-4">Big Data - Bioinformática</h3>
            <p className="text-sm leading-relaxed mb-4">
              Serviços Especializados em Bioinformática. Traduzindo a complexidade de dados de Genômica, Transcriptômica e Imunogenômica em respostas claras.
            </p>
            <div className="flex items-center gap-3 p-3 bg-primary-800 rounded-lg border border-primary-700">
              <ShieldCheck className="text-secondary-400" size={24} />
              <div>
                <p className="text-xs text-white font-bold uppercase">Conformidade LGPD</p>
                <p className="text-xs text-slate-400">Seus dados são tratados com rigorosa segurança e anonimização.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-secondary-400" />
                contato@bigdata-bio.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-secondary-400" />
                +55 (11) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary-400" />
                São Paulo - SP
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-secondary-400 transition-colors">Metodologia</a></li>
              <li><a href="/#/publications" className="hover:text-secondary-400 transition-colors">Publicações</a></li>
              <li><a href="#" className="hover:text-secondary-400 transition-colors">Política de Privacidade (LGPD)</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Big Data Bioinformática. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;