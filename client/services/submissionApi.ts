import axios from "axios";

// Backend API endpoint (proxies to MockAPI)
const API_BASE_URL = "/api";

export interface Submission {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  additionalInfo: string;
  roles: string;
  budget: string;
  talents: string;
  persona: string;
  createdAt?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const submissionApi = {
  // Get all submissions
  getAll: async () => {
    try {
      const response = await api.get<Submission[]>("/submissions");
      return response.data;
    } catch (error) {
      console.error("Error fetching submissions:", error);
      throw error;
    }
  },

  // Create new submission
  create: async (data: Submission) => {
    try {
      const response = await api.post<Submission>("/submissions", {
        ...data,
        createdAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating submission:", error);
      throw error;
    }
  },

  // Update submission
  update: async (id: string, data: Submission) => {
    try {
      const response = await api.put<Submission>(`/submissions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating submission:", error);
      throw error;
    }
  },

  // Delete submission
  delete: async (id: string) => {
    try {
      await api.delete(`/submissions/${id}`);
    } catch (error) {
      console.error("Error deleting submission:", error);
      throw error;
    }
  },
};
