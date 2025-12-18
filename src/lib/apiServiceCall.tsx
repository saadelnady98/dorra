import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://dashboard.dorrattaybah.com/api/"
    : "https://dashboard.dorrattaybah.com/api/";

const apiServiceCall = async ({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
}) => {
  try {
    const response = await axios({
      method: method?.toUpperCase() || "GET",
      url: `${baseUrl}${url}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        ...headers,
      },
      // Spread any custom config passed to the function
    });
    return response?.data;
  } catch (error) {
    // Handle error (you could add more custom error handling here)
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;
