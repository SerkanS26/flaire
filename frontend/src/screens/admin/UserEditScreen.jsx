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
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // api call get product
  const {
    data: user,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId);

  // api call update product
  const [updateUser, { isLoading: loadingUpdateUser, error: errorUpdateUser }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      refetch();
      toast.success("User updated successfully");
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto px-3">
      <Link to="/admin/userlist">
        <button className="btn ml-4 mt-4">Go Back</button>
      </Link>

      {loadingUpdateUser && <Spinner loading={loadingUpdateUser} />}

      {errorUpdateUser && (
        <Message variant="danger">
          {errorUpdateUser?.data?.message || errorUpdateUser?.error}
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
            Edit User
          </h1>
          <form className="text-gray-600 w-1/2" onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-semibold mb-2">
                Is Admin
              </label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen;
