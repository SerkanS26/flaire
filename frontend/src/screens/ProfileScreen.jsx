//React
import { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "../components/Message";
import Spinner from "../components/Spinner";

//icons
import { FaTimes, FaEye } from "react-icons/fa";

//shadcn ui
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//toast
import { toast } from "react-toastify";

//slices
import { setCredentials } from "@/slices/authSlice";

//api call
import { useProfileMutation } from "@/slices/usersApiSlice";
import { useGetMyOrdersQuery } from "@/slices/ordersApiSlice";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await updateProfile({
        id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-30/70 gap-10  my-10 px-8">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            User Profile
          </h2>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <label className=" text-gray-600 " htmlFor="name">
              Name
            </label>
            <input
              className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
            <label className=" text-gray-600 " htmlFor="email">
              Email Address
            </label>
            <input
              className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />

            <label className=" text-gray-600 " htmlFor="password">
              Password
            </label>
            <input
              className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />

            <label className=" text-gray-600 " htmlFor="ConfirmPassword">
              Confirm Password
            </label>
            <input
              className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="ConfirmPassword"
            />

            <button
              className="btn"
              type="submit"
              disabled={loadingUpdateProfile}
            >
              Update
            </button>

            {loadingUpdateProfile && <Spinner loading={loadingUpdateProfile} />}
          </form>
        </div>
        {/* Right  */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            My Orders
          </h2>
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error?.error}
            </Message>
          ) : (
            <Table className="w-full text-gray-500">
              <TableCaption>A list of your recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>

                  <TableHead>DATE</TableHead>
                  <TableHead>TOTAL</TableHead>
                  <TableHead>PAID</TableHead>
                  <TableHead>DELIVERED</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/order/${order._id}`}
                        className="flex justify-center items-center gap-2 bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-300 hover:text-white"
                      >
                        <button>Details</button>
                        <FaEye />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
