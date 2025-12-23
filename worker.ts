export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const host = request.headers.get('host');

    // 只有当域名不是 jaxlocke.uk 时才进行跳转
    // 同时保留对 localhost 和 cloudflare 预览域名的支持以便于测试
    const isMainDomain = host === 'jaxlocke.uk';
    const isLocalhost = host?.includes('localhost') || host?.includes('127.0.0.1');
    const isPreview = host?.endsWith('.workers.dev') || host?.endsWith('.pages.dev');

    if (!isMainDomain && !isLocalhost && !isPreview) {
      url.hostname = 'jaxlocke.uk';
      url.protocol = 'https:'; // 强制跳转到 https
      return Response.redirect(url.toString(), 301);
    }

    // 如果是主域名或开发环境，则正常提供静态资源
    return env.ASSETS.fetch(request);
  },
};
