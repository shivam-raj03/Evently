import clsx from 'clsx';
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface classNameType {
    className: string
}

const Skeleton = (class_name: classNameType) => {
    //console.log(className)
    const newClassName = twMerge(clsx('animate-pulse rounded-md bg-muted' , class_name.className))
   // console.log(newClassName);
    return (
    <div className={newClassName}>
      
    </div>
  )
}

export default Skeleton;
