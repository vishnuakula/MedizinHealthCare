import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTitle = ({ badge, title, subtitle, align = 'center' }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={`max-w-2xl mb-14 ${align === 'center' ? 'text-center mx-auto' : ''}`}
        >
            {badge && (
                <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                    style={{ backgroundColor: '#E8F0FE', color: '#0A4CB5' }}
                >
                    {badge}
                </span>
            )}
            {title && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4" style={{ color: '#0F172A' }}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="text-base md:text-lg leading-relaxed" style={{ color: '#64748B' }}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionTitle;
