import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useLatestRelease from '../../hooks/useLatestRelease';
import useVisitorPlatform from '../../hooks/useVisitorPlatform';
import { DirectDownloadButton } from '../StoreBadge';
import { Check } from './Terminal';
import styles from '../../pages/home.module.css';
import local from '../../pages/docent.module.css';

// The Desktop tab of /docent: Docent Studio, Docent on the desktop. Built on
// the same sections as the Coding tab (hero, demo, what it does, how it works,
// models, more, FAQ) so the two read as one product.

const DESCRIPTION =
  'Docent is your personal assistant for work. It produces documents, connects to your external systems and creates skills for the work you repeat, with open models sized for your machine. Your documents never leave it.';

// The hero line under the headline, which already says "personal assistant
// for work"; DESCRIPTION (search and social) keeps the full sentence.
const LEDE =
  'Docent Studio is your personal assistant for work, on open models sized for your machine. Your documents never leave it.';

// What it does, as chips under the lede: the hero shows the product, not
// just a promise.
const CHIPS: [string, string][] = [
  ['doc', 'produces documents'],
  ['plug', 'connects your systems'],
  ['spark', 'creates skills'],
];

const points: [string, string][] = [
  ['Produces documents.', 'Reports, summaries, comparisons and drafts, written from your files and your systems, with every claim cited to its source.'],
  ['Connects to your systems.', 'Notion, Linear, Trello, monday.com and Canva in one click through MCP; any other server by URL.'],
  ['Creates skills.', 'Turn the work you repeat into a skill, a markdown file the assistant runs. Type / to start one.'],
  ['Reads what you give it.', 'PDFs, Office files, scans and photos, indexed on your machine, with a vision model for the scans.'],
];

// Drawn from the legal starter's own documents (starters/gen_docs.py), so the
// panel shows what the download actually answers.
const legal = {
  run: {
    project: 'Halbrook Wren LLP',
    prompt: 'compare the 2026 draft with the current MSA',
    rows: [
      ['Termination', '60 days, no fee', '90 days + 50% fee', true],
      ['Liability cap', '12 months of fees', '6 months of fees', true],
      ['Change of control', '§4.3 exit right', 'deleted', true],
      ['Non-renewal notice', '120 days', '120 days', false],
    ] as [string, string, string, boolean][],
    refs: ['MSA-2024.pdf', 'Amendment-1.pdf', '2026-DRAFT.docx'],
  },
  points: [
    ['Five agreements.', 'A services agreement with its amendment and 2026 renewal draft, a mutual NDA, and a one-sided supply agreement.'],
    ['Issues list.', 'A first-pass review against a checklist — term, termination, liability, assignment — quoting each clause by section.'],
    ['Version compare.', 'What changed between the signed agreement and the draft, clause by clause.'],
  ] as [string, string][],
  models: [
    ['vision', 'qwen2-vl-2b'],
    ['document processing', 'ministral3-3b'],
    ['reasoning', 'qwen3.5-2b'],
  ] as [string, string][],
  starter: { href: '/starters/Halbrook-Wren-LLP.zip', size: '80 KB' },
};

