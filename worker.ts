export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const mainDomain = 'jaxlocke.uk';
    
    // 1. 检查是否需要重定向 (非主域名 -> 主域名)
    if (hostname !== mainDomain) {
      const redirectUrl = new URL(url.toString());
      redirectUrl.hostname = mainDomain;
      redirectUrl.protocol = 'https:';
      if (redirectUrl.port === '80' || redirectUrl.port === '443') redirectUrl.port = '';
      
      // 执行 301 重定向
      return Response.redirect(redirectUrl.toString(), 301);
    }
    
    // 2. 检查主域名是否是 HTTP (强制 HTTPS)
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    
    // 3. 正常返回页面，但注入一个调试头
    try {
      // 这里的 env.ASSETS 不是文件，是 Cloudflare 平台注入的一个“服务绑定”
      // 只要 wrangler.jsonc 里配置了 assets，这里就有值
      const response = await env.ASSETS.fetch(request);
      
      // 克隆响应以便修改 Header (因为原始响应可能是只读的)
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Worker-Debug', 'Active'); // 标记 Worker 运行了
      newResponse.headers.set('X-Worker-Hostname', hostname); // 标记 Worker 看到的域名
      
      return newResponse;
    } catch (e: any) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
};