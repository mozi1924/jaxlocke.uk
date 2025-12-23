export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname;
    const mainDomain = 'jaxlocke.uk';

    // 1. 调试：在 Response Header 里告诉你环境状态
    // 如果 ASSETS 丢失，这里会记录下来
    const debugHeaders = {
      'X-Debug-Hostname': hostname,
      'X-Debug-Assets-Status': env.ASSETS ? 'Present' : 'MISSING',
    };

    // 2. 紧急防御：如果 env.ASSETS 真的丢了，不要崩，返回一段纯文本说明
    if (!env.ASSETS) {
      console.error('CRITICAL: env.ASSETS is missing!');
      return new Response(
        `Critical Error: env.ASSETS is undefined.\n\nDebug Info:\nEnv Keys: ${Object.keys(env).join(', ')}`, 
        { status: 503, headers: debugHeaders }
      );
    }

    // 3. 重定向逻辑 (非主域名 -> 主域名)
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

    // 5. 安全地获取静态资源
    try {
      const response = await env.ASSETS.fetch(request);
      // 复制响应以添加调试头 (原响应是只读的)
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Worker-Active', 'true');
      return newResponse;
    } catch (e: any) {
      // 捕获 fetch 过程中的错误，防止 500
      return new Response(`Error loading asset: ${e.message}`, { status: 500 });
    }
  },
};