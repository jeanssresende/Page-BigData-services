export enum ProjectStatus {
  PENDING = 'Pendente',
  SAMPLES_RECEIVED = 'Amostras Recebidas',
  PROCESSING = 'Em Processamento',
  SEQUENCING = 'Sequenciamento',
  ANALYZING = 'Análise de Dados',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  serviceType: string;
  description: string;
  submissionDate: string;
  status: ProjectStatus;
  progress: number; // 0 to 100
  timeline: TimelineEvent[];
  // Novos campos administrativos
  clientName?: string;
  email?: string;
  budget?: string; // Ex: "R$ 5.000,00"
  budgetStatus?: 'Pending' | 'Approved' | 'Rejected';
  meetingDate?: string;
  meetingLink?: string;
}

export interface SubService {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface ServiceOption {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  topics: string[];
  subServices?: SubService[];
  iconName: 'Dna' | 'Microscope' | 'FileJson' | 'Activity' | 'Shield' | 'FileSignature';
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'client' | 'specialist'; // Novo campo para controle de acesso
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  category: string;
  link?: string;
}