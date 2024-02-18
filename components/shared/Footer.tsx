import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='my-4 flex max-sm:flex-col max-sm:gap-2 justify-between'>
        <Link href={'/'} className='flex items-center justify-center gap-2'>
          <Image 
            src='/assets/images/favicon.ico' width={24} height={24}
            alt='Evently logo'
          />
          <div className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent">
            Evently
          </div>
        </Link>
        <div className='flex items-center justify-center text-sm font-serif'>
          <p>2024 Evently. All Rights Reserved </p>
        </div>
       
      </div>
    </footer>
  )
}

export default Footer;
