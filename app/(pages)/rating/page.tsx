import type { Metadata } from 'next';
import path from 'path';

import type { MetaProps } from '@/types';

import { RatingTable } from '@/components/rating-table';
import { fetcher } from '@/utils/request';

export async function generateMetadata(): Promise<Metadata> {
  const dirName = path.dirname(__filename);
  const page = path.basename(dirName);

  return await fetcher<MetaProps>(`/api/meta?${page}`);
}

export default function Rating() {
  return <RatingTable />;
}
