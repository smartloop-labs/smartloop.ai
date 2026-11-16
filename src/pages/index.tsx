import { useEffect, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroDrift from '../components/HeroDrift';
import styles from './home.module.css';

// smartloop.ai is the company, the way 37signals sits over Basecamp and HEY:
// the story, then what it makes. Docent is one product used two ways, like
// Claude and Claude Code: Docent Studio on the desktop, Docent in the terminal
// for coding. Both live on /docent (#desktop, #coding); gpushed has its own site.

// `preview` is a few lines of the product at work, drawn as a tiny window:
// [kind, text] where kind styles the line (prompt, out, ok).
type Line = ['prompt' | 'out' | 'ok', string];
// `theme` paints the card in that tool's own site colors (home.module.css).
type Card = { label: string; name: string; desc: string; facts: string; to: string; external?: boolean; chrome: 'window' | 'terminal'; preview: Line[]; theme?: 'screenforge' | 'anacraft'; logo: string };

// One product per group; Docent's two cards are the same product used two
// ways (desktop and coding), like Claude and Claude Code.
type Group = { product: string; line: string; cards: Card[] };

const GROUPS: Group[] = [
  {
    product: 'Docent',
    line: 'Your personal assistant for work, and for coding',
    cards: [
      {
        label: 'Private AI assistant',
        name: 'Docent Studio',
        desc: 'Your personal assistant for work: it produces documents, connects to your external systems and creates skills for the work you repeat.',
        facts: 'macOS · Linux · Windows · Apache 2.0',
        to: '/docent#desktop',
        logo: 'studio',
        chrome: 'window',
        preview: [['prompt', 'Draft the weekly report from Linear'], ['out', 'Linear · 18 issues closed this week'], ['ok', 'weekly-report.docx · saved as /weekly-report']],
      },
      {
        label: 'Coding agent',
        name: 'Docent',
        desc: 'Ask for a change and Docent writes it, checks it with your language servers and your build, and fixes what fails.',
        facts: 'macOS · Linux · Windows · MIT',
        to: '/docent#coding',
        logo: 'docent',
        chrome: 'terminal',
        preview: [['prompt', 'docent "retry failed uploads"'], ['out', '+12 −3  src/upload.rs'], ['ok', 'cargo build · rust-analyzer: clean']],
      },
    ],
  },
  {
    product: 'gpushed',
    line: 'A GPU by the second',
    cards: [
      {
        label: 'GPU',
        name: 'gpushed',
        desc: 'An NVIDIA GPU box from your Mac in minutes, with CUDA, Python, Node.js and Rust ready. No cloud account; billed by the second.',
        facts: 'Apple silicon Macs · from $0.88/hr',
        to: 'https://gpushed.dev',
        logo: '/img/logos/gpushed.svg',
        external: true,
        chrome: 'terminal',
        preview: [['prompt', 'gpushed up'], ['out', '1x L4 24 GB · us-central1'], ['ok', 'ready · $0.88/hr · gpushed ssh']],
      },
    ],
  },
];

// Smaller things we build and use ourselves, in their own row under the
// products.
const TOOLS: Group = {
  product: 'Tools',
  line: 'Things we build and use ourselves',
  cards: [
    {
      label: 'AI screen editor',
      name: 'ScreenForge',
      desc: 'Record your screen, then tell it what you want: cut the ums, zoom on your clicks, add music. It edits the timeline while you watch.',
      facts: 'macOS · Linux · Windows · Apache 2.0',
      to: 'https://screenforge.studio',
      logo: '/img/logos/screenforge.svg',
      external: true,
      theme: 'screenforge',
      chrome: 'window',
      preview: [['prompt', 'cut the ums and the long pauses'], ['out', 'timeline · 14 cuts · 3:12 → 2:41'], ['ok', 'zoomed on clicks · music added']],
    },
    {
      label: 'Analytics dashboard',
      name: 'Anacraft',
      desc: 'Your Google Analytics (GA4), mined block by block in a Minecraft-themed dashboard for the terminal.',
      facts: 'Terminal (TUI) · GA4',
      to: 'https://anacraft.dev',
      logo: 'anacraft',
      external: true,
      theme: 'anacraft',
      chrome: 'terminal',
      preview: [['prompt', 'anacraft'], ['out', 'GA4 · last 7 days · mining…'], ['ok', 'top page /docent · biggest ore']],
    },
  ],
};

// What we believe, beside the story headline. Short enough to scan.
const BELIEFS: [string, string][] = [
  ['Local first', 'Small open models now read your documents and write and check your code, with no round trip.'],
  ['Opinionated', 'We pick and tune the models, so there is nothing to choose or configure.'],
  ['No lock-in', 'When a job needs a big GPU, we hand you one by the second, and you delete it when you’re done.'],
];

const DESCRIPTION = 'Smartloop is an AI research company. We make private software that runs on the computer you already own: Docent, for your terminal and your desktop, and gpushed, a GPU by the second when a job outgrows your machine.';

// A product's logo as a small tile. Docent Studio's mark is drawn inline in
// the site colors so it follows light and dark; Docent (the CLI) has no
// mark, so it gets its prompt; the others are their own site icons.
function CardLogo({ logo }: { logo: string }): ReactNode {
  if (logo === 'studio') {
    return (
      <span className={styles.cardLogo} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M10 5H11A6 6 0 0 1 17 11V18H10A6 6 0 0 1 4 12V11A6 6 0 0 1 10 5Z" fill="var(--sl-white)" />
          <circle cx="16.7" cy="8.4" r="3" fill="var(--sl-accent)" />
        </svg>
      </span>
    );
  }
  if (logo === 'anacraft') {
    // Anacraft's pixel "A" from its favicon, without the favicon's black
    // square: drawn in the card's theme so it follows light and dark.
    return (
      <span className={`${styles.cardLogo} ${styles.cardLogoThemed}`} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" shapeRendering="crispEdges" fill="currentColor">
          <rect x="6" y="1" width="4" height="1" />
          <rect x="5" y="2" width="6" height="1" />
          <rect x="4" y="3" width="8" height="1" />
          <rect x="4" y="4" width="8" height="1" />
          <rect x="3" y="5" width="4" height="1" />
          <rect x="9" y="5" width="4" height="1" />
          <rect x="3" y="6" width="4" height="1" />
          <rect x="9" y="6" width="4" height="1" />
          <rect x="2" y="7" width="4" height="1" />
          <rect x="10" y="7" width="4" height="1" />
          <rect x="2" y="8" width="4" height="1" />
          <rect x="10" y="8" width="4" height="1" />
          <rect x="1" y="9" width="4" height="1" />
          <rect x="11" y="9" width="4" height="1" />
          <rect x="1" y="10" width="14" height="1" />
          <rect x="1" y="11" width="14" height="1" />
          <rect x="1" y="12" width="4" height="1" />
          <rect x="11" y="12" width="4" height="1" />
          <rect x="1" y="13" width="4" height="1" />
          <rect x="11" y="13" width="4" height="1" />
          <rect x="1" y="14" width="4" height="1" />
          <rect x="11" y="14" width="4" height="1" />
        </svg>
      </span>
    );
  }
  if (logo === 'docent') {
    return <span className={`${styles.cardLogo} ${styles.cardLogoPrompt}`} aria-hidden="true">›_</span>;
  }
  return <img className={styles.cardLogoImg} src={logo} alt="" width={28} height={28} />;
}

function renderGroup(g: Group): ReactNode {
  return (
    <div key={g.product} className={styles.productGroup} style={{ flexGrow: g.cards.length }}>
      <p className={styles.groupLabel}>
        <span className={styles.groupName}>{g.product}</span> · {g.line}
      </p>
      <div className={styles.groupCards}>
        {g.cards.map((c) => {
          const cls = c.theme ? `${styles.productCard} ${styles.themed} ${styles[`theme_${c.theme}`]}` : styles.productCard;
          const body = (
            <>
              <span className={styles.preview} aria-hidden="true">
                <span className={styles.previewBar}>
                  <span className={styles.previewDots}><i /><i /><i /></span>
                  <span className={styles.previewTitle}>{c.chrome === 'window' ? c.name : 'zsh'}</span>
                </span>
                {c.preview.map(([kind, text]) => (
                  <span key={text} className={`${styles.previewLine} ${styles[`pl_${kind}`]}`}>
                    {kind === 'prompt' ? (c.chrome === 'terminal' ? '$ ' : '› ') : kind === 'ok' ? '✓ ' : '  '}
                    {text}
                  </span>
                ))}
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardLabel}>{c.label}</span>
                <span className={styles.cardHead}>
                  <CardLogo logo={c.logo} />
                  <span className={styles.cardName}>{c.name} <span className={styles.cardArrow} aria-hidden="true">{c.external ? '↗' : '→'}</span></span>
                </span>
                <span className={styles.cardDesc}>{c.desc}</span>
                <span className={styles.cardFacts}>{c.facts}</span>
              </span>
            </>
          );
          return c.external ? (
            <a key={c.name} href={c.to} className={cls} target="_blank" rel="noopener noreferrer">{body}</a>
          ) : (
            <Link key={c.name} to={c.to} className={cls}>{body}</Link>
          );
        })}
      </div>
    </div>
  );
}

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
                agent for your terminal, a personal assistant for your work, and a GPU by the second when a job
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
            <div className={`${styles.section} ${styles.statement}`}>
              <p className={styles.kicker}>Why we exist</p>
              {/* One statement, read at a glance: the claim in full contrast,
                  the context dimmed. */}
              <p className={styles.statementText}>
                AI shouldn’t mean renting someone else’s computer.{' '}
                <span className={styles.statementDim}>
                  Most tools send every prompt and file through a data center you’ll never see, billed by the token.
                </span>{' '}
                We build private AI that runs on yours.
              </p>
              <ol className={styles.beliefs}>
                {BELIEFS.map(([title, desc], i) => (
                  <li key={title} className={styles.belief}>
                    <span className={styles.beliefNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.beliefTitle}>{title}</span>
                    <span className={styles.beliefDesc}>{desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── What we make ───────────────────────────────── */}
          <section className={styles.shell} id="products">
            <div className={styles.section}>
              <div className={styles.centerHead}>
                <p className={styles.kicker}>What we make</p>
                <h2 className={styles.h2}>Your complete local AI suite.</h2>
                <p className={styles.sub}>
                  Docent, your personal assistant for work and your coding agent in the terminal, a GPU by the second when a job outgrows your machine, and the tools we build along the way.
                </p>
              </div>

              {/* Equal cards, grouped by product: Docent spans two, gpushed one;
                  the tools sit in their own row underneath. */}
              <div className={styles.productGroups}>
                {GROUPS.map(renderGroup)}
              </div>
              <div className={`${styles.productGroups} ${styles.toolsRow}`}>
                {renderGroup(TOOLS)}
              </div>
            </div>
          </section>

          {/* ── Closing + partners ─────────────────────────── */}
          <section className={styles.shell}>
            <div className={styles.closing}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <p className={styles.eyebrow}>free to start</p>
              <h2 className={styles.closingTitle}>Start asking. <span className={styles.accent}>Locally.</span></h2>
              <p className={styles.sub}>Use Docent where you work: on your desktop with Docent Studio, or in your terminal for coding.</p>
              <div className={styles.closingCta}>
                <Link to="/docent" className={styles.btnPrimary}>get docent</Link>
                <Link to="/docent#desktop" className={styles.btnGhost}>docent studio</Link>
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
