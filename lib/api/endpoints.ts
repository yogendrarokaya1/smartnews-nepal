
export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        WHOAMI: '/api/auth/whoami',
        UPDATEPROFILE: '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,

    },

    // ── PUBLIC NEWS ENDPOINTS ──────────────────────────────────────────────
    NEWS: {
        LANDING:            '/api/news/landing',
        CATEGORY_PREVIEWS:  '/api/news/categories-preview',
        GET_PUBLISHED:      '/api/news',
        GET_BY_SLUG:        (slug: string) => `/api/news/slug/${slug}`,
    },

    // ── PUBLIC VIDEO ENDPOINTS ─────────────────────────────────────────────
    VIDEO: {
        LATEST:             '/api/videos/latest',
        CATEGORY_PREVIEWS:  '/api/videos/categories-preview',
        GET_PUBLISHED:      '/api/videos',
        GET_BY_SLUG:        (slug: string) => `/api/videos/slug/${slug}`,
    },

    
    
    ADMIN: {
        USER: {
            CREATE: '/api/admin/users/',
            GET_ALL: '/api/admin/users/',
            GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
            UPDATE: (userId: string) => `/api/admin/users/${userId}`,
            DELETE: (userId: string) => `/api/admin/users/${userId}`,
        },


        NEWS: {
            CREATE:         '/api/news',
            GET_ALL:        '/api/news/admin/all',
            GET_ONE:        (id: string) => `/api/news/admin/${id}`,
            UPDATE:         (id: string) => `/api/news/${id}`,
            DELETE:         (id: string) => `/api/news/${id}`,
            PUBLISH:        (id: string) => `/api/news/${id}/publish`,
            ARCHIVE:        (id: string) => `/api/news/${id}/archive`,
            TOGGLE_FEATURED:(id: string) => `/api/news/${id}/toggle-featured`,
        },

        VIDEO: {
            CREATE:          '/api/videos/admin',
            GET_ALL:         '/api/videos/admin/all',
            GET_ONE:         (id: string) => `/api/videos/admin/${id}`,
            UPDATE:          (id: string) => `/api/videos/admin/${id}`,
            DELETE:          (id: string) => `/api/videos/admin/${id}`,
            PUBLISH:         (id: string) => `/api/videos/admin/${id}/publish`,
            ARCHIVE:         (id: string) => `/api/videos/admin/${id}/archive`,
            TOGGLE_FEATURED: (id: string) => `/api/videos/admin/${id}/toggle-featured`,
        },
    }


}