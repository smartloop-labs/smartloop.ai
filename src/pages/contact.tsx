import { useEffect, useState } from 'react';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RichTextEditor from '../components/RichTextEditor';
import { isValidEmail } from '../utils/validation';
import { htmlToPlainText, sanitizeHtml } from '../utils/sanitizeHtml';
import { sendContactRequest, useApiBaseUrl } from '../utils/api';

import form from './index.module.css';
import styles from './home.module.css';
import local from './contact.module.css';

// These mirror the Enterprise card on /pricing — someone arriving from that CTA
// should land on the same four things, worded the same way.
const topics: [string, string][] = [
	['team', 'Rollout across your team'],
	['server', 'Setting up your local AI infrastructure'],
	['tune', 'Models fine-tuned on your data'],
	['refresh', 'Ongoing updates and maintenance'],
	['help', 'Product questions and troubleshooting'],
];

// The header's Partners link opens this page as /contact/?for=partner.
const partnerTopics: [string, string][] = [
	['help', 'Hands-on support in setting up Docent'],
	['server', 'Our hybrid approach to cut your cost per token'],
	['tune', 'Fine-grained tuning for maximum throughput'],
	['team', 'Dedicated point of contact for your deployment'],
];

// Line icons for the topic tiles and contact cards.
function TopicIcon({ name }: { name: string }) {
	const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
	switch (name) {
		case 'team': return <svg {...props}><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.5a5 5 0 0 1 5 5.5" /></svg>;
		case 'server': return <svg {...props}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>;
		case 'tune': return <svg {...props}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></svg>;
		case 'refresh': return <svg {...props}><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" /><path d="M20 20v-4h-4" /></svg>;
		case 'docs': return <svg {...props}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /><path d="M9 7h6" /></svg>;
		case 'x': return <svg {...props}><path d="M4 4l16 16M20 4L4 20" /></svg>;
		case 'mail': return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
		default: return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14" /><path d="M12 17h.01" /></svg>;
	}
}

const contactLinks: { icon: string; label: string; detail: string; href: string; external?: boolean }[] = [
	{ icon: 'docs', label: 'Docs', detail: 'Guides and reference', href: '/docs/intro' },
	{ icon: 'x', label: '@smartloop', detail: 'News and releases', href: 'https://x.com/smartloop/', external: true },
	{ icon: 'mail', label: 'Email us', detail: 'support@smartloop.ai', href: 'mailto:support@smartloop.ai' },
];

const DESCRIPTION = 'Talk to the Smartloop team. Docent stays free at any scale: tell us what you are trying to solve and we will get it working on your data, deployed on your own infrastructure, tuned to your use case and rolled out across your team.';

