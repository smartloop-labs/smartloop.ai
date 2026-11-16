import { useEffect, useState } from 'react';

import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RichTextEditor from '../components/RichTextEditor';
import { isValidEmail } from '../utils/validation';
import { htmlToPlainText, sanitizeHtml } from '../utils/sanitizeHtml';
import { sendContactRequest, useApiBaseUrl } from '../utils/api';

import { Check } from '../components/Docent/Terminal';
import form from './index.module.css';
import styles from './home.module.css';
import local from './contact.module.css';

// These mirror the Enterprise card on /pricing — someone arriving from that CTA
// should land on the same four things, worded the same way.
const topics = [
	'Rollout across your team',
	'Setting up your local AI infrastructure',
	'Models fine-tuned on your data',
	'Ongoing updates and maintenance',
	'Product questions and troubleshooting',
];

// The header's Partners link opens this page as /contact/?for=partner.
const partnerTopics = [
	'Hands-on support in setting up Docent',
	'Our hybrid approach to cut your cost per token',
	'Fine-grained tuning for maximum throughput',
	'Dedicated point of contact for your deployment',
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
										<h1 className={local.title}>Work with us.</h1>
										<p className={local.lead}>
											If you are rolling out Docent and want to lower your cost per token, we can help. Our hybrid
											approach combines local and cloud inference to cut costs while keeping throughput high.
										</p>
									</>
								) : (
									<>
										{/* The product is free; the work is what you hire us for. */}
										<h1 className={local.title}>Talk to our team.</h1>
										<p className={local.lead}>
											Docent stays free at any scale. Tell us what you are trying to solve and we will get it
											working on your data: deployed on your own infrastructure, tuned to your use case, and rolled
											out across your team.
										</p>
									</>
								)}

								<p className={styles.kicker}>{partner ? 'What you get' : 'What we help with'}</p>
								<ul className={styles.docentPoints}>
									{(partner ? partnerTopics : topics).map((topic) => (
										<li key={topic}><Check /><span>{topic}</span></li>
									))}
								</ul>

								<p className={local.links}>
									<Link to="/docs/intro" className={styles.textLink}>Browse the docs</Link>
									<span aria-hidden="true">·</span>
									<a href="https://x.com/smartloop/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
										Follow @smartloop
									</a>
									<span aria-hidden="true">·</span>
									<a href="mailto:support@smartloop.ai" className={styles.textLink}>support@smartloop.ai</a>
								</p>
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
