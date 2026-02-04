import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'supabase-realtime-chat-hub',
    timestamp: new Date().toISOString()
  });
}
