export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const url = new URL(request.url);

  // Check if the request is for the mining subdomain
  if (url.hostname === 'mining.black-forge.co.za') {
    
    // Skip if it's already requesting the /mining path to avoid infinite loops
    if (!url.pathname.startsWith('/mining')) {
      // Rewrite the URL internally to /mining/...
      url.pathname = `/mining${url.pathname === '/' ? '' : url.pathname}`;
      
      // Vercel Edge Middleware uses the x-middleware-rewrite header to trigger a rewrite
      return new Response(null, {
        headers: {
          'x-middleware-rewrite': url.toString(),
        },
      });
    }
  }
}
