import { useEffect, useState, type ReactNode } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
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

const MODES: { id: Mode; label: string; detail: string }[] = [
  { id: 'desktop', label: 'Docent Studio', detail: 'your private AI assistant' },
  { id: 'coding', label: 'Docent', detail: 'the coding agent for your terminal' },
];

const modeOf = (hash: string): Mode => (hash.replace('#', '') === 'desktop' ? 'desktop' : 'coding');

export default function Docent(): ReactNode {
  const location = useLocation();
  const history = useHistory();
  const [mode, setMode] = useState<Mode>('coding');
  // The tab anchors are real targets; tell the build's link checker so.
  const brokenLinks = useBrokenLinks();
  MODES.forEach((m) => brokenLinks.collectAnchor(m.id));

  // Follows the hash, including in-site links to /docent#desktop that arrive
  // while this page is already open.
  useEffect(() => {
    setMode(modeOf(location.hash));
  }, [location.hash]);

  const pick = (next: Mode) => {
    if (next === mode) return;
    history.replace({ ...location, hash: next === 'coding' ? '' : `#${next}` });
    window.scrollTo({ top: 0 });
  };

  return (
    <div id="app" className="body">
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* Targets for /docent#coding and /docent#desktop: the hash picks
              the tab, and these keep the link checker (and the scroll) on the
              switch. */}
          <span id="coding" aria-hidden="true" />
          <span id="desktop" aria-hidden="true" />
          <div className={local.modeBar}>
            <div className={local.modeSwitch} role="tablist" aria-label="How you use Docent">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.id}
                  className={`${local.modeTab} ${mode === m.id ? local.modeTabActive : ''}`}
                  onClick={() => pick(m.id)}
                >
                  <span className={local.modeLabel}>{m.label}</span>
                  <span className={local.modeDetail}>{m.detail}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={local.modeBody}>
            {mode === 'coding' ? <DocentTerminal /> : <DocentDesktop />}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
