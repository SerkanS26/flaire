// react router dom
import { Link } from "react-router-dom";

// icons
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

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
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";

// toastify
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  // function to delete user
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-3">
      <h1 className="text-2xl font-semibold text-gray-600 my-4">Users</h1>

      {loadingDelete && <Spinner loading={loadingDelete} />}
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Table>
          <TableCaption>A list of all users.</TableCaption>
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
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </TableCell>
                <TableCell className="flex flex-col gap-2 md:flex-row">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className="flex justify-center items-center gap-2 bg-green-100 text-green-600 hover:text-green-400 px-2 py-1 rounded-md">
                      <FaEdit />
                      Edit
                    </button>
                  </Link>
                  {!user.isAdmin && (
                    <button
                      className="flex justify-center items-center gap-2 bg-red-100 text-red-600 hover:text-red-400 px-2 py-1 rounded-md"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  )}
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
