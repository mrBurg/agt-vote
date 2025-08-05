import 'server-only';

export async function GET() {
  return Response.json({
    nav: [
      {
        href: '/',
        title: 'Home',
      },
      {
        href: '/rating',
        title: 'Rating',
      },
    ],
    footer: `&copy; ${new Date().getFullYear()}`,
  });
}
