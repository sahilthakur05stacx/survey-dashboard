import axios from "axios";

export interface Website {
  id: string;
  name: string;
  url: string;
  description?: string;
  status: "active" | "paused" | "inactive";
  totalResponses: number;
  feedbackCount: number;
  surveyResponses: number;
  bugReports: number;
  featureRequests: number;
  averageRating: number;
  responseRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const fetchWebsites = async (teamId: string): Promise<Website[]> => {
  console.log("🚀 fetchWebsites called with teamId:", teamId);

  const token = localStorage.getItem("auth_token");
  console.log("🔑 Auth token exists:", !!token);

  if (!token) {
    console.error("❌ No authentication token found");
    throw new Error("No authentication token found");
  }

  const apiUrl = `http://localhost:3000/api/websites/${teamId}/websites`;
  console.log("🌐 API URL:", apiUrl);

  try {
    console.log("📡 Making API request...");
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📥 API Response received:", {
      status: response.status,
      success: response.data.success,
      data: response.data.data,
      message: response.data.message,
    });

    if (response.data.success) {
      // Handle the actual API response structure
      const websites =
        response.data.data?.websites || response.data.websites || [];
      console.log("✅ Success! Returning websites:", websites);
      console.log("🔍 Raw response data structure:", response.data.data);
      return websites;
    } else {
      console.error("❌ API returned success: false", response.data.message);
      throw new Error(response.data.message || "Failed to fetch websites");
    }
  } catch (error: any) {
    console.error("💥 Error in fetchWebsites:", error);
    console.error("🔍 Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch websites"
    );
  }
};
