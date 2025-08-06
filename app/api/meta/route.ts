import 'server-only';

export async function GET() {
  //America's Got Talent: RatingTable
  return Response.json({
    title: "America's Got Talent",
    description: 'Audience Voting',
  });
}
