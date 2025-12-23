export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // Define the main domain where we want all traffic to land
    const mainDomain = 'jaxlocke.uk';

    // Check conditions to allow the request to proceed without redirect:
    // 1. Exact match with the main domain
    const isMainDomain = hostname === mainDomain;
    // 2. Localhost for development
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    // 3. Cloudflare preview URLs (workers.dev or pages.dev)
    const isPreview = hostname.endsWith('.workers.dev') || hostname.endsWith('.pages.dev');

    // If it's not one of the allowed cases, redirect to the main domain
    if (!isMainDomain && !isLocalhost && !isPreview) {
      // Construct the new URL preserving path and query params
      const targetUrl = new URL(request.url);
      targetUrl.hostname = mainDomain;
      targetUrl.protocol = 'https:'; // Force HTTPS
      
      return Response.redirect(targetUrl.toString(), 301);
    }

    // Otherwise, serve the static assets
    return env.ASSETS.fetch(request);
  },
};
