import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/common/BackToTop';

const Home = lazy(() => import('@/pages/Home'));
const BrandDetails = lazy(() => import('@/pages/BrandDetails'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Loader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center animate-pulse">
                <img src="/favicon.png" alt="Medyzin Healthcare Logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: '#0A4CB5' }}>Loading…</p>
        </div>
    </div>
);

function App() {
    return (
        <HelmetProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1">
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/brands/:slug" element={<BrandDetails />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </div>
                <Footer />
                <BackToTop />
            </div>
        </HelmetProvider>
    );
}

export default App;
