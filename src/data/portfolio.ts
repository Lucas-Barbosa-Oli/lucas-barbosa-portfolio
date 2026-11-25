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
    pt: 'IA Aplicada · Automações · Engenharia de Interfaces Web',
    en: 'Applied AI · Workflow Automation · Web Product Engineering',
  },
  headline: {
    pt: 'Construo produtos digitais claros, agentes de IA e fluxos conectados.',
    en: 'I build clear digital products, AI agents, and connected workflows.',
  },
  subheadline: {
    pt: 'Atuo com implantação de soluções tecnológicas e IA na Umbler Brasil e curso Ciência da Computação no Cesuca — unindo arquitetura de automações, APIs e interfaces pensadas nos mínimos detalhes.',
    en: 'Working on AI & technology implementation at Umbler Brasil while studying Computer Science at Cesuca — bridging workflow architecture, APIs, and crafted interfaces.',
  },
  availability: {
    pt: 'Atuando na Umbler Brasil · Aberto a projetos e conexões',
    en: 'At Umbler Brasil · Open to collaborations & connections',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'conta-clara',
    slug: '01',
    featured: true,
    category: 'web',
    accent: '#2dd4bf',
    secondaryAccent: '#38bdf8',
    year: '2026',
    liveUrl: 'https://conta-clara-tawny.vercel.app',
    repoPrivate: true,
    title: 'Conta Clara',
    subtitle: {
      pt: 'Finanças pessoais, Open Finance e clareza patrimonial em tempo real',
      en: 'Personal finance, Open Finance & real-time wealth clarity',
    },
    summary: {
      pt: 'Painel financeiro pessoal que separa com nitidez o saldo disponível hoje da projeção após compromissos, integrando sincronização bancária (Meu Pluggy / Mercado Pago), gráficos interativos e visualização 3D.',
      en: 'Personal finance cockpit separating today’s liquid balance from post-commitment projections, featuring Open Finance sync, interactive charts, and proportional 3D rings.',
    },
    highlights: {
      pt: [
        'Janela de 6 períodos em Chart.js com navegação por setas entre meses passados/futuros sem perder o mês atual de vista',
        'Escultura orbital 3D em Three.js proporcional às contas, reservas e gastos futuros com carregamento sob demanda',
        'Modo privacidade instantâneo (tecla P), busca em tempo real no extrato, exportação CSV e temas Ardósia Claro/Escuro',
        'Isolamento por usuário com Row-Level Security no banco e sincronização segura via funções serverless',
      ],
      en: [
        'Non-shifting 6-period Chart.js cash-flow window with arrow navigation across past & future data and 1-click current-month return',
        'Lazy-loaded Three.js proportional orbital rings representing checking balance, savings, and upcoming bills',
        'Instant privacy blur mode (key P), live ledger filtering, CSV export, and Porcelain/Obsidian Slate themes',
        'Per-user Row-Level Security isolation and serverless Open Finance synchronization',
      ],
    },
    metrics: [
      { label: { pt: 'Suíte automatizada', en: 'Automated tests' }, value: '22 / 22' },
      { label: { pt: 'Visualização', en: 'Visualization' }, value: 'Chart.js + 3D' },
      { label: { pt: 'Integração', en: 'Integration' }, value: 'Open Finance' },
    ],
    stack: ['JavaScript', 'Vite', 'Three.js', 'Chart.js', 'Supabase', 'Open Finance', 'Vercel'],
  },
  {
    id: 'nexo',
    slug: '02',
    featured: true,
    category: 'web',
    accent: '#e07a5f',
    secondaryAccent: '#f59e0b',
    year: '2026',
    liveUrl: 'https://nexo-second-brain.vercel.app',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/nexo',
    title: 'Nexo',
    subtitle: {
      pt: 'Segundo cérebro editorial com notas conectadas, grafo e planilhas',
      en: 'Editorial second brain with linked notes, force graph & spreadsheets',
    },
    summary: {
      pt: 'Espaço pessoal para pensar, conectar ideias com [[wikilinks]] bidirecionais, visualizar redes de conhecimento em grafo interativo e calcular valores em planilhas com fórmulas — funcionando offline como PWA.',
      en: 'Calm personal workspace to write, connect ideas via bidirectional [[wikilinks]], explore force-directed knowledge graphs, and run spreadsheet formulas — offline-ready as a PWA.',
    },
    highlights: {
      pt: [
        'Paleta de comandos instantânea (⌘K com cmdk) para saltar entre notas, planilhas, pastas, tags e ações sem perder o contexto',
        'Grafo interativo com física d3-force, fixação persistente de nós, zoom suave por gestos e inspeção de conexões',
        'Editor Markdown com KaTeX matemático, listas inteligentes, tarefas clicáveis no modo leitura, modo foco e desfazer exclusão',
        'Planilhas integradas (=SOMA, =MÉDIA) com navegação por teclado e sincronização em nuvem com resolução de conflitos',
      ],
      en: [
        'Instant Command Palette (⌘K via cmdk) to jump across notes, spreadsheets, folders, tags, and quick actions',
        'Interactive d3-force knowledge graph with persistent node pinning, pinch-to-zoom, and connection inspector',
        'Editorial Markdown editor with KaTeX math, smart lists, interactive read-mode checklists, focus mode & undoable trash',
        'Built-in spreadsheets (=SOMA, =MÉDIA) with arrow-key navigation and cloud sync conflict resolution',
      ],
    },
    metrics: [
      { label: { pt: 'Suíte automatizada', en: 'Automated tests' }, value: '25 / 25' },
      { label: { pt: 'Arquitetura', en: 'Architecture' }, value: 'Offline PWA' },
      { label: { pt: 'Motor de grafo', en: 'Graph engine' }, value: 'd3-force' },
    ],
    stack: ['React 19', 'TypeScript', 'd3-force', 'KaTeX', 'cmdk', 'Motion', 'Supabase', 'PWA'],
  },
  {
    id: 'arch-atlas-ai',
    slug: '03',
    featured: false,
    category: 'ai',
    accent: '#818cf8',
    secondaryAccent: '#38bdf8',
    year: '2026',
    liveUrl: 'https://arch-atlas-ai.vercel.app',
    repoPrivate: true,
    title: 'Arch Atlas AI',
    subtitle: {
      pt: 'Guia interativo de System Design, RAG, Agents e Agent Harness',
      en: 'Interactive guide to System Design, RAG, Agents & Agent Harnesses',
    },
    summary: {
      pt: 'Plataforma interativa em Next.js reunindo padrões de arquitetura de software, pipelines de Retrieval-Augmented Generation (RAG) e engenharia de agentes autônomos.',
      en: 'Interactive Next.js reference exploring software architecture patterns, RAG pipelines, and autonomous agent harnesses.',
    },
    highlights: {
      pt: [
        'Mapeamento visual de padrões de agentes, orquestração de ferramentas e fluxos RAG',
        'Construído em Next.js e TypeScript com navegação rápida orientada a estudo prático',
      ],
      en: [
        'Visual mapping of agent patterns, tool orchestration, and RAG pipelines',
        'Built with Next.js and TypeScript for fast, structured engineering study',
      ],
    },
    metrics: [
      { label: { pt: 'Foco', en: 'Focus' }, value: 'AI Systems' },
      { label: { pt: 'Stack', en: 'Stack' }, value: 'Next.js + TS' },
    ],
    stack: ['Next.js', 'TypeScript', 'RAG', 'AI Agents', 'System Design'],
  },
  {
    id: 'telegram-finance-bot',
    slug: '04',
    featured: false,
    category: 'ai',
    accent: '#38bdf8',
    secondaryAccent: '#2dd4bf',
    year: '2026',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/telegram-finance-bot',
    title: 'Telegram Finance Bot',
    subtitle: {
      pt: 'Assistente conversacional em Python para registro financeiro via Telegram',
      en: 'Conversational Python bot for expense tracking via Telegram',
    },
    summary: {
      pt: 'Bot inteligente que registra ganhos e gastos por mensagens naturais no Telegram, gerando resumos mensais, extratos e gráficos por categoria integrando Python, APIs e IA.',
      en: 'Conversational Telegram assistant logging income and expenses from messages, generating monthly summaries and category charts with Python, APIs, and AI.',
    },
    highlights: {
      pt: [
        'Entrada rápida por conversa sem precisar abrir planilhas ou formulários longos',
        'Armazenamento estruturado com consolidação mensal e gráficos automáticos por categoria',
      ],
      en: [
        'Frictionless conversational logging directly inside Telegram',
        'Structured persistence with monthly rollups and automated category charts',
      ],
    },
    metrics: [
      { label: { pt: 'Canal', en: 'Channel' }, value: 'Telegram API' },
      { label: { pt: 'Linguagem', en: 'Language' }, value: 'Python + IA' },
    ],
    stack: ['Python', 'Telegram API', 'IA Aplicada', 'APIs REST', 'Data Viz'],
  },
  {
    id: 'atlas-anatomia-3d',
    slug: '05',
    featured: false,
    category: 'web',
    accent: '#34d399',
    secondaryAccent: '#38bdf8',
    year: '2026',
    liveUrl: 'https://atlas-anatomia-3d-three.vercel.app',
    repoPrivate: true,
    title: 'Atlas Anatomia 3D',
    subtitle: {
      pt: 'Exploração anatômica tridimensional interativa direto no navegador',
      en: 'Interactive 3D anatomical exploration in the browser',
    },
    summary: {
      pt: 'Aplicação web com renderização espacial interativa voltada à visualização e estudo anatômico em três dimensões sem necessidade de plugins.',
      en: 'Browser-native 3D spatial visualization app crafted for interactive anatomical study.',
    },
    highlights: {
      pt: [
        'Inspeção espacial fluida com controles de câmera orbitais no navegador',
        'Interface leve publicada na Vercel com acesso público instantâneo',
      ],
      en: [
        'Smooth orbital camera inspection directly in the browser',
        'Lightweight public deployment on Vercel',
      ],
    },
    metrics: [
      { label: { pt: 'Renderização', en: 'Rendering' }, value: '3D WebGL' },
      { label: { pt: 'Acesso', en: 'Access' }, value: 'Web Pública' },
    ],
    stack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'cesuca-code',
    slug: '06',
    featured: false,
    category: 'research',
    accent: '#c084fc',
    secondaryAccent: '#818cf8',
    year: '2025–2026',
    repoUrl: 'https://github.com/Lucas-Barbosa-Oli/Project-POO-Python',
    title: 'Cesuca Code & Pesquisa Python',
    subtitle: {
      pt: 'Pesquisa aplicada em IA educacional e visualização em tempo real',
      en: 'Applied research in educational AI & real-time Python visualization',
    },
    summary: {
      pt: 'Pesquisa colaborativa em IA no Cesuca Code para apoio curricular a estudantes de Computação e ADS, somada à implementação em Python de visualização térmica em tempo real.',
      en: 'Collaborative AI research at Cesuca Code supporting CS students, alongside real-time Python thermal sensor visualization.',
    },
    highlights: {
      pt: [
        'Desenvolvimento de solução de IA guiada por revisão sistemática da literatura em sprints acadêmicos',
        'Interface Python de leitura e validação em tempo real para sistema de medição de temperatura',
      ],
      en: [
        'AI solution guided by systematic literature review in collaborative sprints',
        'Real-time Python visualization interface and validation for temperature telemetry',
      ],
    },
    metrics: [
      { label: { pt: 'Instituição', en: 'Institution' }, value: 'Cesuca' },
      { label: { pt: 'Domínio', en: 'Domain' }, value: 'IA & Python' },
    ],
    stack: ['Python', 'Pesquisa em IA', 'POO', 'Visualização de Dados', 'Revisão Sistemática'],
  },
];

