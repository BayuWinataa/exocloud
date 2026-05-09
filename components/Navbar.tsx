'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

type NavItem = {
	label: string;
	href: string;
};

const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Program', href: '/program' },
	{ label: 'Contact', href: '/contact' },
];

export default function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	const isActive = useMemo(() => {
		return (href: string) => {
			if (href === '/') return pathname === '/';
			return pathname?.startsWith(href);
		};
	}, [pathname]);

	return (
		<header className="fixed left-0 top-0 z-50 w-full">
			<motion.div
				animate={{
					paddingTop: isScrolled ? 16 : 0,
					paddingLeft: isScrolled ? 16 : 0,
					paddingRight: isScrolled ? 16 : 0,
				}}
				transition={{ duration: 0.25, ease: 'easeOut' }}
				className="mx-auto w-full"
			>
				<motion.nav
					animate={{
						borderRadius: isScrolled ? 18 : 0,
					}}
					transition={{ duration: 0.25, ease: 'easeOut' }}
					className={`mx-auto flex h-20 items-center justify-between px-5 transition-all duration-300 md:px-8 ${
						isScrolled
							? 'border-2 border-secondary-foreground bg-white/90 shadow-[2px_2px_0px_var(--secondary-foreground)] backdrop-blur-md'
							: 'border-b border-slate-200/80 bg-white/90 shadow-[0_1px_12px_rgba(15,23,42,0.06)] backdrop-blur-md'
					}`}
				>
					<Link href="/" aria-label="Exocloud Home" onClick={() => setIsOpen(false)} className="flex shrink-0 items-center">
						<span className="relative block h-[45px] w-[160px]">
							<Image src="/logo-exocloud.webp" alt="Exocloud" fill className="object-contain" priority sizes="160px" />
						</span>
					</Link>

					<div className="hidden items-center gap-8 md:flex">
						{navItems.map((item) => (
							<Link key={item.href} href={item.href} className={`relative text-base font-bold transition-colors hover:text-primary ${isActive(item.href) ? 'text-primary' : 'text-secondary-foreground'}`}>
								{item.label}

								{isActive(item.href) && (
									<motion.span
										layoutId="active-nav"
										className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary"
										transition={{
											type: 'spring',
											stiffness: 350,
											damping: 30,
										}}
									/>
								)}
							</Link>
						))}
					</div>

					<button
						type="button"
						aria-label={isOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isOpen}
						onClick={() => setIsOpen((prev) => !prev)}
						className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full  md:hidden"
					>
						<motion.span
							animate={{
								rotate: isOpen ? 45 : 0,
								y: isOpen ? 0 : -6,
							}}
							transition={{ duration: 0.2 }}
							className="absolute h-0.5 w-5 rounded-full bg-secondary-foreground"
						/>
						<motion.span
							animate={{
								opacity: isOpen ? 0 : 1,
								x: isOpen ? 8 : 0,
							}}
							transition={{ duration: 0.2 }}
							className="absolute h-0.5 w-5 rounded-full bg-secondary-foreground"
						/>
						<motion.span
							animate={{
								rotate: isOpen ? -45 : 0,
								y: isOpen ? 0 : 6,
							}}
							transition={{ duration: 0.2 }}
							className="absolute h-0.5 w-5 rounded-full bg-secondary-foreground"
						/>
					</button>
				</motion.nav>
			</motion.div>

			{/* Mobile drawer */}
			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 z-40 bg-secondary-foreground/40 backdrop-blur-sm md:hidden"
						/>
						<motion.aside
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 28,
							}}
							className="fixed right-0 top-0 z-50 h-dvh w-[82%] bg-white p-6 shadow-[-2px_0px_0px_var(--secondary-foreground)] md:hidden"
						>
							<div className="mb-10 flex items-center justify-between">
								<span className="relative block h-[42px] w-[145px]">
									<Image src="/logo-exocloud.webp" alt="Exocloud" fill className="object-contain" priority sizes="145px" />
								</span>

								<button type="button" aria-label="Close menu" onClick={() => setIsOpen(false)} className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-foreground bg-primary">
									<motion.span initial={{ rotate: 0 }} animate={{ rotate: 45 }} className="absolute h-0.5 w-5 rounded-full bg-secondary-foreground" />
									<motion.span initial={{ rotate: 0 }} animate={{ rotate: -45 }} className="absolute h-0.5 w-5 rounded-full bg-secondary-foreground" />
								</button>
							</div>

							<nav className="flex flex-col gap-3">
								{navItems.map((item, index) => (
									<motion.div
										key={item.href}
										initial={{ opacity: 0, x: 30 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: 0.08 + index * 0.06,
											duration: 0.25,
										}}
									>
										<Link
											href={item.href}
											onClick={() => setIsOpen(false)}
											className={`flex items-center justify-between rounded-2xl border-2 border-secondary-foreground px-3 py-2 text-lg font-semibold shadow-[2px_2px_0px_var(--secondary-foreground)] transition ${
												isActive(item.href) ? 'bg-primary text-white' : 'bg-white text-secondary-foreground hover:bg-primary-soft'
											}`}
										>
											{item.label}
											<span className="text-xl font-bold">→</span>
										</Link>
									</motion.div>
								))}
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
