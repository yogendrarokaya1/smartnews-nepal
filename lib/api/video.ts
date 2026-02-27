import axios from "./axios";
import { API } from "./endpoints";

export const getLatestVideos = async (limit: number = 5) => {
    try {
        const response = await axios.get(API.VIDEO.LATEST, {
            params: { limit }
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch latest videos');
        }
        throw error;
    }
};
??

export const getCategoryPreviews = async (limit: number = 3) => {
    try {
        const response = await axios.get(API.VIDEO.CATEGORY_PREVIEWS, {
            params: { limit }
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch category videos');
        }
        throw error;
    }
};

export const getPublishedVideos = async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}) => {
    try {
        const response = await axios.get(API.VIDEO.GET_PUBLISHED, { params });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch videos');
        }
        throw error;
    }
};

export const getVideoBySlug = async (slug: string) => {
    try {
        const response = await axios.get(API.VIDEO.GET_BY_SLUG(slug));
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch video');
        }
        throw error;
    }
};
