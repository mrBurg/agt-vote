import type { Metadata } from 'next';

import type { MetaProps } from '@/types';

import { RatingTable } from '@/components/rating-table';
import { fetcher } from '@/utils/request';

export async function generateMetadata(): Promise<Metadata> {
  return await fetcher<MetaProps>('/api/meta');
}

export default function Rating() {
  return <RatingTable />;
}
