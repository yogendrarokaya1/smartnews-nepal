import { API } from "../endpoints";
import axios from "../axios";

export const createNews = async (newsData: FormData) => {
    try {
        const response = await axios.post(
            API.ADMIN.NEWS.CREATE,
            newsData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create news failed');
    }
};

export const getAllNews = async (params: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}) => {
    try {
        const response = await axios.get(
            API.ADMIN.NEWS.GET_ALL,
            { params }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all news failed');
    }
};

export const getNewsById = async (id: string) => {
    try {
        const response = await axios.get(
            API.ADMIN.NEWS.GET_ONE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get news by id failed');
    }
};

export const updateNews = async (id: string, newsData: FormData) => {
    try {
        const response = await axios.patch(
            API.ADMIN.NEWS.UPDATE(id),
            newsData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update news failed');
    }
};

export const deleteNews = async (id: string) => {
    try {
        const response = await axios.delete(
            API.ADMIN.NEWS.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete news failed');
    }
};

export const publishNews = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.NEWS.PUBLISH(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Publish news failed');
    }
};

export const archiveNews = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.NEWS.ARCHIVE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Archive news failed');
    }
};

export const toggleFeatured = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.NEWS.TOGGLE_FEATURED(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Toggle featured failed');
    }
};
