'use client';

import { CSSProperties } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './avatar.module.scss';
import cssVars from '@/styles/service/constants.module.scss';

import starMask from '@/assets/star-mask.svg';

export function Avatar({ src, alt, fit, className }: AvatarProps) {
  return (
    <div
      className={classNames(className, styles.avatar)}
      style={{ mask: `url(${starMask})` }}
    >
      <Image
        src={src}
        alt={alt}
        style={{ objectFit: fit }}
        sizes={`(min-width: ${cssVars.mobile}) 50vw, 100vw`}
        fill
        priority
      />
    </div>
  );
}

export type AvatarProps = {
  src: string;
  alt: string;
  fit: CSSProperties['objectFit'];
  className?: string;
};
