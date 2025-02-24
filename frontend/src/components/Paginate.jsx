// shadcn ui pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useNavigate } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const navigate = useNavigate();
  const handlePrevious = () => {
    if (page > 1) {
      navigate(
        isAdmin ? `/admin/productlist/${page - 1}` : `/shop/page/${page - 1}`
      );
    } else {
      navigate(isAdmin ? "/admin/productlist" : "/shop");
    }
  };

  const handleNext = () => {
    if (page < pages) {
      navigate(
        isAdmin ? `/admin/productlist/${page + 1}` : `/shop/page/${page + 1}`
      );
    }
  };
  return (
    pages > 1 && (
      <div>
        <Pagination>
          <PaginationPrevious
            onClick={handlePrevious}
            className="cursor-pointer"
          />
          <PaginationContent className="">
            {[...Array(pages).keys()].map((x) => (
              <PaginationItem key={x + 1}>
                <PaginationLink
                  href={
                    !isAdmin
                      ? keyword
                        ? `/shop/search/${keyword}/page/${x + 1}`
                        : `/shop/page/${x + 1}`
                      : `/admin/productlist/${x + 1}`
                  }
                >
                  {x + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext className={"cursor-pointer"} onClick={handleNext} />
        </Pagination>
      </div>
    )
  );
};

export default Paginate;
