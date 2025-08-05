'use client';

import Image from 'next/image';
import classNames from 'classnames';

import styles from './avatar.module.scss';

import type { AvatarProps } from './types';

export function Avatar({ src, alt, fit, className }: AvatarProps) {
  return (
    <div className={classNames(className, styles.avatar)}>
      <Image
        src={src}
        alt={alt}
        style={{ objectFit: fit }}
        sizes={'(max-width: 768px) 100vw, 50vw'}
        fill
        priority
      />
    </div>
  );
}
