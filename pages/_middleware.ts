import { NextMiddleware, NextResponse } from 'next/server';

const prod = process.env.NODE_ENV === 'production';
const hostname = prod ? 'localhost:3000' : 'localhost:3000';

const middleware: NextMiddleware = req => {
  const host = req.headers.get('host');
  if (!host) return NextResponse.next();
  const currentHost = host.replace('.' + hostname, '');
  const url = req.nextUrl.clone();
  const { pathname: path } = url;
  // const revalidate = req.headers.get('x-prerender-revalidate');
  // const isApi = path.startsWith('/api');
  // const isPublic = path.includes('.');
  // const isVercel = host.includes('vercel');

  if (path.startsWith('/_sites')) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  if (host === hostname) {
    return NextResponse.next();
  }

  url.pathname = `/_sites/${currentHost}${path}`;
  return NextResponse.rewrite(url);
};

export default middleware;
