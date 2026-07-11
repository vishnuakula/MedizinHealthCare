import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const NotFound = () => (
    <>
        <Helmet>
            <title>404 – Page Not Found | MEDYZIN</title>
        </Helmet>
        <section className="min-h-screen flex items-center justify-center" style={{ paddingTop: 100 }}>
            <Container>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-md mx-auto">
                    <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0F172A' }}>Page Not Found</h1>
                    <p className="mb-8 leading-relaxed" style={{ color: '#64748B' }}>The page you&apos;re looking for doesn&apos;t exist.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/"><Button variant="primary" size="lg" icon={Home}>Go Home</Button></Link>
                        <Button variant="outline" size="lg" icon={ArrowLeft} onClick={() => window.history.back()}>Go Back</Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    </>
);

export default NotFound;
