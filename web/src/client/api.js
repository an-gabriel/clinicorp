import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", JSON.stringify(userData));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listProjects = async () => {
  try {
    const response = await api.get("/project");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendProjectData = async (project, currentProject) => {
  if (currentProject) {
    return await api.put(`/project/${currentProject.id}`, project);
  } else {
    return await api.post("/project", project);
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/project/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
