'use client'
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";







const Pagination = ({page, totalPages} : {page: number, totalPages: number}) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    
    const handlePagination = (value : string) => {
        const nextPageNumber = value === 'prev' ? page - 1 : page + 1;
        

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'page',
            value: nextPageNumber.toString()
        })

        router.push(newUrl, {scroll: false})

    }

    return (
        <div className="flex justify-center items-center my-6 gap-5">
            <Button
            disabled={page === 1}
            size={"sm"}
            onClick={() => handlePagination("prev")}
            >
            Prev
            </Button>
            <Button size={"sm"} variant={"secondary"}>
            {page}
            </Button>
            <Button
            disabled={page >= totalPages}
            size={"sm"}
            onClick={() => handlePagination("next")}
            >
            Next
            </Button>
      </div>
    )
}

export default Pagination;