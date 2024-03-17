import React, { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
 
import { categories } from '../constants/categories';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

type dropDownProps = {
    value?: string,
    onChangeHandler?: () => void 
}


const Dropdown = ({onChangeHandler, value}: dropDownProps) => {
        
    
    return (
    <div>
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className='w-[350px]'>
                {categories.length > 0 && categories.map((ctg) => {
                     return (<SelectItem  value={ctg.title}>{ctg.title}</SelectItem>)
                })}
            </SelectContent>
        </Select>
    </div>
  )
}

export default Dropdown;
