import axios from "axios";

export interface ModuleStats {
  responses?: number;
  avgRating?: number;
  surveys?: number;
  reports?: number;
  resolved?: number;
  requests?: number;
  votes?: number;
  todo?: number;
  inProgress?: number;
  done?: number;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  configured: boolean;
  stats: ModuleStats;
  color: string;
  enabled?: boolean;
}

export interface ModulesResponse {
  success: boolean;
  data: Module[];
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const fetchModules = async (
  page: number = 1,
  limit: number = 10
): Promise<ModulesResponse | any[]> => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `http://localhost:3000/api/modules?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Raw API response:", response.data);

    // If the response has a success property, return it as is
    if (
      response.data &&
      typeof response.data === "object" &&
      "success" in response.data
    ) {
      return response.data;
    }

    // If the response is directly an array, wrap it in success format
    if (Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
        message: "Modules fetched successfully",
      };
    }

    // Fallback: return the raw response
    return response.data;
  } catch (error: any) {
    console.error("Error fetching modules:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch modules"
    );
  }
};
