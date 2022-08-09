import axios from "axios";

const URL = "http://localhost:8080/api";

// User
export const fetchUsers = () => axios.get(`${URL}/users`);
export const fetchUserById = (id) => axios.get(`${URL}/users/${id}`);
export const updateUser = (id, payload) =>
  axios.put(`${URL}/users/${id}`, payload);
export const deleteUser = (id) => axios.delete(`${URL}/users/${id}`);

// Post
export const fetchPosts = () => axios.get(`${URL}/posts`);
export const deletePost = (id) => axios.delete(`${URL}/posts/${id}`);
export const createPost = (post) => axios.post(`${URL}/posts`, post);
export const fetchPostById = (id) => axios.get(`${URL}/posts/${id}`);
