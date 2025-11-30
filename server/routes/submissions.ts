import { RequestHandler } from "express";
import axios from "axios";

const MOCKAPI_BASE_URL = "https://6929e9609d311cddf34b9ae5.mockapi.io";

const mockApi = axios.create({
  baseURL: MOCKAPI_BASE_URL,
});

// Get all submissions
export const getSubmissions: RequestHandler = async (req, res) => {
  try {
    const response = await mockApi.get("/submissions");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from MockAPI:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

// Create submission
export const createSubmission: RequestHandler = async (req, res) => {
  try {
    const response = await mockApi.post("/submissions", req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating submission in MockAPI:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};

// Update submission
export const updateSubmission: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await mockApi.put(`/submissions/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error updating submission in MockAPI:", error);
    res.status(500).json({ error: "Failed to update submission" });
  }
};

// Delete submission
export const deleteSubmission: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await mockApi.delete(`/submissions/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting submission from MockAPI:", error);
    res.status(500).json({ error: "Failed to delete submission" });
  }
};