function ChipIcon({ name }: { name: string }): ReactNode {
  const props = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (name === 'plug') return <svg {...props}><path d="M12 2v6" /><path d="M6 2v6" /><path d="M4 8h10a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-1a2 2 0 0 1 2-2z" /><path d="M9 15v5" /></svg>;
  if (name === 'spark') return <svg {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" /></svg>;
  return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>;
}

// The few line icons the legal template panel uses.
function Icon({ name }: { name: 'download' | 'arrow' | 'file' }): ReactNode {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'file': return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    case 'download': return <svg {...props}><path d="M12 3v12" /><polyline points="7 10 12 15 17 10" /><path d="M5 21h14" /></svg>;
    case 'arrow': return <svg {...props}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="8 7 17 7 17 16" /></svg>;
  }
}

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
            {release ? <>docent studio v{release.version} · runs on your device</> : <>runs on your device</>}
          </p>
          <h1 className={styles.heroTitle}>
            Hand it the work. <span className={styles.accent}>It stays on your machine.</span>
          </h1>
          <p className={styles.heroLede}>{LEDE}</p>
          <ul className={local.chips}>
            {CHIPS.map(([icon, text]) => (
              <li key={text} className={local.chip}><ChipIcon name={icon} />{text}</li>
            ))}
          </ul>
          <div className={styles.heroCta}>
            {platform && platform !== 'unknown'
              ? <DirectDownloadButton platform={platform} />
              : <Link to="/download" className={styles.btnPrimary}>download</Link>}
            <p className={styles.heroMeta}>free · macOS, Linux, Windows · no account</p>
            <p className={styles.ctaAlt} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Link to="/download" className={styles.textLink}>all downloads</Link>
              <span aria-hidden="true">·</span>
              <Link to="/docs/getting-started" className={styles.textLink}>getting started</Link>
            </p>
            <p className={local.crossLink}>
              Writing code? <Link to="/docent#coding" className={styles.textLink}>Docent, the coding agent for your terminal →</Link>
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
          <h2 className={styles.h2}>From a request to a finished document.</h2>
          <ul className={`${styles.docentPoints} ${local.pointGrid}`}>
            {points.map(([title, desc]) => (
              <li key={title}><Check /><span><b>{title}</b> {desc}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Template: legal ────────────────────────────── */}
      <section id="use-cases" className={styles.shell}>
        <div className={styles.section}>
          <p className={styles.kicker}>On-device privacy</p>
          <h2 className={styles.h2}>An associate that never leaves the office.</h2>
          <p className={styles.sub}>
            Some documents can&rsquo;t go to a cloud model. Docent Studio reads and reasons over them on your own machine, so privileged material never leaves the device — and every answer cites the clause it came from.
          </p>

          <div className={styles.caseCard}>
            <div className={styles.caseText}>
              <p className={styles.caseLead}>
                The template is a fictional firm&rsquo;s client file: five agreements and two review skills, ready to import into Studio.
              </p>
              <ul className={styles.casePoints}>
                {legal.points.map(([lead, rest]) => (
                  <li key={lead}><b>{lead}</b> {rest}</li>
                ))}
              </ul>
              <div className={styles.caseActions}>
                {/* The template is the lead: download it, then the guide
                    walks through what to ask it. */}
                <a className={styles.btnPrimary} href={legal.starter.href} download>
                  <Icon name="download" /> download template
                  <span className={styles.btnMeta}>{legal.starter.size}</span>
                </a>
                <Link to="/docs/templates/legal" className={styles.btnSecondary}>
                  read the guide <Icon name="arrow" />
                </Link>
                <Link to="/contact/" className={styles.btnGhost}>contact us</Link>
              </div>
            </div>

            <div className={styles.caseArt} aria-hidden="true">
              <div className={styles.caseWindow}>
                <div className={styles.windowBar}>
                  <i /><i /><i />
                  <span className={styles.windowTitle}>{legal.run.project}</span>
                  <span className={styles.pillLocal}><b /> on-device</span>
                </div>
                <div className={styles.caseBody}>
                  <p className={styles.caseAsk}>{legal.run.prompt}</p>
                  <div className={styles.caseGrid}>
                    <span className={styles.caseHead}>clause</span>
                    <span className={styles.caseHead}>current</span>
                    <span className={styles.caseHead}>2026 draft</span>
                    {legal.run.rows.map(([clause, now, next, flag]) => (
                      <div key={clause} className={styles.caseRow}>
                        <span>{clause}</span>
                        <span>{now}</span>
                        <span className={flag ? styles.caseFlag : undefined}>{next}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.caseRefs}>
                    {legal.run.refs.map((r) => (
                      <span key={r}><Icon name="file" /> {r}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.caseModels}>
                  {legal.models.map(([role, model]) => (
                    <span key={role}>{role} <b>{model}</b></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
          <ul className={`${styles.docentPoints} ${local.pointGrid}`}>
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
