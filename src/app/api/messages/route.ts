import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channel = searchParams.get('channel') || 'general';

  const sampleMessages = [
    { id: '1', user: 'Manikanta', role: 'Lead Architect', text: 'Supabase Realtime channel established on WebSocket cluster.', time: '10:14 AM' },
    { id: '2', user: 'Valeff Reviewer', role: 'Full-Stack Lead', text: 'Checking PostgreSQL RLS message permissions and latency.', time: '10:15 AM' },
    { id: '3', user: 'Systems Worker', role: 'DevOps', text: 'All sub-50ms message broadcast metrics verified!', time: '10:16 AM' },
  ];

  return NextResponse.json({ channel, messages: sampleMessages });
}
