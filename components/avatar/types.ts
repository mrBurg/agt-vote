import { CSSProperties } from 'react';

export type AvatarProps = {
  src: string;
  alt: string;
  fit: CSSProperties['objectFit'];
  className?: string;
};
