// Components
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

// redux query
import { useGetProductsQuery } from "../slices/productApiSlice";

const ShopScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-16">
          <h2 className="capitalize text-4xl font-semibold text-gray-700 my-4 text-center">
            Shop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopScreen;
