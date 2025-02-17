// react router dom
import { Link } from "react-router-dom";

// icons
import { FaEdit, FaTrash } from "react-icons/fa";

// shadcn ui table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// components
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

// api call
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productApiSlice";

// toastify
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  //function to delete product
  const deleteHandler = (id) => {
    console.log(`delete product ${id}`);
  };

  //function to create product
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product created successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-600 my-4">
            Product List
          </h1>
        </div>

        <button
          className="flex justify-center items-center gap-2 bg-blue-100 text-blue-600 hover:text-blue-400 px-2 py-1 rounded-md"
          onClick={createProductHandler}
        >
          <FaEdit />
          Create Product
        </button>
      </div>
      {loadingCreateProduct && <Spinner loading={loadingCreateProduct} />}
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>BRAND</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500 w-full">
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}€</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell className="flex flex-col  gap-2 md:flex-row">
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="flex justify-center items-center gap-2 bg-green-100 text-green-600 hover:text-green-400 px-2 py-1 rounded-md">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>
                  <button
                    className="flex justify-center items-center gap-2 bg-red-100 text-red-600 hover:text-red-400 px-2 py-1 rounded-md"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
