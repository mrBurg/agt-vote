import 'server-only';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = [...searchParams.keys()][0];

  return Response.json({
    title: `America's Got Talent${
      page ? `: ${page.charAt(0).toUpperCase() + page.slice(1)}` : ''
    }`,
    description: 'Audience Voting',
  });
}
