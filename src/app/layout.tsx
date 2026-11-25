import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lucas Oliveira Barbosa — Engenharia Web, IA & Automações',
  description:
    'Portfólio de Lucas Oliveira Barbosa. Criador do Conta Clara e do Nexo, atuando com Inteligência Artificial, Automações, APIs e Interfaces Web.',
  openGraph: {
    title: 'Lucas Oliveira Barbosa — Portfólio',
    description:
      'Produtos digitais claros, agentes de IA e fluxos conectados. Conheça o Conta Clara, o Nexo e outros projetos.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
