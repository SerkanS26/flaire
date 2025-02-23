//react router dom
import { Link } from "react-router-dom";

// icons
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa";

// components
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

//toastify
import { toast } from "react-toastify";

//slices
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

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

const UserListScreen = () => {
  //get users
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // delete user
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-semibold text-gray-600 my-4">User List</h1>
      {loadingDelete && <Spinner loading={loadingDelete} />}
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
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ADMIN</TableHead>

              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500 w-full">
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Link
                    to={`mailto:${user.email}`}
                    className="hover:underline bg-slate-100 p-2 rounded-md"
                  >
                    {user.email}
                  </Link>
                </TableCell>

                <TableCell>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </TableCell>

                <TableCell className="flex flex-col  gap-2 md:flex-row">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="flex justify-center items-center gap-2 bg-green-100 text-green-600 hover:text-green-400 px-2 py-1 rounded-md">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>
                  <button
                    className="flex justify-center items-center gap-2 bg-red-100 text-red-600 hover:text-red-400 px-2 py-1 rounded-md"
                    onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
