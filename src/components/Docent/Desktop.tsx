import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useLatestRelease from '../../hooks/useLatestRelease';
import useVisitorPlatform from '../../hooks/useVisitorPlatform';
import { DirectDownloadButton } from '../StoreBadge';
import { Check, GitHubIcon } from './Terminal';
import styles from '../../pages/home.module.css';
import local from '../../pages/docent.module.css';

// The Desktop tab of /docent: Docent Studio, Docent on the desktop. Built on
// the same sections as the Coding tab (hero, demo, what it does, how it works,
// models, more, FAQ) so the two read as one product.

const DESCRIPTION =
  'Docent is your personal assistant for work. It produces documents, connects to your external systems and creates skills for the work you repeat, with open models sized for your machine. Your documents never leave it.';

const points: [string, string][] = [
  ['Produces documents.', 'Reports, summaries, comparisons and drafts, written from your files and your systems, with every claim cited to its source.'],
  ['Connects to your systems.', 'Notion, Linear, Trello, monday.com and Canva in one click through MCP; any other server by URL.'],
  ['Creates skills.', 'Turn the work you repeat into a skill, a markdown file the assistant runs. Type / to start one.'],
  ['Reads what you give it.', 'PDFs, Office files, scans and photos, indexed on your machine, with a vision model for the scans.'],
];

// What happens from install to answer, in order.
const loop: [string, string][] = [
  ['Install, and it fits itself.', 'One installer for your platform. On first launch it checks your memory and GPU and fits the models to them, integrated graphics included.'],
  ['Bring your documents.', 'Make a project and drop in your files. They are indexed on your machine. Nothing uploads.'],
  ['Ask.', 'The orchestrator splits the request and routes each step to the open model built for it. You never pick one.'],
  ['Check the answer.', 'Each answer cites the file and passage it came from, so you can open the source and read it yourself.'],
];

const beyond: [string, string][] = [
  ['Web search', 'Bring current sources into an answer. Only the query leaves your machine; local models read the pages and cite them.'],
  ['Local API', 'An OpenAI-compatible endpoint on localhost for creating projects, uploading documents and wiring Docent into your own apps.'],
  ['The same agent, in your terminal', 'Docent runs the same agent, models and projects from your shell, your scripts or over SSH.'],
];

const faqs = [
  {
    q: 'What is Docent Studio?',
    a: 'Docent Studio is a local AI assistant that runs entirely on your own machine. You install it and start asking; there are no models to choose, nothing to configure, and no account to create. It reads your documents, connects to your tools, and generates content without sending your data anywhere.',
  },
  {
    q: 'How does Docent Studio work?',
    a: 'Docent Studio breaks each request into smaller tasks and routes them to the best on-device model. We curate the models it ships with — open small language models including Google’s Gemma family (such as Gemma 3) and Qwen2-VL for vision — and its orchestration model (sl-mini) picks the right one by capability and workload. You never see that choice; you just get the answer.',
  },
  {
    q: 'Do I need to pick a model or configure anything?',
    a: 'No. That is the point. There are hundreds of open models, each with its own file formats, quantizations, and memory requirements, and most people have no reason to learn the difference. Docent Studio is opinionated: we curate the models, size them to your machine on first launch, and swap in better ones as they land. There is nothing to choose or configure.',
  },
  {
    q: 'Is Docent Studio free?',
    a: 'Yes, Docent Studio is free to use, with models that are regularly updated to handle most everyday tasks efficiently. No account or credit card is needed, and it stays free for organizations running it at scale. The one metered part is AI search, which runs through us: every account gets a monthly allowance of searches, and you can buy more from your dashboard. If you want a hand getting it running, you can contact us to set it up and get it working on your data — on-premise deployment, tuning for your use case, rollout across your team, and a dedicated point of contact. Reach us at support@smartloop.ai.',
  },
  {
    q: 'Is my data private and offline?',
    a: 'Yes. Docent Studio runs models on-device, so your documents and conversations stay on your machine, and it works offline for most everyday tasks. AI search is the exception: it sends only a search query to find current web information, never your documents or conversation, and you can turn it off per project. Docent Studio sizes the models it runs to the memory your machine has. The minimum is an Apple Silicon Mac (M3 or newer) with 16 GB of unified memory, or a Windows 11 / Linux machine with 16 GB of RAM and a Vulkan-capable GPU — integrated Intel, AMD, or NVIDIA graphics all qualify, and the Vulkan runtime ships with the app. More memory is better.',
  },
];

