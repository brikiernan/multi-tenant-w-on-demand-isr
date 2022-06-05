import { NextMiddleware, NextResponse } from 'next/server';

const homeUrl = 'returnonpostcards.com';
const prod = process.env.NODE_ENV === 'production';
const hostname = prod ? homeUrl : 'localhost:3000';

const middleware: NextMiddleware = req => {
  const url = req.nextUrl.clone();
  const { pathname: path } = url;

  const revalidate = req.headers.get('x-prerender-revalidate');
  if (!!revalidate) {
    url.pathname = `/_sites${path}`;
    return NextResponse.rewrite(url);
  }

  if (path.startsWith('/_sites')) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  const host = req.headers.get('host');
  const isApi = path.startsWith('/api');
  const isPublic = path.includes('.');
  if (!host || isApi || isPublic) return NextResponse.next();

  const isVercel = host.includes('vercel');
  const currentHost = host.replace('.' + hostname, '');

  const isHome = host === hostname || host === homeUrl;

  if (isHome || currentHost === 'www' || isVercel) {
    return NextResponse.next();
  }

  url.pathname = `/_sites/${currentHost}${path}`;
  return NextResponse.rewrite(url);
};

export default middleware;
