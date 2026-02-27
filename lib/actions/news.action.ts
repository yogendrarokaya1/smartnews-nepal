"use server";

import { revalidatePath } from "next/cache";
import {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews,
    publishNews,
    archiveNews,
    toggleFeatured,
} from "@/lib/api/admin/news";

export const handleCreateNews = async (formData: FormData) => {
    try {
        const response = await createNews(formData);
        if (response.success) {
            revalidatePath("/admin/news");
            return {
                success: true,
                message: "News article created successfully",
                data: response.data,
            };
        }
        return {
            success: false,
            message: response.message || "Create news failed",
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Create news action failed" };
    }
};

export const handleGetAllNews = async (params: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    try {
        const response = await getAllNews(params);
        if (response.success) {
            return {
                success: true,
                data: response.data,
                pagination: response.pagination,
            };
        }
        return { success: false, message: response.message || "Failed to fetch news" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get all news action failed" };
    }
};

export const handleGetNewsById = async (id: string) => {
    try {
        const response = await getNewsById(id);
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || "News not found" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get news action failed" };
    }
};

export const handleUpdateNews = async (id: string, formData: FormData) => {
    try {
        const response = await updateNews(id, formData);
        if (response.success) {
            revalidatePath("/admin/news");
            revalidatePath(`/admin/news/${id}`);
            return {
                success: true,
                message: "News article updated successfully",
                data: response.data,
            };
        }
        return {
            success: false,
            message: response.message || "Update news failed",
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Update news action failed" };
    }
};

export const handleDeleteNews = async (id: string) => {
    try {
        const response = await deleteNews(id);
        if (response.success) {
            revalidatePath("/admin/news");
            return {
                success: true,
                message: "News article deleted successfully",
            };
        }
        return { success: false, message: response.message || "Delete news failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Delete news action failed" };
    }
};

export const handlePublishNews = async (id: string) => {
    try {
        const response = await publishNews(id);
        if (response.success) {
            revalidatePath("/admin/news");
            return {
                success: true,
                message: "News published successfully",
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Publish news failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Publish news action failed" };
    }
};

export const handleArchiveNews = async (id: string) => {
    try {
        const response = await archiveNews(id);
        if (response.success) {
            revalidatePath("/admin/news");
            return {
                success: true,
                message: "News archived successfully",
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Archive news failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Archive news action failed" };
    }
};

export const handleToggleFeatured = async (id: string) => {
    try {
        const response = await toggleFeatured(id);
        if (response.success) {
            revalidatePath("/admin/news");
            return {
                success: true,
                message: response.message || "Featured status updated",
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Toggle featured failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Toggle featured action failed" };
    }
};
