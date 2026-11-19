import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../../pages/index.module.css';

// Pricing, one page per product: /studio/pricing, /docent/pricing and
// /gpushed/pricing, with /pricing as the overview.
//
// The smartloop account is the central account and billing for every
// product: Docent's own, and gpushed (https://gpushed.dev), a separate
// product that signs in and bills through smartloop. The plan's monthly
// credits are spent first, then credits added in Billing, wherever they are
// used. Prices mirror what the app sells (Stripe) and gpushed.dev; update
// them together.

const APP = 'https://app.smartloop.ai';

export type Product = 'studio' | 'docent' | 'gpushed';

export interface Plan {
  name: string;
  badge: string | null;
  desc: string;
  features: string[];
  featuresLabel: string;
  price: string;
  priceLabel: string;
  cta: string;
  ctaHref: string;
  featured: boolean;
}

const paidFeatures = (credits: string) => [
  `${credits} credits a month for cloud models`,
  'Charged by what each call reads and writes',
  'The same credits pay for web search and gpushed GPUs',
  'Add credits any time; added credits never expire',
  'Change plan or cancel any time',
];

const studioPlans: Plan[] = [
  {
    name: 'Free',
    badge: null,
    desc: 'For individuals running Docent Studio locally — no account or credit card needed.',
    features: [
      'Curated, capable models',
      'Orchestration comparable to large models',
      'Documents, tools and skills',
      '100% local & private',
      'Monthly AI search allowance',
    ],
    featuresLabel: 'Included in Free',
    price: 'Free',
    priceLabel: '',
    cta: 'Download now',
    ctaHref: '/download',
    featured: false,
  },
  {
    name: 'Pro',
    badge: null,
    desc: 'For everyday cloud model use, alongside the local models.',
    features: paidFeatures('500'),
    featuresLabel: 'Everything in Free, plus:',
    price: '$5',
    priceLabel: '/month',
    cta: 'Get Pro',
    ctaHref: `${APP}/upgrade`,
    featured: false,
  },
  {
    name: 'Plus',
    badge: null,
    desc: 'For heavy cloud model use.',
    features: paidFeatures('2,000'),
    featuresLabel: 'Everything in Pro, with:',
    price: '$20',
    priceLabel: '/month',
    cta: 'Get Plus',
    ctaHref: `${APP}/upgrade?plan=plus`,
    featured: false,
  },
  {
    name: 'Max',
    badge: 'Best value',
    desc: 'For the heaviest cloud model use.',
    features: paidFeatures('5,000'),
    featuresLabel: 'Everything in Plus, with:',
    price: '$50',
    priceLabel: '/month',
    cta: 'Get Max',
    ctaHref: `${APP}/upgrade?plan=max`,
    featured: true,
  },
  // Enterprise sells services, not a license: Docent itself stays free at
  // any scale.
  {
    name: 'Enterprise',
    badge: 'For teams',
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
    featured: false,
  },
];

