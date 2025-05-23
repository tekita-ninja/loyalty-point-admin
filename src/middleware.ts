import { NextRequest, NextResponse } from 'next/server'

// Daftar halaman publik (tidak butuh login)
const publicRoutes = ['/login', '/register', '/reset-password']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  const isPublic = publicRoutes.some((path) => pathname.startsWith(path))
  // Jika route termasuk public (termasuk gambar), tidak perlu dicek
  if (pathname.startsWith('/_next/') || pathname.startsWith('/images/')) {
    return NextResponse.next();
  }
  if (token) {
    // Jika sudah login dan mencoba akses halaman public (login/register/lupa password)
    if (isPublic) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    // Token ada dan bukan halaman publik → lanjutkan
    return NextResponse.next()
  }

  // Jika belum login dan akses halaman publik → lanjutkan
  if (isPublic) {
    return NextResponse.next()
  }

  // Belum login dan coba akses halaman private → redirect ke login
  const loginUrl = new URL('/login', req.url)
  loginUrl.searchParams.set('redirect', pathname) // menyimpan halaman asal
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}