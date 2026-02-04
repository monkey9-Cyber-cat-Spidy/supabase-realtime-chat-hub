import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Realtime Chat Hub | Supabase WebSockets',
  description: 'Production team messaging application featuring Supabase Realtime channels and PostgreSQL history.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full overflow-hidden flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
