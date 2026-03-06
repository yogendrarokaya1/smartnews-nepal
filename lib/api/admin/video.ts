import { API } from "../endpoints";
import axios from "../axios";

export const createVideo = async (videoData: FormData) => {
    try {
        const response = await axios.post(
            API.ADMIN.VIDEO.CREATE,
            videoData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create video failed');
    }
};

export const getAllVideos = async (params: {
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
            API.ADMIN.VIDEO.GET_ALL,
            { params }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all videos failed');
    }
};

export const getVideoById = async (id: string) => {
    try {
        const response = await axios.get(
            API.ADMIN.VIDEO.GET_ONE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get video by id failed');
    }
};

export const updateVideo = async (id: string, videoData: FormData) => {
    try {
        const response = await axios.patch(
            API.ADMIN.VIDEO.UPDATE(id),
            videoData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update video failed');
    }
};

export const deleteVideo = async (id: string) => {
    try {
        const response = await axios.delete(
            API.ADMIN.VIDEO.DELETE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete video failed');
    }
};

export const publishVideo = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.VIDEO.PUBLISH(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Publish video failed');
    }
};

export const archiveVideo = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.VIDEO.ARCHIVE(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Archive video failed');
    }
};

export const toggleFeatured = async (id: string) => {
    try {
        const response = await axios.patch(
            API.ADMIN.VIDEO.TOGGLE_FEATURED(id)
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Toggle featured failed');
    }
};