export const EXPERIENCE = [
  {
    period: { pt: 'Fev 2026 — Atual', en: 'Feb 2026 — Present' },
    role: {
      pt: 'Implantação de Soluções Tecnológicas e Inteligência Artificial',
      en: 'Technology & Artificial Intelligence Solutions Implementation',
    },
    org: 'Umbler Brasil',
    summary: {
      pt: 'Levantamento de requisitos, arquitetura e desenvolvimento de chatbots e agentes de IA personalizados, automações com n8n e Make, integrações via APIs REST e validação de fluxos ponta a ponta com clientes.',
      en: 'Requirements gathering, custom chatbots and AI agents, n8n & Make workflow automations, REST API integrations, and end-to-end client validation.',
    },
    tags: ['Agentes de IA', 'n8n', 'Make', 'APIs REST', 'Chatbots'],
  },
  {
    period: { pt: 'Em andamento', en: 'Ongoing' },
    role: {
      pt: 'Pesquisador em Inteligência Artificial · Cesuca Code',
      en: 'AI Researcher · Cesuca Code',
    },
    org: 'Cesuca — Centro Universitário',
    summary: {
      pt: 'Desenvolvimento colaborativo de uma solução de IA para responder dúvidas curriculares e apoiar estudantes de Ciência da Computação e ADS, fundamentada em revisão sistemática da literatura.',
      en: 'Collaborative development of an AI assistant supporting Computer Science students, grounded in systematic literature review.',
    },
    tags: ['Pesquisa em IA', 'LLMs', 'Educação', 'Sprints'],
  },
  {
    period: { pt: 'Mar — Dez 2024', en: 'Mar — Dec 2024' },
    role: {
      pt: 'Bolsista Voluntário de Pesquisa em Desenvolvimento Python',
      en: 'Volunteer Research Developer (Python)',
    },
    org: 'Cesuca — Centro Universitário',
    summary: {
      pt: 'Implementação em Python da interface de visualização em tempo real para sistema de medição de temperatura, testes de interação e validação dos dados coletados.',
      en: 'Built a real-time Python visualization interface for a temperature measurement system, leading interaction tests and data validation.',
    },
    tags: ['Python', 'Tempo Real', 'UI de Dados', 'Validação'],
  },
  {
    period: { pt: 'Conclusão em 2027/2', en: 'Expected late 2027' },
    role: {
      pt: 'Bacharelado em Ciência da Computação',
      en: 'B.Sc. in Computer Science',
    },
    org: 'Cesuca · Português nativo & Inglês fluente',
    summary: {
      pt: 'Formação sólida em algoritmos, estruturas de dados, engenharia de software e inteligência artificial, complementada por certificações em Python, n8n (Asimov Academy) e IA (Alura).',
      en: 'Strong foundation in algorithms, data structures, software engineering, and AI, complemented by certifications in Python, n8n, and AI.',
    },
    tags: ['Ciência da Computação', 'Algoritmos', 'Inglês Fluente'],
  },
];

export const SKILL_GROUPS = [
  {
    title: { pt: 'IA & Agentes', en: 'AI & Agents' },
    items: ['Agentes de IA', 'Chatbots Inteligentes', 'RAG & Prompting', 'Automação Conversacional'],
  },
  {
    title: { pt: 'Automações & APIs', en: 'Automation & APIs' },
    items: ['n8n', 'Make', 'APIs REST & Webhooks', 'Supabase & Serverless'],
  },
  {
    title: { pt: 'Frontend & Craft', en: 'Frontend & Craft' },
    items: ['React & Next.js', 'TypeScript / JavaScript', 'Three.js & Chart.js', 'UX/UI & Motion Design'],
  },
  {
    title: { pt: 'Engenharia & Base', en: 'Core Engineering' },
    items: ['Python & POO', 'SQL & RLS', 'Testes Automatizados', 'Git & Deploy Contínuo'],
  },
];
