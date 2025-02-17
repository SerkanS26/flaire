//react
import { useState, useEffect } from "react";
//react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//components
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import FormContainer from "@/components/FormContainer";

//toastify
import { toast } from "react-toastify";

//api call
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  // api call get product
  const {
    data: product,
    isLoading,

    error,
  } = useGetProductDetailsQuery(productId);

  // api call update product
  const [
    updateProduct,
    { isLoading: loadingUpdateProduct, error: errorUpdateProduct },
  ] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload, error: errorUpload }] =
    useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated!");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto px-3">
      <Link to="/admin/productlist">
        <button className="btn ml-4 mt-4">Go Back</button>
      </Link>

      {loadingUpdateProduct && <Spinner loading={loadingUpdateProduct} />}
      {loadingUpload && <Spinner loading={loadingUpload} />}
      {errorUpload && (
        <Message variant="danger">
          {errorUpload?.data?.message || errorUpload.error}
        </Message>
      )}
      {errorUpdateProduct && (
        <Message variant="danger">
          {errorUpdateProduct?.data?.message || errorUpdateProduct.error}
        </Message>
      )}
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <FormContainer className="">
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">
            Edit Product
          </h1>
          <form className="text-gray-600" onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-semibold mb-2">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* image placeholder */}

            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-semibold mb-2">
                Image
              </label>
              <input
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="file"
                onChange={uploadFileHandler}
                label="Choose File"
                className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-semibold mb-2">
                Brand
              </label>
              <input
                type="text"
                placeholder="Enter product brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-l00 text-sm font-semibold mb-2">
                Count In Stock
              </label>
              <input
                type="number"
                placeholder="Enter product count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-l00 text-sm font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-l00 text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                rows="10"
                cols="50"
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <button type="submit" className="my-2 btn">
                Update
              </button>
            </div>
          </form>
        </FormContainer>
      )}
    </div>
  );
};

export default ProductEditScreen;
