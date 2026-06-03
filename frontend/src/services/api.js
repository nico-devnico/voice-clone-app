import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const voiceService = {
  cloneVoice: async (sourceFile, referenceFile) => {
    const formData = new FormData();
    formData.append('source_file', sourceFile);
    formData.append('reference_file', referenceFile);
    const response = await api.post('/voice/clone', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  cloneTTS: async (text, referenceFile, language = 'English') => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('reference_file', referenceFile);
    formData.append('language', language);
    const response = await api.post('/voice/clone-tts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  generateTTS: async (text, language = 'English', speed = 1.0) => {
    const response = await api.post('/tts/generate', { text, language, speed });
    return response.data;
  },
  transcribe: async (audioFile) => {
    const formData = new FormData();
    formData.append('file', audioFile);
    const response = await api.post('/stt/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default api;
