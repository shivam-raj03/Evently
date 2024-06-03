import Categories from "@/components/shared/Categories";
import SwiperComponent from "@/components/shared/SwiperComponent";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";
import EventCards from "@/components/shared/EventCards";
import { getCategoryByName } from "@/lib/actions/category.action";
import { getEventsByCategory } from "@/lib/actions/event.action";
import { getEvents } from "@/lib/actions/event.action";
import Pagination from "@/components/shared/Pagination";
import NoResults from "@/components/shared/NoResults";


interface searchParamsProps {
  searchParams: {
    query?: string,
    page?: string,
    category?: string
  }
}

export default async function Home({searchParams }: searchParamsProps) {  
  let listedEvents = []
  let totalPages = 0;
  console.log(searchParams)
  if(searchParams.category){
    console.log('inside',searchParams.category)
    const category = await getCategoryByName(searchParams.category);
    //console.log(category)
    listedEvents = await getEventsByCategory(category?._id); 
  } else {
    const result = await getEvents(
      searchParams.query ? searchParams.query : "",
      searchParams.page ? +searchParams.page : 1
    );
    listedEvents = result.events;
    totalPages = result.totalPages;
  }
  

  return (
   <>
      <SwiperComponent/>
      <Categories/>
      <h2 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5 mt-12">
        Trusted by Thousand of Events
      </h2>
      <SearchBar placeHolder="Search Title..."/>
      {listedEvents.length > 0 ? (
        <EventCards events={listedEvents} />
      ) : (
        <NoResults
          title={"No events found"}
          description={""}
        />
      )}
      <Pagination page={searchParams.page ? +searchParams.page : 1}  totalPages={totalPages}/>
      
   </>
  );
}
