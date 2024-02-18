'use client'
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton, useSession, useUser} from '@clerk/nextjs';
import { Button } from '../ui/button';
//import NavItems from './NavItems';
import MobileNav from './MobileNav';
import { sidebarLinks } from '../constants/sidebarLink';


const Header = () => {
  const user = useUser();
  console.log(user);
  const session = useSession();
  return (
    <header className='w-full border-b'>
      <div className='my-4 flex items-center justify-between'>
        <Link href={'/'} className='flex items-center justify-center gap-2'>
          <Image 
            src='/assets/images/favicon.ico' width={24} height={24}
            alt='Evently logo'
          />
          <div className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent">
            Evently
          </div>
        </Link>
        <div className='flex items-center justify-center gap-4'>
            
            <div className='flex items-center justify-center gap-5 max-md:hidden font-semibold'>
                {sidebarLinks.map((link) => {
                    return (
                      <Link 
                        href={link.path}
                        key={link.path}
                        className='flex justify-center items-center gap-2  hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all'
                      >
                        <div className='scale-110'>
                          {link.image}
                        </div>
                        <p>
                          {link.label}
                        </p>
                      </Link>
                    )
                })}
            </div>
            
            <SignedIn>
              <UserButton afterSignOutUrl='/' />
              <MobileNav/>
            </SignedIn>
            <SignedOut>
              <Button asChild className='rounded-full' size='lg'>
                <Link href='/sign-in'> Login</Link>
              </Button>
            </SignedOut>
        </div>
      </div>
    </header>
  
)}

export default Header;
