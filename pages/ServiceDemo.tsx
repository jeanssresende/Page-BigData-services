import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICE_OPTIONS } from '../services/mockData';
import { ArrowLeft, CheckCircle, BarChart, FileText, Download, ZoomIn } from 'lucide-react';

// IMPORTAÇÃO CORRETA DAS IMAGENS
// Caminho relativo: sobe um nível (..) da pasta 'pages' e entra em 'figures'
import fig1 from '../figures/figure1_gsea.jpg';
import fig2 from '../figures/figure2_heatmap.png';
import fig3 from '../figures/figure3_kaplanmeier.png';
import fig4 from '../figures/figure4_volcanoplot.jpg';

const ServiceDemo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICE_OPTIONS.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-slate-700">Serviço não encontrado</h2>
        <Link to="/" className="mt-4 text-primary-600 hover:underline">Voltar para Home</Link>
      </div>
    );
  }

  // Render specific content for Transcriptome based on user provided figures
  const renderVisuals = () => {
    if (id === 'transcriptome') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Figura A: Enrichment / Dot Plot */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all duration-300">
            <h4 className="font-bold text-slate-800 mb-3 text-center flex items-center justify-center gap-2">
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Figura 1</span>
              Enriquecimento de Vias (GSEA)
            </h4>
            {/* Container com altura fixa (h-80) para padronizar o tamanho */}
            <div className="h-80 bg-white rounded-lg overflow-hidden border border-slate-200 mb-4 relative group cursor-pointer flex items-center justify-center">
              <img 
                src={fig1} 
                alt="Enriquecimento de vias LSP vs HSP" 
                className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <ZoomIn size={12}/> Ampliar
                  </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 text-center px-2 leading-relaxed">
              Análise de Hallmarks (Gene Set Enrichment) comparando grupos LSP vs HSP. Note o enriquecimento significativo (FDR &lt; 0.05) em vias inflamatórias e imunes, como <strong>Interferon Gamma Response</strong> e <strong>IL6 JAK STAT3 Signaling</strong>.
            </p>
          </div>

          {/* Figura B: Heatmap */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all duration-300">
             <h4 className="font-bold text-slate-800 mb-3 text-center flex items-center justify-center gap-2">
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Figura 2</span>
              Assinatura Transcriptômica Global
            </h4>
            <div className="h-80 bg-white rounded-lg overflow-hidden border border-slate-200 mb-4 relative group cursor-pointer flex items-center justify-center">
              <img 
                src={fig2} 
                alt="Heatmap de Expressão Gênica" 
                className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-600 text-center px-2 leading-relaxed">
              Heatmap de clusterização hierárquica da coorte TCGA-ACC (n=78). A anotação superior correlaciona a expressão gênica com dados clínicos como <strong>Estágio Tumoral</strong>, <strong>Fenótipo Esteroide</strong> e <strong>Fração de Leucócitos</strong>.
            </p>
          </div>

          {/* Figura C: Hazard Ratio / Forest Plot */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all duration-300">
             <h4 className="font-bold text-slate-800 mb-3 text-center flex items-center justify-center gap-2">
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Figura 3</span>
              Análise de Sobrevida (Cox)
            </h4>
            <div className="h-80 bg-white rounded-lg overflow-hidden border border-slate-200 mb-4 relative group cursor-pointer flex items-center justify-center">
              <img 
                src={fig3} 
                alt="Forest Plot Hazard Ratios" 
                className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-600 text-center px-2 leading-relaxed">
              Forest Plot demonstrando Hazard Ratios (HR) multivariados. Destaque para a associação prognóstica de regulons como <strong>NR5A1</strong> e <strong>CENPA</strong> em coortes independentes (TCGA e ENSAT).
            </p>
          </div>

          {/* Figura D: Volcano Plot */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all duration-300">
             <h4 className="font-bold text-slate-800 mb-3 text-center flex items-center justify-center gap-2">
              <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">Figura 4</span>
              Expressão Diferencial (Volcano)
            </h4>
            <div className="h-80 bg-white rounded-lg overflow-hidden border border-slate-200 mb-4 relative group cursor-pointer flex items-center justify-center">
              <img 
                src={fig4} 
                alt="Volcano Plot Expressão Diferencial" 
                className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-600 text-center px-2 leading-relaxed">
              Volcano Plot (LSP vs HSP). Genes <span className="text-blue-600 font-bold">Down-regulated (Azul)</span> como <em>SHOC1</em> e <em>LMX1B</em>, e genes <span className="text-red-600 font-bold">Up-regulated (Vermelho)</span> como <em>ABI3BP</em> e <em>KLRB1</em> (FDR &lt; 0.05).
            </p>
          </div>

        </div>
      );
    }

    // Default Fallback for other services
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
            <span className="text-slate-400 font-medium">Visualização 1 (Ex: PCA)</span>
          </div>
          <p className="text-xs text-center text-slate-500 font-medium">Análise Exploratória</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
            <span className="text-slate-400 font-medium">Visualização 2 (Ex: Heatmap)</span>
          </div>
          <p className="text-xs text-center text-slate-500 font-medium">Clustering Hierárquico</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
            <span className="text-slate-400 font-medium">Visualização 3 (Ex: Venn)</span>
          </div>
          <p className="text-xs text-center text-slate-500 font-medium">Interseção de Dados</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
            <span className="text-slate-400 font-medium">Visualização 4 (Ex: KM Plot)</span>
          </div>
          <p className="text-xs text-center text-slate-500 font-medium">Análise Estatística</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{service.title}</h1>
          <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line text-justify leading-relaxed">
            {service.fullDescription}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topics List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <FileText className="mr-2 text-primary-600" size={24} />
                Tópicos Abordados
              </h3>
              <ul className="space-y-4">
                {service.topics.map((topic, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-600">
                    <CheckCircle className="flex-shrink-0 mr-3 text-primary-500 mt-0.5" size={16} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link 
                  to="/request" 
                  className="w-full block text-center bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
                >
                  Solicitar Este Serviço
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Results Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <BarChart className="mr-2 text-primary-600" size={24} />
                Demonstração de Resultados
              </h3>
              
              {renderVisuals()}

              <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-800 text-sm mb-2">Exemplo de Entregáveis</h4>
                <div className="flex gap-3">
                   <button className="flex items-center text-xs bg-white px-3 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors">
                     <Download size={14} className="mr-1"/> Relatório_Demo.pdf
                   </button>
                   <button className="flex items-center text-xs bg-white px-3 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors">
                     <Download size={14} className="mr-1"/> Tabelas_Suplementares.xlsx
                   </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDemo;