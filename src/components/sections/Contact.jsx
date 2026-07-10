import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import { company } from '@/data/company';

// Standard input classes with standard padding and text sizes
const inputCls = 'w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200 outline-none placeholder:text-gray-400';

const Contact = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [status, setStatus] = useState(null);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            await new Promise(r => setTimeout(r, 1500));
            console.log('Form data:', data);
            setStatus('success');
            reset();
        } catch {
            setStatus('error');
        }
        setTimeout(() => setStatus(null), 5000);
    };

    const info = [
        { icon: Mail, label: 'EMAIL', value: company.contact.email, href: `mailto:${company.contact.email}` },
        { icon: MapPin, label: 'ADDRESS', value: company.contact.address },
    ];

    return (
        <section id="contact" className="section-padding bg-slate-50/50">
            <Container>
                <SectionTitle
                    badge="Get In Touch"
                    title="We'd Love to Hear From You"
                    subtitle="Have a question, partnership inquiry, or want to learn more? Reach out and we'll get back to you promptly."
                />

                {/* Balanced layout width of max-w-5xl */}
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
                    {/* Info Panel */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="lg:col-span-2 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-3" style={{ color: '#0F172A' }}>Contact Information</h3>
                        <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748B' }}>Reach out through any of the following channels.</p>

                        <div className="space-y-6">
                            {info.map(item => (
                                <div key={item.label} className="flex items-start gap-4">
                                    {/* Standard icon box container */}
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8F0FE' }}>
                                        <item.icon className="w-5 h-5" style={{ color: '#0A4CB5' }} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold tracking-wider block mb-1" style={{ color: '#0A4CB5' }}>{item.label}</span>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm hover:underline font-medium" style={{ color: '#0F172A' }}>{item.value}</a>
                                        ) : (
                                            <span className="text-sm leading-relaxed" style={{ color: '#0F172A', whiteSpace: 'pre-line' }}>{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-3">
                        <div className="rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 bg-white">
                            {status === 'success' && (
                                <div className="flex items-center gap-2 p-3 rounded-lg mb-4 text-xs" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
                                    <CheckCircle className="w-4 h-4 shrink-0" />
                                    <p className="font-medium">Message sent! We&apos;ll respond shortly.</p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="flex items-center gap-2 p-3 rounded-lg mb-4 text-xs" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <p className="font-medium">Something went wrong. Please try again.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0F172A' }}>Full Name *</label>
                                        <input {...register('name', { required: 'Required' })} placeholder="John Doe" className={inputCls} style={{ border: `1.5px solid ${errors.name ? '#EF4444' : '#E2E8F0'}` }} />
                                        {errors.name && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0F172A' }}>Email *</label>
                                        <input type="email" {...register('email', { required: 'Required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} placeholder="john@example.com" className={inputCls} style={{ border: `1.5px solid ${errors.email ? '#EF4444' : '#E2E8F0'}` }} />
                                        {errors.email && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.email.message}</p>}
                                    </div>
                                </div>



                                <div>
                                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0F172A' }}>Subject *</label>
                                    <input {...register('subject', { required: 'Required' })} placeholder="Partnership Inquiry" className={inputCls} style={{ border: `1.5px solid ${errors.subject ? '#EF4444' : '#E2E8F0'}` }} />
                                    {errors.subject && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.subject.message}</p>}
                                </div>

                                <div>
                                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#0F172A' }}>Message *</label>
                                    <textarea {...register('message', { required: 'Required' })} rows={4} placeholder="Tell us about your inquiry..." className={`${inputCls} resize-none`} style={{ border: `1.5px solid ${errors.message ? '#EF4444' : '#E2E8F0'}` }} />
                                    {errors.message && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.message.message}</p>}
                                </div>

                                <Button type="submit" variant="primary" size="lg" icon={Send} loading={isSubmitting} className="w-full sm:w-auto">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Contact;
