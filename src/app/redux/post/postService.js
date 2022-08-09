import * as api from "../../api";

const getPostById = async (id) => {
  const { data } = await api.fetchPostById(id);
  return data;
};

const deletePost = async (id) => {
  const { data } = await api.deletePost(id);
  return data;
};

const postService = {
  getPostById,
  deletePost,
};
export default postService;