// Docent Code, the coding agent: MIT licensed and free; signing in is
// optional and uses the account's plan credits for cloud models and search.
const docentPlans: Plan[] = [
  {
    name: 'Free',
    badge: 'Open source',
    desc: 'The coding agent for your terminal. MIT licensed and free to use, with no account needed.',
    features: [
      'Source on GitHub under the MIT license',
      'Local models such as Qwen, Gemma and Ministral',
      'Checks its work with your language servers and build',
      'macOS, Linux and Windows',
      'Optional sign-in: AI search and cloud models from your smartloop plan',
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
    badge: 'For teams',
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

const gpushedPlans: Plan[] = [
  {
    name: 'Pay as you go',
    badge: null,
    desc: 'An NVIDIA GPU box from your Mac in minutes. No cloud account to set up; you sign in and pay with your smartloop account, by the second.',
    features: [
      'Billed per second, from creation until deletion',
      'Machine, 100 GB SSD and public IP included',
      'CUDA, Python, Node.js and Rust ready',
      'Stopped boxes keep their disk for about $0.03/hr',
      'Never charged more than your credits',
    ],
    featuresLabel: 'Every box includes',
    price: 'from $0.88',
    priceLabel: '/hr',
    cta: 'Get gpushed',
    ctaHref: 'https://gpushed.dev',
    featured: false,
  },
  {
    name: 'Billed through smartloop',
    badge: 'One account',
    desc: 'gpushed is its own product, with your smartloop account as its account and billing: one plan, one set of credits, one invoice history.',
    features: [
      'A Pro, Plus or Max plan’s credits cover GPU time too',
      'Add credits in smartloop Billing from $10; they never expire',
      'About 11 hours on an L4, or 2¼ hours on an A100, per $10',
      'We email you when they run low and pause the box before they run out',
    ],
    featuresLabel: 'How credits work',
    price: '$10',
    priceLabel: 'to add',
    cta: 'Add credits',
    ctaHref: `${APP}/settings/billing`,
    featured: true,
  },
];

const gpus = [
  { name: 'Tesla T4', memory: '16 GB', spec: '8 vCPU · 30 GB RAM', price: '$0.91/hr' },
  { name: 'L4', memory: '24 GB', spec: '4 vCPU · 16 GB RAM', price: '$0.88/hr' },
  { name: 'A100', memory: '40 GB', spec: '12 vCPU · 85 GB RAM', price: '$4.44/hr' },
];

export const PRODUCTS: { id: Product; name: string; line: string; summary: string }[] = [
  {
    id: 'studio',
    name: 'Docent Studio',
    line: 'Your private AI assistant for work. Free on your machine; paid plans add cloud models.',
    summary: 'Free locally. Pro $5, Plus $20 and Max $50 a month for cloud models.',
  },
  {
    id: 'docent',
    name: 'Docent Code',
    line: 'The coding agent for your terminal. Open source, free, and no account needed.',
    summary: 'Free and open source. Sign in to use your plan’s cloud models.',
  },
  {
    id: 'gpushed',
    name: 'gpushed',
    line: 'A separate product (gpushed.dev): a GPU box when a job outgrows your Mac, billed through your smartloop account.',
    summary: 'From $0.88/hr by the second, billed through your smartloop account.',
  },
];

export const pricingPath = (p: Product) => `/${p}/pricing`;

function PlanGrid({ plans }: { plans: Plan[] }): ReactNode {
  return (
    <div className={styles.pricingGrid}>
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={`${styles.planCard} ${plan.featured ? styles.planCardFeatured : ''}`}
          // An odd card out at the end (Enterprise after four plans) spans
          // the row rather than leaving a hole beside it.
          style={plans.length % 2 === 1 && i === plans.length - 1 ? { gridColumn: '1 / -1' } : undefined}
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

// The other products' pricing pages, as links (each has its own URL).
function ProductNav({ current }: { current: Product | null }): ReactNode {
  return (
    <nav className={styles.productTabs} aria-label="Pricing by product">
      {PRODUCTS.map((p) => (
        <Link
          key={p.id}
          to={pricingPath(p.id)}
          aria-current={current === p.id ? 'page' : undefined}
          className={`${styles.productTab} ${current === p.id ? styles.productTabActive : ''}`}
        >
          {p.name}
        </Link>
      ))}
    </nav>
  );
}

const searchNote = (
  <>
    AI search uses search providers only to find links; the pages are fetched and ranked on your machine. Only the query leaves it — never your documents, code or conversations — and we do not store it; the only thing counted is the search itself. See <Link to="/docs/web-search#privacy" className="underline">privacy</Link> for details.
  </>
);

export function PricingLayout({
  title,
  description,
  canonical,
  current,
  children,
}: {
  title: string;
  description: string;
  canonical: string;
  current: Product | null;
  children: ReactNode;
}): ReactNode {
  return (
    <div id="app" className="body">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={canonical} />
      </Head>
      <div className="wrapper">
        <Header />
        <main className={styles.page}>
          <section className="flex flex-col items-center text-center px-6 pt-28 md:pt-36 pb-6 max-w-5xl mx-auto w-full">
            <h1 className={`text-3xl md:text-5xl mb-4 leading-tight ${styles.heroTitle}`}>Pricing</h1>
            <p className="text-zinc-400 max-w-xl">
              Your smartloop account is the one account and billing for Docent and gpushed: one plan, one set of credits, one invoice history.
            </p>
          </section>
          <section className="px-6 pt-6 max-w-4xl mx-auto w-full">
            <ProductNav current={current} />
          </section>
          <section className="px-6 pt-10 pb-14 max-w-4xl mx-auto w-full">{children}</section>
          <Footer />
        </main>
      </div>
    </div>
  );
}

function ProductHead({ product }: { product: Product }): ReactNode {
  const p = PRODUCTS.find((x) => x.id === product)!;
  return (
    <div className={styles.pricingProductHead}>
      <h2 className={styles.pricingProductName}>{p.name}</h2>
      <p className={styles.pricingProductLine}>{p.line}</p>
    </div>
  );
}

const META: Record<Product, { title: string; description: string }> = {
  studio: {
    title: 'Docent Studio pricing | Smartloop',
    description: 'Docent Studio is free on your machine. Pro ($5), Plus ($20) and Max ($50) a month add cloud model credits.',
  },
  docent: {
    title: 'Docent Code pricing | Smartloop',
    description: 'Docent Code is free and open source (MIT). Sign in to use your smartloop plan’s cloud models and AI search.',
  },
  gpushed: {
    title: 'gpushed pricing | Smartloop',
    description: 'gpushed (gpushed.dev) GPUs from $0.88/hr, billed by the second through your smartloop account.',
  },
};

export function ProductPricing({ product }: { product: Product }): ReactNode {
  return (
    <PricingLayout
      title={META[product].title}
      description={META[product].description}
      canonical={`https://smartloop.ai${pricingPath(product)}/`}
      current={product}
    >
      <ProductHead product={product} />

      {product === 'studio' && (
        <>
          <PlanGrid plans={studioPlans} />
          <p className={`${styles.pricingNote} mt-6`}>
            Plan credits reset each month and are spent first; credits you add in{' '}
            <a href={`${APP}/settings/billing`} className="underline">Billing</a> are spent after them and never expire. {searchNote}
          </p>
        </>
      )}

      {product === 'docent' && (
        <>
          <PlanGrid plans={docentPlans} />
          <p className={`${styles.pricingNote} mt-6`}>
            Signed in, Docent Code uses the same plan as Docent Studio; see{' '}
            <Link to={pricingPath('studio')} className="underline">Studio pricing</Link> for Pro, Plus and Max. {searchNote}
          </p>
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
    </PricingLayout>
  );
}
