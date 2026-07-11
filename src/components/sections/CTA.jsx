import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const CTA = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section className="section-padding">
            <Container>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden text-center px-8 py-10 md:px-16 md:py-14"
                    style={{ background: 'linear-gradient(135deg, #0A4CB5 0%, #0D5BC0 50%, #18B66B 100%)' }}
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                            Let&apos;s Build Better Healthcare Together
                        </h2>
                        <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                            Whether you&apos;re a healthcare provider, distributor, or pharmaceutical company,
                            MEDYZIN is ready to build strong partnerships that create lasting value.
                        </p>
                        <ScrollLink to="contact" smooth duration={800} offset={-80}>
                            <Button variant="white" size="lg" icon={ArrowRight} iconPosition="right">Get In Touch</Button>
                        </ScrollLink>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default CTA;
