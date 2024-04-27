//Apply Private Routing on All Pages
export  {default} from 'next-auth/middleware'
//Apply Private Routing on Selected Pages
export const config = {
    matcher: ['/private', '/dashboard/:path*', '/inventory/:path*', '/users/:path*', '/roles/:path*'],
  }