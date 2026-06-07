import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/assignment`;

export async function getAllQuestions() {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-assignments`);

    return response.data.data;
  } catch (error) {
    console.log(error);

    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong",
    );
  }
}

export async function getQuestionById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/get-assignment/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);

    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong",
    );
  }
}
