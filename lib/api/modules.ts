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
  data: Module[] | { websiteId?: string; modules?: Module[] };
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

export const setWebsiteModuleEnabled = async (
  websiteId: string,
  moduleId: string,
  enabled: boolean
) => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // First, check if the module already exists
    const listUrl = `http://localhost:3000/api/website-modules/websites/${websiteId}/modules`;
    const listResponse = await axios.get(listUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Find the module that matches our moduleId
    const modules =
      listResponse.data?.data ||
      listResponse.data?.modules ||
      listResponse.data ||
      [];
    const existingModule = modules.find(
      (m: any) =>
        m.moduleId === moduleId ||
        m.module?.id === moduleId ||
        m.id === moduleId
    );

    if (existingModule) {
      // Module exists, use PATCH to update
      const patchUrl = `http://localhost:3000/api/website-modules/${existingModule.id}`;
      const patchPayload = { enabled };

      const patchResponse = await axios.patch(patchUrl, patchPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return patchResponse.data;
    } else {
      // Module doesn't exist, use POST to create
      const url = `http://localhost:3000/api/website-modules/websites/${websiteId}/modules`;
      const payload = { websiteId, moduleId, enabled };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    }
  } catch (error: any) {
    console.error("💥 API Error:", error);
    console.error("🔍 Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update website module state"
    );
  }
};
