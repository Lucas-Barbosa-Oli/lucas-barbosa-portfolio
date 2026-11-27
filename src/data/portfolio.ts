export type Lang = 'pt' | 'en';

export type ProjectCategory = 'web' | 'ai' | 'research';

export interface ProjectItem {
  id: string;
  slug: string;
  featured: boolean;
  category: ProjectCategory;
  accent: string;
  secondaryAccent: string;
  year: string;
  liveUrl?: string;
  repoUrl?: string;
  repoPrivate?: boolean;
  title: string;
  subtitle: { pt: string; en: string };
  summary: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
  metrics: { label: { pt: string; en: string }; value: string }[];
  stack: string[];
}

export const PROFILE = {
  name: 'Lucas Oliveira Barbosa',
  shortName: 'Lucas Barbosa',
  handle: '@Lucas-Barbosa-Oli',
  location: {
    pt: 'Cachoeirinha, RS · Brasil',
    en: 'Cachoeirinha, RS · Brazil',
  },
  email: 'lucas.oli.barb@gmail.com',
  github: 'https://github.com/Lucas-Barbosa-Oli',
  linkedin: 'https://www.linkedin.com/in/lucas-oliveira-barbosa-b37a5626a/',
  avatar: 'https://avatars.githubusercontent.com/u/126346779?v=4',
  role: {
    pt: 'Implantação de Soluções Tecnológicas e IA · Umbler',
    en: 'Technology & AI Solutions Implementation · Umbler',
  },
  headline: {
    pt: 'Agentes de IA, automações e aplicações web para problemas reais.',
    en: 'AI agents, automations, and web apps built for real workflows.',
  },
  subheadline: {
    pt: 'Implanto soluções tecnológicas, chatbots e integrações (n8n, Make e APIs REST) na Umbler e curso Bacharelado em Ciência da Computação no Cesuca.',
    en: 'I implement technology solutions, custom chatbots, and system integrations (n8n, Make, REST APIs) at Umbler while studying Computer Science at Cesuca.',
  },
  availability: {
    pt: 'Cachoeirinha, RS · Umbler · Ciência da Computação (Cesuca)',
    en: 'Cachoeirinha, RS · Umbler · Computer Science (Cesuca)',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'conta-clara',
    slug: '01',
    featured: true,
    category: 'web',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2026',
    liveUrl: 'https://conta-clara-tawny.vercel.app',
    repoPrivate: true,
    title: 'Conta Clara',
    subtitle: {
      pt: 'Finanças pessoais com saldo disponível hoje vs. projeção após compromissos',
      en: 'Personal finance comparing liquid balance today vs. post-bill projection',
    },
    summary: {
      pt: 'Aplicação web de finanças pessoais focada em separar o dinheiro disponível hoje do saldo após compromissos futuros, com sincronização Open Finance e gráfico de receitas vs. gastos.',
      en: 'Personal finance web app separating today’s available balance from upcoming commitments, with Open Finance sync and monthly cash-flow charts.',
    },
    highlights: {
      pt: [
        'Gráfico de 6 meses com navegação por setas entre períodos passados e futuros e retorno rápido ao mês atual',
        'Modo privacidade (tecla P) para ocultar valores em tela, filtro no extrato e exportação CSV',
        'Visualização de contas, reservas e compromissos com temas claro e escuro',
        'Autenticação e isolamento de dados por usuário com funções serverless',
      ],
      en: [
        '6-month cash-flow chart with arrow navigation across past and future periods and one-click return to the current month',
        'Privacy blur shortcut (key P), live ledger filtering, and CSV export',
        'Clear breakdown of checking balance, savings, and upcoming bills in light and dark themes',
        'Per-user data isolation and serverless Open Finance synchronization',
      ],
    },
    metrics: [
      { label: { pt: 'Foco', en: 'Focus' }, value: 'Cash Flow' },
      { label: { pt: 'Integração', en: 'Integration' }, value: 'Open Finance' },
      { label: { pt: 'Status', en: 'Status' }, value: 'Live Demo' },
    ],
    stack: ['JavaScript', 'HTML & CSS', 'Chart.js', 'Supabase', 'Open Finance'],
  },
  {
    id: 'nexo',
    slug: '02',
    featured: true,
    category: 'web',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2026',
    liveUrl: 'https://nexo-second-brain.vercel.app',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/nexo',
    title: 'Nexo',
    subtitle: {
      pt: 'Notas conectadas com [[wikilinks]], grafo de relações e planilhas offline',
      en: 'Connected notes with [[wikilinks]], relationship graph & offline spreadsheets',
    },
    summary: {
      pt: 'Espaço pessoal para organizar estudos e anotações com links bidirecionais, grafo interativo de conexões e planilhas com fórmulas simples, funcionando offline como PWA.',
      en: 'Personal workspace for study notes with bidirectional links, an interactive relationship graph, and formula-ready spreadsheets, usable offline as a PWA.',
    },
    highlights: {
      pt: [
        'Paleta de comandos (⌘K) para navegar rapidamente entre notas, planilhas, pastas e tags',
        'Grafo interativo de conexões com fixação de nós, zoom e inspeção de vínculos',
        'Editor Markdown com fórmulas matemáticas (KaTeX), checklists no modo leitura e lixeira com desfazer',
        'Planilhas integradas (=SOMA, =MÉDIA) com navegação por teclado e sincronização em nuvem',
      ],
      en: [
        'Command palette (⌘K) to jump between notes, spreadsheets, folders, and tags',
        'Interactive knowledge graph with node pinning, zoom, and link inspection',
        'Markdown editor with KaTeX math, read-mode checklists, focus mode, and undoable trash',
        'Built-in spreadsheets (=SUM, =AVG) with keyboard navigation and cloud sync',
      ],
    },
    metrics: [
      { label: { pt: 'Código', en: 'Source' }, value: 'Open Source' },
      { label: { pt: 'Uso', en: 'Mode' }, value: 'Offline PWA' },
      { label: { pt: 'Grafo', en: 'Graph' }, value: 'd3-force' },
    ],
    stack: ['TypeScript', 'React', 'd3-force', 'KaTeX', 'Supabase', 'PWA'],
  },
  {
    id: 'arch-atlas-ai',
    slug: '03',
    featured: false,
    category: 'ai',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2026',
    liveUrl: 'https://arch-atlas-ai.vercel.app',
    repoPrivate: true,
    title: 'Arch Atlas AI',
    subtitle: {
      pt: 'Guia interativo de arquitetura de software, RAG e agentes de IA',
      en: 'Interactive study guide on System Design, RAG, and AI agents',
    },
    summary: {
      pt: 'Aplicação web de estudo que organiza conceitos de arquitetura de sistemas, fluxos de RAG e padrões de agentes de IA em uma navegação direta.',
      en: 'Interactive web reference organizing system design concepts, RAG pipelines, and AI agent patterns for practical study.',
    },
    highlights: {
      pt: [
        'Mapeamento visual de padrões de agentes, uso de ferramentas e fluxos de recuperação de contexto',
        'Navegação rápida por tópicos publicada na web para consulta diária',
      ],
      en: [
        'Visual reference for agent patterns, tool orchestration, and retrieval pipelines',
        'Fast topic navigation published on the web for daily study',
      ],
    },
    metrics: [
      { label: { pt: 'Tema', en: 'Topic' }, value: 'AI Systems' },
      { label: { pt: 'Acesso', en: 'Access' }, value: 'Public Web' },
    ],
    stack: ['Next.js', 'TypeScript', 'AI Agents', 'System Design'],
  },
  {
    id: 'telegram-finance-bot',
    slug: '04',
    featured: false,
    category: 'ai',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2026',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/telegram-finance-bot',
    title: 'Telegram Finance Bot',
    subtitle: {
      pt: 'Bot em Python para registrar receitas e despesas direto pelo Telegram',
      en: 'Python Telegram bot for logging income and expenses by chat',
    },
    summary: {
      pt: 'Assistente conversacional em Python integrado à API do Telegram para lançar gastos por mensagem e gerar resumos mensais e gráficos por categoria.',
      en: 'Conversational Python bot integrated with the Telegram API to log transactions via chat and generate monthly category summaries.',
    },
    highlights: {
      pt: [
        'Registro rápido por mensagem no Telegram sem depender de formulários longos',
        'Consolidação mensal automática e visualização por categoria em Python',
      ],
      en: [
        'Quick expense logging inside Telegram without opening spreadsheets',
        'Monthly rollups and category charts generated in Python',
      ],
    },
    metrics: [
      { label: { pt: 'Canal', en: 'Channel' }, value: 'Telegram API' },
      { label: { pt: 'Linguagem', en: 'Language' }, value: 'Python' },
    ],
    stack: ['Python', 'Telegram API', 'REST APIs', 'Automation'],
  },
  {
    id: 'atlas-anatomia-3d',
    slug: '05',
    featured: false,
    category: 'web',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2026',
    liveUrl: 'https://atlas-anatomia-3d-three.vercel.app',
    repoPrivate: true,
    title: 'Atlas Anatomia 3D',
    subtitle: {
      pt: 'Visualização anatômica interativa em 3D direto no navegador',
      en: 'Interactive 3D anatomical viewer in the browser',
    },
    summary: {
      pt: 'Aplicação web com renderização 3D voltada ao estudo anatômico com controles de câmera orbitais sem necessidade de plugins.',
      en: 'Browser-based 3D visualization app for interactive anatomical study with orbital camera controls.',
    },
    highlights: {
      pt: [
        'Inspeção espacial com controles orbitais direto no navegador',
        'Publicado na Vercel com acesso público instantâneo',
      ],
      en: [
        'Orbital camera inspection directly in the browser',
        'Public web deployment with zero setup required',
      ],
    },
    metrics: [
      { label: { pt: 'Motor', en: 'Engine' }, value: 'WebGL 3D' },
      { label: { pt: 'Acesso', en: 'Access' }, value: 'Public Web' },
    ],
    stack: ['JavaScript', 'HTML & CSS', 'Three.js', 'WebGL'],
  },
  {
    id: 'cesuca-code',
    slug: '06',
    featured: false,
    category: 'research',
    accent: '#14b8a6',
    secondaryAccent: '#14b8a6',
    year: '2024–2026',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/Project-POO-Python',
    title: 'Cesuca Code & Pesquisa Python',
    subtitle: {
      pt: 'Pesquisa em IA para estudantes (Cesuca Code) e visualização térmica em Python',
      en: 'Academic AI research (Cesuca Code) & real-time Python telemetry',
    },
    summary: {
      pt: 'Desenvolvimento em equipe de solução de IA para apoiar estudantes de Computação e ADS com revisão sistemática da literatura, além da interface Python em tempo real para medição de temperatura.',
      en: 'Team-built AI solution supporting Computer Science and Systems Analysis students backed by systematic literature review, alongside a real-time Python interface for temperature measurement.',
    },
    highlights: {
      pt: [
        'Cesuca Code: condução da revisão sistemática da literatura e programação da IA para dúvidas curriculares',
        'Pesquisa 2024: interface em Python para visualização em tempo real e validação de dados de temperatura em sprints',
      ],
      en: [
        'Cesuca Code: leading systematic literature review and programming the AI assistant for curriculum support',
        '2024 Research: real-time Python UI and data validation for a temperature measurement system in agile sprints',
      ],
    },
    metrics: [
      { label: { pt: 'Instituição', en: 'Institution' }, value: 'CESUCA' },
      { label: { pt: 'Método', en: 'Method' }, value: 'Literature Review' },
    ],
    stack: ['Python', 'AI Research', 'Systematic Review', 'Agile Sprints'],
  },
];

