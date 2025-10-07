"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

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
    company: string,
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

      // Check if user needs onboarding (except for test@test.com)
      if (userData.email !== "test@test.com" && !onboardingComplete) {
        setNeedsOnboarding(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData: User = {
      id: "1",
      name: email === "test@test.com" ? "Test User" : "John Doe",
      email,
      company: email === "test@test.com" ? "Test Company" : "Acme Corp",
      avatar: "/diverse-user-avatars.png",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Skip onboarding for test@test.com
    if (email === "test@test.com") {
      localStorage.setItem("onboarding_complete", "true");
      setNeedsOnboarding(false);
    } else {
      // Check if onboarding was completed before
      const onboardingComplete = localStorage.getItem("onboarding_complete");
      if (!onboardingComplete) {
        setNeedsOnboarding(true);
      }
    }

    setIsLoading(false);
    return true;
  };

  const register = async (
    name: string,
    company: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Don't set user state or store in localStorage - just return success
    return true;
  };

  const logout = () => {
    setUser(null);
    setNeedsOnboarding(false);
    localStorage.removeItem("user");
    localStorage.removeItem("onboarding_complete");
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
