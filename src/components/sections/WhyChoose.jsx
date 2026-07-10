import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { whyChooseFeatures } from '@/data/whyChoose';

const Card = ({ feature, index }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const Icon = feature.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
        >
            <div
                className="rounded-2xl p-7 h-full shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
                style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9' }}
            >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: feature.bg }}
                >
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0F172A' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{feature.description}</p>
            </div>
        </motion.div>
    );
};

const WhyChoose = () => (
    <section id="why-choose" className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <Container>
            <SectionTitle
                badge="Why MEDIZIN"
                title="Commitment You Can Count On"
                subtitle="We combine pharmaceutical expertise with unwavering commitment to quality, trust, and innovation."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseFeatures.map((f, i) => (
                    <Card key={f.id} feature={f} index={i} />
                ))}
            </div>
        </Container>
    </section>
);

export default WhyChoose;
