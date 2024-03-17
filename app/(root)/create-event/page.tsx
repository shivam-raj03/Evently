import React, { Suspense } from 'react';
import Loading from './loading';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserByClerkId } from '@/lib/actions/user.action';
import EventForm from '@/components/shared/EventForm';

const createEvents = async () => {
    const { userId } = auth();
   
    if(!userId){
        redirect('/sign-in');
    }

    const user = await getUserByClerkId(userId);
    
    return (
    <div>
        <EventForm userId={user._id} type='Create'/>
    </div>
  )
}

export default createEvents;
