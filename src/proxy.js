import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  console.log(session)

  if (session) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/login', request.url))
}



export const config = {
  matcher: ["/my-listing", "/my-booking", "/add-rooms", "/rooms-details/:id"],
}