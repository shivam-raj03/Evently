import React from 'react';
import { categories } from '../constants/categories';
import Link from 'next/link';
const Categories = () => {
  return (
    <div id='categories' className='flex mb-5 gap-4 text-center overflow-x-auto'>
      {categories.map((cate) => {
            return (
                <Link href={cate.path} key={cate.title} className='flex-col items-center justify-center gap-6 font-semibold hover:text-primary hover:scale-95 transition-all'>
                    <div className=' flex items-center justify-center'>
                       <div className='border rounded-full h-16 w-16 flex items-center justify-center'>
                            <div className='scale-150'>
                                {cate.icon}
                            </div>
                       </div>
                    </div>
                    <div className=' mt-2'>
                        {cate.title}
                    </div> 
                </Link>
            )
      })}
    </div>
  )
}

export default Categories;
