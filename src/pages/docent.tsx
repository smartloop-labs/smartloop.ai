import { useEffect, type ReactNode } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DocentTerminal from '../components/Docent/Terminal';
import styles from './home.module.css';
import local from './docent.module.css';

// smartloop.ai/docent: Docent, your local AI coding agent.
// Docent Studio, Docent on the desktop, has its own page at /studio so each
// product is a crawlable URL of its own rather than a hash on this one.
// Old links to /docent#desktop are sent on to /studio; /docent#coding just
// lands here.
export default function Docent(): ReactNode {
  const location = useLocation();
  const history = useHistory();
  // Old hash links still point here; tell the build's link checker so.
  const brokenLinks = useBrokenLinks();
  brokenLinks.collectAnchor('coding');
  brokenLinks.collectAnchor('desktop');

  useEffect(() => {
    if (location.hash === '#desktop') history.replace('/studio');
  }, [location.hash, history]);

  return (
    <div id="app" className="body">
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          <span id="coding" aria-hidden="true" />
          <div className={local.modeBody}>
            <DocentTerminal />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
