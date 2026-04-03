import axios from 'axios';
import { PlantAnalysisResponse, CareAdviceResponse, ChatRequest, ChatResponse } from '../types';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Plant Analysis
  async analyzePlant(imageData: string): Promise<PlantAnalysisResponse> {
    const response = await api.post('/analysis/analyze', { image: imageData });
    return response.data;
  },

  // Care Advice
  async getCareAdvice(plantId: string): Promise<CareAdviceResponse> {
    const response = await api.get(`/care/advice/${plantId}`);
    return response.data;
  },

  // Chat
  async chatWithPlant(request: ChatRequest): Promise<ChatResponse> {
    const response = await api.post('/chat', request);
    return response.data;
  },

  // User Plants
  async getUserPlants(): Promise<Plant[]> {
    const response = await api.get('/plants');
    return response.data;
  },

  async addPlant(plant: Partial<Plant>): Promise<Plant> {
    const response = await api.post('/plants', plant);
    return response.data;
  },

  async updatePlant(id: string, plant: Partial<Plant>): Promise<Plant> {
    const response = await api.put(`/plants/${id}`, plant);
    return response.data;
  },

  async deletePlant(id: string): Promise<void> {
    await api.delete(`/plants/${id}`);
  },
};
