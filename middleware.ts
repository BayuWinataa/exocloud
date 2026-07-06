import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, updateSession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Update session expiration if present
  const sessionResponse = await updateSession(request)
  
  const path = request.nextUrl.pathname
  const isProtectedRoute = path.startsWith('/admin')
  const isLoginRoute = path === '/login'

  const session = await getSession()

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (sessionResponse) {
    const res = NextResponse.next()
    res.headers.set('Set-Cookie', sessionResponse.headers.get('Set-Cookie') || '')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
