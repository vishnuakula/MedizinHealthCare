import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import { workflowSteps } from '@/data/workflow';

const Workflow = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="workflow" className="section-padding">
            <Container>
                <SectionTitle
                    badge="Our Process"
                    title="Our Distribution & Marketing Process"
                    subtitle="A streamlined approach connecting pharmaceutical manufacturers to patients through strategic marketing and reliable distribution."
                />

                <div ref={ref} className="relative">
                    {/* Horizontal connector (lg only) */}
                    <div className="hidden lg:block absolute top-[5.5rem] left-[12%] right-[12%] h-[2px]" style={{ backgroundColor: '#E2E8F0' }}>
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={inView ? { width: '100%' } : {}}
                            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                            className="h-full"
                            style={{ background: 'linear-gradient(to right, #2563EB, #059669, #7C3AED, #E11D48)' }}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {workflowSteps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    {/* Step badge */}
                                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white mb-4" style={{ backgroundColor: step.color }}>
                                        Step {step.step}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg" style={{ backgroundColor: step.bg }}>
                                        <Icon className="w-8 h-8" style={{ color: step.color }} />
                                    </div>

                                    {/* Card */}
                                    <div className="rounded-2xl p-5 shadow-md w-full" style={{ backgroundColor: '#fff', border: '1px solid #F1F5F9' }}>
                                        <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>{step.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{step.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Workflow;
