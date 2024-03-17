import { getEventById } from '@/lib/actions/event.action';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import React from 'react'
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { dateConverter, timeFormatConverter } from '@/lib/utils';

interface paramTypes {
    params: {id: string}
}

const Page = async ({params} : paramTypes) => {
    
    const { userId } = auth();

    let user = null;
    let likedEvent = null;

    if (userId) {
        user = await getUserByClerkId(userId);
        likedEvent = await user.likedEvents.includes(params.id);
    }

    const event = await getEventById(params.id);

    const dateNow = new Date();
    const eventDate = new Date(event.startDate);
    const eventStillVallid =  eventDate > dateNow ? true: false;

    const startDate = dateConverter(event.startDate)
    const startTime = timeFormatConverter(event.startTime);
    const endTime = timeFormatConverter(event.endTime);


    
    
    return (
        <div className='mx-[20%] flex flex-col justify-center items-center p-3'>
            <div className=''>
                <Image
                    src={event.photo}
                    alt='event photo'
                    width={800}
                    height={600}
                    className='rounded-md'
                />
            </div>
            <div className='w-full'>
                <div className='flex gap-2 mt-6  flex-wrap justify-start items-center'>
                    <Badge className='text-base'>
                    {event.isFree ? 'Free': `₹ ${event.price}`}
                    </Badge >
                    <Badge variant='secondary' className='text-base'>
                    {event.category.name}
                    </Badge>
                    <Badge variant='secondary' className='text-base'>
                    {`By ${event.organizer.firstName} ${event.organizer.lastName}`}
                    </Badge>
                </div>
               
                <h3 className='font-semibold text-4xl mt-6'>
                    {event.title}
                </h3>
                <p className='text-m font-normal mt-6 mb-4'>
                    {event.description}
                </p>
                <div className={`flex gap-4 font-semibold justify-start my-3 items-center text-2xl flex-wrap ${!eventStillVallid ? 'text-primary' : ''}`}>
                    <div>
                        {
                        eventStillVallid ? startDate : 'Expired'
                        }
                    </div>
                    <div>
                        {eventStillVallid && `${startTime} - ${endTime}`}
                    </div>
                </div>
                <div className='text-2xl'>
                    {event.isOnline ? "Online Event" : `${event.location}`}
                </div>
             
            </div>
        </div>
        
    )
}

export default Page;
