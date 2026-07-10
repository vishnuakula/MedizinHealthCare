import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import BrandCard from '@/components/common/BrandCard';
import { brands } from '@/data/brands';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BrandsSection = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="brands" className="section-padding bg-slate-50/50">
            <Container>
                <SectionTitle
                    badge="Our Brands"
                    title="Premium Healthcare Brands"
                    subtitle="Discover our wide range of trusted pharmaceutical products, tailored to provide the best care for you and your family."
                />

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mt-10"
                >
                    {/* Relative wrapper with side padding for navigation selectors */}
                    <div className="relative px-7 sm:px-14 max-w-[85rem] mx-auto">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, Keyboard]}
                            spaceBetween={18}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.swiper-btn-prev',
                                nextEl: '.swiper-btn-next',
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            keyboard={{ enabled: true }}
                            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            loop={true}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                                1400: { slidesPerView: 5 },
                            }}
                            className="!pb-14"
                        >
                            {brands.map((brand, index) => (
                                <SwiperSlide key={`${brand.slug}-${index}`} className="h-auto">
                                    <BrandCard brand={brand} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation buttons (outside the Swiper slider track/cards list) */}
                        <button
                            className="swiper-btn-prev absolute left-0 lg:-left-2 top-[42%] -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer z-10"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            className="swiper-btn-next absolute right-0 lg:-right-2 top-[42%] -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer z-10"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </Container>
            <style>{`
                .swiper-pagination-bullet-active {
                    background: #2563EB !important;
                }
                .swiper-btn-prev.swiper-button-disabled,
                .swiper-btn-next.swiper-button-disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `}</style>
        </section>
    );
};

export default BrandsSection;
