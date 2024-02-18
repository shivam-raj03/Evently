'use client'
import React from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { sidebarLinks } from '../constants/sidebarLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


  

const MobileNav = () => {
    
    const pathName = usePathname();
   // console.log(pathName)
    return (
    <div className='flex items-center justify-center md:hidden'>
        <Sheet>
            <SheetTrigger>
                <GiHamburgerMenu/>
            </SheetTrigger>
            <SheetContent side={'right'} className='flex flex-col items-start bg-white w-[350px]'>
                {sidebarLinks.map((link) => {
                    let active = false;
                    if(pathName === link.path){
                        active = true;
                        
                    }

                    return (
                       <SheetClose asChild key={link.label}>
                            <Link 
                            href={link.path}
                            key={link.path}
                            className={`flex justify-center items-center gap-2  hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all ${active ? 'text-primary scale-105 underline underline-offset-8' : ''}`}
                            >
                                <div className='scale-110'>
                                    {link.image}
                                </div>
                                <p>
                                    {link.label}
                                </p>
                            </Link>
                      </SheetClose> 
                    )
                })}
            </SheetContent>
        </Sheet>

    </div>
  )
}

export default MobileNav;
