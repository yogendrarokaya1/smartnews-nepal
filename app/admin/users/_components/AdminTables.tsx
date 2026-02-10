"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  handleGetAllUsers,
  handleDeleteUser,
} from "@/lib/actions/admin/user-action";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await handleGetAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await handleDeleteUser(id);
    if (res.success) {
      alert(res.message);
      fetchUsers(); // refresh list
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 capitalize">{user.role}</td>

                <td className="border p-2 space-x-2">
                  <Link
                    href={`/admin/users/edit/${user._id}`}
                    className="text-blue-500 border border-blue-500 px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500 border border-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
