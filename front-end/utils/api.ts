let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

// Ensure the URL starts with a protocol to prevent relative path issues
if (API_BASE_URL && !API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = `https://${API_BASE_URL}`;
}

export const API_ENDPOINTS = {
    CONTACT: `${API_BASE_URL}/api/contact`,
    ADMIN_CONTACTS: `${API_BASE_URL}/api/admin/contacts`,
    ADMIN_STATUS: (id: number | string) => `${API_BASE_URL}/api/admin/contacts/${id}/status`,
    ADMIN_NOTES: (id: number | string) => `${API_BASE_URL}/api/admin/contacts/${id}/notes`,
    ADMIN_UPDATE: (id: number | string) => `${API_BASE_URL}/api/admin/contacts/${id}`,
    ADMIN_DELETE: (id: number | string) => `${API_BASE_URL}/api/admin/contacts/${id}/delete`,
    ADMIN_FORGOT_PASSWORD: `${API_BASE_URL}/api/admin/forgot-password`,
    ADMIN_UPLOAD_CONTRACT: (id: number) => `${API_BASE_URL}/api/admin/contacts/${id}/upload`,
    ADMIN_DOWNLOAD_SIGNED: (id: number) => `${API_BASE_URL}/api/admin/contacts/${id}/download-signed`,
    ADMIN_DELETE_CONTRACT: (id: number) => `${API_BASE_URL}/api/admin/contacts/${id}/contract`,
};
