'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Eye,
  EyeOff,
  GitBranch,
  Lock,
  Network,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { PROJECTS, type Lang } from '../data/portfolio';

const CASHFLOW_DEMO = [
  { m: { pt: 'Jun', en: 'Jun' }, inc: 68, exp: 44, saldo: 'R$ 2.410' },
  { m: { pt: 'Jul', en: 'Jul' }, inc: 74, exp: 51, saldo: 'R$ 2.890' },
  { m: { pt: 'Ago', en: 'Aug' }, inc: 70, exp: 48, saldo: 'R$ 2.640' },
  { m: { pt: 'Set', en: 'Sep' }, inc: 82, exp: 46, saldo: 'R$ 3.520' },
  { m: { pt: 'Out', en: 'Oct' }, inc: 79, exp: 53, saldo: 'R$ 3.110' },
  { m: { pt: 'Nov •', en: 'Nov •' }, inc: 92, exp: 49, saldo: 'R$ 4.280' },
];

const NEXO_NODES = [
  {
    id: 'hub',
    label: { pt: 'Meu segundo cérebro', en: 'My second brain' },
    x: 150,
    y: 74,
    snippet: { pt: '[[Ideias]] · [[Planejamento]] · 3 tarefas', en: '[[Ideas]] · [[Monthly Plan]] · 3 tasks' },
  },
  {
    id: 'sheet',
    label: { pt: 'Planejamento mensal', en: 'Monthly plan' },
    x: 62,
    y: 40,
    snippet: { pt: '=SOMA(B2:B4) → R$ 2.300,00', en: '=SUM(B2:B4) → R$ 2,300.00' },
  },
  {
    id: 'ideas',
    label: { pt: 'Ideias & Estudos', en: 'Ideas & Study' },
    x: 242,
    y: 42,
    snippet: { pt: '$O(n \\log n)$ · Busca rápida ⌘K', en: '$O(n \\log n)$ · Quick search ⌘K' },
  },
  {
    id: 'daily',
    label: { pt: 'Nota do dia', en: 'Daily note' },
    x: 152,
    y: 128,
    snippet: { pt: '- [x] Conectar aprendizados da semana', en: '- [x] Link this week’s key learnings' },
  },
];

const AI_STEPS = [
  {
    id: 'req',
    step: '01',
    pt: 'Requisitos & Domínio',
    en: 'Discovery & Scope',
    descPt: 'Mapeamento da operação real do cliente na Umbler Brasil antes de escrever a primeira regra.',
    descEn: 'Mapping real operational bottlenecks with stakeholders before designing the flow.',
  },
  {
    id: 'agent',
    step: '02',
    pt: 'Agentes & Chatbots IA',
    en: 'AI Agents & Chatbots',
    descPt: 'Instruções determinísticas, contexto estruturado, memória controlada e transbordo humano.',
    descEn: 'Deterministic guardrails, structured context, controlled memory, and human handoff.',
  },
  {
    id: 'auto',
    step: '03',
    pt: 'Orquestração n8n / Make',
    en: 'n8n & Make Pipelines',
    descPt: 'Automações resilientes conectando webhooks, filas, CRMs e bancos de dados via APIs REST.',
    descEn: 'Resilient workflows bridging webhooks, CRMs, and databases via REST APIs.',
  },
  {
    id: 'val',
    step: '04',
    pt: 'Validação & Métricas',
    en: 'Validation & QA',
    descPt: 'Testes ponta a ponta de casos extremos para garantir confiança operacional em produção.',
    descEn: 'End-to-end edge-case testing ensuring production reliability.',
  },
];

