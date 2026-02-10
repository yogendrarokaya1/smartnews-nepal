import Link from "next/link";
import UsersTable from "@/app/admin/users/_components/AdminTables";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Admin Users</h1>

        <Link
          href="/admin/users/create"
          className="text-blue-500 border border-blue-500 p-2 rounded"
        >
          Create User
        </Link>
      </div>

      <UsersTable />
    </div>
  );
}
