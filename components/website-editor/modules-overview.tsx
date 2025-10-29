"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare,
  FileText,
  Bug,
  Lightbulb,
  Settings,
  BarChart3,
  Users,
  Star,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchModules,
  Module,
  ModulesResponse,
  setWebsiteModuleEnabled,
} from "@/lib/api/modules";
import { useToast } from "@/hooks/use-toast";

interface ModulesOverviewProps {
  onEditModule: (moduleId: string) => void;
  enabledModules: any;
  setEnabledModules: (modules: any) => void;
  websiteId?: string;
}

export function ModulesOverview({
  onEditModule,
  enabledModules,
  setEnabledModules,
  websiteId,
}: ModulesOverviewProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { toast } = useToast();

  // Icon mapping for modules
  const iconMap: { [key: string]: any } = {
    feedback: MessageSquare,
    survey: FileText,
    "bug-report": Bug,
    "feature-request": Lightbulb,
  };

  // Color mapping for modules
  const colorMap: { [key: string]: string } = {
    feedback: "bg-blue-500",
    survey: "bg-green-500",
    "bug-report": "bg-red-500",
    "feature-request": "bg-purple-500",
  };

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load modules and website module states in parallel
        const [modulesResponse, websiteModuleStates] = await Promise.all([
          fetchModules(),
          websiteId ? loadWebsiteModuleStates() : Promise.resolve({}),
        ]);

        // Set modules
        if (
          modulesResponse &&
          typeof modulesResponse === "object" &&
          "data" in modulesResponse
        ) {
          const data: any = modulesResponse.data;
          setModules(
            Array.isArray(data)
              ? data
              : data?.modules || data?.data?.modules || []
          );
        } else if (Array.isArray(modulesResponse)) {
          setModules(modulesResponse);
        }

        // Set website module states
        if (Object.keys(websiteModuleStates).length > 0) {
          setEnabledModules({ ...enabledModules, ...websiteModuleStates });
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
        setInitialLoadComplete(true);
      }
    };

    loadAllData();
  }, [websiteId]);

  // Helper function to load website module states
  const loadWebsiteModuleStates = async () => {
    if (!websiteId) return {};

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return {};

      const url = `http://localhost:3000/api/website-modules/websites/${websiteId}/modules`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const list = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : data?.modules || [];

      const map: Record<string, boolean> = {};
      for (const item of list) {
        const id = item?.moduleId || item?.module?.id || item?.id;
        if (id != null) map[id] = !!item?.enabled;
      }

      return map;
    } catch (err) {
      return {};
    }
  };

  const toggleModule = async (moduleId: string, nextValue: boolean) => {
    console.log("🔄 Toggle module:", { moduleId, nextValue, websiteId });

    // Optimistic UI update
    const previous = enabledModules[moduleId];
    setEnabledModules({
      ...enabledModules,
      [moduleId]: nextValue,
    });

    try {
      if (!websiteId) {
        throw new Error("Website ID not found from modules response");
      }

      console.log("📤 Calling API with:", {
        websiteId,
        moduleId,
        enabled: nextValue,
      });
      await setWebsiteModuleEnabled(websiteId, moduleId, nextValue);

      toast({
        title: nextValue ? "Module enabled" : "Module disabled",
        description: `${moduleId} has been ${
          nextValue ? "enabled" : "disabled"
        }.`,
      });
    } catch (e: any) {
      console.error("❌ Error toggling module:", e);

      // Revert optimistic update on error
      setEnabledModules({
        ...enabledModules,
        [moduleId]: previous,
      });
      toast({
        title: "Failed to update module",
        description: e?.message || "Please try again",
      });
    }
  };

  const getStatsDisplay = (module: any) => {
    switch (module.id) {
      case "feedback":
        return (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{module.stats.responses} responses</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{module.stats.avgRating}/5.0</span>
            </div>
          </div>
        );
      case "survey":
        return (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{module.stats.surveys} surveys</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{module.stats.responses} responses</span>
            </div>
          </div>
        );
      case "bug-report":
        return (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span>{module.stats.reports} reports</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>{module.stats.resolved} resolved</span>
            </div>
          </div>
        );
      case "feature-request":
        return (
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Lightbulb className="h-4 w-4" />
              <span>{module.stats.requests} features</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{module.stats.votes} votes</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>{module.stats.done} completed</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading || !initialLoadComplete) {
    return (
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Website Modules
            </h1>
            <p className="text-gray-600">Loading modules...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Website Modules</h1>
          <p className="text-gray-600">
            Configure and manage the interactive modules for your website.
            Enable the modules you need and customize them to fit your
            requirements.
          </p>
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                Warning: {error}. Using default modules.
              </p>
            </div>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const IconComponent = iconMap[module.id] || MessageSquare;
            const moduleColor =
              module.color || colorMap[module.id] || "bg-gray-500";
            const isEnabled = enabledModules[module.id];
            return (
              <Card
                key={module.id}
                className={`border-2 transition-all duration-200 ${
                  isEnabled
                    ? "border-[#F5C842] bg-white shadow-md"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${moduleColor} text-white`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {module.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) =>
                          toggleModule(module.id, checked)
                        }
                      />
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.configured
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {module.configured ? "Configured" : "Needs Setup"}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isEnabled
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isEnabled ? "Active" : "Inactive"}
                      </div>
                    </div>

                    {/* Stats */}
                    {isEnabled && (
                      <div className="pt-2 border-t border-gray-100">
                        {getStatsDisplay(module)}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditModule(module.id)}
                        disabled={!isEnabled}
                        className="flex-1 text-xs"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {module.configured ? "Edit" : "Configure"}
                      </Button>
                      {isEnabled && module.configured && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-600 hover:text-gray-900"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Setup Guide */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Setup Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Getting Started:
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Enable the modules you want to use</li>
                    <li>• Configure each module's settings</li>
                    <li>• Test the modules before going live</li>
                    <li>• Use the Share tab to get embed code</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Best Practices:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Start with feedback module for quick wins</li>
                    <li>• Use surveys for detailed user insights</li>
                    <li>• Enable bug reports for better product quality</li>
                    <li>• Monitor results regularly for improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
