
import React, { useEffect, useState } from 'react';
import { auth } from '@clerk/nextjs';
import User from '@/lib/Models/User';
import { getUserByClerkId } from '@/lib/actions/user.action';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import {format } from 'date-fns';
import { dateConverter, timeFormatConverter } from '@/lib/utils';


interface eventProps  {
    event: any,
    page?: string
}





const EventCard = async ({event, page} : eventProps) => {
    
    const [likedEvent, setLikedEvent] = useState(false);

    
    const dateNow = new Date();
    const eventDate = new Date(event.startDate);
    const eventStillVallid =  eventDate > dateNow ? true: false;

    const startDate = dateConverter(event.startDate)
    const startTime = timeFormatConverter(event.startTime);
    const endTime = timeFormatConverter(event.endTime);


    useEffect(() => {
      const fetchLikedEvents = async () => {
        const { userId } = auth();
        let currentUser = null;

        if(userId){
            currentUser = await getUserByClerkId(userId);
            setLikedEvent(currentUser.likedEvents.includes(event._id))
        }
      }
      fetchLikedEvents();
    }, [])
    return (
    <div className='flex flex-col border h-96 w-96 rounded-md hover:scale-95 transition-all shadow-md relative'>
      <div className='flex flex-col h-[92%]' >
        <div className='w-full h-[55%] overflow-hidden'>
          <Link href={`event/${event._id}`}>
            <Image 
                src={event.photo}
                alt={event.title}
                width={1920}
                height={1280}
                className='rounded-md'
            />
          </Link>
        </div>
        
       
        <div className='w-full h-[45%]'>
          <Link href={`event/${event._id}`} className=''>
            <div className='flex gap-2 m-3 flex-wrap justify-start items-center'>
                <Badge>
                  {event.isFree ? 'Free': `₹ ${event.price}`}
                </Badge >
                <Badge variant='secondary'>
                  {event.category.name}
                </Badge>
                <Badge variant='secondary'>
                  {event.landmark ? event.landmark : "Online"}
                </Badge>
            </div>
            <div className='flex gap-4 justify-start items-center text-sm flex-wrap m-3 '>
              <div>
                {
                  eventStillVallid ? startDate : 'Expired'
                }
              </div>
              <div>
                {eventStillVallid && `${startTime} - ${endTime}`}
              </div>
            </div>
            <h3 className='font-semibold text-xl mx-3 line-clamp-1'>
              {event.title}
            </h3>
            <p className='text-xs font-normal line-clamp-2 mx-3 my-2'>
              {event.description}
            </p>
            </Link>   
        </div>
      </div>
      <div className="flex justify-between">
        <Badge
          variant={"secondary"}
          className="mx-3 w-fit"
        >{`${event.organizer.firstName} ${event.organizer.lastName}`}</Badge>
        {/* {page === "profile" && <DeleteEventButton event={event} />} */}
      </div>
    </div>
  )
}

export default EventCard;
