import { useEffect, useState } from "react";
import type { User } from "../types/types";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/user/getUsers");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/user/deleteUser?id=${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Birthday</th>
              <th className="border px-4 py-2">Bio</th>
              <th className="border px-4 py-2">Hobbies</th>
              <th className="border px-4 py-2">Skills</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 text-sm">
                <td className="border px-4 py-2">
                  {user.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${user.image}`}
                      alt={user.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2">{user.gender || "-"}</td>
                <td className="border px-4 py-2">{user.phone || "-"}</td>
                <td className="border px-4 py-2">{user.address || "-"}</td>
                <td className="border px-4 py-2">
                  {user.birthday ? new Date(user.birthday).toLocaleDateString() : "-"}
                </td>
                <td className="border px-4 py-2">{user.bio || "-"}</td>
                <td className="border px-4 py-2">
                  {user.hobbies?.length ? user.hobbies.join(", ") : "-"}
                </td>
                <td className="border px-4 py-2">
                  {user.skills?.length ? user.skills.join(", ") : "-"}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/update-user/${user._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
