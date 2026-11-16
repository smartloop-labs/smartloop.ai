import { useEffect, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroDrift from '../components/HeroDrift';
import styles from './home.module.css';

// smartloop.ai is the company, the way 37signals sits over Basecamp and HEY:
// the story, then what it makes. Docent is one product used in two places,
// the terminal (/docent) and the desktop, Studio (/studio); gpushed has its
// own site.

type Way = { name: string; desc: string; facts: string; to: string };

const DOCENT_WAYS: Way[] = [
  {
    name: 'In your terminal',
    desc: 'Ask for a change and Docent writes it, checks it with your language servers and your build, and fixes what fails.',
    facts: 'macOS · Linux · Windows · open source (MIT)',
    to: '/docent',
  },
  {
    name: 'On your desktop: Docent Studio',
    desc: 'Chat with your documents, connect MCP servers and add skills, with the models picked and sized for your machine.',
    facts: 'macOS · Linux · Windows · open source (Apache 2.0)',
    to: '/studio',
  },
];

const PRINCIPLES: [string, string][] = [
  ['Local first', 'Your files and prompts stay on your machine unless you choose otherwise.'],
  ['Opinionated', 'We pick and tune the models, so there is nothing to choose or configure.'],
  ['Small and sharp', 'Each product does one job, and does it well.'],
  ['Open where it counts', 'Docent is open source, in the terminal and on the desktop. Read the code that runs on your computer.'],
];

const DESCRIPTION = 'Smartloop is an AI research company. We make private software that runs on the computer you already own: Docent, for your terminal and your desktop, and gpushed, a GPU by the second when a job outgrows your machine.';

export default function Home(): ReactNode {
  // Campaign tags ride along to the download and sign-up pages.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const value = params.get(key);
      if (value) sessionStorage.setItem(key, value);
    });
  }, []);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Smartloop Inc.',
    url: 'https://smartloop.ai',
    logo: 'https://smartloop.ai/img/logo-dark.svg',
    description: DESCRIPTION,
    brand: [{ '@type': 'Brand', name: 'Docent' }, { '@type': 'Brand', name: 'gpushed' }],
  };

  return (
    <div id="app" className="body">
      <Head>
        <title>Smartloop | Frontier quality. Local first.</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="Smartloop | Frontier quality. Local first." />
        <meta property="og:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://smartloop.ai/" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Head>
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* ── Hero ───────────────────────────────────────── */}
          <section className={styles.hero}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <HeroDrift />
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>smartloop · a local-first AI company</p>
              <h1 className={styles.heroTitle}>
                Frontier quality. <span className={styles.accent}>Local first.</span>
              </h1>
              <p className={styles.heroLede}>
                We’re an AI research company. We make private software that runs on the computer you already own: a coding
                agent for your terminal, a desktop app for your documents, and a GPU by the second when a job
                outgrows your machine.
              </p>
              <div className={styles.heroCta}>
                <div className={styles.heroCtaRow}>
                  <a href="#products" className={styles.btnPrimary}>what we make</a>
                  <Link to="/contact/" className={styles.btnGhost}>talk to us</Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── The story ──────────────────────────────────── */}
          <section className={styles.shell}>
            <div className={styles.section}>
              <p className={styles.kicker}>Why we exist</p>
              <h2 className={styles.h2}>AI shouldn’t mean renting someone else’s computer.</h2>
              <p className={styles.sub}>
                Most AI tools send every prompt, file and answer on a round trip through a data center you’ll never
                see, billed by the token. We think much of that work belongs on your own machine.
              </p>
              <p className={styles.sub}>
                Small open models are now good enough to read your documents and to write and check your code
                without the round trip. So we build tools around them: opinionated, quick to install, and private by
                default. And when a job really does need a big GPU, we’d rather hand you one by the second than lock
                you into a platform.
              </p>
            </div>
          </section>

          {/* ── What we make ───────────────────────────────── */}
          <section className={styles.shell} id="products">
            <div className={styles.section}>
              <p className={styles.kicker}>What we make</p>
              <h2 className={styles.h2}>Two products. One idea.</h2>
              <div className={styles.productsGrid}>
                <div className={styles.productCard}>
                  <p className={styles.productName}>Docent</p>
                  <p className={styles.productTagline}>Your private AI, in the terminal or on the desktop.</p>
                  <div className={styles.productWays}>
                    {DOCENT_WAYS.map((w) => (
                      <Link key={w.to} to={w.to} className={styles.productWay}>
                        <span className={styles.productWayName}>{w.name} <span aria-hidden="true">→</span></span>
                        <span className={styles.docDesc}>{w.desc}</span>
                        <span className={styles.productFacts}>{w.facts}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.productCard}>
                  <p className={styles.productName}>gpushed</p>
                  <p className={styles.productTagline}>Your own NVIDIA GPU, from your Mac.</p>
                  <div className={styles.productWays}>
                    <a href="https://gpushed.dev" className={styles.productWay} target="_blank" rel="noopener noreferrer">
                      <span className={styles.productWayName}>gpushed.dev <span aria-hidden="true">↗</span></span>
                      <span className={styles.docDesc}>
                        Sign in, add credit and get a GPU box with CUDA, Python, Node.js and Rust ready in a few minutes.
                        No cloud account or quota requests. Billed by the second; delete it when you’re done.
                      </span>
                      <span className={styles.productFacts}>Apple silicon Macs · from $0.88 an hour</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── How we work ────────────────────────────────── */}
          <section className={styles.shell}>
            <div className={styles.section}>
              <h2 className={styles.h2}>How we work</h2>
              <ol className={styles.steps}>
                {PRINCIPLES.map(([title, desc], i) => (
                  <li key={title}>
                    <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                    <p className={styles.stepTitle}>{title}</p>
                    <p className={styles.stepDesc}>{desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Closing + partners ─────────────────────────── */}
          <section className={styles.shell}>
            <div className={styles.closing}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <p className={styles.eyebrow}>free to start</p>
              <h2 className={styles.closingTitle}>Start asking. <span className={styles.accent}>Locally.</span></h2>
              <p className={styles.sub}>Use Docent where you work: in your terminal, or on your desktop with Docent Studio.</p>
              <div className={styles.closingCta}>
                <Link to="/docent" className={styles.btnPrimary}>get docent</Link>
                <Link to="/download" className={styles.btnGhost}>download studio</Link>
              </div>
            </div>
            <div className={styles.partners}>
              <p className={styles.partnersLabel}>Accelerated by</p>
              <div className={styles.partnerRow}>
                <span className={styles.partnerTile}>
                  <img src="img/logos/nvidia-color.png" className={styles.logoLight} alt="NVIDIA" />
                  <img src="img/logos/nvidia-color-dark.png" className={styles.logoDark} alt="NVIDIA" />
                </span>
                <span className={styles.partnerTile}>
                  <img src="img/logos/microsoft-logo.svg" className={styles.logoLight} alt="Microsoft" />
                  <img src="img/logos/microsoft-logo-dark.svg" className={styles.logoDark} alt="Microsoft" />
                </span>
                <span className={styles.partnerTile}>
                  <img src="img/logos/Google_for_Startups_logo.svg.png" className={styles.logoLight} alt="Google for Startups" />
                  <img src="img/logos/google-for-startups-dark.png" className={styles.logoDark} alt="Google for Startups" />
                </span>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}
