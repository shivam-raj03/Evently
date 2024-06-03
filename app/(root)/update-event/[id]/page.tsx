import React, { Suspense } from 'react';
import Loading from './loading';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserByClerkId } from '@/lib/actions/user.action';
import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.action';


interface paramTypes {
    params: {id: string}
}



const updateEvents = async ({params} : paramTypes) => {
    const { userId } = auth();
    
   
    if(!userId){
        redirect('/sign-in');
    }

    const user = await getUserByClerkId(userId);
    const event = await getEventById(params.id)
    
    return (
    <div>
        <EventForm userId={user._id} type='Update' event={event}/>
    </div>
  )
}

export default updateEvents;
