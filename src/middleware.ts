
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect routes and handle redirects based on auth status.
 * @param {NextRequest} request - The incoming request.
 * @returns {NextResponse} The response.
 */
export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user');
  let user = null;

  try {
    user = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    user = null;
  }
  
  const { pathname } = request.nextUrl;

  const publicPaths = ['/login', '/forgot-password'];
  const isPublicPage = publicPaths.includes(pathname);
  
  const isFirstTimeLogin = user?.password === 'Test@123';

  // --- Logic for Logged-In Users ---
  if (user) {
    if (isFirstTimeLogin) {
      // Force first-time users to the change password page.
      if (pathname !== '/change-password') {
        return NextResponse.redirect(new URL('/change-password', request.url));
      }
    } else {
      // Redirect authenticated users away from public pages.
      if (isPublicPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      // Prevent direct access to change password page after first login.
      if (pathname === '/change-password') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  } 
  // --- Logic for Logged-Out Users ---
  else {
    // Redirect unauthenticated users from protected pages to the login page.
    if (!isPublicPage && pathname !== '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to proceed if no rules match.
  return NextResponse.next();
}

// Configures which paths the middleware runs on.
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/change-password',
    '/forgot-password',
  ],
};