export default function Contact() {
	const apiBaseUrl = useApiBaseUrl();
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [dirty, setDirty] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		notes: "",
	});
	const [utmParams, setUtmParams] = useState<Record<string, string>>({});
	const [partner, setPartner] = useState(false);

	useEffect(() => {
		// Read UTM params from URL first, then fall back to sessionStorage
		const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
		const params = new URLSearchParams(window.location.search);
		setPartner(params.get('for') === 'partner');
		const collected: Record<string, string> = {};
		utmKeys.forEach((key) => {
			const fromUrl = params.get(key);
			const fromSession = sessionStorage.getItem(key);
			const value = fromUrl || fromSession;
			if (value) {
				collected[key] = value;
				if (fromUrl) sessionStorage.setItem(key, fromUrl);
			}
		});
		setUtmParams(collected);
	}, []);

	const handleInput = (e: any) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;

		setFormData((prevState) => ({
			...prevState,
			[fieldName]: fieldValue
		}));
	}

	const submitForm = async (e: any) => {
		e.preventDefault();

		setErrorMessage("");
		setSuccessMessage("");
		setDirty(true);

		if (formData.email.length === 0
			|| formData.name.length === 0
			|| htmlToPlainText(formData.notes).length === 0) {
			return;
		}

		const email = formData.email.trim()

		if (!isValidEmail(email)) {
			setErrorMessage("Email address is invalid");
			return;
		}

		setIsLoading(true);

		try {
			await sendContactRequest(apiBaseUrl, {
				...utmParams,
				name: formData.name,
				email: email,
				company: formData.company.trim(),
				notes: sanitizeHtml(formData.notes),
				...(partner && { inquiry: 'partner' as const }),
			});

			setIsLoading(false);
			setSuccessMessage(`Message sent successfully`);
			setFormData({ email: "", name: "", company: "", notes: "" });
			setDirty(false);
		} catch (err: any) {
			setIsLoading(false);
			setErrorMessage(err.message || "Failed to send your message, please try again later");
		}
	}

	const nameHasError = formData.name.length === 0 && dirty;
	const emailHasError = formData.email.length === 0 && dirty;
	const notesHasError = htmlToPlainText(formData.notes).length === 0 && dirty;

	const inputClass = (hasError: boolean) =>
		`${form.contactInput} ${hasError ? form.contactInputError : ''}`;

	return (
		<div id="app" className="body">
			<Head>
				<title>{partner ? 'Design partners' : 'Talk to us'} | Smartloop</title>
				<meta name="description" content={DESCRIPTION} />
				<meta property="og:title" content="Talk to us | Smartloop" />
				<meta property="og:description" content={DESCRIPTION} />
				<link rel="canonical" href="https://smartloop.ai/contact/" />
			</Head>
			<div className="wrapper">
				<Header />
				<main className={styles.page}>
					<section className={local.wrap}>
						<div className={styles.heroGlow} aria-hidden="true" />
						<div className={local.grid}>
							{/* Pitch */}
							<div>
								<p className={styles.eyebrow}>{partner ? 'design partners' : 'talk to us'}</p>
								{partner ? (
									<>
										<h1 className={local.title}>Work <span className={local.accent}>with us.</span></h1>
										<p className={local.lead}>
											If you are rolling out Docent and want to lower your cost per token, we can help. Our hybrid
											approach combines local and cloud inference to cut costs while keeping throughput high.
										</p>
									</>
								) : (
									<>
										{/* The product is free; the work is what you hire us for. */}
										<h1 className={local.title}>Talk to our <span className={local.accent}>team.</span></h1>
										<p className={local.lead}>
											Docent stays free at any scale. Tell us what you are trying to solve, and we will get it
											working on your data and your infrastructure.
										</p>
									</>
								)}

								<p className={styles.kicker}>{partner ? 'What you get' : 'What we help with'}</p>
								<ul className={local.topics}>
									{(partner ? partnerTopics : topics).map(([icon, topic]) => (
										<li key={topic} className={local.topic}>
											<span className={local.topicIcon}><TopicIcon name={icon} /></span>
											<span>{topic}</span>
										</li>
									))}
								</ul>

								<div className={local.links}>
									{contactLinks.map((l) => {
										const inner = (
											<>
												<span className={local.topicIcon}><TopicIcon name={l.icon} /></span>
												<span className={local.linkText}>
													<span className={local.linkLabel}>{l.label} <span aria-hidden="true">→</span></span>
													<span className={local.linkDetail}>{l.detail}</span>
												</span>
											</>
										);
										return l.href.startsWith('/') ? (
											<Link key={l.label} to={l.href} className={local.linkCard}>{inner}</Link>
										) : (
											<a key={l.label} href={l.href} className={local.linkCard} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
										);
									})}
								</div>
							</div>

							{/* Form */}
							<div className={local.card}>
								{successMessage.length > 0 && (
									<div className={`${form.contactAlert} ${form.contactAlertSuccess}`}>
										Thanks for reaching out. Our team will get back to you shortly.
									</div>
								)}
								{errorMessage.length > 0 && (
									<div className={`${form.contactAlert} ${form.contactAlertError}`}>
										{errorMessage}
									</div>
								)}

								<form className={form.contactForm} onSubmit={submitForm} noValidate>
									<div>
										<label className={form.contactLabel} htmlFor="contact-name">Name</label>
										<input
											id="contact-name"
											autoComplete="off"
											type="text"
											name="name"
											placeholder="Your name"
											value={formData.name}
											onChange={handleInput}
											className={inputClass(nameHasError)}
											aria-invalid={nameHasError}
										/>
										{nameHasError && <p className={form.contactFieldError}>Please enter your name.</p>}
									</div>
									<div>
										<label className={form.contactLabel} htmlFor="contact-email">Email</label>
										<input
											id="contact-email"
											autoComplete="off"
											type="email"
											name="email"
											placeholder="you@company.com"
											value={formData.email}
											onChange={handleInput}
											className={inputClass(emailHasError)}
											aria-invalid={emailHasError}
										/>
										{emailHasError && <p className={form.contactFieldError}>Please enter your email address.</p>}
									</div>
									{/* Optional: individuals write in too, and a required company
									    field would only make them invent one. */}
									<div>
										<label className={form.contactLabel} htmlFor="contact-company">Company <span className={form.contactOptional}>(optional)</span></label>
										<input
											id="contact-company"
											autoComplete="off"
											type="text"
											name="company"
											placeholder="Your company"
											value={formData.company}
											onChange={handleInput}
											className={inputClass(false)}
										/>
									</div>
									<div>
										<label className={form.contactLabel} htmlFor="contact-notes">What are you trying to solve?</label>
										<RichTextEditor
											id="contact-notes"
											ariaLabel="What are you trying to solve?"
											placeholder="Describe your requirements — the problem, the data and systems involved, your privacy or infrastructure constraints, and what success looks like"
											value={formData.notes}
											onChange={(notes) => setFormData((prevState) => ({ ...prevState, notes }))}
											hasError={notesHasError}
										/>
										{notesHasError && <p className={form.contactFieldError}>Please describe what you are trying to solve.</p>}
									</div>
									<button type="submit" disabled={isLoading} className={`${styles.btnPrimary} ${local.submit}`}>
										{isLoading ? 'Sending…' : 'Send message'}
									</button>
									<p className={form.contactNote}>
										We only use your details to reply to this message.
									</p>
								</form>
							</div>
						</div>
					</section>

					<Footer />
				</main>
			</div>
		</div>
	);
}
