"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API, BACKEND_URL } from "@/lib/api/endpoints";

type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
};

/* ================= CREATE USER ================= */
export const handleCreateUser = async (data: FormData): Promise<ActionResponse> => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BACKEND_URL}${API.ADMIN.USER.CREATE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const response = await res.json();

    if (!res.ok) {
      return { success: false, message: response.message || "Create user failed" };
    }

    revalidatePath("/admin/users");

    return { success: true, message: "User created successfully", data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Create user action failed" };
  }
};

/* ================= GET ALL USERS ================= */
export const handleGetAllUsers = async () => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BACKEND_URL}${API.ADMIN.USER.GET_ALL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const response = await res.json();

    if (!res.ok) throw new Error(response.message || "Fetch users failed");

    // Return only the users array
    return response.data ?? [];
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return [];
  }
};

/* ================= GET USER BY ID ================= */
export const handleGetUserById = async (id: string): Promise<any> => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BACKEND_URL}${API.ADMIN.USER.GET_ONE(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Fetch user failed");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Fetch user failed");
  }
};

/* ================= UPDATE USER ================= */
export const handleUpdateUser = async (id: string, data: FormData): Promise<ActionResponse> => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BACKEND_URL}${API.ADMIN.USER.UPDATE(id)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const response = await res.json();

    if (!res.ok) {
      return { success: false, message: response.message || "Update user failed" };
    }

    revalidatePath("/admin/users");

    return { success: true, message: "User updated successfully", data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Update user action failed" };
  }
};

/* ================= DELETE USER ================= */
export const handleDeleteUser = async (id: string): Promise<ActionResponse> => {
  try {
    const token = (await cookies()).get("token")?.value;

    const res = await fetch(`${BACKEND_URL}${API.ADMIN.USER.DELETE(id)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, message: err.message || "Delete user failed" };
    }

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Delete user action failed" };
  }
};
