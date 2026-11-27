'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Moon,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import FlagshipShowcase from './FlagshipShowcase';
import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  type Lang,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolio';

const NeuralCore3D = dynamic(() => import('./NeuralCore3D'), {
  ssr: false,
  loading: () => (
    <div className="neural-fallback" aria-hidden="true">
      <div className="neural-fallback-ring r1" />
      <div className="neural-fallback-ring r2" />
      <div className="neural-fallback-core" />
    </div>
  ),
});

const CHAPTERS = [
  { id: 'inicio', num: '01', pt: 'Início', en: 'Home' },
  { id: 'destaques', num: '02', pt: 'Destaques', en: 'Flagships' },
  { id: 'projetos', num: '03', pt: 'Projetos', en: 'Projects' },
  { id: 'trajetoria', num: '04', pt: 'Trajetória', en: 'Journey' },
  { id: 'contato', num: '05', pt: 'Contato', en: 'Contact' },
] as const;

export default function PortfolioApp() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'all' | ProjectCategory>('all');
  const [activeChapter, setActiveChapter] = useState<string>('inicio');
  const [scrollFraction, setScrollFraction] = useState(0);
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setScrollFraction(latest);
  });

  // Language persistence (defaults to English for new visitors)
  useEffect(() => {
    const savedLang = localStorage.getItem('lb:lang');
    if (savedLang === 'pt' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('lb:theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('lb:theme', theme);
  }, [theme]);

  // Smooth inertial scrolling via Lenis (respects prefers-reduced-motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Observe active section for nav + right-side chapter rail
  useEffect(() => {
    const elements = CHAPTERS.map(c => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveChapter(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0.05, 0.25, 0.5] },
    );
    elements.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    if (!inspectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inspectedProject]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  const filteredProjects =
    activeTab === 'all' ? PROJECTS : PROJECTS.filter(project => project.category === activeTab);

  // Dynamic ambient hue shift across scroll
  const ambientColor =
    scrollFraction < 0.28
      ? 'rgba(56, 189, 248, 0.13)'
      : scrollFraction < 0.55
        ? 'rgba(45, 212, 191, 0.13)'
        : scrollFraction < 0.78
          ? 'rgba(224, 122, 95, 0.13)'
          : 'rgba(129, 140, 248, 0.14)';

  const filterTabs: { id: 'all' | ProjectCategory; pt: string; en: string }[] = [
    { id: 'all', pt: 'Todos (5)', en: 'All (5)' },
    { id: 'web', pt: 'Produtos Web', en: 'Web Products' },
    { id: 'ai', pt: 'IA & Automações', en: 'AI & Automation' },
  ];

  return (
    <div className="portfolio-shell" style={{ ['--ambient-glow' as string]: ambientColor }}>
      {/* Top Scroll Progress Bar */}
      <motion.div className="top-scroll-bar" style={{ scaleX: smoothProgress }} aria-hidden="true" />

      {/* Subtle Architectural Grid + Dynamic Scroll Glow */}
      <div className="bg-grid-layer" aria-hidden="true" />
      <div className="bg-ambient-orb" aria-hidden="true" />

      {/* Floating Glass Header Dock */}
      <header className="glass-dock-wrap">
        <nav className="glass-dock" aria-label={lang === 'pt' ? 'Navegação principal' : 'Primary navigation'}>
          <button type="button" className="brand-monogram" onClick={() => scrollToSection('inicio')}>
            <span className="monogram-badge">LB</span>
            <span className="monogram-text">
              Lucas Barbosa<span className="monogram-dot">.</span>
            </span>
          </button>

          <div className="dock-links">
            {CHAPTERS.map(ch => (
              <button
                key={ch.id}
                type="button"
                className={activeChapter === ch.id ? 'dock-link active' : 'dock-link'}
                onClick={() => scrollToSection(ch.id)}
              >
                {lang === 'pt' ? ch.pt : ch.en}
              </button>
            ))}
          </div>

          <div className="dock-controls">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-icon-btn"
              aria-label="GitHub"
              title="GitHub · @Lucas-Barbosa-Oli"
            >
              <Github size={16} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-icon-btn"
              aria-label="LinkedIn"
              title="LinkedIn · Lucas Oliveira Barbosa"
            >
              <Linkedin size={16} />
            </a>
            <button
              type="button"
              className="dock-lang-btn"
              onClick={() =>
                setLang(prev => {
                  const next = prev === 'en' ? 'pt' : 'en';
                  localStorage.setItem('lb:lang', next);
                  return next;
                })
              }
              aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Globe size={13} />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="dock-icon-btn"
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={
                lang === 'pt'
                  ? theme === 'dark'
                    ? 'Ativar tema claro'
                    : 'Ativar tema escuro'
                  : theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
              }
              title={
                lang === 'pt'
                  ? theme === 'dark'
                    ? 'Tema claro'
                    : 'Tema escuro'
                  : theme === 'dark'
                    ? 'Light mode'
                    : 'Dark mode'
              }
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Right-Edge Interactive Scroll Chapter Rail */}
      <aside className="scroll-rail" aria-label={lang === 'pt' ? 'Progresso da página' : 'Page progress'}>
        <span className="rail-percent">{Math.round(scrollFraction * 100)}%</span>
        <div className="rail-dots">
          {CHAPTERS.map(ch => (
            <button
              key={ch.id}
              type="button"
              className={activeChapter === ch.id ? 'rail-dot active' : 'rail-dot'}
              onClick={() => scrollToSection(ch.id)}
              title={`${ch.num} · ${lang === 'pt' ? ch.pt : ch.en}`}
              aria-label={`${lang === 'pt' ? 'Ir para' : 'Go to'} ${lang === 'pt' ? ch.pt : ch.en}`}
            >
              <span className="rail-dot-label">{lang === 'pt' ? ch.pt : ch.en}</span>
              <i />
            </button>
          ))}
        </div>
      </aside>

      <main>
        {/* 01 — HERO SECTION */}
        <section id="inicio" className="hero-section">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="availability-pill">
                <span className="pulse-dot" />
                <span>{PROFILE.availability[lang]}</span>
              </div>

              <p className="hero-role">{PROFILE.role[lang]}</p>

              <h1>
                {lang === 'pt' ? (
                  <>
                    Agentes de IA, <span className="serif-italic">automações</span> e aplicações web para problemas reais.
                  </>
                ) : (
                  <>
                    AI agents, <span className="serif-italic">automations</span>, and web apps built for real workflows.
                  </>
                )}
              </h1>

              <p className="hero-lead">{PROFILE.subheadline[lang]}</p>

              <div className="hero-cta-row">
                <button type="button" className="btn-primary" onClick={() => scrollToSection('destaques')}>
                  {lang === 'pt' ? 'Explorar Conta Clara & Nexo' : 'Explore Conta Clara & Nexo'}
                  <ArrowDownRight size={17} />
                </button>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Linkedin size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="hero-Quick-facts">
                <div>
                  <MapPin size={14} />
                  <span>{PROFILE.location[lang]}</span>
                </div>
                <div>
                  <Briefcase size={14} />
                  <span>{lang === 'pt' ? 'Umbler · Implantação de IA & Automações' : 'Umbler · AI & Automation Implementation'}</span>
                </div>
                <div>
                  <GraduationCap size={14} />
                  <span>{lang === 'pt' ? 'Ciência da Computação · CESUCA (2027/2)' : 'Computer Science · CESUCA (late 2027)'}</span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Scroll-Evolving Three.js Sculpture */}
            <motion.div
              className="hero-visual-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="visual-hud-top">
                <span className="hud-tag">
                  <Terminal size={12} />
                  01 // THREE.JS NEURAL CORE
                </span>
                <span className="hud-coords">
                  SCROLL {Math.round(scrollFraction * 100).toString().padStart(2, '0')}%
                </span>
              </div>

              <NeuralCore3D scrollProgress={scrollFraction} theme={theme} lang={lang} />

              <div className="visual-hud-bottom">
                <button type="button" className="hud-project-shortcut" onClick={() => scrollToSection('destaques')}>
                  <span className="dot-teal" />
                  <div>
                    <strong>Conta Clara</strong>
                    <small>{lang === 'pt' ? 'Finanças & Open Finance' : 'Personal Finance'}</small>
                  </div>
                </button>
                <button type="button" className="hud-project-shortcut" onClick={() => scrollToSection('destaques')}>
                  <span className="dot-amber" />
                  <div>
                    <strong>Nexo</strong>
                    <small>{lang === 'pt' ? 'Segundo Cérebro & Grafo' : 'Second Brain & Graph'}</small>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 02 — STICKY HORIZONTAL SCROLL SHOWCASE (CONTA CLARA, NEXO, AI) */}
        <FlagshipShowcase lang={lang} />

        {/* 03 — TABBED ECOSYSTEM & PROJECT EXPLORER */}
        <section id="projetos" className="projects-section">
          <div className="container">
            <div className="section-header-split">
              <div>
                <span className="eyebrow">
                  <Layers size={13} />
                  {lang === 'pt' ? 'ECOSSISTEMA & LABORATÓRIO' : 'ECOSYSTEM & LAB'}
                </span>
                <h2>
                  {lang === 'pt' ? 'Todos os projetos selecionados' : 'Selected engineering work'}
                </h2>
                <p className="section-sub">
                  {lang === 'pt'
                    ? 'Filtre por domínio ou abra o raio-x técnico de cada projeto.'
                    : 'Filter by domain or inspect the technical breakdown of each project.'}
                </p>
              </div>

              <div className="filter-tabs" role="tablist" aria-label={lang === 'pt' ? 'Filtrar projetos' : 'Filter projects'}>
                {filterTabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={activeTab === tab.id ? 'filter-tab active' : 'filter-tab'}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="projectTabPill"
                        className="filter-tab-bg"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="filter-tab-label">{lang === 'pt' ? tab.pt : tab.en}</span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="projects-bento-grid">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map(project => (
                  <motion.article
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24 }}
                    className={project.featured ? 'project-card featured' : 'project-card'}
                    style={{ ['--card-accent' as string]: project.accent }}
                  >
                    <div className="project-card-top">
                      <span className="project-num">{project.slug}</span>
                      {project.featured && (
                        <span className="featured-tag">
                          <Sparkles size={11} />
                          {lang === 'pt' ? 'Destaque principal' : 'Flagship'}
                        </span>
                      )}
                      <span className="project-year">{project.year}</span>
                    </div>

                    <h3>{project.title}</h3>
                    <p className="project-card-sub">{project.subtitle[lang]}</p>
                    <p className="project-card-desc">{project.summary[lang]}</p>

                    <div className="stack-row compact">
                      {project.stack.slice(0, 5).map(t => (
                        <span key={t} className="tech-chip">{t}</span>
                      ))}
                    </div>

                    <div className="project-card-footer">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link primary-link"
                        >
                          <span>{lang === 'pt' ? 'Abrir app' : 'Live app'}</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                        >
                          <GitBranch size={14} />
                          <span>GitHub</span>
                        </a>
                      ) : project.repoPrivate ? (
                        <span className="card-private">
                          <Lock size={12} />
                          <span>{lang === 'pt' ? 'Código privado' : 'Private'}</span>
                        </span>
                      ) : null}

                      <button
                        type="button"
                        className="card-inspect-btn"
                        onClick={() => setInspectedProject(project)}
                      >
                        {lang === 'pt' ? 'Raio-X técnico' : 'Tech specs'}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* 04 — EXPERIENCE, RESEARCH & SKILLS */}
        <section id="trajetoria" className="journey-section">
          <div className="container">
            <div className="journey-grid">
              <div>
                <span className="eyebrow">
                  <Code2 size={13} />
                  {lang === 'pt' ? 'TRAJETÓRIA & PESQUISA' : 'EXPERIENCE & RESEARCH'}
                </span>
                <h2>
                  {lang === 'pt' ? 'Experiência, pesquisa e formação' : 'Experience, research & education'}
                </h2>
                <p className="section-sub">
                  {lang === 'pt'
                    ? 'Resumo fiel ao meu currículo: atuação prática na Umbler, pesquisa acadêmica no CESUCA, habilidades e cursos concluídos.'
                    : 'Direct from my CV: client implementations at Umbler, academic AI research at CESUCA, core skills, and completed courses.'}
                </p>

                <div className="skills-matrix">
                  {SKILL_GROUPS.map(group => (
                    <div key={group.title.en} className="skill-card">
                      <h3>{group.title[lang]}</h3>
                      <ul>
                        {group.items[lang].map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="timeline-list">
                {EXPERIENCE.map(item => (
                  <article key={item.role.en} className="timeline-card">
                    <div className="timeline-meta">
                      <span className="timeline-period">{item.period[lang]}</span>
                      <span className="timeline-org">{item.org[lang]}</span>
                    </div>
                    <h3>{item.role[lang]}</h3>
                    <p>{item.summary[lang]}</p>
                    <div className="stack-row compact">
                      {item.tags[lang].map(tag => (
                        <span key={tag} className="tech-chip">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 — CONTACT & SOCIAL LINKS */}
        <section id="contato" className="contact-section">
          <div className="container">
            <div className="contact-card">
              <div className="contact-copy">
                <span className="eyebrow">
                  <Mail size={13} />
                  {lang === 'pt' ? 'CONEXÃO DIRETA' : 'GET IN TOUCH'}
                </span>
                <h2>
                  {lang === 'pt' ? (
                    <>
                      Vamos conversar sobre <span className="serif-italic">projetos, IA</span> e automações?
                    </>
                  ) : (
                    <>
                      Let’s talk about <span className="serif-italic">projects, AI</span> & automation.
                    </>
                  )}
                </h2>
                <p>
                  {lang === 'pt'
                    ? 'Conecte-se comigo pelo LinkedIn, acompanhe meus repositórios no GitHub ou envie um e-mail direto.'
                    : 'Connect with me on LinkedIn, explore my repositories on GitHub, or send a direct email.'}
                </p>
              </div>

              <div className="contact-links-grid">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card linkedin"
                >
                  <div className="social-card-icon">
                    <Linkedin size={22} />
                  </div>
                  <div>
                    <strong>LinkedIn</strong>
                    <span>/in/lucas-oliveira-barbosa</span>
                  </div>
                  <ArrowUpRight size={18} className="social-arrow" />
                </a>

                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card github"
                >
                  <div className="social-card-icon">
                    <Github size={22} />
                  </div>
                  <div>
                    <strong>GitHub</strong>
                    <span>{PROFILE.handle}</span>
                  </div>
                  <ArrowUpRight size={18} className="social-arrow" />
                </a>

                <button type="button" className="social-card email" onClick={() => void copyEmail()}>
                  <div className="social-card-icon">
                    {copiedEmail ? <Check size={22} /> : <Copy size={22} />}
                  </div>
                  <div>
                    <strong>{copiedEmail ? (lang === 'pt' ? 'E-mail copiado!' : 'Email copied!') : 'E-mail'}</strong>
                    <span>{PROFILE.email}</span>
                  </div>
                  <ArrowUpRight size={18} className="social-arrow" />
                </button>
              </div>
            </div>

            <footer className="site-footer">
              <span>© {new Date().getFullYear()} {PROFILE.name}</span>
              <span>
                {lang === 'pt'
                  ? 'Construído com Next.js, TypeScript, Three.js & Motion · Publicado na Vercel'
                  : 'Built with Next.js, TypeScript, Three.js & Motion · Deployed on Vercel'}
              </span>
            </footer>
          </div>
        </section>
      </main>

      {/* TECHNICAL X-RAY MODAL */}
      <AnimatePresence>
        {inspectedProject && (
          <motion.div
            className="xray-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => {
              if (e.target === e.currentTarget) setInspectedProject(null);
            }}
          >
            <motion.div
              className="xray-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="xray-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
            >
              <div className="xray-head">
                <div>
                  <span className="project-num">{inspectedProject.slug} · {inspectedProject.year}</span>
                  <h3 id="xray-title">{inspectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  className="dock-icon-btn"
                  aria-label={lang === 'pt' ? 'Fechar detalhes' : 'Close details'}
                  onClick={() => setInspectedProject(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <p className="xray-summary">{inspectedProject.summary[lang]}</p>

              <div className="flagship-metrics">
                {inspectedProject.metrics.map(m => (
                  <div key={m.label.pt} className="metric-box">
                    <strong>{m.value}</strong>
                    <span>{m.label[lang]}</span>
                  </div>
                ))}
              </div>

              <ul className="flagship-bullets">
                {inspectedProject.highlights[lang].map(h => (
                  <li key={h}>
                    <CheckCircle2 size={15} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="stack-row">
                {inspectedProject.stack.map(s => (
                  <span key={s} className="tech-chip">{s}</span>
                ))}
              </div>

              <div className="xray-actions">
                {inspectedProject.liveUrl && (
                  <a
                    href={inspectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {lang === 'pt' ? 'Abrir aplicação ao vivo' : 'Open live application'}
                    <ArrowUpRight size={16} />
                  </a>
                )}
                {inspectedProject.repoUrl && (
                  <a
                    href={inspectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
