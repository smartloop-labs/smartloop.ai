import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './index.module.css';

// Pricing, one tab per product: Docent Studio and Docent Code are free, gpushed is
// paid by the second. The hash picks the tab (#studio, #docent, #gpushed).
// gpushed prices mirror https://gpushed.dev — update both together.
const studioPlans = [
  {
    name: 'Free',
    badge: null as string | null,
    desc: 'For individuals running Docent Studio locally — no account or credit card needed.',
    features: [
      'Curated, capable models',
      'Orchestration comparable to large models',
      'Documents, tools and skills',
      '100% local & private',
      'Monthly AI search allowance — buy more from your dashboard',
    ],
    featuresLabel: 'Included in Free',
    price: 'Free',
    priceLabel: '',
    cta: 'Download now',
    ctaHref: '/download',
    featured: false,
  },
  // Enterprise sells services, not a license: Docent itself stays free at
  // any scale. Extra search credits are bought from the dashboard
  // (app.smartloop.ai), not sold here.
  {
    name: 'Enterprise',
    badge: 'For teams' as string | null,
    desc: 'Docent stays free at any scale. Hire us to set it up and get it working on your data.',
    features: [
      'Rollout across your team',
      'Setting up your local AI infrastructure',
      'Models fine-tuned on your data',
      'Ongoing updates and maintenance',
    ],
    featuresLabel: 'Everything in Free, plus:',
    price: 'Custom',
    priceLabel: '',
    cta: 'Contact us',
    ctaHref: '/contact/',
    featured: true,
  },
];

// Docent Code, the coding agent: MIT licensed and free; signing in is optional and
// draws AI search and cloud models from a monthly allowance.
const docentPlans = [
  {
    name: 'Free',
    badge: 'Open source' as string | null,
    desc: 'The coding agent for your terminal. MIT licensed and free to use, with no account needed.',
    features: [
      'Source on GitHub under the MIT license',
      'Local models such as Qwen, Gemma and Ministral',
      'Checks its work with your language servers and build',
      'macOS, Linux and Windows',
      'Optional sign-in: AI search and larger cloud models from a monthly allowance',
    ],
    featuresLabel: 'Included in Free',
    price: 'Free',
    priceLabel: '',
    cta: 'Install Docent Code',
    ctaHref: '/docent',
    featured: false,
  },
  {
    name: 'Enterprise',
    badge: 'For teams' as string | null,
    desc: 'Docent Code stays free at any scale. Hire us to roll it out and get it working on your codebase.',
    features: [
      'Rollout across your engineering team',
      'Setting up your local AI infrastructure',
      'Models fine-tuned on your code',
      'Ongoing updates and maintenance',
    ],
    featuresLabel: 'Everything in Free, plus:',
    price: 'Custom',
    priceLabel: '',
    cta: 'Contact us',
    ctaHref: '/contact/',
    featured: true,
  },
];

const gpushedPlans = [
  {
    name: 'Pay as you go',
    badge: null as string | null,
    desc: 'An NVIDIA GPU box from your Mac in minutes. No cloud account; billed by the second from a prepaid balance.',
    features: [
      'Billed per second, from creation until deletion',
      'Machine, 100 GB SSD and public IP included',
      'CUDA, Python, Node.js and Rust ready',
      'Stopped boxes keep their disk for about $0.03/hr',
      'Prepaid: you are never charged more than you add',
    ],
    featuresLabel: 'Every box includes',
    price: 'from $0.88',
    priceLabel: '/hr',
    cta: 'Get gpushed',
    ctaHref: 'https://gpushed.dev',
    featured: false,
  },
  {
    name: 'Top up',
    badge: 'Prepaid' as string | null,
    desc: 'Add credit through Stripe whenever you like. We email you at $2 and pause the box before your balance reaches $0.',
    features: [
      '$10 minimum top-up',
      'About 11 hours on an L4, or 2¼ hours on an A100',
      'No subscription, no commitment',
      'Unfunded for 24 hours: the box is deleted',
    ],
    featuresLabel: 'How credit works',
    price: '$10',
    priceLabel: 'minimum',
    cta: 'See GPU prices',
    ctaHref: 'https://gpushed.dev',
    featured: true,
  },
];

const gpus = [
  { name: 'Tesla T4', memory: '16 GB', spec: '8 vCPU · 30 GB RAM', price: '$0.91/hr' },
  { name: 'L4', memory: '24 GB', spec: '4 vCPU · 16 GB RAM', price: '$0.88/hr' },
  { name: 'A100', memory: '40 GB', spec: '12 vCPU · 85 GB RAM', price: '$4.44/hr' },
];

type Plan = (typeof studioPlans)[number];

type Product = 'studio' | 'docent' | 'gpushed';

const PRODUCTS: { id: Product; name: string; line: string }[] = [
  { id: 'studio', name: 'Docent Studio', line: 'Your private AI assistant for work. Runs on your machine; no account or credit card needed.' },
  { id: 'docent', name: 'Docent Code', line: 'The coding agent for your terminal. Open source, free, and no account needed.' },
  { id: 'gpushed', name: 'gpushed', line: 'A GPU box when a job outgrows your Mac. Pay only for the seconds it exists.' },
];

const productOf = (hash: string): Product => {
  const h = hash.replace('#', '');
  return h === 'docent' || h === 'gpushed' ? h : 'studio';
};

