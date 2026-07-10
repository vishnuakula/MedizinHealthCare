import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const BrandGallery = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images?.length) return null;

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Product Gallery
            </h3>

            {/* Masonry / Grid Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm group bg-slate-100 border border-slate-200"
                        onClick={() => openLightbox(idx)}
                    >
                        <img src={img} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-contain p-4 transition-transform duration-300" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = img.replace('.png', '.svg'); }} />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 drop-shadow-md" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2" onClick={() => setIsOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>

                        <div className="relative w-full max-w-5xl px-4 flex items-center justify-center h-full max-h-screen">
                            {images.length > 1 && (
                                <button className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 z-10" onClick={prevImage}>
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                            )}

                            <motion.img
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                src={images[currentIndex]}
                                alt={`Lightbox image ${currentIndex + 1}`}
                                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                                onClick={(e) => e.stopPropagation()}
                                onError={(e) => { e.target.onerror = null; e.target.src = images[currentIndex].replace('.png', '.svg'); }}
                            />

                            {images.length > 1 && (
                                <button className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 z-10" onClick={nextImage}>
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BrandGallery;
