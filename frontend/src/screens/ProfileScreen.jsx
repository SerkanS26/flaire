//React
import { useEffect, useState } from "react";

//react router dom
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Reveal from "../components/motion/Reveal";

//framer-motion
import { motion } from "framer-motion";

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
    } else {
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
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink-100 bg-ink-50 p-3 text-ink-700 placeholder:text-ink-300 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400";

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-30/70">
        {/* Left */}
        <Reveal className="h-min rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-display text-2xl font-semibold text-ink-800">
            User Profile
          </h2>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="name">
              Name
            </label>
            <input
              className={inputClass}
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
            <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="email">
              Email Address
            </label>
            <input
              className={inputClass}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />

            <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="password">
              Password
            </label>
            <input
              className={inputClass}
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />

            <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="ConfirmPassword">
              Confirm Password
            </label>
            <input
              className={inputClass}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="ConfirmPassword"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn mt-2"
              type="submit"
              disabled={loadingUpdateProfile}
            >
              Update
            </motion.button>

            {loadingUpdateProfile && <Spinner loading={loadingUpdateProfile} />}
          </form>
        </Reveal>
        {/* Right  */}
        <Reveal delay={0.1} className="rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-display text-2xl font-semibold text-ink-800">
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
                    <TableCell>{order.totalPrice}€</TableCell>
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
        </Reveal>
      </div>
    </div>
  );
};

export default ProfileScreen;
