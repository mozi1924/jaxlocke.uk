export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const mainDomain = 'jaxlocke.uk';
    
    // 1. 检查 ASSETS 是否存在 (防止 500 错误)
    if (!env.ASSETS) {
      console.error('[Worker Error] env.ASSETS is missing! Check wrangler version and build config.');
      return new Response(`Site is deploying, please try again later. (Error: Assets Binding Missing)`, { status: 503 });
    }

    // 2. 排除开发环境
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isCloudflareDev = hostname.endsWith('.workers.dev') || hostname.endsWith('.pages.dev');

    if (isLocalhost || isCloudflareDev) {
      return env.ASSETS.fetch(request);
    }
    
    // 3. 域名跳转逻辑
    if (hostname !== mainDomain) {
      const redirectUrl = new URL(url.toString());
      redirectUrl.hostname = mainDomain;
      redirectUrl.protocol = 'https:';
      if (redirectUrl.port === '80' || redirectUrl.port === '443') redirectUrl.port = '';
      return Response.redirect(redirectUrl.toString(), 301);
    }
    
    // 4. 强制 HTTPS
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    
    // 5. 正常返回页面
    return env.ASSETS.fetch(request);
  },
};