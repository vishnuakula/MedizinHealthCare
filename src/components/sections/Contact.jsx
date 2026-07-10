import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import { company } from '@/data/company';

// Reduced padding from px-4 py-3 to px-3 py-2, and text-sm to text-xs
const inputCls = 'w-full px-3 py-2 rounded-lg text-xs transition-all duration-200 outline-none placeholder:text-gray-400';

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
        { icon: Phone, label: 'PHONE', value: company.contact.phone, href: `tel:${company.contact.phone.replace(/\s/g, '')}` },
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

                {/* Added max-w-4xl and gap-8/10 to make the layout significantly more compact */}
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 max-w-4xl mx-auto items-stretch">
                    {/* Info Panel (Reduced margins/paddings and heading size) */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="lg:col-span-2 flex flex-col justify-center">
                        <h3 className="text-lg font-bold mb-1.5" style={{ color: '#0F172A' }}>Contact Information</h3>
                        <p className="text-xs leading-relaxed mb-6" style={{ color: '#64748B' }}>Reach out through any of the following channels.</p>

                        <div className="space-y-4">
                            {info.map(item => (
                                <div key={item.label} className="flex items-start gap-3">
                                    {/* Shrunk icon box container from w-11 h-11 to w-9 h-9 */}
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#E8F0FE' }}>
                                        <item.icon className="w-4 h-4" style={{ color: '#0A4CB5' }} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold tracking-wider block mb-0.5" style={{ color: '#0A4CB5' }}>{item.label}</span>
                                        {item.href ? (
                                            <a href={item.href} className="text-xs hover:underline font-medium" style={{ color: '#0F172A' }}>{item.value}</a>
                                        ) : (
                                            <span className="text-xs leading-relaxed" style={{ color: '#0F172A', whiteSpace: 'pre-line' }}>{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form (Reduced padding from p-8 to p-5/6, input spacing, and button size) */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-3">
                        <div className="rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 bg-white">
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

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] font-semibold mb-1 block" style={{ color: '#0F172A' }}>Full Name *</label>
                                        <input {...register('name', { required: 'Required' })} placeholder="John Doe" className={inputCls} style={{ border: `1.5px solid ${errors.name ? '#EF4444' : '#E2E8F0'}` }} />
                                        {errors.name && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold mb-1 block" style={{ color: '#0F172A' }}>Email *</label>
                                        <input type="email" {...register('email', { required: 'Required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} placeholder="john@example.com" className={inputCls} style={{ border: `1.5px solid ${errors.email ? '#EF4444' : '#E2E8F0'}` }} />
                                        {errors.email && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-semibold mb-1 block" style={{ color: '#0F172A' }}>Phone Number</label>
                                    <input type="tel" {...register('phone')} placeholder="+91 73311 28003" className={inputCls} style={{ border: '1.5px solid #E2E8F0' }} />
                                </div>

                                <div>
                                    <label className="text-[11px] font-semibold mb-1 block" style={{ color: '#0F172A' }}>Subject *</label>
                                    <input {...register('subject', { required: 'Required' })} placeholder="Partnership Inquiry" className={inputCls} style={{ border: `1.5px solid ${errors.subject ? '#EF4444' : '#E2E8F0'}` }} />
                                    {errors.subject && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.subject.message}</p>}
                                </div>

                                <div>
                                    <label className="text-[11px] font-semibold mb-1 block" style={{ color: '#0F172A' }}>Message *</label>
                                    {/* Reduced rows from 4 to 3 */}
                                    <textarea {...register('message', { required: 'Required' })} rows={3} placeholder="Tell us about your inquiry..." className={`${inputCls} resize-none`} style={{ border: `1.5px solid ${errors.message ? '#EF4444' : '#E2E8F0'}` }} />
                                    {errors.message && <p className="text-[10px] mt-0.5" style={{ color: '#EF4444' }}>{errors.message.message}</p>}
                                </div>

                                {/* Use size="md" button instead of "lg" */}
                                <Button type="submit" variant="primary" size="md" icon={Send} loading={isSubmitting} className="w-full sm:w-auto">
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
