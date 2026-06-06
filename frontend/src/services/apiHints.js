import axios from "axios";

const BASE_URL = " https://sql-studio-f9qz.onrender.com/api/hint";

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
