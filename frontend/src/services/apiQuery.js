import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/query`;

export async function excQuery(query, id) {
  const cleanQuery = query
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .trim();

  try {
    const response = await axios.post(
      `${BASE_URL}/execute`,
      {
        id,
        query: cleanQuery,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    // extract backend message instead of axios generic message
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong",
    );
  }
}

export async function checkQueryOutput(result, expectedOutput, id, query) {
  try {
    const response = await axios.post(
      `${BASE_URL}/checkOutput`,
      {
        output: result,
        expectedOutput,
        id,
        query,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("Query check output error : ", error);
    throw new Error(error.message || "Something went wrong");
  }
}
