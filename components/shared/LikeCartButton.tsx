'use client'
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToast } from '../ui/use-toast';
import { likeUnlikeEvent } from '@/lib/actions/user.action';
import { Button } from '../ui/button';
import { MdOutlineDoNotDisturb, MdOutlineShoppingCart } from 'react-icons/md';
import { checkoutOrder } from '@/lib/actions/order.action';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { handleError } from '@/lib/utils';
  



interface props {
    event: any,
    user: any,
    likedEvent: boolean,
    option?: string
}


const LikeCartButton = ({event, user, likedEvent, option} : props) => {
   
    const { toast } = useToast()
    const [totalTickets, setTotalTickets] = useState(1);
    const maxTickets = event.ticketsLeft;

    const disableCart = new Date(event.startDate) < new Date() || event.soldOut || (event.ticketsLeft ? event.ticketsLeft <= 0 : false);

    const handleCheckout = async () => {
        try {
            if(!user){
                toast({
                    variant: 'destructive',
                    title: 'You must be logged in to like an event'
                });
                return;
            }

            const order = {
                totalTickets,
                totalAmount: (event.price*totalTickets),
                user,
                event
            }

            await checkoutOrder(order);

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: error.message,
            });
        }
    }

    const handleLike = async () => {
        try {
            if(!user){
                toast({
                    variant: 'destructive',
                    title: 'You must be logged in to like an event'
                });
                return;
            }
            if(!likedEvent){
                await likeUnlikeEvent(user._id, event._id);
                toast({
                    title: "Liked Event"
                })
            } else {
                await likeUnlikeEvent(user._id, event._id);
                toast({
                    title: "Unliked Event"
                })
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: error.message,
            });
        }
    }

    
  
  
    return (
    <>
        { option === "eventPage" ? (
            <div className='flex flex-wrap gap-3'>
                <Button 
                    onClick={() => handleLike()}
                    variant={"secondary"}
                    className='flex gap-1 rounded-full hover:scale-105 transition-all'
                >   
                    {!likedEvent && (
                        <span>
                        <FaRegHeart className="h-5 w-5 text-primary" />
                        </span>
                    )}
                    {likedEvent && (
                        <span>
                        <FaHeart className="h-5 w-5 text-primary" />
                        </span>
                    )}
                    Like
                </Button>
                { !disableCart && (
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                variant={'secondary'}
                                className='flex gap-1 rounded-full hover:scale-110 transition-all'
                            >
                                <MdOutlineShoppingCart className='h-5 w-5 text-primary'/>
                                Book Now
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='bg-[#ffffff]'>
                            <DialogTitle>
                                Number of tickets
                            </DialogTitle>
                            <DialogDescription>
                                <div className='flex max-sm:flex-col justify-center items-center gap-5 mt-1'>
                                    <span className='text-primary text-2xl font-bold'>
                                        ₹{event.price*totalTickets}
                                    </span>
                                    <Input
                                        type='number'
                                        min={1}
                                        max={maxTickets}
                                        value={totalTickets}
                                        onChange={(e) => setTotalTickets(+e.target.value)}
                                    
                                    />
                                    <Button
                                        onClick={() => handleCheckout()}
                                    >
                                        Book
                                    </Button>

                                </div>
                            </DialogDescription>

                        </DialogContent>
                    </Dialog>
                )}
                {disableCart && (
                    <Button
                    variant={'secondary'}
                    className='flex gap-1 rounded-full hover:scale-110 transition-all'
                    >
                        <MdOutlineShoppingCart className='h-5 w-5 text-primary'/>
                        Sold Out
                    </Button>
                )}
            </div>
        ) :
            <div className='absolute right-1 bottom-1 text-white'>
                <div className="border bg-secondary rounded-full m-1 h-7 w-7 flex justify-center items-center hover:scale-125" onClick={() => handleLike()}>
                    {!likedEvent && (
                    <span  onClick={() => handleLike()}>
                        <FaRegHeart className="h-full w-full p-1 text-primary" />
                    </span>
                    )}
                    {likedEvent && (
                    <span onClick={() => handleLike()}>
                        <FaHeart className="h-full w-full p-1 text-primary" />
                    </span>
                    )}
                </div>
            </div>
        }
      
    </>
  )
}

export default LikeCartButton;
