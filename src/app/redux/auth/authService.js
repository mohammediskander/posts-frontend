import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users/`;

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const updateUser = async (newUserData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const res = await axios.put(API_URL + user._id, newUserData);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } else {
    console.log("Error no user");
  }
};

const deleteUser = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    await axios.delete(API_URL + id);
    localStorage.removeItem("user");
  } else {
    console.log("Error no user");
  }
};

const authService = {
  register,
  logout,
  login,
  updateUser,
  deleteUser,
};

export default authService;
