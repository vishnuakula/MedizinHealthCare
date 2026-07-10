import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, Cog } from 'lucide-react';
import { brands } from '@/data/brands';
import { company } from '@/data/company';
import Container from '@/components/common/Container';
import BrandGallery from '@/components/common/BrandGallery';
import BrandCard from '@/components/common/BrandCard';

const BrandDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const brand = brands.find((b) => b.slug === slug);

    // Scroll to top on mount when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!brand) {
        return (
            <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Brand Not Found</h1>
                <p className="text-slate-500 mb-8">The product or brand you are looking for does not exist or has been removed.</p>
                <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
                    Return to Home
                </button>
            </div>
        );
    }

    const relatedBrands = brands.filter((b) => b.category === brand.category && b.slug !== brand.slug).slice(0, 3);
    if (relatedBrands.length === 0) {
        relatedBrands.push(...brands.filter((b) => b.slug !== brand.slug).slice(0, 3));
    }

    return (
        <main className="pt-24 pb-16 bg-slate-50/30">
            <Helmet>
                <title>{`${brand.name} | ${company.name}`}</title>
                <meta name="description" content={brand.description} />
                <link rel="canonical" href={`${company.seo.url}/brands/${brand.slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org/',
                        '@type': 'Product',
                        name: brand.name,
                        image: brand.gallery,
                        description: brand.description,
                        brand: {
                            '@type': 'Brand',
                            name: company.name
                        }
                    })}
                </script>
            </Helmet>

            <Container>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>

                {/* Hero Section */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Side */}
                        <div className="bg-slate-50 p-8 flex items-center justify-center relative min-h-[300px]">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={brand.gallery[0]}
                                alt={brand.name}
                                className="w-full max-w-[400px] h-auto object-contain drop-shadow-xl"
                                onError={(e) => { e.target.onerror = null; e.target.src = brand.gallery[0].replace('.png', '.svg'); }}
                            />
                            <div className="absolute top-6 left-6 flex gap-2">
                                <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-blue-600 shadow-sm border border-blue-50">
                                    {brand.category}
                                </span>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <h1 className="text-2xl lg:text-[2rem] font-bold text-slate-900 mb-1.5 uppercase font-sans tracking-tight">{brand.name}</h1>
                                <p className="text-sm text-slate-400 font-medium mb-4">{brand.tagline}</p>

                                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 mb-5 inline-block">
                                    <h4 className="text-[10px] uppercase font-bold text-blue-600 tracking-wider mb-0.5">Composition</h4>
                                    <p className="text-slate-700 font-medium text-xs">{brand.composition}</p>
                                </div>

                                <p className="text-slate-600 leading-relaxed text-xs">
                                    {brand.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Benefits */}
                    {brand.benefits && brand.benefits.length > 0 && (
                        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                Key Benefits
                            </h3>
                            <ul className="space-y-4">
                                {brand.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Uses / Indications */}
                    {brand.uses && brand.uses.length > 0 && (
                        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-blue-500" />
                                Uses & Indications
                            </h3>
                            <ul className="space-y-4">
                                {brand.uses.map((use, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                                        <span>{use}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* How It Works */}
                    {brand.howItWorks && brand.howItWorks.length > 0 && (
                        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Cog className="w-6 h-6 text-violet-500" />
                                How It Works
                            </h3>
                            <ul className="space-y-4">
                                {brand.howItWorks.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>


                {/* Gallery */}
                <BrandGallery images={brand.gallery} />

                {/* Related Brands */}
                {relatedBrands.length > 0 && (
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 border-t border-slate-200 pt-10">
                            Related Products
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedBrands.map((b) => (
                                <BrandCard key={b.slug} brand={b} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </main>
    );
};

export default BrandDetails;
