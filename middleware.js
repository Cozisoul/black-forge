export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.hostname === 'mining.black-forge.co.za') {
    
    // Check if the request is for a static asset (e.g., CSS, JS, images)
    // Astro puts compiled assets in /_astro/, and we also check for file extensions.
    const isAsset = url.pathname.startsWith('/_astro/') || url.pathname.match(/\.[a-zA-Z0-9]+$/);

    if (!isAsset && !url.pathname.startsWith('/mining')) {
      url.pathname = `/mining${url.pathname === '/' ? '' : url.pathname}`;
      
      return new Response(null, {
        headers: {
          'x-middleware-rewrite': url.toString(),
        },
      });
    }
  }
}
