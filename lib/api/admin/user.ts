import { API } from "../endpoints";
import axios from "../axios";

/* ================= CREATE USER ================= */
export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(
      API.ADMIN.USER.CREATE,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // for multer
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Create user failed"
    );
  }
};

/* ================= GET ALL USERS ================= */
export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      API.ADMIN.USER.GET_ALL
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get users failed"
    );
  }
};

/* ================= GET USER BY ID ================= */
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      API.ADMIN.USER.GET_ONE(id)
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Get user failed"
    );
  }
};

/* ================= UPDATE USER ================= */
export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await axios.put(
      API.ADMIN.USER.UPDATE(id),
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // for multer
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Update user failed"
    );
  }
};

/* ================= DELETE USER ================= */
export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      API.ADMIN.USER.DELETE(id)
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Delete user failed"
    );
  }
};
