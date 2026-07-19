import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const Hero = () => (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden bg-white hero-bg-responsive font-sans">
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-20">
                {/* Left/Text Side */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="order-2 lg:order-1 max-w-xl py-6 lg:py-12"
                >
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                        style={{ backgroundColor: '#E8F0FE', color: '#0A4CB5' }}
                    >
                        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#18B66B' }} />
                        Pharmaceutical Marketing &amp; Distribution
                    </div>

                    {/* Headline */}
                    <h1 className="text-[1.65rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-4" style={{ color: '#0F172A' }}>
                        Welcome to <span className="gradient-text uppercase font-sans tracking-tight">MEDYZIN</span> Healthcare
                    </h1>

                    {/* Tagline */}
                    <p className="text-sm sm:text-base leading-relaxed mb-8 text-slate-550" style={{ color: '#64748B' }}>
                        Your Trusted Partner in Gynecology and Pediatric Medicines
                    </p>

                    {/* Button */}
                    <div className="flex flex-wrap gap-4">
                        <ScrollLink to="about" smooth duration={800} offset={-80}>
                            <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                                Read More
                            </Button>
                        </ScrollLink>
                    </div>
                </motion.div>

                {/* Right Spacer Side (Exposes the background pills and objects on desktop) */}
                <div className="hidden lg:block order-1 lg:order-2 h-[450px]" />
            </div>
        </Container>

        {/* CSS styles to implement the mockup background images and text-overlay masking */}
        <style>{`
            .hero-bg-responsive {
                background-image: linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 100%), url('/assets/hero-cover.webp');
                background-size: cover;
                background-position: 72% center;
                background-repeat: no-repeat;
            }
            @media (min-width: 1024px) {
                .hero-bg-responsive {
                    background-image: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.92) 48%, rgba(255,255,255,0) 65%), url('/assets/hero-cover.webp');
                    background-position: right center;
                }
            }
        `}</style>
    </section>
);

export default Hero;
