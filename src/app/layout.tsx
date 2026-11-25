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
  title: 'Lucas Oliveira Barbosa — Web Engineering, AI & Automation',
  description:
    'Portfolio of Lucas Oliveira Barbosa. Creator of Conta Clara and Nexo, building AI agents, workflow automations, APIs, and crafted web interfaces.',
  openGraph: {
    title: 'Lucas Oliveira Barbosa — Portfolio',
    description:
      'Crafted digital products, AI agents, and connected workflows. Explore Conta Clara, Nexo, and selected engineering work.',
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
