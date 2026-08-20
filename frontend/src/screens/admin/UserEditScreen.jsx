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

  // api call get user
  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  // api call update user
  const [updateUser, { isLoading: loadingUpdate, error: errorUpdate }] =
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
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User Updated!");
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

      {loadingUpdate && <Spinner loading={loadingUpdate} />}
      {errorUpdate && (
        <Message variant="danger">
          {errorUpdate?.data?.message || errorUpdate.error}
        </Message>
      )}
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <FormContainer>
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">
            Edit User
          </h1>
          <form className="text-gray-600" onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
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
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="isAdmin" className="text-sm font-semibold">
                Is Admin
              </label>
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
