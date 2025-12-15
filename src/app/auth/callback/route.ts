import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  // Verifica se as variáveis de ambiente do Supabase estão configuradas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Se não estiver configurado, redireciona para a home
    return NextResponse.redirect(new URL('/', requestUrl.origin));
  }

  if (code) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Erro ao trocar código por sessão:', error);
    }
  }

  // Redireciona para a página principal
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
