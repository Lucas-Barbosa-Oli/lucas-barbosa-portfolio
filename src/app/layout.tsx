import type { Metadata } from 'next';
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import './theme-refinement.css';

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
  title: 'Lucas Oliveira Barbosa — AI Solutions, Automation & Web',
  description:
    'Portfolio of Lucas Oliveira Barbosa. Technology & AI Solutions Implementation at Umbler, Computer Science student at Cesuca, creator of Conta Clara and Nexo.',
  openGraph: {
    title: 'Lucas Oliveira Barbosa — Portfolio',
    description:
      'AI agents, n8n/Make automations, REST API integrations, and web projects including Conta Clara and Nexo.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
