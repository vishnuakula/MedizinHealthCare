import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink } from 'react-scroll';
import { Eye, Rocket, ArrowRight } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { company } from '@/data/company';

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section id="about" className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
            <Container>
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5" style={{ backgroundColor: '#E8F0FE', color: '#0A4CB5' }}>
                            About MEDIZIN
                        </span>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6" style={{ color: '#0F172A' }}>
                            Driven by Trust.{' '}
                            <span className="gradient-text">Defined by Excellence.</span>
                        </h2>

                        <p className="text-base leading-relaxed mb-4" style={{ color: '#64748B' }}>{company.description}</p>
                        <p className="text-base leading-relaxed mb-8" style={{ color: '#64748B' }}>
                            We believe in building strong, transparent partnerships that drive growth and trust across the healthcare ecosystem.
                        </p>

                        <ScrollLink to="contact" smooth duration={800} offset={-80}>
                            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">Contact Us</Button>
                        </ScrollLink>
                    </motion.div>

                    {/* Right — Vision & Mission */}
                    <div className="flex flex-col gap-6">
                        {[
                            { icon: Eye, title: 'Our Vision', text: company.vision, gradient: 'linear-gradient(135deg, #0A4CB5, #3B82F6)' },
                            { icon: Rocket, title: 'Our Mission', text: company.mission, gradient: 'linear-gradient(135deg, #18B66B, #34D399)' },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.15 + i * 0.15, duration: 0.5 }}
                                className="rounded-2xl p-7 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9' }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: card.gradient }}>
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold" style={{ color: '#0F172A' }}>{card.title}</h3>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default About;
