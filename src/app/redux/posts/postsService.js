import * as api from "../../api";

const getPosts = async () => {
  const { data } = await api.fetchPosts();
  return data;
};

const createPost = async (postData) => {
  const { data } = await api.createPost(postData);
  return data;
};

const deletePost = async (id) => {
  const { data } = await api.deletePost(id);
  return data;
};

const postsService = {
  getPosts,
  createPost,
  deletePost,
};
export default postsService;
