import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/hints`;

export async function getHints(id, query, hints = []) {
  try {
    const response = await axios.post(`${BASE_URL}/generateHint`, {
      assignmentId: id,
      userQuery: query,
      previousHints: hints,
    });
    return response.data.hint;
  } catch (error) {
    console.log("get Hints error : ", error);
    throw new Error(error.message || "something went wrong");
  }
}
