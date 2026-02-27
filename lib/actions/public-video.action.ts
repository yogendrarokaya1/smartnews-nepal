"use server";

import {
    getLatestVideos,
    getCategoryPreviews,
    getPublishedVideos,
    getVideoBySlug,
} from "@/lib/api/video";

export async function handleGetLatestVideos(limit: number = 5) {
    try {
        const response = await getLatestVideos(limit);
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || 'Failed to fetch videos' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetCategoryPreviews(limit: number = 3) {
    try {
        const response = await getCategoryPreviews(limit);
        if (response.success) {
            return {
                success: true,
                data: response.data,
                categories: response.categories,
            };
        }
        return { success: false, message: response.message || 'Failed to fetch categories' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetPublishedVideos(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}) {
    try {
        const response = await getPublishedVideos(params);
        if (response.success) {
            return {
                success: true,
                data: response.data,
                pagination: response.pagination,
            };
        }
        return { success: false, message: response.message || 'Failed to fetch videos' };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get videos action failed" };
    }
}

export async function handleGetVideoBySlug(slug: string) {
    try {
        const response = await getVideoBySlug(slug);
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || 'Video not found' };
    } catch (error: Error | any) {
        return { success: false, message: error.message || "Get video action failed" };
    }
}
