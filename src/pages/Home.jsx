import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import FocusAreas from '@/components/sections/FocusAreas';
import WhyChoose from '@/components/sections/WhyChoose';
import Workflow from '@/components/sections/Workflow';
import BrandsSection from '@/components/sections/BrandsSection';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';
import { company } from '@/data/company';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const elementId = location.hash.replace('#', '');
            setTimeout(() => {
                scroller.scrollTo(elementId, {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    offset: -80
                });
            }, 100);
        }
    }, [location]);

    return (
        <>
            <Helmet>
                <title>{company.seo.title}</title>
                <meta name="description" content={company.seo.description} />
                <meta name="keywords" content={company.seo.keywords} />
                <meta property="og:title" content={company.seo.title} />
                <meta property="og:description" content={company.seo.description} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: company.fullName,
                        url: company.seo.url,
                        description: company.seo.description,
                        contactPoint: { '@type': 'ContactPoint', email: company.contact.email },
                    })}
                </script>
            </Helmet>
            <main>
                <Hero />
                <About />
                <FocusAreas />
                <WhyChoose />
                <Workflow />
                <BrandsSection />
                <CTA />
                <Contact />
            </main>
        </>
    );
};

export default Home;