export default function FlagshipShowcase({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Interactive miniature states
  const [privacyBlur, setPrivacyBlur] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [activeNode, setActiveNode] = useState('hub');
  const [activeAiStep, setActiveAiStep] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 980px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%']);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const idx = latest < 0.34 ? 0 : latest < 0.68 ? 1 : 2;
    setActiveSlide(idx);
  });

  function jumpToSlide(index: number) {
    const el = trackRef.current;
    if (!el) return;
    if (!isDesktop) {
      const panel = el.querySelectorAll('.flagship-slide')[index] as HTMLElement | undefined;
      panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
    const targetY = absoluteTop + (scrollable * index) / 2;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  const contaClara = PROJECTS.find(p => p.id === 'conta-clara')!;
  const nexo = PROJECTS.find(p => p.id === 'nexo')!;
  const currentNode = NEXO_NODES.find(n => n.id === activeNode) ?? NEXO_NODES[0];

  const slideLabels = [
    { num: '01', title: 'Conta Clara' },
    { num: '02', title: 'Nexo' },
    { num: '03', title: lang === 'pt' ? 'Engenharia de IA' : 'AI Engineering' },
  ];

  return (
    <section id="destaques" className="flagship-section" aria-labelledby="flagship-heading">
      <div ref={trackRef} className={isDesktop ? 'flagship-track desktop-sticky' : 'flagship-track'}>
        <div className={isDesktop ? 'flagship-sticky-viewport' : 'flagship-static-viewport'}>
          <div className="flagship-top-bar">
            <div>
              <span className="eyebrow">
                <Sparkles size={13} />
                {lang === 'pt' ? 'CAPÍTULOS EM DESTAQUE · ROLE PARA EXPLORAR →' : 'FEATURED CHAPTERS · SCROLL TO EXPLORE →'}
              </span>
              <h2 id="flagship-heading">
                {lang === 'pt' ? 'Produtos em produção & sistemas conectados' : 'Production products & connected systems'}
              </h2>
            </div>

            <div className="flagship-stepper" role="tablist" aria-label={lang === 'pt' ? 'Projetos em destaque' : 'Featured chapters'}>
              {slideLabels.map((item, idx) => (
                <button
                  key={item.num}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  className={activeSlide === idx ? 'step-pill active' : 'step-pill'}
                  onClick={() => jumpToSlide(idx)}
                >
                  <span className="step-num">{item.num}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {isDesktop && (
            <div className="flagship-progress-rail" aria-hidden="true">
              <motion.div className="flagship-progress-fill" style={{ scaleX: scrollYProgress }} />
            </div>
          )}

          <div className="flagship-Stage-mask">
            <motion.div
              className={isDesktop ? 'flagship-horizontal-strip' : 'flagship-vertical-stack'}
              style={isDesktop ? { x } : undefined}
            >
              {/* SLIDE 01 — CONTA CLARA */}
              <article className="flagship-slide" data-accent="teal">
                <div className="flagship-copy">
                  <div className="flagship-badge-row">
                    <span className="project-index">01 / 03</span>
                    <span className="live-pill">
                      <span className="pulse-dot" />
                      {lang === 'pt' ? 'Em produção na Vercel' : 'Live on Vercel'}
                    </span>
                  </div>

                  <h3>{contaClara.title}</h3>
                  <p className="flagship-subtitle">{contaClara.subtitle[lang]}</p>
                  <p className="flagship-summary">{contaClara.summary[lang]}</p>

                  <ul className="flagship-bullets">
                    {contaClara.highlights[lang].map(item => (
                      <li key={item}>
                        <CheckCircle2 size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flagship-metrics">
                    {contaClara.metrics.map(m => (
                      <div key={m.label.pt} className="metric-box">
                        <strong>{m.value}</strong>
                        <span>{m.label[lang]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="stack-row">
                    {contaClara.stack.map(tech => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                  </div>

                  <div className="flagship-actions">
                    <a
                      href={contaClara.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary accent-teal"
                    >
                      {lang === 'pt' ? 'Abrir Conta Clara ao vivo' : 'Open Conta Clara live'}
                      <ArrowUpRight size={16} />
                    </a>
                    <span className="private-repo-pill" title={lang === 'pt' ? 'Repositório privado por segurança financeira' : 'Private repository'}>
                      <Lock size={13} />
                      {lang === 'pt' ? 'Código privado · Demo pública ativa' : 'Private repo · Public demo live'}
                    </span>
                  </div>
                </div>

                {/* Interactive Conta Clara Miniature */}
                <div className="flagship-preview preview-teal">
                  <div className="mock-window">
                    <div className="mock-window-bar">
                      <div className="mock-dots">
                        <span /><span /><span />
                      </div>
                      <span className="mock-url">conta-clara-tawny.vercel.app</span>
                      <button
                        type="button"
                        className="mock-interactive-btn"
                        onClick={() => setPrivacyBlur(b => !b)}
                        title={lang === 'pt' ? 'Testar modo privacidade' : 'Toggle privacy blur'}
                      >
                        {privacyBlur ? <EyeOff size={13} /> : <Eye size={13} />}
                        <span>{privacyBlur ? (lang === 'pt' ? 'Mostrar' : 'Show') : (lang === 'pt' ? 'Privacidade' : 'Privacy')}</span>
                      </button>
                    </div>

                    <div className="mock-cc-hero">
                      <div>
                        <span className="mock-kicker">{lang === 'pt' ? 'SALDO EM CONTA HOJE' : 'CHECKING BALANCE TODAY'}</span>
                        <strong className={privacyBlur ? 'blurred-val' : ''}>R$ 8.420,00</strong>
                        <small className={privacyBlur ? 'blurred-val' : ''}>
                          {lang === 'pt' ? 'Após compromissos: R$ 6.890,50' : 'After upcoming bills: R$ 6,890.50'}
                        </small>
                      </div>
                      <div className="mock-cc-rings" aria-hidden="true">
                        <svg viewBox="0 0 88 88">
                          <circle cx="44" cy="44" r="34" stroke="#2dd4bf" strokeWidth="5" fill="none" strokeDasharray="175 40" />
                          <circle cx="44" cy="44" r="24" stroke="#f59e0b" strokeWidth="5" fill="none" strokeDasharray="110 45" />
                          <circle cx="44" cy="44" r="14" stroke="#e07a5f" strokeWidth="5" fill="none" strokeDasharray="58 30" />
                        </svg>
                      </div>
                    </div>

                    <div className="mock-cc-chart-card">
                      <div className="mock-cc-chart-head">
                        <span>{lang === 'pt' ? 'Receitas vs. Gastos (clique em um mês)' : 'Income vs. Expenses (click a month)'}</span>
                        <strong className={privacyBlur ? 'blurred-val' : ''}>
                          {CASHFLOW_DEMO[selectedMonth].m[lang].replace(' •', '')}: +{CASHFLOW_DEMO[selectedMonth].saldo}
                        </strong>
                      </div>
                      <div className="mock-cc-bars">
                        {CASHFLOW_DEMO.map((d, idx) => (
                          <button
                            key={d.m.en}
                            type="button"
                            className={selectedMonth === idx ? 'mock-bar-col selected' : 'mock-bar-col'}
                            onClick={() => setSelectedMonth(idx)}
                          >
                            <div className="mock-bar-pair">
                              <span className="bar-inc" style={{ height: `${d.inc}%` }} />
                              <span className="bar-exp" style={{ height: `${d.exp}%` }} />
                            </div>
                            <small>{d.m[lang]}</small>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* SLIDE 02 — NEXO */}
              <article className="flagship-slide" data-accent="amber">
                <div className="flagship-copy">
                  <div className="flagship-badge-row">
                    <span className="project-index">02 / 03</span>
                    <span className="live-pill warm">
                      <span className="pulse-dot warm" />
                      {lang === 'pt' ? 'Em produção · Código aberto' : 'Live · Open Source'}
                    </span>
                  </div>

                  <h3>{nexo.title}</h3>
                  <p className="flagship-subtitle">{nexo.subtitle[lang]}</p>
                  <p className="flagship-summary">{nexo.summary[lang]}</p>

                  <ul className="flagship-bullets">
                    {nexo.highlights[lang].map(item => (
                      <li key={item}>
                        <CheckCircle2 size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flagship-metrics">
                    {nexo.metrics.map(m => (
                      <div key={m.label.pt} className="metric-box">
                        <strong>{m.value}</strong>
                        <span>{m.label[lang]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="stack-row">
                    {nexo.stack.map(tech => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                  </div>

                  <div className="flagship-actions">
                    <a
                      href={nexo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary accent-amber"
                    >
                      {lang === 'pt' ? 'Abrir Nexo ao vivo' : 'Open Nexo live'}
                      <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={nexo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <GitBranch size={15} />
                      {lang === 'pt' ? 'Código no GitHub' : 'View on GitHub'}
                    </a>
                  </div>
                </div>

                {/* Interactive Nexo Miniature */}
                <div className="flagship-preview preview-amber">
                  <div className="mock-window nexo-warm">
                    <div className="mock-window-bar">
                      <div className="mock-dots">
                        <span /><span /><span />
                      </div>
                      <span className="mock-url">nexo-second-brain.vercel.app</span>
                      <span className="mock-kbd-pill">⌘K</span>
                    </div>

                    <div className="mock-nexo-graph">
                      <div className="mock-nexo-caption">
                        <Network size={13} />
                        <span>{lang === 'pt' ? 'Toque em um nó para inspecionar conexões' : 'Select a node to inspect connections'}</span>
                      </div>
                      <svg viewBox="0 0 300 156" className="nexo-mini-svg">
                        {NEXO_NODES.filter(n => n.id !== 'hub').map(n => (
                          <line
                            key={n.id}
                            x1={150}
                            y1={74}
                            x2={n.x}
                            y2={n.y}
                            stroke={activeNode === n.id || activeNode === 'hub' ? '#e07a5f' : 'rgba(148,163,184,0.28)'}
                            strokeWidth={activeNode === n.id ? 2.4 : 1.4}
                          />
                        ))}
                        {NEXO_NODES.map(n => {
                          const isSelected = activeNode === n.id;
                          return (
                            <g
                              key={n.id}
                              className="nexo-node-group"
                              onClick={() => setActiveNode(n.id)}
                              onMouseEnter={() => setActiveNode(n.id)}
                            >
                              {isSelected && <circle cx={n.x} cy={n.y} r="15" fill="rgba(224,122,95,0.22)" />}
                              <circle
                                cx={n.x}
                                cy={n.y}
                                r={n.id === 'hub' ? 9 : 7}
                                fill={n.id === 'sheet' ? '#38bdf8' : '#e07a5f'}
                              />
                              <text x={n.x} y={n.y + 20} textAnchor="middle">
                                {n.label[lang]}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    <div className="mock-nexo-inspector">
                      <strong>{currentNode.label[lang]}</strong>
                      <code>{currentNode.snippet[lang]}</code>
                    </div>
                  </div>
                </div>
              </article>

              {/* SLIDE 03 — AI & AUTOMATION ARCHITECTURE */}
              <article className="flagship-slide" data-accent="indigo">
                <div className="flagship-copy">
                  <div className="flagship-badge-row">
                    <span className="project-index">03 / 03</span>
                    <span className="live-pill indigo">
                      <Bot size={13} />
                      {lang === 'pt' ? 'Umbler Brasil & Cesuca Code' : 'Umbler Brasil & Cesuca Code'}
                    </span>
                  </div>

                  <h3>
                    {lang === 'pt' ? 'Agentes de IA & Automações' : 'AI Agents & Workflow Architecture'}
                  </h3>
                  <p className="flagship-subtitle">
                    {lang === 'pt'
                      ? 'Da necessidade operacional ao fluxo autônomo validado em produção'
                      : 'From operational bottleneck to validated autonomous workflow'}
                  </p>
                  <p className="flagship-summary">
                    {lang === 'pt'
                      ? 'Além de produtos web completos, projeto e implanto chatbots, agentes de IA e integrações entre sistemas usando Python, n8n, Make e APIs REST.'
                      : 'Beyond full-stack web apps, I architect and deploy custom chatbots, AI agents, and system integrations powered by Python, n8n, Make, and REST APIs.'}
                  </p>

                  <div className="ai-pipeline-grid">
                    {AI_STEPS.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        className={activeAiStep === idx ? 'ai-step-card active' : 'ai-step-card'}
                        onClick={() => setActiveAiStep(idx)}
                        onMouseEnter={() => setActiveAiStep(idx)}
                      >
                        <span className="ai-step-num">{s.step}</span>
                        <strong>{lang === 'pt' ? s.pt : s.en}</strong>
                      </button>
                    ))}
                  </div>

                  <div className="ai-step-detail">
                    <Workflow size={17} />
                    <p>{lang === 'pt' ? AI_STEPS[activeAiStep].descPt : AI_STEPS[activeAiStep].descEn}</p>
                  </div>

                  <div className="flagship-actions">
                    <a
                      href="https://arch-atlas-ai.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary accent-indigo"
                    >
                      {lang === 'pt' ? 'Explorar Arch Atlas AI' : 'Explore Arch Atlas AI'}
                      <ArrowUpRight size={16} />
                    </a>
                    <a
                      href="https://github.com/Lucas-Barbosa-Oli/telegram-finance-bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <GitBranch size={15} />
                      Telegram Finance Bot
                    </a>
                  </div>
                </div>

                <div className="flagship-preview preview-indigo">
                  <div className="mock-window">
                    <div className="mock-window-bar">
                      <div className="mock-dots">
                        <span /><span /><span />
                      </div>
                      <span className="mock-url">pipeline · n8n + python + llm</span>
                    </div>

                    <div className="mock-ai-terminal">
                      <div className="term-line">
                        <span className="term-tag">[WEBHOOK]</span>
                        <span>POST /api/v1/incoming-message · 200 OK</span>
                      </div>
                      <div className="term-line">
                        <span className="term-tag cyan">[AGENT]</span>
                        <span>Intent: Structured extraction + context retrieval (RAG)</span>
                      </div>
                      <div className="term-line">
                        <span className="term-tag amber">[WORKFLOW]</span>
                        <span>n8n → REST API → Supabase RLS validated</span>
                      </div>
                      <div className="term-line">
                        <span className="term-tag emerald">[RESULT]</span>
                        <span>{lang === 'pt' ? 'Fluxo concluído e auditado em 340ms' : 'Workflow completed & verified in 340ms'}</span>
                      </div>
                    </div>

                    <div className="mock-ai-stats">
                      <div>
                        <strong>Python · TS</strong>
                        <span>{lang === 'pt' ? 'Código & APIs' : 'Code & APIs'}</span>
                      </div>
                      <div>
                        <strong>n8n · Make</strong>
                        <span>{lang === 'pt' ? 'Orquestração' : 'Orchestration'}</span>
                      </div>
                      <div>
                        <strong>LLMs · RAG</strong>
                        <span>{lang === 'pt' ? 'Agentes IA' : 'AI Agents'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
