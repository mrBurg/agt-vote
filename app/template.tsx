import classNames from 'classnames';

import styles from './../style/common.module.scss';

import type { LayoutProps } from './types';

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function Template({ children }: LayoutProps) {
  return (
    <div className="template">
      <header>
        <Nav />
      </header>
      <main className={classNames(styles.main)}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
