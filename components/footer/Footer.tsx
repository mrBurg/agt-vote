'use client';

import styles from './footer.module.scss';

import { useAppSelector } from '@/redux/hooks';
import { selectFooter } from '@/redux/slices';

export function Footer() {
  const footer = useAppSelector(selectFooter);

  return (
    <div
      className={styles.footer}
      dangerouslySetInnerHTML={{ __html: footer }}
    />
  );
}
