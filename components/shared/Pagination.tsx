import { Button } from "../ui/button"









const Pagination = ({page, totalPages} : {page: number, totalPages: number}) => {


    return (
        <div>
            <Button>
                Prev
            </Button>
            <Button>
                Page Number
            </Button>
            <Button>
                Next
            </Button>
        </div>
    )
}

export default Pagination;