'use client';

import Image from 'next/image';
import classNames from 'classnames';

import styles from './logo.module.scss';

export function Logo({ className }: LogoProps) {
  return (
    <div className={classNames(className, styles.logo)}>
      <Image
        src={'/logo.svg'}
        alt={'logo'}
        style={{ objectFit: 'contain' }}
        sizes={'(max-width: 768px) 100vw, 50vw'}
        fill
        priority
      />
    </div>
  );
}

export type LogoProps = {
  className?: string;
};
