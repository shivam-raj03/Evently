import { useSearchParams } from 'next/navigation';
import React from 'react';
import EventCard from './EventCard';

interface propTypes {
  events: any,
  page?: string
}

const EventCards = (props: propTypes) => {
    
    //const searchParams = useSearchParams();
    
    
    return (    
    <div className='flex justify-evenly items-center gap-10 flex-wrap'>
        {props.events.map((evt: any) => {
          return (<EventCard key={evt._id} event={evt} page={props.page} />)
        })}
        
    </div>
  )
}

export default EventCards;
