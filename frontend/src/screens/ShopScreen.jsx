// Components
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Paginate from "@/components/Paginate";

//icons
import { FaArrowLeft } from "react-icons/fa";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// redux query
import { useGetProductsQuery } from "../slices/productApiSlice";

import SearchBox from "@/components/SearchBox";
import { useEffect } from "react";

const ShopScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [keyword, pageNumber]);

  return (
    <>
      {keyword && (
        <div className="container mx-auto my-16 flex items-center justify-center gap-10 ">
          <Link
            to="/shop"
            className="text-gray-500 font-semibold flex items-center justify-center gap-2 hover:text-gray-600 hover:underline"
          >
            <FaArrowLeft />
            Go Back
          </Link>
          <h1 className="text-xl text-center text-gray-700 font-semibold my-4">
            Search results for
            <span className="text-blue-500 italic"> &quot;{keyword}&quot;</span>
          </h1>
        </div>
      )}

      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-16">
          <SearchBox />
          <h2 className="capitalize text-4xl font-semibold text-gray-700 mt-14 mb-4 text-center">
            Shop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {data.products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default ShopScreen;
