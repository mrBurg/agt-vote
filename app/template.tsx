import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from './../styles/common.module.scss';

import { Logo } from '@/components/logo';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export default function Template({ children }: PropsWithChildren) {
  return (
    <div className={styles.template}>
      <header>
        <Logo />
        <Nav />
      </header>
      <main className={classNames(styles.main)}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
