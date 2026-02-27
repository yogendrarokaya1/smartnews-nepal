"use server";

import { revalidatePath } from "next/cache";
import {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideo,
    deleteVideo,
    publishVideo,
    archiveVideo,
    toggleFeatured,
} from "@/lib/api/admin/video";

export const handleCreateVideo = async (formData: FormData) => {
    try {
        const response = await createVideo(formData);
        if (response.success) {
            revalidatePath("/admin/videos");
            return {
                success: true,
                message: "Video created successfully",
                data: response.data,
            };
        }
        return {
            success: false,
            message: response.message || "Create video failed",
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Create video action failed" };
    }
};

export const handleGetAllVideos = async (params: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    try {
        const response = await getAllVideos(params);
        if (response.success) {
            return {
                success: true,
                data: response.data,
                pagination: response.pagination,
            };
        }
        return { success: false, message: response.message || "Failed to fetch videos" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get all videos action failed" };
    }
};

export const handleGetVideoById = async (id: string) => {
    try {
        const response = await getVideoById(id);
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Video not found" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get video action failed" };
    }
};

export const handleUpdateVideo = async (id: string, formData: FormData) => {
    try {
        const response = await updateVideo(id, formData);
        if (response.success) {
            revalidatePath("/admin/videos");
            revalidatePath(`/admin/videos/${id}`);
            return {
                success: true,
                message: "Video updated successfully",
                data: response.data,
            };
        }
        return {
            success: false,
            message: response.message || "Update video failed",
        };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Update video action failed" };
    }
};

export const handleDeleteVideo = async (id: string) => {
    try {
        const response = await deleteVideo(id);
        if (response.success) {
            revalidatePath("/admin/videos");
            return {
                success: true,
                message: "Video deleted successfully",
            };
        }
        return { success: false, message: response.message || "Delete video failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Delete video action failed" };
    }
};

export const handlePublishVideo = async (id: string) => {
    try {
        const response = await publishVideo(id);
        if (response.success) {
            revalidatePath("/admin/videos");
            return {
                success: true,
                message: "Video published successfully",
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Publish video failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Publish video action failed" };
    }
};

export const handleArchiveVideo = async (id: string) => {
    try {
        const response = await archiveVideo(id);
        if (response.success) {
            revalidatePath("/admin/videos");
            return {
                success: true,
                message: "Video archived successfully",
                data: response.data,
            };
        }
        return { success: false, message: response.message || "Archive video failed" };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Archive video action failed" };
    }
};

export const handleToggleFeatured = async (id: string) => {
    try {
        const response = await toggleFeatured(id);
        if (response.success) {
            revalidatePath("/admin/videos");
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
