import Categories from "@/components/shared/Categories";
import SwiperComponent from "@/components/shared/SwiperComponent";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";
import { connectDB } from "@/lib/dbConnection";


export default function Home() {
  return (
   <>
      <SwiperComponent/>
      <Categories/>
      <h2 className="text-4xl max-sm:text-2xl font-bold text-center bg-gradient-to-r from-violet-600 to-primary bg-clip-text text-transparent mb-5 mt-12">
        Trusted by Thousand of Events
      </h2>
      <SearchBar placeHolder="Search Title..."/>
      <section className="bg-primary bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            hello
          </div>
        </div>
      </section>
   </>
  );
}
