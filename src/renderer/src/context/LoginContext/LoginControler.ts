import axios from "axios";

interface LoginData {
  username : string;
  password : string;
}

// Define the URL type (optional but improves type safety)
type ApiUrl = string;

const URL_API_BACKEND: ApiUrl = process.env.REACT_APP_API_BACKEND_URL || "http://localhost:8081/lab"; // Replace with your actual backend URL

const userURL: string = `${URL_API_BACKEND}/auth/login`;

export const LoginFunction = async (arrayData: LoginData) => {
  try {
    const response = await axios.post<LoginData>(userURL, arrayData); // Specify expected response type
    return response;
  } catch (error) {
    return error;
  }
};