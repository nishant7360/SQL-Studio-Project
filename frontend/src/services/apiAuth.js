import axios from "axios";

const BASE_URL = "http://localhost:8000/api/auth";

export async function signup({ name, email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("signup error : ", error);
    throw new Error(error.message);
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("Login error : ", error);
    throw new Error(
      error.response?.data?.message || "Invalid email or password",
    );
  }
}
export async function getMe() {
  try {
    const response = await axios.get(`${BASE_URL}/getMe`, {
      withCredentials: true,
    });
    return response.data.data.user;
  } catch (error) {
    console.log("Get me error : ", error);
    return null;
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data.message;
  } catch (error) {
    console.log("Error logout : ", error);
    throw new Error(error.message);
  }
}

export async function changePassword(currentPassword, newPassword) {
  try {
    const response = await axios.post(
      `${BASE_URL}/updatePassword`,
      { currentPassword, newPassword },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update password",
    );
  }
}
