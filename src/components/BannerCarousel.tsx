import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerCarousel() {
  const { data: settings } = useGlobalSettings();

  const banners = settings?.banners || [];

  if (banners.length === 0) return null;

  return (
    <div className="relative max-w-[1255px] mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative block w-full group">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={banner.desktopImage}
                />
                <img
                  src={banner.mobileImage}
                  alt={banner.title}
                  className="w-full h-[180px] sm:h-[240px] md:h-[261px] object-cover"
                />
              </picture>
              {(banner.title || banner.subtitle) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-left">
                    {banner.title && (
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                        {banner.title}
                      </h2>
                    )}
                    {banner.subtitle && (
                      <p className="text-sm sm:text-base text-white/90 line-clamp-2">
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}