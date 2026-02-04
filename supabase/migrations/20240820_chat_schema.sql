-- Supabase Realtime Chat Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.chat_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_slug VARCHAR(64) REFERENCES public.chat_channels(slug) ON DELETE CASCADE,
    sender_name VARCHAR(128) NOT NULL,
    sender_role VARCHAR(64) DEFAULT 'Member',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
