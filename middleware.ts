// import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";


// const protectedRoutes= createRouteMatcher([
//   '/',
//   '/upcoming',
//   '/previous',
//   '/recordings',
//   '/personal-room',
//  '/meeting(.*)',

//   '/login',
//   '/logout',

// ])

// export default clerkMiddleware((auth,req)=>{
//   if(protectedRoutes(req)) auth().protect()
// })
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected routes that require authentication
const protectedRoutes = [
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting',
]

export function middleware(request: NextRequest) {
  // Add your authentication logic here
  // For now, we'll just allow all requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}