import { useEffect, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroDrift from '../components/HeroDrift';
import DocentMark from '../components/DocentMark';
import styles from './home.module.css';
import p from './products.module.css';

// smartloop.ai is the company, the way 37signals sits over Basecamp and HEY:
// the story, then what it makes. Docent is one product used two ways, like
// Claude and Claude Code: Docent Studio on the desktop, Docent in the terminal
// for coding. They live on /studio and /docent; gpushed has its own site.

type Card = { label: string; name: string; desc: string; facts: string; to: string; external?: boolean; logo: string; points: string[] };

// One product per group; Docent's two cards are the same product used two
// ways (desktop and coding), like Claude and Claude Code.
type Group = { product: string; cards: Card[] };

const GROUPS: Group[] = [
  {
    product: 'Docent',
    cards: [
      {
        label: 'AI assistant',
        name: 'Docent Studio',
        desc: 'Your assistant for work: it writes documents, connects to the systems you use and turns the work you repeat into skills.',
        facts: 'macOS · Linux · Windows · free',
        to: '/studio',
        logo: 'studio',
        points: ['Your files indexed on your machine', 'Every answer cites its source', 'Models fitted to your hardware'],
      },
      {
        label: 'Coding agent',
        name: 'Docent Code',
        desc: 'Ask for a change and Docent Code writes it, checks it with your language servers and your build, and fixes what fails.',
        facts: 'macOS · Linux · Windows · MIT',
        to: '/docent',
        logo: 'docent',
        points: ['Rust, Go, TypeScript, Python, C and C++', 'Runs commands once you approve them', 'MCP servers and web search'],
      },
    ],
  },
  {
    product: 'gpushed',
    cards: [
      {
        label: 'GPU',
        name: 'gpushed',
        desc: 'An NVIDIA GPU box from your Mac in minutes, with CUDA, Python, Node.js and Rust ready. No cloud account; billed by the second.',
        facts: 'Apple silicon Macs · from $0.88/hr',
        to: 'https://gpushed.dev',
        logo: '/img/logos/gpushed.svg',
        points: ['NVIDIA T4, L4 or A100', '100 GB SSD and a public IP included', 'Prepaid: never charged more than you add'],
        external: true,
      },
    ],
  },
];

// What we believe, beside the story headline. Short enough to scan.
const BELIEFS: [string, string][] = [
  ['Local first', 'Small open models now read your documents and write and check your code, with no round trip.'],
  ['Opinionated', 'We pick and tune the models, so there is nothing to choose or configure.'],
  ['No lock-in', 'When a job needs a big GPU, we hand you one by the second, and you delete it when you’re done.'],
];

const DESCRIPTION = 'Smartloop is an AI research company. We make private software that runs on the computer you already own: Docent, for your terminal and your desktop, and gpushed, a GPU by the second when a job outgrows your machine.';

// A product's logo as a small tile: Docent's own marks (Studio on white,
// Code on black, in either theme); the others are their own site icons.
function CardLogo({ logo }: { logo: string }): ReactNode {
  if (logo === 'studio' || logo === 'docent') {
    const which = logo === 'studio' ? 'studio' : 'code';
    return (
      <span className={`${p.logo} docent-tile--${which}`} aria-hidden="true">
        <DocentMark product={which} size={26} />
      </span>
    );
  }
  return <img className={p.logoImg} src={logo} alt="" width={28} height={28} />;
}

function renderGroup(g: Group): ReactNode {
  return (
    <div key={g.product} className={styles.productGroup} style={{ flexGrow: g.cards.length }}>
      <div className={styles.groupCards}>
        {g.cards.map((c) => {
          const cls = p.card;
          const body = (
            <>
              <span className={p.head}>
                <CardLogo logo={c.logo} />
                <span className={p.headText}>
                  <span className={p.label}>{c.label}</span>
                  <span className={p.name}>{c.name}</span>
                </span>
                {/* The card is a link; the arrow says so at a glance, and
                    says "opens elsewhere" for the external products. */}
                <span className={p.arrow} aria-hidden="true">{c.external ? '↗' : '→'}</span>
              </span>
              <span className={p.desc}>{c.desc}</span>
              <span className={p.points}>
                {c.points.map((pt) => <span key={pt} className={p.point}>{pt}</span>)}
              </span>
              <span className={p.facts}>
                {c.facts.split(' · ').map((f) => <span key={f} className={p.fact}>{f}</span>)}
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
          <section className={`${styles.hero} ${styles.heroHome}`}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <HeroDrift />
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>smartloop · local-first AI research</p>
              <h1 className={styles.heroTitle}>
                Frontier quality. <span className={styles.accent}>Local first.</span>
              </h1>
              <p className={styles.heroLede}>
                We’re an AI research company. We make private software that runs on the computer you already own: a local AI
                coding agent, a personal assistant for your work, and a GPU by the second when a job
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
                  Docent, your personal assistant for work and your coding agent in the terminal, and a GPU by the second when a job outgrows your machine.
                </p>
              </div>

              {/* Equal cards, grouped by product: Docent spans two, gpushed one. */}
              <div className={styles.productGroups}>
                {GROUPS.map(renderGroup)}
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
                <Link to="/studio" className={styles.btnGhost}>docent studio</Link>
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
