export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const mainDomain = 'jaxlocke.uk';
    
    // 需要排除的特殊情况（开发环境和Cloudflare预览环境）
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isCloudflareDev = hostname.endsWith('.workers.dev') || 
                           hostname.endsWith('.pages.dev') || 
                           hostname.endsWith('.cloudflared.workers.dev');
    
    // 如果是开发环境或Cloudflare预览环境，不进行跳转
    if (isLocalhost || isCloudflareDev) {
      return env.ASSETS.fetch(request);
    }
    
    // 如果不是主域名，则重定向到主域名
    if (hostname !== mainDomain) {
      // 构建新的URL，保留路径、查询参数和哈希
      const redirectUrl = new URL(url);
      redirectUrl.hostname = mainDomain;
      redirectUrl.protocol = 'https:';
      
      // 确保端口号正确（HTTPS默认端口443）
      if (redirectUrl.port === '80' || redirectUrl.port === '443') {
        redirectUrl.port = '';
      }
      
      // 永久重定向（301）有利于SEO
      return Response.redirect(redirectUrl.toString(), 301);
    }
    
    // 主域名访问时，也要强制HTTPS
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    
    // 正常处理主域名的请求
    return env.ASSETS.fetch(request);
  },
};