function PlanGrid({ plans }: { plans: Plan[] }): ReactNode {
  return (
    <div className={styles.pricingGrid}>
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`${styles.planCard} ${plan.featured ? styles.planCardFeatured : ''}`}
        >
          <div className={styles.planHeader}>
            <h3 className={styles.planName}>{plan.name}</h3>
            {plan.badge && <span className={styles.planBadge}>{plan.badge}</span>}
          </div>
          <div className={styles.planPrice}>
            <span className={styles.planPriceAmount}>{plan.price}</span>
            <span className={styles.planPriceUnit}>{plan.priceLabel}</span>
          </div>
          <p className={styles.planDesc}>{plan.desc}</p>
          <div className={styles.planCtaRow}>
            <Link
              to={plan.ctaHref}
              className={`${styles.planCta} ${plan.featured ? styles.planCtaFeatured : ''}`}
            >
              {plan.cta}
            </Link>
          </div>
          <p className={styles.planFeaturesLabel}>{plan.featuresLabel}</p>
          <ul className={styles.planFeatures}>
            {plan.features.filter(Boolean).map((feature) => (
              <li key={feature} className={styles.planFeature}>
                <span className={styles.planFeatureCheck} aria-hidden="true">[x]</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProductHead({ name, line }: { name: string; line: string }): ReactNode {
  return (
    <div className={styles.pricingProductHead}>
      <h2 className={styles.pricingProductName}>{name}</h2>
      <p className={styles.pricingProductLine}>{line}</p>
    </div>
  );
}

const searchNote = (
  <>
    AI search uses search providers only to find links; the pages are fetched and ranked on your machine. Only the query leaves it — never your documents, code or conversations — and we do not store it; the only thing counted is the search itself. Every account gets a monthly allowance, and you can buy more from your <a href="https://app.smartloop.ai/settings/websearch/" className="underline">dashboard</a>. See <Link to="/docs/web-search#privacy" className="underline">privacy</Link> for details.
  </>
);

export default function Pricing(): ReactNode {
  const location = useLocation();
  const history = useHistory();
  const [product, setProduct] = useState<Product>('studio');
  // The tab anchors are real targets; tell the build's link checker so.
  const brokenLinks = useBrokenLinks();
  PRODUCTS.forEach((p) => brokenLinks.collectAnchor(p.id));

  useEffect(() => {
    setProduct(productOf(location.hash));
  }, [location.hash]);

  const current = PRODUCTS.find((p) => p.id === product)!;

  return (
    <div id="app" className="body">
      <Head>
        <title>Pricing | Smartloop</title>
        <meta name="description" content="Smartloop pricing — Docent is free for individuals and enterprises running it locally; gpushed GPUs are billed by the second from $0.88/hr." />
        <meta property="og:title" content="Pricing | Smartloop" />
        <meta property="og:description" content="Smartloop pricing — Docent is free for individuals and enterprises running it locally; gpushed GPUs are billed by the second from $0.88/hr." />
        <link rel="canonical" href="https://smartloop.ai/pricing/" />
      </Head>
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          {/* Hero */}
          <section className="flex flex-col items-center text-center px-6 pt-28 md:pt-36 pb-6 max-w-5xl mx-auto w-full">
            <h1 className={`text-3xl md:text-5xl mb-4 leading-tight ${styles.heroTitle}`}>Pricing</h1>
            <p className="text-zinc-400 max-w-xl">
              Docent Studio and Docent Code are free, for individuals and enterprises alike. gpushed is a GPU by the second, paid from a prepaid balance.
            </p>
          </section>

          {/* Targets for /pricing#studio, #docent and #gpushed. */}
          <span id="studio" aria-hidden="true" />
          <span id="docent" aria-hidden="true" />
          <span id="gpushed" aria-hidden="true" />

          {/* Product tabs */}
          <section className="px-6 pt-6 max-w-4xl mx-auto w-full">
            <div className={styles.productTabs} role="tablist" aria-label="Product">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={product === p.id}
                  className={`${styles.productTab} ${product === p.id ? styles.productTabActive : ''}`}
                  onClick={() => history.replace({ ...location, hash: `#${p.id}` })}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </section>

          <section className="px-6 pt-10 pb-14 max-w-4xl mx-auto w-full" role="tabpanel">
            <ProductHead name={current.name} line={current.line} />

            {product === 'studio' && (
              <>
                <PlanGrid plans={studioPlans} />
                <p className={`${styles.pricingNote} mt-6`}>{searchNote}</p>
              </>
            )}

            {product === 'docent' && (
              <>
                <PlanGrid plans={docentPlans} />
                <p className={`${styles.pricingNote} mt-6`}>{searchNote}</p>
              </>
            )}

            {product === 'gpushed' && (
              <>
                <PlanGrid plans={gpushedPlans} />
                <table className={styles.gpuTable}>
                  <thead>
                    <tr><th>GPU</th><th>Memory</th><th>Machine</th><th>US price</th></tr>
                  </thead>
                  <tbody>
                    {gpus.map((g) => (
                      <tr key={g.name}><td>{g.name}</td><td>{g.memory}</td><td>{g.spec}</td><td>{g.price}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className={`${styles.pricingNote} mt-4`}>
                  Europe and Asia cost a little more. Current prices are always on <a href="https://gpushed.dev" className="underline">gpushed.dev</a>.
                </p>
              </>
            )}
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}
