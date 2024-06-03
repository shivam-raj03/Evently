import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserByClerkId } from '@/lib/actions/user.action';
import { getEventById, getEventsByUserId } from '@/lib/actions/event.action';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EventCards from '@/components/shared/EventCards';
import NoResults from '@/components/shared/NoResults';



const Page = async () => {
    
    const { userId } = auth();

    if(!userId){
        redirect('/signin');
    }
    
    const user = await getUserByClerkId(userId);

    const events = await getEventsByUserId(user._id);


  
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex max-sm:flex-col justify-between max-sm:items-center'>
                <h2 className="text-3xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5 mt-6">
                    Events organized by you
                </h2>
                <Link href="/create-event">
                    <Button>Create Event</Button>
                </Link>
            </div>
            {events.length > 0 ? <EventCards events={events} page='profile'/> : 
                <NoResults
                    title='You have not created any events yet.'
                    description="create your first event now!"
                />
            }
        </div>
  )
}

export default Page;
