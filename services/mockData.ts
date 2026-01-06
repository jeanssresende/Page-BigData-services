import { Project, ProjectStatus, ServiceOption, TimelineEvent, Publication } from '../types';

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'genome-exome',
    title: 'Genoma e Exoma',
    shortDescription: 'Sequenciamento e análise de dados para variantes estruturais e SNVs.',
    fullDescription: `Nossos serviços de análise genômica são desenhados para atender a uma vasta gama de objetivos científicos, desde a identificação de variantes raras em doenças complexas até o estudo de polimorfismos em populações. Implementamos fluxos de trabalho otimizados para o resequenciamento de genoma completo (WGS), permitindo a comparação detalhada de amostras contra genomas de referência para detectar variações estruturais e de nucleotídeo único com alta sensibilidade.

Para pesquisas que exigem uma análise aprofundada das regiões codificadoras de proteínas, oferecemos o Sequenciamento de Exoma Completo (WES). Através dessa abordagem, focamos na captura e análise das regiões exônicas, permitindo a descoberta de variantes funcionais com excelente custo-benefício e profundidade de cobertura. Garantimos a entrega de dados processados sob os mais rigorosos padrões de qualidade, fornecendo desde o controle de qualidade dos reads até a anotação funcional detalhada das variantes identificadas.`,
    topics: [
      'Controle de Qualidade (QC) e Trimming',
      'Alinhamento ao Genoma de Referência (hg38/T2T)',
      'Chamada de Variantes Germinativas (GATK HaplotypeCaller)',
      'Chamada de Variantes Somáticas (Mutect2)',
      'Anotação Funcional (VEP, SnpEff, dbNSFP)',
      'CNV Calling (Copy Number Variations)'
    ],
    subServices: [
      { 
        id: 'wgs', 
        title: 'Whole Genome Sequencing (WGS)',
        description: 'O Sequenciamento de Genoma Completo (WGS) oferece a visão mais abrangente do genoma. Analisamos regiões codificadoras e não-codificadoras, permitindo a identificação de variantes em regiões regulatórias, variantes estruturais complexas (SVs) e Copy Number Variations (CNVs) com alta resolução.',
        features: [
          'Cobertura uniforme do genoma (>30x)',
          'Detecção de SNVs, Indels e SVs em regiões não-codificadoras',
          'Análise de regiões regulatórias e promotores',
          'Ideal para descoberta de novas variantes e doenças raras sem diagnóstico'
        ]
      },
      { 
        id: 'wes', 
        title: 'Whole Exome Sequencing (WES)',
        description: 'Focado nas regiões codificadoras de proteínas (aprox. 1-2% do genoma), o WES é a estratégia custo-efetiva padrão para identificar variantes causadoras de doenças mendelianas e drivers oncogênicos.',
        features: [
          'Alta profundidade de cobertura (>100x) em exóns',
          'Foco em variantes funcionais de alto impacto',
          'Pipeline otimizado para GATK Best Practices',
          'Análise de impacto proteico (Sift, PolyPhen, CADD)'
        ]
      },
      { 
        id: 'panel', 
        title: 'Painéis de Genes Alvo',
        description: 'Análise focada em conjuntos específicos de genes associados a fenótipos clínicos ou vias biológicas de interesse. Ideal para validação ou triagem clínica com altíssima cobertura.',
        features: [
          'Cobertura ultra-profunda (>500x a >1000x)',
          'Detecção de variantes de baixa frequência',
          'Painéis customizados (Oncologia, Cardiologia, Neuro)',
          'Maior velocidade de processamento'
        ]
      },
      { 
        id: 'somatic', 
        title: 'Análise Somática (Tumor-Normal)',
        description: 'Pipeline especializado na subtração de variantes germinativas para identificação exclusiva de mutações somáticas adquiridas no tecido tumoral.',
        features: [
          'Caller: Mutect2 / Strelka2',
          'Estimativa de pureza e ploidia tumoral',
          'Identificação de Neoantígenos',
          'Assinaturas Mutacionais (COSMIC)'
        ]
      }
    ],
    iconName: 'Dna'
  },
  {
    id: 'transcriptome',
    title: 'Transcriptoma (RNA-Seq)',
    shortDescription: 'Expressão gênica, descoberta de novos perfis moleculares e assinaturas.',
    fullDescription: `A análise de transcriptoma em nossa plataforma permite uma visão dinâmica e precisa da expressão gênica sob diferentes condições biológicas. Desenvolvemos pipelines personalizados para projetos de RNA-seq que visam não apenas a quantificação de transcritos, mas também a descoberta de novos perfis moleculares e assinaturas gênicas. Realizamos desde o pré-processamento de dados brutos e remoção de contaminantes até o alinhamento de alta performance.

Além da quantificação padrão, aplicamos métodos estatísticos avançados para a correção de efeitos de lote e normalização de dados, assegurando que as comparações entre grupos sejam robustas e biologicamente relevantes. Através de técnicas de redução de dimensionalidade e agrupamento, auxiliamos nossos colaboradores a identificar padrões de expressão ocultos e clusters celulares.`,
    topics: [
      'Quantificação de Expressão (Salmon/Kallisto)',
      'Análise de Expressão Diferencial (DESeq2/EdgeR)',
      'Análise de Enriquecimento (GSEA, GO, KEGG)',
      'Correção de Efeito de Lote',
      'Descoberta de Novos Transcritos'
    ],
    subServices: [
      { 
        id: 'bulk-rna', 
        title: 'Bulk RNA-Seq',
        description: 'Análise clássica de expressão gênica em tecido ou cultura celular homogenizada. O padrão ouro para comparação entre grupos (ex: Tratado vs Controle) e identificação de biomarcadores.',
        features: [
          'Expressão Diferencial Robusta',
          'Análise de Pathways e Gene Ontology',
          'Detecção de Isosformas (Splicing Alternativo)',
          'Identificação de Genes de Fusão'
        ]
      },
      { 
        id: 'scrna', 
        title: 'Single-Cell RNA-Seq',
        description: 'Resolução celular individual para dissecar a heterogeneidade tecidual. Essencial para entender microambientes complexos, como o tumoral ou o desenvolvimento embrionário.',
        features: [
          'Pipeline Seurat / Scanpy',
          'Clusterização e Identificação de Tipos Celulares',
          'Análise de Trajetória (Pseudotime)',
          'Interação Célula-Célula'
        ]
      },
      { 
        id: 'mirna', 
        title: 'Small RNA / miRNA-Seq',
        description: 'Focado em RNAs não-codificantes pequenos, principalmente microRNAs, que atuam na regulação pós-transcricional da expressão gênica.',
        features: [
          'Quantificação de miRNAs maduros e precursores',
          'Predição de genes alvo de miRNAs',
          'Análise de redes regulatórias',
          'Identificação de novos miRNAs'
        ]
      },
      { 
        id: 'time-series', 
        title: 'Séries Temporais',
        description: 'Modelagem estatística para experimentos de expressão gênica ao longo do tempo, permitindo identificar genes com padrões temporais específicos.',
        features: [
          'Clustering de padrões temporais',
          'Identificação de genes "early" e "late" response',
          'Modelagem de tendências (ImpulseDE2 / maSigPro)',
          'Redes de co-expressão dinâmica'
        ]
      }
    ],
    iconName: 'Activity'
  },
  {
    id: 'immunogenomics',
    title: 'Imunogenômica',
    shortDescription: 'Caracterização do sistema imune adaptativo e repertórios TCR/BCR.',
    fullDescription: `Na fronteira entre a genômica e a imunologia, disponibilizamos análises especializadas para a caracterização profunda do sistema imune adaptativo. Processamos dados de sequenciamento de repertórios de receptores de células T e B (TCR/BCR) para decifrar a complexidade da resposta imune. Realizamos a reconstrução completa das sequências V(D)J e a identificação de clones específicos.

Nossas análises de imunoinformática abrangem desde o uso de genes germinativos até a análise físico-química das regiões CDR3. Obtemos métricas detalhadas de diversidade (como os índices de Shannon e Simpson) e visualizações de redes de similaridade.`,
    topics: [
      'Reconstrução de Repertório V(D)J (MiXCR)',
      'Análise de Diversidade Clonal',
      'Redes de Similaridade de Sequências',
      'Predição de Neoantígenos',
      'Tipagem HLA in silico'
    ],
    subServices: [
      { 
        id: 'tcr', 
        title: 'Repertório TCR (T-Cell Receptor)',
        description: 'Análise da diversidade e clonalidade de linfócitos T baseada no sequenciamento das cadeias Alpha/Beta ou Gamma/Delta.',
        features: [
          'Identificação de clones expandidos',
          'Métricas de Diversidade (Shannon, Simpson)',
          'Uso de genes V e J',
          'Análise de motivos CDR3'
        ]
      },
      { 
        id: 'bcr', 
        title: 'Repertório BCR (B-Cell Receptor)',
        description: 'Análise de linfócitos B e produção de anticorpos, incluindo a análise de hipermutação somática e evolução clonal.',
        features: [
          'Árvores de linhagem clonal',
          'Análise de isótipos (IgG, IgA, IgM, etc.)',
          'Taxas de hipermutação somática',
          'Redes de similaridade de sequências'
        ]
      },
      { 
        id: 'neoantigen', 
        title: 'Predição de Neoantígenos',
        description: 'Identificação de peptídeos mutados capazes de serem apresentados pelo MHC e reconhecidos pelo sistema imune. Crítico para imunoterapia personalizada.',
        features: [
          'Integração HLA + Variantes Somáticas + Expressão',
          'Predição de afinidade de ligação (NetMHCpan)',
          'Imunogenicidade do peptídeo',
          'Priorização para vacinas'
        ]
      },
      { 
        id: 'hla', 
        title: 'Tipagem HLA',
        description: 'Determinação dos alelos HLA (Classe I e II) a partir de dados de sequenciamento (WGS/WES/RNA-Seq) com alta precisão.',
        features: [
          'Resolução de 4 dígitos',
          'Suporte a múltiplos algoritmos (OptiType, HLA-HD)',
          'Verificação de perda de heterozigosidade (LOH) no HLA',
          'Essencial para estudos de transplante e imunologia'
        ]
      }
    ],
    iconName: 'Shield'
  },
  {
    id: 'editing',
    title: 'Edição e Publicação',
    shortDescription: 'Suporte na redação, visualização de dados e formatação.',
    fullDescription: `Para garantir que a excelência dos resultados laboratoriais seja traduzida em publicações de alto impacto, oferecemos suporte técnico completo na redação e edição de manuscritos. Atuamos diretamente na descrição detalhada das metodologias de bioinformática, garantindo que os pipelines e parâmetros utilizados atendam aos requisitos de reprodutibilidade e rigor científico.

Além do texto, apresentamos a metodologia detalhada, confeccionamos toda a identidade visual dos resultados, transformando dados complexos em figuras vetorizadas (SVG/PDF) elegantes e informativas.`,
    topics: [
      'Descrição Metodológica Detalhada',
      'Geração de Figuras Vetoriais (Publication Ready)',
      'Revisão Estatística',
      'Formatação nas Normas da Revista',
      'Resposta aos Revisores'
    ],
    subServices: [
      { 
        id: 'fig', 
        title: 'Confecção de Figuras',
        description: 'Criação de figuras científicas profissionais, painéis compostos e diagramas esquemáticos prontos para submissão.',
        features: [
          'Gráficos vetoriais de alta resolução (300dpi+)',
          'Identidade visual consistente',
          'Heatmaps, Volcano Plots, PCA, Circos Plots',
          'Ajuste aos guidelines da revista'
        ]
      },
      { 
        id: 'review', 
        title: 'Revisão de Manuscrito',
        description: 'Leitura crítica do manuscrito com foco na seção de resultados e discussão dos dados ômicos.',
        features: [
          'Verificação de consistência estatística',
          'Sugestões de enriquecimento da discussão',
          'Clareza e fluidez do texto técnico',
          'Formatação de referências'
        ]
      },
      { 
        id: 'method', 
        title: 'Escrita de Metodologia',
        description: 'Redação completa da seção de Materiais e Métodos referente às análises de bioinformática, garantindo reprodutibilidade.',
        features: [
          'Detalhamento de versões de software e parâmetros',
          'Citação correta de ferramentas e bancos de dados',
          'Fluxogramas de análise',
          'Disponibilização de código (opcional)'
        ]
      }
    ],
    iconName: 'FileSignature'
  }
];

