import { useState, useEffect, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { navigationLinks } from '@/data/navigation';
import { company } from '@/data/company';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const close = useCallback(() => setMobileOpen(false), []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    borderBottom: scrolled ? '1px solid #F1F5F9' : '1px solid transparent',
                }}
            >
                <Container>
                    <div className="flex items-center justify-between" style={{ height: 72 }}>
                        {/* Logo */}
                        {location.pathname === '/' ? (
                            <ScrollLink to="hero" smooth duration={800} offset={-80} className="flex items-center cursor-pointer select-none">
                                <img src="/assets/logo.webp" alt="Medyzin Healthcare Logo" width="120" height="48" className="h-12 w-auto object-contain" />
                            </ScrollLink>
                        ) : (
                            <RouterLink to="/#hero" className="flex items-center cursor-pointer select-none">
                                <img src="/assets/logo.webp" alt="Medyzin Healthcare Logo" width="120" height="48" className="h-12 w-auto object-contain" />
                            </RouterLink>
                        )}

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navigationLinks.map((link) =>
                                location.pathname === '/' ? (
                                    <ScrollLink
                                        key={link.id}
                                        to={link.href}
                                        spy
                                        smooth
                                        duration={800}
                                        offset={-80}
                                        onSetActive={() => setActive(link.id)}
                                        className="relative px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200"
                                        style={{ color: active === link.id ? '#0A4CB5' : '#475569' }}
                                    >
                                        {link.label}
                                        {active === link.id && (
                                            <span
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full"
                                                style={{ backgroundColor: '#0A4CB5' }}
                                            />
                                        )}
                                    </ScrollLink>
                                ) : (
                                    <RouterLink
                                        key={link.id}
                                        to={`/#${link.href}`}
                                        className="relative px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200"
                                        style={{ color: '#475569' }}
                                    >
                                        {link.label}
                                    </RouterLink>
                                )
                            )}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:block">
                            {location.pathname === '/' ? (
                                <ScrollLink to="contact" smooth duration={800} offset={-80}>
                                    <Button variant="secondary" size="sm" icon={Phone}>Contact Us</Button>
                                </ScrollLink>
                            ) : (
                                <RouterLink to="/#contact">
                                    <Button variant="secondary" size="sm" icon={Phone}>Contact Us</Button>
                                </RouterLink>
                            )}
                        </div>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 rounded-xl cursor-pointer"
                            style={{ backgroundColor: mobileOpen ? '#6fbda1ff' : 'transparent' }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </Container>
            </motion.header>

            {/* Mobile Drawer (placed outside header to prevent Framer Motion transform constraint glitches) */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={close}
                            className="fixed inset-0 bg-black/35 lg:hidden z-40"
                            style={{ backdropFilter: 'blur(4px)' }}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl lg:hidden z-50 flex flex-col"
                        >
                            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid #F1F5F9' }}>
                                <span className="text-lg font-bold" style={{ color: '#0F172A' }}>Menu</span>
                                <button onClick={close} className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
                            </div>
                            <nav className="flex-1 p-5 space-y-1">
                                {navigationLinks.map((link, i) => (
                                    <motion.div key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                                        {location.pathname === '/' ? (
                                            <ScrollLink
                                                to={link.href}
                                                spy
                                                smooth
                                                duration={800}
                                                offset={-80}
                                                onSetActive={() => setActive(link.id)}
                                                onClick={close}
                                                className="block px-4 py-3 rounded-xl text-base font-medium cursor-pointer"
                                                style={{
                                                    color: active === link.id ? '#0A4CB5' : '#475569',
                                                    backgroundColor: active === link.id ? '#E8F0FE' : 'transparent',
                                                }}
                                            >
                                                {link.label}
                                            </ScrollLink>
                                        ) : (
                                            <RouterLink
                                                to={`/#${link.href}`}
                                                onClick={close}
                                                className="block px-4 py-3 rounded-xl text-base font-medium cursor-pointer"
                                                style={{
                                                    color: '#475569',
                                                    backgroundColor: 'transparent',
                                                }}
                                            >
                                                {link.label}
                                            </RouterLink>
                                        )}
                                    </motion.div>
                                ))}
                            </nav>
                            <div className="p-5" style={{ borderTop: '1px solid #F1F5F9' }}>
                                {location.pathname === '/' ? (
                                    <ScrollLink to="contact" smooth duration={800} offset={-80} onClick={close}>
                                        <Button variant="secondary" size="md" icon={Phone} className="w-full justify-center">Contact Us</Button>
                                    </ScrollLink>
                                ) : (
                                    <RouterLink to="/#contact" onClick={close}>
                                        <Button variant="secondary" size="md" icon={Phone} className="w-full justify-center">Contact Us</Button>
                                    </RouterLink>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
