import axios from "./axios";
import { API } from "./endpoints";

export const getLandingNews = async () => {
    try {
        const response = await axios.get(API.NEWS.LANDING);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch landing news');
    }
};

export const getCategoryPreviews = async (limit: number = 5) => {
    try {
        const response = await axios.get(API.NEWS.CATEGORY_PREVIEWS, {
            params: { limit }
        });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch category news');
    }
};

export const getPublishedNews = async (params: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}) => {
    try {
        const response = await axios.get(API.NEWS.GET_PUBLISHED, { params });
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch news');
    }
};

export const getNewsBySlug = async (slug: string) => {
    try {
        const response = await axios.get(API.NEWS.GET_BY_SLUG(slug));
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Failed to fetch news article');
    }
};