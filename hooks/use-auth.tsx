"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    // company: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  needsOnboarding: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("user");
    const onboardingComplete = localStorage.getItem("onboarding_complete");

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);

      // Check if user needs onboarding
      if (!onboardingComplete) {
        setNeedsOnboarding(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      const payload = (response?.data ?? {}) as {
        success?: boolean;
        message?: string;
        data?: {
          token?: string;
          user?: Partial<User> & {
            id?: string;
            name?: string;
            email?: string;
            company?: string;
            avatar?: string | null;
          };
        };
      };
      if (payload && payload.success === false) {
        throw { message: payload.message || "Login failed" };
      }
      const apiUser = payload.data?.user || {};
      const userData: User = {
        id: apiUser.id || "",
        name: apiUser.name || "",
        email: apiUser.email || email,
        company: apiUser.company || "",
        avatar: apiUser.avatar || "/diverse-user-avatars.png",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      if (payload.data?.token) {
        localStorage.setItem("auth_token", payload.data.token);
      }
      const onboardingComplete = localStorage.getItem("onboarding_complete");
      setNeedsOnboarding(!onboardingComplete);

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = (error.response?.data ?? {}) as {
          message?: string;
          errors?: Record<string, string>;
        };
        const message = data.message || error.message || "Login failed";
        const fieldErrors = data.errors || undefined;
        throw { message, fieldErrors };
      }
      throw error instanceof Error ? error : { message: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    // company: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          // company,
          email,
          password,
        }
      );
      console.log(response, "response");

      const data = response?.data as
        | { success?: boolean; message?: string }
        | undefined;
      if (data && data.success === false) {
        throw { message: data.message || "Registration failed" };
      }

      return true;
    } catch (error: unknown) {
      // Re-throw a clean, structured error so UI can show field messages
      if (axios.isAxiosError(error)) {
        const data = (error.response?.data ?? {}) as {
          message?: string;
          errors?: Record<string, string>;
        };
        const message = data.message || error.message || "Registration failed";
        const fieldErrors = data.errors || undefined;
        throw { message, fieldErrors };
      }
      throw error instanceof Error ? error : { message: "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setNeedsOnboarding(false);
    localStorage.removeItem("user");
    localStorage.removeItem("onboarding_complete");
    localStorage.removeItem("auth_token");
  };

  const completeOnboarding = () => {
    setNeedsOnboarding(false);
    localStorage.setItem("onboarding_complete", "true");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        needsOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
