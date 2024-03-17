'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import {Autoplay, Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import { swiperContent } from '../constants/swiperContent';
import { Button } from '../ui/button';
import Link from 'next/link';

const SwiperComponent = () => {
  return (
    <Swiper
    modules={[Autoplay, Navigation]}
    className="h-screen mb-1"
    spaceBetween={100}
    slidesPerView={1}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
    }}
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      
    >
      {swiperContent.map((content, idx)=> {
          return (
            <SwiperSlide key={idx}>
                <div className='h-screen w-full -mt-10 max-sm:mt-0 max-sm:pt-4 flex flex-1 items-center justify-center gap-10 max-sm:gap-6 max-sm:flex-col'>
                  <div className='flex flex-col gap-10 max-sm:gap-4 text-center w-[550px] max-sm:w-auto'>
                    <h1 className='text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-violet-600 to-primary bg-clip-text text-transparent'>
                      {content.heading}
                    </h1>
                    <h2 className='text-xl font-bold max-sm:text-lg bg-gradient-to-br from-primary to-gray-500 bg-clip-text text-transparent'>
                      {content.description}
                    </h2>
                    <div>
                      <Link href='/'>
                        <Button>Explore</Button>
                      </Link>
                    </div>
                  </div>
                  <div className='flex items-center justify-center '>
                    <Image src={content.imageUrl} alt={content.alt} width={700} height={0} className='rounded-md'/>
                  </div>
                </div>
            </SwiperSlide>
          )
      })}


      
      
      
    </Swiper>
  );
};

export default SwiperComponent;