export const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: 'pub1',
    title: 'Adrenocortical Carcinoma Steroid Profiles: In Silico Pan-Cancer Analysis of TCGA Data Uncovers Immunotherapy Targets for Potential Improved Outcomes',
    journal: 'Frontiers in Endocrinology',
    year: '2021',
    category: 'Endocrinologia/Oncologia',
    link: 'https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2021.672319/full'
  },
  {
    id: 'pub2',
    title: 'Comprehensive Characterization of the Regulatory Landscape of Adrenocortical Carcinoma: Novel Transcription Factors and Targets Associated with Prognosis',
    journal: 'Cancers',
    year: '2022',
    category: 'Oncologia',
    link: 'https://academic.oup.com/ejendo/article-abstract/193/1/135/8182053?redirectedFrom=fulltext&login=false'
  },
  {
    id: 'pub3',
    title: 'Steroidogenic factor-1 regulates a core set of target genes to promote malignancy in adrenocortical carcinoma',
    journal: 'European Journal of Endocrinology',
    year: '2025',
    category: 'Oncologia',
    link: 'https://academic.oup.com/ejendo/article-abstract/193/1/135/8182053?redirectedFrom=fulltext&login=false'
  },
  {
    id: 'pub4',
    title: 'Steroid Phenotype Stratification Reveals Distinct HLA Expression Signatures in Adrenocortical Carcinoma',
    journal: 'Cancers',
    year: '2026',
    category: 'Imunogenômica',
    link: '#'
  },
  {
    id: 'pub5',
    title: 'The Steroidal Profile Modulates Adaptive Immune Response and Prognosis in Adrenocortical Carcinoma: Analysis of TCR and BCR Repertoires',
    journal: 'Cancer Medicine',
    year: '2025',
    category: 'Imunogenômica',
    link: '#'
  }
];

