'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectFooter } from '@/redux/slices/footerSlices';

export function Footer() {
  const footer = useAppSelector(selectFooter);

  return <div dangerouslySetInnerHTML={{ __html: footer }} />;
}
