export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const mainDomain = 'jaxlocke.uk';
    
    // 调试日志：查看实时日志时非常有用
    console.log(`[Worker] Hit: ${hostname}, Path: ${url.pathname}`);

    // 需要排除的特殊情况
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    // 注意：如果你绑定的测试域名不以 .dev 结尾，原来的逻辑可能会误判，建议仅保留 workers.dev 判断或根据实际情况调整
    const isCloudflareDev = hostname.endsWith('.workers.dev') || 
                           hostname.endsWith('.pages.dev');

    // 1. 开发环境直接放行
    if (isLocalhost || isCloudflareDev) {
      console.log('[Worker] Skipping redirect (Dev environment)');
      return env.ASSETS.fetch(request);
    }
    
    // 2. 核心重定向逻辑：非主域名 -> 跳转主域名
    if (hostname !== mainDomain) {
      const redirectUrl = new URL(url.toString()); // 克隆 URL
      redirectUrl.hostname = mainDomain;
      redirectUrl.protocol = 'https:';
      
      // 清理端口
      if (redirectUrl.port === '80' || redirectUrl.port === '443') {
        redirectUrl.port = '';
      }
      
      console.log(`[Worker] Redirecting ${hostname} -> ${redirectUrl.toString()}`);
      return Response.redirect(redirectUrl.toString(), 301);
    }
    
    // 3. 强制 HTTPS (主域名)
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      console.log(`[Worker] Enforcing HTTPS -> ${url.toString()}`);
      return Response.redirect(url.toString(), 301);
    }
    
    // 4. 正常响应
    return env.ASSETS.fetch(request);
  },
};