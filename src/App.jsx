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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center animate-pulse" style={{ background: 'linear-gradient(135deg, #0A4CB5, #18B66B)' }}>
                <span className="text-white font-bold text-xl">M</span>
            </div>
            <p className="text-sm" style={{ color: '#64748B' }}>Loading…</p>
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
