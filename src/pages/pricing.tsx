import { useEffect, type ReactNode } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Link from '@docusaurus/Link';
import { PRODUCTS, PricingLayout, pricingPath, type Product } from '../components/Pricing';
import styles from './index.module.css';

// The overview: one card per product, each linking to its own pricing page
// (/studio/pricing, /docent/pricing). Old tab links (/pricing#studio,
// #docent) go to the matching page; #gpushed goes to gpushed.dev, which has
// its own pricing (it bills through the smartloop account).
export default function Pricing(): ReactNode {
  const location = useLocation();
  const history = useHistory();
  const brokenLinks = useBrokenLinks();
  PRODUCTS.forEach((p) => brokenLinks.collectAnchor(p.id));
  brokenLinks.collectAnchor('gpushed');

  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (id === 'gpushed') {
      window.location.replace('https://gpushed.dev');
      return;
    }
    if (PRODUCTS.some((p) => p.id === id)) history.replace(pricingPath(id as Product));
  }, [location.hash, history]);

  return (
    <PricingLayout
      title="Pricing | Smartloop"
      description="Smartloop pricing: Docent Studio and Docent Code are free, with Pro, Plus and Max plans for cloud models; gpushed GPUs from $0.88/hr, billed through your smartloop account."
      canonical="https://smartloop.ai/pricing/"
      current={null}
    >
      <div className={styles.pricingGrid}>
        {PRODUCTS.map((p) => (
          <div key={p.id} id={p.id} className={styles.planCard}>
            <div className={styles.planHeader}>
              <h3 className={styles.planName}>{p.name}</h3>
            </div>
            <p className={styles.planDesc}>{p.line}</p>
            <p className={styles.planDesc}>{p.summary}</p>
            <div className={styles.planCtaRow}>
              <Link to={pricingPath(p.id)} className={styles.planCta}>
                {p.name} pricing
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PricingLayout>
  );
}
