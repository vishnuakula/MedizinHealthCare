import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { focusAreas } from '@/data/focusAreas';

const FocusCard = ({ area, index }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [expanded, setExpanded] = useState(false);
    const Icon = area.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group font-sans"
        >
            <div
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9' }}
            >
                {/* Image (Reduced height to h-36 for smaller card look) */}
                <div className="relative h-36 overflow-hidden">
                    <img src={area.image} alt={area.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent 75%)' }} />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: area.color + '20' }}>
                        <Icon className="w-4 h-4" style={{ color: area.color }} />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="text-sm font-bold mb-0.5" style={{ color: '#0F172A' }}>{area.title}</h3>
                            <span className="text-[11px] font-medium" style={{ color: '#94A3B8' }}>{area.subtitle}</span>
                        </div>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-slate-100 transition-colors"
                            style={{ backgroundColor: '#F1F5F9' }}
                            aria-label={expanded ? 'Read less' : 'Read more'}
                        >
                            {expanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-600" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />}
                        </button>
                    </div>

                    {/* Expandable Description Area */}
                    <div className="mt-2.5 flex-1 flex flex-col text-xs leading-relaxed text-slate-500">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={expanded ? 'expanded' : 'collapsed'}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <p style={{ color: '#64748B' }}>
                                    {expanded ? area.description : `${area.description.slice(0, 75)}...`}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs font-bold flex items-center gap-1 transition-colors hover:opacity-85"
                            style={{ color: area.color }}
                        >
                            {expanded ? (
                                <>Read Less <ChevronUp className="w-3 h-3" /></>
                            ) : (
                                <>Read More <ArrowUpRight className="w-3 h-3" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FocusAreas = () => (
    <section id="focus-areas" className="section-padding">
        <Container>
            <SectionTitle
                badge="What We Do"
                title="Focused Care. Better Outcomes."
                subtitle="We specialize in key areas of pharmaceutical marketing and distribution to deliver targeted, effective healthcare solutions."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {focusAreas.map((area, i) => (
                    <FocusCard key={area.id} area={area} index={i} />
                ))}
            </div>
        </Container>
    </section>
);

export default FocusAreas;
