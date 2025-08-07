'use client';

import classNames from 'classnames';
import Link from 'next/link';

import styles from './logo.module.scss';

import LogoImage from './assets/logo.svg';

export function Logo({ className }: LogoProps) {
  return (
    <div className={classNames(className, styles.logo)}>
      <Link href={'/'}>
        <LogoImage />
      </Link>
    </div>
  );
}

export type LogoProps = {
  className?: string;
};