export const EXPERIENCE = [
  {
    period: { pt: 'Fev 2026 — Atual', en: 'Feb 2026 — Present' },
    role: {
      pt: 'Implantação de Soluções Tecnológicas e Inteligência Artificial',
      en: 'Technology & Artificial Intelligence Solutions Implementation',
    },
    org: { pt: 'Umbler · Brasil', en: 'Umbler · Brazil' },
    summary: {
      pt: 'Implantação de soluções tecnológicas do levantamento de requisitos aos testes e validação. Desenvolvimento de chatbots e agentes de IA personalizados, automações com n8n, Make e APIs REST, além de suporte técnico e consultoria funcional.',
      en: 'End-to-end client implementations from requirements gathering to testing and validation. Building custom chatbots, AI agents, and system integrations with n8n, Make, and REST APIs, plus technical support and functional consulting.',
    },
    tags: {
      pt: ['Agentes de IA', 'Chatbots', 'n8n', 'Make', 'APIs REST'],
      en: ['AI Agents', 'Chatbots', 'n8n', 'Make', 'REST APIs'],
    },
  },
  {
    period: { pt: 'Em andamento', en: 'Ongoing' },
    role: {
      pt: 'Pesquisa e Desenvolvimento de Inteligência Artificial · Cesuca Code',
      en: 'AI Research & Development · Cesuca Code (Academic Project)',
    },
    org: { pt: 'CESUCA — Projeto Acadêmico', en: 'CESUCA — Academic Project' },
    summary: {
      pt: 'Desenvolvimento em equipe de solução de IA para apoiar estudantes de Ciência da Computação e Análise e Desenvolvimento de Sistemas. Condução da revisão sistemática da literatura e programação da IA para dúvidas curriculares.',
      en: 'Team development of an AI solution supporting Computer Science and Systems Analysis students. Leading the systematic literature review and programming the AI to answer curriculum questions.',
    },
    tags: {
      pt: ['Pesquisa em IA', 'Revisão Sistemática', 'Apoio Acadêmico'],
      en: ['AI Research', 'Systematic Review', 'Academic Support'],
    },
  },
  {
    period: { pt: 'Mar 2024 — Dez 2024', en: 'Mar 2024 — Dec 2024' },
    role: {
      pt: 'Bolsista Voluntário em Projeto de Pesquisa',
      en: 'Volunteer Research Intern (Python)',
    },
    org: { pt: 'CESUCA — Centro Universitário Cesuca · Cachoeirinha, RS', en: 'CESUCA University Center · Cachoeirinha, RS' },
    summary: {
      pt: 'Implementação em Python da interface para visualização em tempo real de dados de um sistema de medição de temperatura, testes de fluxos de interação, validação dos valores coletados e colaboração em sprints.',
      en: 'Implemented a real-time Python visualization interface for a temperature measurement system, tested interaction flows, validated collected values, and collaborated in development sprints.',
    },
    tags: {
      pt: ['Python', 'Tempo Real', 'Validação', 'Sprints'],
      en: ['Python', 'Real-Time', 'Validation', 'Sprints'],
    },
  },
  {
    period: { pt: 'Conclusão prevista: 2027/2', en: 'Expected: 2nd half of 2027' },
    role: {
      pt: 'Bacharelado em Ciência da Computação',
      en: 'B.Sc. in Computer Science',
    },
    org: {
      pt: 'CESUCA — Centro Universitário Cesuca · Cachoeirinha, RS',
      en: 'CESUCA University Center · Cachoeirinha, RS',
    },
    summary: {
      pt: 'Graduação em Ciência da Computação com foco em desenvolvimento, pesquisa aplicada em IA e métodos ágeis. Idiomas: Português (nativo) e Inglês (fluente).',
      en: 'Undergraduate degree in Computer Science with applied AI research and agile methods. Languages: Portuguese (native) and English (fluent).',
    },
    tags: {
      pt: ['Ciência da Computação', 'Português Nativo', 'Inglês Fluente'],
      en: ['Computer Science', 'Native Portuguese', 'Fluent English'],
    },
  },
];

