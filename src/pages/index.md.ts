import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const markdownContent = `# Dirk Hierold

AI-powered tools from Swift roots to web frontiers. Every commit lands on GitHub for you to fork & remix.

## Navigation

- [About](/about.md)
- [Recent Posts](/posts.md)
- [Archives](/archives.md)
- [RSS Feed](/rss.xml)

## Links

- Twitter: [@DirkHierold](https://twitter.com/DirkHierold)
- GitHub: [@DirkHierold](https://github.com/DirkHierold)
- Email: dirk@dirkhierold.de

---

*This is the markdown-only version of dirkhierold.de. Visit [dirkhierold.de](https://dirkhierold.de) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};