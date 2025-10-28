"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Globe, X, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import axios from "axios";

interface WebsiteSetupModalProps {
  open: boolean;
  onClose: (websiteData?: any) => void;
  template?: any;
}

export function WebsiteSetupModal({
  open,
  onClose,
  template,
}: WebsiteSetupModalProps) {
  const { user } = useAuth();
  const [websiteName, setWebsiteName] = useState(template?.name || "");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    console.log("🚀 Website creation started");
    console.log("📝 Form data:", {
      websiteName,
      websiteUrl,
      websiteDescription,
    });

    if (!websiteName.trim() || !websiteUrl.trim()) {
      console.log("❌ Form validation failed - missing required fields");
      return;
    }

    if (!user?.defaultTeam?.id) {
      console.log("❌ No team found");
      setError("No team found. Please log in again.");
      return;
    }

    console.log("⏳ Starting website creation process...");
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");
      console.log("🔑 Auth token exists:", !!token);

      if (!token) {
        console.error("❌ No authentication token found");
        throw new Error("No authentication token found");
      }

      // Try a simpler payload structure first
      const websiteData = {
        name: websiteName.trim(),
        url: websiteUrl.trim(),
        description: websiteDescription.trim() || null,
      };

      const apiUrl = `http://localhost:3000/api/websites/${user.defaultTeam.id}/websites`;
      console.log("📤 Sending website data:", websiteData);
      console.log("🌐 API URL:", apiUrl);

      const response = await axios.post(apiUrl, websiteData, {
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
        console.log("✅ Website created successfully!");
        console.log(
          "📊 Created website data:",
          response.data.data || websiteData
        );
        onClose(response.data.data || websiteData);
      } else {
        console.error("❌ API returned success: false", response.data.message);
        throw new Error(response.data.message || "Failed to create website");
      }
    } catch (error: any) {
      console.error("💥 Error creating website:", error);
      console.error("🔍 Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
      });

      // Handle validation errors specifically
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const validationErrors = error.response.data.errors.join(", ");
        console.error("🚫 Validation errors:", validationErrors);
        setError(`Validation Error: ${validationErrors}`);
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to create website";
        console.error("❌ Setting error message:", errorMessage);
        setError(errorMessage);
      }
    } finally {
      console.log("🏁 Website creation process completed");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid =
    websiteName.trim() &&
    websiteUrl.trim() &&
    isValidUrl(websiteUrl) &&
    !isLoading;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#F5C842]/10 rounded-lg">
                <Globe className="h-5 w-5 text-[#F5C842]" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add New Website
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {template && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Template:</span> {template.name}
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Website URL */}
          <div className="space-y-2">
            <Label
              htmlFor="website-url"
              className="text-sm font-semibold text-gray-900"
            >
              Website URL *
            </Label>
            <Input
              id="website-url"
              placeholder="https://example.com or example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
            {websiteUrl && !isValidUrl(websiteUrl) && (
              <p className="text-xs text-red-600">Please enter a valid URL</p>
            )}
          </div>

          {/* Website Name */}
          <div className="space-y-2">
            <Label
              htmlFor="website-name"
              className="text-sm font-semibold text-gray-900"
            >
              Website Name *
            </Label>
            <Input
              id="website-name"
              placeholder="My Awesome Website"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
          </div>

          {/* Website Description */}
          <div className="space-y-2">
            <Label
              htmlFor="website-description"
              className="text-sm font-semibold text-gray-900"
            >
              Description{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </Label>
            <Textarea
              id="website-description"
              placeholder="Brief description of your website..."
              value={websiteDescription}
              onChange={(e) => setWebsiteDescription(e.target.value)}
              rows={3}
              className="w-full resize-none text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6 h-11 font-medium bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 px-6 h-11 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Website"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
