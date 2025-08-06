'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { map } from 'lodash';

import styles from './nav.module.scss';

import { selectNav } from '@/redux/slices';
import { useAppSelector } from '@/redux/hooks';

export function Nav() {
  const pathname = usePathname();
  const nav = useAppSelector(selectNav);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <nav className={styles.nav}>
      {map(nav, (item, index) => {
        const isActive =
          origin && pathname === new URL(item.href, origin).pathname;

        return (
          <Link
            key={index}
            className={classNames('link', { active: isActive })}
            href={item.href}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
