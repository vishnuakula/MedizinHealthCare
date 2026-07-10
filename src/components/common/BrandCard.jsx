import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BrandCard = ({ brand }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-xl overflow-hidden flex flex-col h-full border border-slate-100 shadow-sm hover:shadow-lg font-sans"
        >
            {/* Image (Reduced container size to h-32/36 for compact look) */}
            <div className="relative h-28 sm:h-32 overflow-hidden bg-slate-50 flex items-center justify-center p-3">
                <img
                    src={brand.gallery[0] || ''}
                    alt={brand.name}
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500 ease-out"
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = brand.gallery[0] ? brand.gallery[0].replace('.png', '.svg') : ''; }}
                />
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-blue-600 border border-blue-50 shadow-sm">
                    {brand.category}
                </div>
            </div>

            {/* Content (Reduced padding to p-3) */}
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-slate-800 mb-0.5 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{brand.name}</h3>
                <p className="text-[11px] leading-relaxed text-slate-500 mb-2.5 line-clamp-2">{brand.description}</p>

                <div className="mt-auto">
                    <button
                        onClick={() => navigate(`/brands/${brand.slug}`)}
                        className="w-full py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-300 bg-slate-50 text-slate-700 group-hover:bg-blue-600 group-hover:text-white"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BrandCard;