const generateTimeline = (status: ProjectStatus): TimelineEvent[] => {
  const steps = [
    { title: 'Submissão', desc: 'Projeto criado.' },
    { title: 'Amostras', desc: 'Recebimento.' },
    { title: 'QC', desc: 'Controle de qualidade.' },
    { title: 'Processamento', desc: 'Sequenciamento/Análise.' },
    { title: 'Conclusão', desc: 'Relatório Final.' }
  ];

  let cutoff = 0;
  if (status === ProjectStatus.PENDING) cutoff = 0;
  else if (status === ProjectStatus.SAMPLES_RECEIVED) cutoff = 1;
  else if (status === ProjectStatus.PROCESSING) cutoff = 2;
  else if (status === ProjectStatus.SEQUENCING) cutoff = 3;
  else if (status === ProjectStatus.ANALYZING) cutoff = 3;
  else if (status === ProjectStatus.COMPLETED) cutoff = 5;

  return steps.map((step, index) => ({
    date: new Date(Date.now() - (10000000 * (5 - index))).toISOString().split('T')[0],
    title: step.title,
    description: step.desc,
    completed: index <= cutoff
  }));
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PRJ-24-001',
    title: 'Análise WES - Coorte Oncológica',
    clientName: 'Dr. Roberto Silva',
    email: 'roberto.silva@university.edu',
    serviceType: 'genome-exome',
    description: 'Busca de variantes somáticas em 30 pares tumor-normal.',
    submissionDate: '2024-01-15',
    status: ProjectStatus.PROCESSING,
    progress: 45,
    budget: 'R$ 12.500,00',
    budgetStatus: 'Approved',
    timeline: generateTimeline(ProjectStatus.PROCESSING)
  },
  {
    id: 'PRJ-24-012',
    title: 'RNA-Seq Imune',
    clientName: 'Dra. Ana Maria',
    email: 'ana.maria@research.org',
    serviceType: 'transcriptome',
    description: 'Expressão diferencial em células T CD8+.',
    submissionDate: '2024-02-10',
    status: ProjectStatus.SAMPLES_RECEIVED,
    progress: 20,
    budget: 'R$ 8.000,00',
    budgetStatus: 'Pending',
    timeline: generateTimeline(ProjectStatus.SAMPLES_RECEIVED)
  },
  {
    id: 'PRJ-24-025',
    title: 'Metagenômica Solo',
    clientName: 'Universidade Federal',
    email: 'contact@federal.edu.br',
    serviceType: 'genome-exome',
    description: 'Análise de diversidade bacteriana 16S.',
    submissionDate: '2024-03-01',
    status: ProjectStatus.PENDING,
    progress: 0,
    timeline: generateTimeline(ProjectStatus.PENDING)
  }
];