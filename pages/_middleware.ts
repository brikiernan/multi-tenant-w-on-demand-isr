import { NextMiddleware, NextResponse } from 'next/server';

const prod = process.env.NODE_ENV === 'production';
const hostname = prod ? 'localhost:3000' : 'localhost:3000';

const middleware: NextMiddleware = req => {
  const url = req.nextUrl.clone();
  const { pathname: path } = url;

  const revalidate = req.headers.get('x-prerender-revalidate');
  if (!!revalidate) {
    url.pathname = `/_sites${path}`;
    return NextResponse.rewrite(url);
  }

  const host = req.headers.get('host');
  if (!host) return NextResponse.next();

  const isApi = path.startsWith('/api');
  const isPublic = path.includes('.');
  const isVercel = host.includes('vercel');
  if (host === hostname || isApi || isPublic || isVercel) {
    return NextResponse.next();
  }

  if (path.startsWith('/_sites')) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  const currentHost = host.replace('.' + hostname, '');
  url.pathname = `/_sites/${currentHost}${path}`;
  return NextResponse.rewrite(url);
};

export default middleware;
