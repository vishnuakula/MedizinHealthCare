import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import Container from '@/components/common/Container';
import { footerData } from '@/data/footer';
import { company } from '@/data/company';

const contactIcons = { email: Mail, address: MapPin };

const Footer = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const fade = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <footer style={{ backgroundColor: '#0D1B2A' }} className="text-white">
            <Container>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    transition={{ staggerChildren: 0.1 }}
                    className="py-10 md:py-14"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                        {/* Brand */}
                        <motion.div variants={fade}>
                            <div className="flex items-center gap-2.5 mb-5">
                                <img src="/assets/logo.png" alt="Medyzin Healthcare Logo" className="h-14 w-auto object-contain bg-white rounded-xl p-1.5" />
                            </div>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: '#94A3B8' }}>{footerData.company.description}</p>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div variants={fade}>
                            <h3 className="text-base font-bold mb-6">{footerData.quickLinks.title}</h3>
                            <ul className="space-y-3">
                                {footerData.quickLinks.links.map(link => (
                                    <li key={link.label}>
                                        <ScrollLink to={link.href} smooth duration={800} offset={-80}
                                            className="text-sm cursor-pointer flex items-center gap-2 group transition-colors"
                                            style={{ color: '#94A3B8' }}
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            <span className="group-hover:text-[#18B66B] transition-colors">{link.label}</span>
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Focus Areas */}
                        <motion.div variants={fade}>
                            <h3 className="text-base font-bold mb-6">{footerData.focusAreas.title}</h3>
                            <ul className="space-y-3">
                                {footerData.focusAreas.links.map(link => (
                                    <li key={link.label}>
                                        <ScrollLink to={link.href} smooth duration={800} offset={-80}
                                            className="text-sm cursor-pointer flex items-center gap-2 group transition-colors"
                                            style={{ color: '#94A3B8' }}
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            <span className="group-hover:text-[#18B66B] transition-colors">{link.label}</span>
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div variants={fade}>
                            <h3 className="text-base font-bold mb-6">{footerData.contact.title}</h3>
                            <ul className="space-y-4">
                                {footerData.contact.items.map(item => {
                                    const Icon = contactIcons[item.type];
                                    return (
                                        <li key={item.type} className="flex items-start gap-3">
                                            {Icon && (
                                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                                                    <Icon className="w-4 h-4" style={{ color: '#18B66B' }} />
                                                </div>
                                            )}
                                            <span className="text-sm" style={{ color: '#94A3B8', whiteSpace: 'pre-line' }}>{item.value}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Bottom */}
                    <motion.div variants={fade}
                        className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <p className="text-sm" style={{ color: '#64748B' }}>© {new Date().getFullYear()} {company.fullName}. All rights reserved.</p>
                        <div className="flex gap-6">
                            {footerData.legal.map(item => (
                                <a key={item.label} href={item.href} className="text-sm transition-colors hover:text-[#18B66B]" style={{ color: '#64748B' }}>{item.label}</a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </footer>
    );
};

export default Footer;
