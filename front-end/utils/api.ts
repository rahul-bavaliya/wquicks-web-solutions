let API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

// Ensure the URL starts with a protocol to prevent relative path issues
if (API_BASE_URL && !API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = `https://${API_BASE_URL}`;
}

export const API_ENDPOINTS = {
    CONTACT: `${API_BASE_URL}/api/contact`,
};
