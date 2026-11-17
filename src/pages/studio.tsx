import { type ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DocentDesktop from '../components/Docent/Desktop';
import styles from './home.module.css';
import local from './docent.module.css';

// smartloop.ai/studio: Docent Studio, Docent on the desktop. Its own page
// (not a hash on /docent) so search engines index it as its own product.
export default function Studio(): ReactNode {
  return (
    <div id="app" className="body">
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          <div className={local.modeBody}>
            <DocentDesktop />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