export const SKILL_GROUPS = [
  {
    title: { pt: 'Linguagens e Desenvolvimento', en: 'Languages & Development' },
    items: {
      pt: ['Python', 'JavaScript', 'HTML', 'CSS'],
      en: ['Python', 'JavaScript', 'HTML', 'CSS'],
    },
  },
  {
    title: { pt: 'IA, Automação e Integrações', en: 'AI, Automation & Integrations' },
    items: {
      pt: ['Agentes de IA', 'Chatbots', 'n8n & Make', 'APIs REST'],
      en: ['AI Agents', 'Chatbots', 'n8n & Make', 'REST APIs'],
    },
  },
  {
    title: { pt: 'Pesquisa e Métodos', en: 'Research & Methods' },
    items: {
      pt: ['Revisão Sistemática da Literatura', 'Metodologias Ágeis', 'Levantamento de Requisitos', 'Validação de Fluxos'],
      en: ['Systematic Literature Review', 'Agile Methodologies', 'Requirements Gathering', 'Workflow Validation'],
    },
  },
  {
    title: { pt: 'Idiomas & Cursos', en: 'Languages & Courses' },
    items: {
      pt: [
        'Português (nativo) · Inglês (fluente)',
        'Aprendendo Python: Conceitos Básicos — Asimov Academy (2026)',
        'Dominando Automações com n8n — Asimov Academy (2025)',
        'Imersão IA, 3ª edição — Alura (2025)',
      ],
      en: [
        'Portuguese (native) · English (fluent)',
        'Learning Python: Fundamentals — Asimov Academy (2026)',
        'Mastering Automations with n8n — Asimov Academy (2025)',
        'AI Immersion, 3rd Edition — Alura (2025)',
      ],
    },
  },
];
