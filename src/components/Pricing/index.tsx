import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Header from '../Header';
import Footer from '../Footer';
import styles from '../../pages/index.module.css';

// Pricing, one page per product: /studio/pricing and /docent/pricing, with
// /pricing as the overview.
//
// The smartloop account is the central account and billing. gpushed
// (https://gpushed.dev) is a separate product that signs in and bills
// through it, with its own pricing on gpushed.dev. The plan's monthly credits
// are spent first, then credits added in Billing, wherever they are used.
// Prices mirror what the app sells (Stripe); update them together.

const APP = 'https://app.smartloop.ai';

export type Product = 'studio' | 'docent';

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
              Docent Studio and Docent Code are free. A smartloop plan adds cloud models; its credits also cover <a href="https://gpushed.dev" className="underline">gpushed</a>, which bills through the same account.
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

    </PricingLayout>
  );
}
