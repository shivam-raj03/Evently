'use client'
import React from 'react';
import Image  from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback} from 'use-debounce';


interface placeHolderType {
    placeHolder: string
}

const SearchBar = ({placeHolder} : placeHolderType) => {
    
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const {replace } = useRouter();
    
    const handleChange = useDebouncedCallback((query: string) => {
        //console.log(query);
        const params = new URLSearchParams(searchParams);
        if(query){
            params.set('query', query);
        }else{
            params.delete('query');
        }

        replace(`${pathName}?${params.toString()}`);
    }, 700)
  
  
    
    return (
    <div className='flex mb-6 items-center justify-center '>
        <div className='px-2 h-10 w-auto flex rounded-lg border border-slate-300 bg-slate-50 dark:bg-gradient-to-b from-gray-900 to-zinc-900 dark:border-slate-800 max-sm:w-52 max-sm:ml-2 max-sm:h-5'>
            <input placeholder={placeHolder} className='mr-2 bg-transparent text-slate-800' onChange={(e)=> handleChange(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            ></input> 
            <Image src='/assets/images/search.svg'
                alt='search'
                width={24}
                height={24}
                className='mx-2'
            />
        </div>
    </div>
    
  )
}

export default SearchBar;
