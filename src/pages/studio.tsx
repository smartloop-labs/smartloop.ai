import { type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import { Redirect } from '@docusaurus/router';

// Docent Studio is Docent on the desktop, so its page is a tab of /docent.
// /studio stays as a redirect so links, ads and posts keep working.
export default function Studio(): ReactNode {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://smartloop.ai/docent" />
        <meta httpEquiv="refresh" content="0; url=/docent#desktop" />
      </Head>
      <Redirect to="/docent#desktop" />
    </>
  );
}
