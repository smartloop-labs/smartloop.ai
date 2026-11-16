import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DocentTerminal from '../components/Docent/Terminal';
import DocentDesktop from '../components/Docent/Desktop';
import styles from './home.module.css';
import local from './docent.module.css';

// smartloop.ai/docent: Docent is one product used two ways, the way Claude
// comes as an app and as Claude Code. Docent in the terminal is for coding;
// Docent Studio on the desktop is your personal assistant for work.
// The hash picks the way (#coding, #desktop). No hash means coding, which is
// what /docent showed before, so links already posted keep their page.

type Mode = 'coding' | 'desktop';

// The hash values that pick a product.
const MODES: Mode[] = ['desktop', 'coding'];

const modeOf = (hash: string): Mode => (hash.replace('#', '') === 'desktop' ? 'desktop' : 'coding');

export default function Docent(): ReactNode {
  const location = useLocation();
  const [mode, setMode] = useState<Mode>('coding');
  // The tab anchors are real targets; tell the build's link checker so.
  const brokenLinks = useBrokenLinks();
  MODES.forEach((m) => brokenLinks.collectAnchor(m));

  // Follows the hash, including in-site links to /docent#desktop that arrive
  // while this page is already open.
  useEffect(() => {
    setMode(modeOf(location.hash));
  }, [location.hash]);

  return (
    <div id="app" className="body">
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* Targets for /docent#coding and /docent#desktop: the hash picks
              the product (from the header menu, the home cards and each
              hero's cross-link), and these keep the link checker happy. */}
          <span id="coding" aria-hidden="true" />
          <span id="desktop" aria-hidden="true" />
          <div className={local.modeBody}>
            {mode === 'coding' ? <DocentTerminal /> : <DocentDesktop />}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
