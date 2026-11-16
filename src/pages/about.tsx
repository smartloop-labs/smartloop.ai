import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoldenGate from '../components/GoldenGate';
import styles from './home.module.css';
import local from './about.module.css';

// The company story: who we are, why we started, how we work, then a way to
// reach us. Same building blocks as the home page so it reads as one site.

const DESCRIPTION = 'Smartloop is a group of passionate individuals in San Francisco with years of experience building software. We make the AI products we want to use ourselves: Docent and gpushed.';

// The About page has its own card: the Golden Gate at night, from the same
// drawing as <GoldenGate />. Bump ?v= when the image changes so X re-fetches.
const SOCIAL_CARD = 'https://smartloop.ai/img/about-social-card.png?v=1';

const PRINCIPLES: [string, string][] = [
  ['We use it first', 'Everything we ship, we run on our own work first. If it isn’t good enough for us, it isn’t ready for you.'],
  ['Experience over hype', 'Years of building software for developers and companies taught us to favor what works over what demos well.'],
  ['Private by default', 'Your code and documents stay on your machine. It’s how we want our own work handled.'],
];

export default function About(): ReactNode {
  return (
    <div id="app" className="body">
      <Head>
        <title>About us | Smartloop</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="About us | Smartloop" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={SOCIAL_CARD} />
        <meta property="og:image:secure_url" content={SOCIAL_CARD} />
        <meta property="og:image:alt" content="Smartloop — We build what we want to use. San Francisco, CA" />
        <meta name="twitter:image" content={SOCIAL_CARD} />
        <meta name="twitter:title" content="About us | Smartloop" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://smartloop.ai/about/" />
      </Head>
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* ── Hero ───────────────────────────────────────── */}
          <section className={styles.hero}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>who we are</p>
              <h1 className={styles.heroTitle}>
                We build what <span className={styles.accent}>we want to use.</span>
              </h1>
              <p className={styles.heroLede}>
                Smartloop is a group of passionate individuals in San Francisco. We’ve spent years building developer tools,
                infrastructure and AI products, and we make private AI that’s good enough to trust with real work, because we need it too.
              </p>
            </div>
          </section>

          {/* ── San Francisco ──────────────────────────────── */}
          <section className={styles.shell}>
            <GoldenGate className={local.picture} />
          </section>

          {/* ── The story ──────────────────────────────────── */}
          <section className={styles.shell}>
            <div className={styles.section}>
              <div className={local.story}>
                <p className={styles.kicker}>Our story</p>
                <p className={local.storyLead}>
                  It started with a problem.{' '}
                  <span className={styles.statementDim}>
                    We were working with a firm in Spain on a project for a large bank, and the bank’s information was too sensitive to send to the cloud.
                  </span>{' '}
                  The AI had to run on their own machines.
                </p>
                <p className={local.storyText}>
                  The usual answer, vectorize the documents and put a single local model on top, didn’t hold up. It was full of
                  errors and hallucinations, and nobody could trust what it said. So we built our own: models we picked and
                  tuned, orchestrated to work together, running entirely on hardware the client controlled.
                </p>
                <p className={local.storyText}>
                  It worked, and other clients had the same problem. What we built for one bank became the foundation we now
                  use to serve all of them, and the products anyone can use: Docent Studio, Docent Code and gpushed.
                </p>
              </div>

              <ol className={styles.beliefs}>
                {PRINCIPLES.map(([title, desc], i) => (
                  <li key={title} className={styles.belief}>
                    <span className={styles.beliefNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.beliefTitle}>{title}</span>
                    <span className={styles.beliefDesc}>{desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Talk to us ─────────────────────────────────── */}
          <section className={`${styles.shell} ${local.lastSection}`}>
            <div className={styles.section}>
              <div className={styles.centerHead}>
                <p className={styles.kicker}>Talk to us</p>
                <h2 className={styles.h2}>You’ll hear from the people who build it.</h2>
                <p className={styles.sub}>
                  Rolling out Docent across a team, running a job on gpushed, or just want to tell us what’s missing? Write to us.
                  The people who make the product read every message.
                </p>
              </div>
              <div className={`${styles.heroCtaRow} ${local.ctaRow}`}>
                <Link to="/contact/" className={styles.btnPrimary}>talk to us</Link>
                <a href="/#products" className={styles.btnGhost}>what we make</a>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}
