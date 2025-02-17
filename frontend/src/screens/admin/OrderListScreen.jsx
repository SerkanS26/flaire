//react router dom
import { Link } from "react-router-dom";

// icons
import { FaEye, FaTimes } from "react-icons/fa";

// components
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

//slices
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

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

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  console.log(orders);
  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-semibold text-gray-600 my-4">Order List</h1>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>USER</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500 w-full">
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell>{order.user && order.user.name}</TableCell>
                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    to={`/order/${order._id}`}
                    className="flex justify-center items-center gap-2 text-blue-600 bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-300 hover:text-white"
                  >
                    <FaEye />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
