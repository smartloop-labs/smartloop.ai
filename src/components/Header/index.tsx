import Link from '@docusaurus/Link';
import { useState, useEffect } from 'react';
import DocentMark from '../DocentMark';

// A product's mark in the Products menu, matching the cards on the home page:
// Docent's own marks (Studio on white, Code on black), gpushed's icon.
function ProductMark({ product }: { product: 'studio' | 'docent' | 'gpushed' }) {
	if (product === 'studio' || product === 'docent') {
		const which = product === 'studio' ? 'studio' : 'code';
		return (
			<span className={`sl-submenu__mark docent-tile--${which}`} aria-hidden="true">
				<DocentMark product={which} size={22} />
			</span>
		);
	}
	return <img className="sl-submenu__mark sl-submenu__mark--img" src="/img/logos/gpushed.svg" alt="" width={32} height={32} />;
}

// One header on every page. Like anthropic.com, the toolbar is the company's
// (products, docs, about); pricing is linked from the footer.
export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [loginHover, setLoginHover] = useState(false);

	useEffect(() => {
		if (isMenuOpen) {
			document.documentElement.classList.add('menu-open');
			document.body.style.overflow = 'hidden';
		} else {
			document.documentElement.classList.remove('menu-open');
			document.body.style.overflow = '';
		}
	}, [isMenuOpen]);

	// Keep in sync with the theme Docusaurus applied (from localStorage/default)
	useEffect(() => {
		const current = document.documentElement.getAttribute('data-theme');
		setTheme(current === 'dark' ? 'dark' : 'light');
	}, []);

	const applyTheme = (next: 'light' | 'dark') => {
		document.documentElement.setAttribute('data-theme', next);
		document.documentElement.setAttribute('data-theme-choice', next);
		try {
			localStorage.setItem('theme', next);
		} catch {
			/* ignore storage errors (private mode) */
		}
		setTheme(next);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const loginStyle: React.CSSProperties = {
		height: '2.25rem',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'transparent',
		border: `1px solid ${loginHover ? 'var(--sl-btn-border-hover)' : 'var(--sl-line-2)'}`,
		padding: '8px 18px',
		fontFamily: 'var(--sl-display)',
		fontWeight: 500,
		fontSize: '.86rem',
		color: loginHover ? 'var(--sl-white)' : 'var(--sl-fg)',
		textDecoration: 'none',
		borderRadius: '8px',
		textTransform: 'lowercase',
		transition: 'border-color 0.2s, color 0.2s',
	};

	// The one solid element in the header: everything else is a rule, so the
	// single filled button is unmistakably the thing to press.
	const signUpStyle: React.CSSProperties = {
		height: '2.25rem',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'var(--sl-accent)',
		border: '1px solid var(--sl-accent)',
		padding: '8px 18px',
		fontFamily: 'var(--sl-display)',
		fontWeight: 500,
		fontSize: '.86rem',
		color: 'var(--sl-on-accent)',
		textDecoration: 'none',
		borderRadius: '8px',
		textTransform: 'lowercase',
		transition: 'filter 0.2s',
	};

	const themeToggleWrapStyle: React.CSSProperties = {
		height: '2.25rem',
		display: 'inline-flex',
		alignItems: 'stretch',
		border: '1px solid var(--sl-line-2)',
		borderRadius: '8px',
		overflow: 'hidden',
		flexShrink: 0,
	};

	const themeSegStyle = (active: boolean): React.CSSProperties => ({
		width: '2rem',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: 'none',
		borderRadius: 0,
		background: active ? 'var(--sl-line-2)' : 'transparent',
		color: active ? 'var(--sl-white)' : 'var(--sl-dim)',
		cursor: 'pointer',
		padding: 0,
		transition: 'background 0.2s, color 0.2s',
	});

	return (
		<header className="header _header-show" style={{ borderBottom: 'none' }}>
			<div className="header__big-container">
				<div className="header__logo"><Link to="/" onClick={closeMenu}><img src={theme === 'dark' ? '/img/logo.svg' : '/img/logo-dark.svg'} alt="Smartloop Logo" style={{ height: '22px', width: 'auto' }} /></Link></div>
				<div className={`header__menu sl-menu ${isMenuOpen ? 'menu-open' : ''}`}>
					<button
						type="button"
						className="sl-menu__icon icon-menu"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<span></span>
					</button>
					<nav className="sl-menu__body">
						<ul className="sl-menu__list">
							{/* All products live under one menu: on desktop the panel opens on
							    hover or keyboard focus; in the mobile menu the links stand in its place. */}
							<li className="sl-menu__item sl-menu__group">
								<Link to="/docent" className="sl-menu__link sl-menu__group-label" aria-haspopup="true" onClick={closeMenu}>
									Products
									<svg className="sl-menu__chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
								</Link>
								<div className="sl-submenu">
									<div className="sl-submenu__panel">
										<Link to="/docent" className="sl-menu__link sl-submenu__link" onClick={closeMenu}>
											<ProductMark product="docent" />
											<span className="sl-submenu__text">
												<span className="sl-submenu__name">Docent</span>
												<span className="sl-submenu__desc">Your local AI coding agent: writes, builds and fixes</span>
											</span>
										</Link>
										<Link to="/studio" className="sl-menu__link sl-submenu__link" onClick={closeMenu}>
											<ProductMark product="studio" />
											<span className="sl-submenu__text">
												<span className="sl-submenu__name">Docent Studio</span>
												<span className="sl-submenu__desc">Your private AI assistant: documents, systems, skills</span>
											</span>
										</Link>
										<a href="https://gpushed.dev" className="sl-menu__link sl-submenu__link" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
											<ProductMark product="gpushed" />
											<span className="sl-submenu__text">
												<span className="sl-submenu__name">gpushed <span className="sl-submenu__ext" aria-hidden="true">↗</span></span>
												<span className="sl-submenu__desc">A GPU by the second from your Mac: no cloud account needed</span>
											</span>
										</a>
									</div>
								</div>
							</li>
							<li className="sl-menu__item"><Link to="/docs/intro" className="sl-menu__link" onClick={closeMenu}>Docs</Link></li>
							<li className="sl-menu__item"><Link to="/about" className="sl-menu__link" onClick={closeMenu}>About</Link></li>
						</ul>
					</nav>
				</div>
				<div className="header__registration flex gap-3 items-center justify-end">
					<div style={themeToggleWrapStyle} role="group" aria-label="Theme">
						<button
							type="button"
							onClick={() => applyTheme('light')}
							style={themeSegStyle(theme === 'light')}
							aria-label="Light theme"
							aria-pressed={theme === 'light'}
							title="Light theme"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<circle cx="12" cy="12" r="4" />
								<line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
								<line x1="4.93" y1="4.93" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
								<line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
								<line x1="4.93" y1="19.07" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
							</svg>
						</button>
						<button
							type="button"
							onClick={() => applyTheme('dark')}
							style={themeSegStyle(theme === 'dark')}
							aria-label="Dark theme"
							aria-pressed={theme === 'dark'}
							title="Dark theme"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
							</svg>
						</button>
					</div>
					<div className="hidden md:flex gap-4 items-center">
						<a
							href="https://app.smartloop.ai"
							style={loginStyle}
							onMouseEnter={() => setLoginHover(true)}
							onMouseLeave={() => setLoginHover(false)}
						>Login</a>
						<a href="https://app.smartloop.ai/signup" style={signUpStyle}>Sign Up</a>
					</div>
				</div>
			</div>
		</header>
	)
}
