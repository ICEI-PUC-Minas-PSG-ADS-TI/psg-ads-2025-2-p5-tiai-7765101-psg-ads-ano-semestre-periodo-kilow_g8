import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  const token = request.cookies.get('auth-token')?.value;

  if (!isPublicRoute && !token)
    return NextResponse.redirect(new URL('/login', request.url));

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/home', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ignora as seguintes rotas para otimizar a performance:
     * - api (rotas de API do próprio Next.js)
     * - _next/static (arquivos JS e CSS compilados)
     * - _next/image (imagens otimizadas)
     * - favicon.ico (ícone do site)
     * - assets (sua pasta de imagens)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
