"use server";

import {
    getLandingNews,
    getCategoryPreviews,
    getPublishedNews,
    getNewsBySlug,
} from "@/lib/api/news";

export async function handleGetLandingNews() {
    try {
        const response = await getLandingNews();
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || 'Failed to fetch landing news' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetCategoryPreviews(limit: number = 5) {
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

export async function handleGetPublishedNews(params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}) {
    try {
        const response = await getPublishedNews(params);
        if (response.success) {
            return {
                success: true,
                data: response.data,
                pagination: response.pagination,
            };
        }
        return { success: false, message: response.message || 'Failed to fetch news' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export async function handleGetNewsBySlug(slug: string) {
    try {
        const response = await getNewsBySlug(slug);
        if (response.success) {
            return {
                success: true,
                data: response.data,
            };
        }
        return { success: false, message: response.message || 'Article not found' };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}