export default function DocentDesktop(): ReactNode {
  const platform = useVisitorPlatform();
  const { release } = useLatestRelease();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Docent Studio',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'macOS, Linux, Windows',
    description: DESCRIPTION,
    url: 'https://smartloop.ai/docent#desktop',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: 'Smartloop Inc.', url: 'https://smartloop.ai' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Head>
        <title>Docent Studio | Your personal assistant for work</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="Docent Studio | Your personal assistant for work" />
        <meta property="og:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://smartloop.ai/docent" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            {release ? <>docent studio v{release.version} · open source · Apache 2.0</> : <>open source · Apache 2.0</>}
          </p>
          <h1 className={styles.heroTitle}>
            Your personal assistant for work. <span className={styles.accent}>On your own machine.</span>
          </h1>
          <p className={styles.heroLede}>{DESCRIPTION}</p>
          <div className={styles.heroCta}>
            {platform && platform !== 'unknown'
              ? <DirectDownloadButton platform={platform} />
              : <Link to="/download" className={styles.btnPrimary}>download</Link>}
            <p className={styles.heroMeta}>free · macOS, Linux, Windows · no account</p>
            <p className={styles.ctaAlt} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Link
                to="https://github.com/smartloop-labs/docent-studio"
                className={styles.textLink}
                aria-label="Docent Studio on GitHub"
                title="Docent Studio on GitHub"
                style={{ display: 'inline-flex' }}
              >
                <GitHubIcon />
              </Link>
              <span aria-hidden="true">·</span>
              <Link to="/download" className={styles.textLink}>all downloads</Link>
              <span aria-hidden="true">·</span>
              <Link to="/docs/getting-started" className={styles.textLink}>getting started</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Demo ─────────────────────────────────────────── */}
      <section className={styles.shell}>
        <div className={styles.stage}>
          {/* The recording carries its own window and desktop, so it gets no
              frame of ours on top. */}
          <div className={styles.stageWindow}>
            <video
              src="/img/studio-demo.mp4"
              className={styles.stageVideo}
              aria-label="Docent Studio running a contract review across five agreements, routed between three open models on the device"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <p className={styles.stageCaption} style={{ marginTop: 20 }}>
            a contract review across five agreements · three open models · 0 bytes uploaded
          </p>
        </div>
      </section>

      <section className={styles.shell}>
        <div className={styles.section}>
          <p className={styles.kicker}>What it does</p>
          <h2 className={styles.h2}>Hand it the work. Check the result.</h2>
          <ul className={styles.docentPoints}>
            {points.map(([title, desc]) => (
              <li key={title}><Check /><span><b>{title}</b> {desc}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── From install to answer ───────────────────────── */}
      <section className={styles.shell}>
        <div className={styles.section}>
          <p className={styles.kicker}>How it works</p>
          <h2 className={styles.h2}>What happens when you ask.</h2>
          <ol className={local.loop}>
            {loop.map(([title, desc], i) => (
              <li key={title}>
                <span className={local.loopNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{desc}</p>
              </li>
            ))}
          </ol>
          <p className={styles.ctaAlt} style={{ marginTop: 24 }}>
            More in <Link to="/docs/model-orchestration" className={styles.textLink}>model orchestration</Link>.
          </p>
        </div>
      </section>

      {/* ── Models and platforms ─────────────────────────── */}
      <section className={styles.shell}>
        <div className={styles.section}>
          <p className={styles.kicker}>Open models</p>
          <h2 className={styles.h2}>Your models, sized to your machine.</h2>
          <div className={local.cards}>
            <div className={local.card}>
              <h3 className={styles.stepTitle}>Fitted on first launch</h3>
              <p className={styles.stepDesc}>
                Docent Studio checks the memory and GPU you have and fits open models such as Gemma, Qwen and Ministral to them. Nothing to pick, quantize or configure.
              </p>
            </div>
            <div className={local.card}>
              <h3 className={styles.stepTitle}>Routed for you</h3>
              <p className={styles.stepDesc}>
                A small orchestrator model plans each request and hands every step to the model built for it: vision for scans, a document model for reading, a reasoning model to compose.
              </p>
            </div>
            <div className={local.card}>
              <h3 className={styles.stepTitle}>macOS, Linux, Windows</h3>
              <p className={styles.stepDesc}>
                Apple Silicon Macs (M3 or newer) with 16 GB, or Windows 11 and Linux with 16 GB and a Vulkan-capable GPU, integrated graphics included. No account needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beyond chat ──────────────────────────────────── */}
      <section className={styles.shell}>
        <div className={styles.section}>
          <p className={styles.kicker}>More than chat</p>
          <h2 className={styles.h2}>Your documents, your tools, your apps.</h2>
          <ul className={styles.docentPoints}>
            {beyond.map(([title, desc]) => (
              <li key={title}><Check /><span><b>{title}.</b> {desc}</span></li>
            ))}
          </ul>
          <p className={styles.ctaAlt} style={{ marginTop: 24 }}>
            See <Link to="/docs/documents" className={styles.textLink}>documents</Link>, <Link to="/docs/skills" className={styles.textLink}>skills</Link>, <Link to="/docs/mcp-servers" className={styles.textLink}>connections</Link> and the <Link to="/docs/local-ai" className={styles.textLink}>local API</Link>.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className={styles.shell}>
        <div className={`${styles.section} ${styles.faqWrap} ${local.lastSection}`}>
          <div>
            <p className={styles.kicker}>FAQ</p>
            <h2 className={styles.h2}>Questions, answered.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(({ q, a }) => (
              <details key={q} className={styles.faqItem}>
                <summary className={styles.faqQ}>{q}</summary>
                <p className={styles.faqA}>
                  {a.split('support@smartloop.ai').flatMap((part, idx) =>
                    idx === 0
                      ? [part]
                      : [<a key={idx} className={styles.textLink} href="mailto:support@smartloop.ai">support@smartloop.ai</a>, part],
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
