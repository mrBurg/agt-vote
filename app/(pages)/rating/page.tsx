import type { Metadata } from 'next';

import { RatingTable } from '@/components/rating-table';

export const metadata: Metadata = {
  title: "America's Got Talent: RatingTable",
};

export default function Rating() {
  return <RatingTable />;
}
