import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './company.module.css';

// smartloop.ai is the company, the way 37signals sits over Basecamp and HEY:
// the story first, then the products it makes. Each product keeps its own
// page (/docent, /studio) or its own site (gpushed.dev).

type Product = {
  name: string;
  mark: string;
  tagline: string;
  body: string;
  facts: string[];
  cta: string;
  to: string;
  external?: boolean;
};

const PRODUCTS: Product[] = [
  {
    name: 'Docent',
    mark: 'D',
    tagline: 'The private coding agent for your terminal.',
    body: 'Ask for a change and Docent writes it, checks it with your language servers and your build, and hands any errors back to the model until it passes. It chats with your PDFs and Office files too.',
    facts: ['macOS · Linux · Windows', 'Open source (MIT)'],
    cta: 'Meet Docent',
    to: '/docent',
  },
  {
    name: 'Docent Studio',
    mark: 'S',
    tagline: 'A private desktop app for local AI.',
    body: 'Chat with your documents, connect MCP servers and add skills, with the models picked and sized for your machine. Nothing to configure and no account needed.',
    facts: ['macOS · Linux · Windows', 'Open source (Apache 2.0)'],
    cta: 'Meet Docent Studio',
    to: '/studio',
  },
  {
    name: 'gpushed',
    mark: 'G',
    tagline: 'Your own NVIDIA GPU, from your Mac.',
    body: 'Sign in, add credit and get a GPU box with CUDA, Python, Node.js and Rust ready in a few minutes. No cloud account or quota requests. Billed by the second; delete it when you’re done.',
    facts: ['Apple silicon Macs', 'From $0.88 an hour'],
    cta: 'Visit gpushed.dev',
    to: 'https://gpushed.dev',
    external: true,
  },
];

const PRINCIPLES: { title: string; body: string }[] = [
  { title: 'Local first.', body: 'Your files and prompts stay on your machine unless you choose otherwise.' },
  { title: 'Opinionated.', body: 'We pick and tune the models so you don’t have to learn the difference.' },
  { title: 'Small and sharp.', body: 'Each product does one job, and does it well.' },
  { title: 'Open where it counts.', body: 'Docent and Docent Studio are open source. Read the code that runs on your computer.' },
];

const DESCRIPTION = 'Smartloop makes private software that runs on the computer you already own: Docent, Docent Studio and gpushed.';

export default function Home(): ReactNode {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Smartloop Inc.',
    url: 'https://smartloop.ai',
    logo: 'https://smartloop.ai/img/logo-dark.svg',
    description: DESCRIPTION,
    brand: PRODUCTS.map((p) => ({ '@type': 'Brand', name: p.name })),
  };

  return (
    <div id="app" className="body">
      <Head>
        <title>Smartloop | Private software for the computer you already own</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="Smartloop | Private software for the computer you already own" />
        <meta property="og:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://smartloop.ai/" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Head>
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* ── The story ─────────────────────────────────── */}
          <section className={styles.story}>
            <p className={styles.eyebrow}>Smartloop</p>
            <h1 className={styles.title}>
              We make private software that runs on the computer <span className={styles.accent}>you already own.</span>
            </h1>
            <div className={styles.prose}>
              <p>
                Most AI tools rent you someone else’s computer. Every prompt, file and answer makes a round trip
                through a data center you’ll never see, billed by the token.
              </p>
              <p>
                We think much of that work belongs on your own machine. Small open models are now good enough to
                read your documents and to write and check your code without the round trip. So we build tools
                around them: opinionated, quick to install, and private by default.
              </p>
              <p>
                And when a job really does need a big GPU, we’d rather hand you one by the second than lock you
                into a platform.
              </p>
            </div>
          </section>

          {/* ── What we make ──────────────────────────────── */}
          <section className={styles.section} aria-labelledby="products">
            <h2 id="products" className={styles.h2}>What we make</h2>
            <ul className={styles.products}>
              {PRODUCTS.map((p) => (
                <li key={p.name} className={styles.product}>
                  <span className={styles.mark} aria-hidden="true">{p.mark}</span>
                  <div className={styles.productBody}>
                    <h3 className={styles.productName}>{p.name}</h3>
                    <p className={styles.tagline}>{p.tagline}</p>
                    <p className={styles.productText}>{p.body}</p>
                    <ul className={styles.facts}>
                      {p.facts.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    {p.external ? (
                      <a href={p.to} className={styles.cta} target="_blank" rel="noopener noreferrer">
                        {p.cta} <span aria-hidden="true">→</span>
                      </a>
                    ) : (
                      <Link to={p.to} className={styles.cta}>
                        {p.cta} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── How we work ───────────────────────────────── */}
          <section className={styles.section} aria-labelledby="principles">
            <h2 id="principles" className={styles.h2}>How we work</h2>
            <dl className={styles.principles}>
              {PRINCIPLES.map((x) => (
                <div key={x.title} className={styles.principle}>
                  <dt>{x.title}</dt>
                  <dd>{x.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Sign-off ──────────────────────────────────── */}
          <section className={styles.signoff}>
            <p>
              Smartloop Inc. makes Docent, Docent Studio and gpushed.{' '}
              <Link to="/contact/" className={styles.inlineLink}>Say hello</Link> or{' '}
              <a href="https://github.com/smartloop-labs" className={styles.inlineLink} target="_blank" rel="noopener noreferrer">
                read our code
              </a>.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
