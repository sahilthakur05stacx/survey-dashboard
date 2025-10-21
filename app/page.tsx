"use client";

import { useState, useEffect } from "react";
import {
  Globe,
  Plus,
  LogOut,
  Eye,
  Users,
  MessageSquare,
  Star,
  Bug,
  Lightbulb,
  User,
  Crown,
  Settings,
  BarChart3,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LibraryPage } from "../components/library-page";
import { SubscriptionPage } from "../components/subscription-page";
import { SurveyEditor } from "../components/survey-editor";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import LoginScreen from "@/components/auth/login-screen";
import OnboardingFlow from "@/components/onboarding-flow";
import { fetchWebsites, Website } from "@/lib/api/websites";

function AppSidebar({
  setCurrentView,
  activeItem,
  setActiveItem,
}: {
  setCurrentView: (view: string) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}) {
  return (
    <Sidebar collapsible="none" className="border-r border-gray-200 w-16">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <Image src="/logo.png" alt="Survey Bee Logo" width={32} height={32} />
      </SidebarHeader>
      <SidebarContent className="flex-1 py-4">
        <SidebarMenu className="px-2 space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeItem === "websites"}
              onClick={() => {
                setActiveItem("websites");
                setCurrentView("dashboard");
              }}
              tooltip="My Websites"
              className="w-12 h-12 justify-center rounded-lg hover:bg-gray-100"
            >
              <Globe className="h-5 w-5" />
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeItem === "add"}
              onClick={() => {
                setActiveItem("add");
                setCurrentView("create-website");
              }}
              tooltip="Add Website"
              className="w-12 h-12 justify-center rounded-lg hover:bg-gray-100"
            >
              <Plus className="h-5 w-5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="w-12 h-12 justify-center rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function SurveyDashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeItem, setActiveItem] = useState("websites");
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoadingWebsites, setIsLoadingWebsites] = useState(true);
  const [websitesError, setWebsitesError] = useState<string | null>(null);

  // Fetch websites from API
  const loadWebsites = async () => {
    console.log("🔄 Starting to load websites...");
    console.log("👤 User:", user);
    console.log("🏢 Team ID:", user?.defaultTeam?.id);

    if (!user?.defaultTeam?.id) {
      console.log("❌ No team ID found, skipping website load");
      setIsLoadingWebsites(false);
      return;
    }

    try {
      console.log("⏳ Setting loading state to true");
      setIsLoadingWebsites(true);
      setWebsitesError(null);

      console.log(`🌐 Fetching websites for team: ${user.defaultTeam.id}`);
      const websitesData = await fetchWebsites(user.defaultTeam.id);

      console.log("✅ Websites fetched successfully:", websitesData);
      console.log("📊 Number of websites:", websitesData?.length || 0);
      console.log("🔍 Website details:", websitesData);
      console.log("🔍 Is websitesData an array?", Array.isArray(websitesData));
      console.log("🔍 websitesData type:", typeof websitesData);

      setWebsites(websitesData);
      console.log("💾 Websites state updated with:", websitesData);
    } catch (error: any) {
      console.error("❌ Error loading websites:", error);
      console.error("🔍 Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setWebsitesError(error.message || "Failed to load websites");
    } finally {
      console.log("🏁 Loading completed, setting loading to false");
      setIsLoadingWebsites(false);
    }
  };

  useEffect(() => {
    console.log(
      "🔄 useEffect triggered - user?.defaultTeam?.id changed:",
      user?.defaultTeam?.id
    );
    loadWebsites();
  }, [user?.defaultTeam?.id]);

  // Log state changes
  useEffect(() => {
    console.log("📊 Websites state changed:", {
      websites: websites,
      isLoading: isLoadingWebsites,
      error: websitesError,
      count: websites?.length || 0,
    });
    console.log("🔍 Detailed websites analysis:", {
      isArray: Array.isArray(websites),
      type: typeof websites,
      length: websites?.length,
      firstItem: websites?.[0],
      allItems: websites,
    });
  }, [websites, isLoadingWebsites, websitesError]);

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setCurrentView("create-website");
  };

  const handleViewWebsite = (website: Website, tab = "build") => {
    setSelectedWebsite({ ...website, tab } as Website & { tab: string });
    setCurrentView("create-website");
  };

  const handleWebsiteCreated = () => {
    console.log("🎉 Website created! Refreshing website list...");
    // Refresh websites after creating a new one
    loadWebsites();
    setCurrentView("dashboard");
    console.log("🏠 Navigated back to dashboard");
  };

  // Library page view
  if (currentView === "library") {
    return (
      <LibraryPage
        onBack={() => setCurrentView("dashboard")}
        onSelectTemplate={handleSelectTemplate}
      />
    );
  }

  // Subscription page view
  if (currentView === "subscription") {
    return <SubscriptionPage onBack={() => setCurrentView("dashboard")} />;
  }

  // Create website / Editor view
  if (currentView === "create-website") {
    return (
      <SurveyEditor
        onBack={() => {
          setCurrentView("dashboard");
          setSelectedTemplate(null);
          setSelectedWebsite(null);
        }}
        onWebsiteCreated={handleWebsiteCreated}
        template={selectedTemplate}
        existingWebsite={selectedWebsite}
        defaultTab={
          selectedWebsite
            ? (selectedWebsite as Website & { tab: string }).tab || "build"
            : "build"
        }
      />
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar
          setCurrentView={setCurrentView}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <div className="flex flex-1">
          <main className="flex-1 flex flex-col">
            {/* Top Menu Bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-end w-full">
                <div className="flex items-center space-x-4">
                  {/* Current Plan Indicator */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("subscription")}
                    className="flex items-center space-x-2 border-[#F5C842] text-[#F5C842] hover:bg-[#F5C842]/10"
                  >
                    <Crown className="h-4 w-4" />
                    <span className="font-medium">Personal</span>
                  </Button>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user?.name}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50">
              <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <Globe className="h-6 w-6 text-[#F5C842]" />
                        <h1 className="text-3xl font-bold text-gray-900">
                          My Websites
                        </h1>
                      </div>
                      <p className="text-lg text-gray-600">
                        Welcome back,{" "}
                        <span className="font-semibold text-[#F5C842]">
                          {user?.name?.split(" ")[0]}
                        </span>
                        !
                        {isLoadingWebsites ? (
                          <span className="font-semibold text-[#F5C842]">
                            {" "}
                            Loading...
                          </span>
                        ) : (
                          <span>
                            {" "}
                            You have{" "}
                            <span className="font-semibold text-[#F5C842]">
                              {(() => {
                                const count =
                                  websites && Array.isArray(websites)
                                    ? websites.length
                                    : 0;
                                console.log("🔍 Website count calculation:", {
                                  websites,
                                  isArray: Array.isArray(websites),
                                  count,
                                });
                                return count;
                              })()}
                            </span>{" "}
                            websites
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      onClick={() => setCurrentView("create-website")}
                      className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Website
                    </Button>
                  </div>
                </div>

                {/* Error State */}
                {websitesError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-600">{websitesError}</p>
                    </div>
                    <Button
                      onClick={loadWebsites}
                      variant="outline"
                      size="sm"
                      className="mt-2 text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Loading State */}
                {isLoadingWebsites && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#F5C842]" />
                      <p className="text-gray-600">Loading websites...</p>
                    </div>
                  </div>
                )}

                {/* Overall Stats - Only show when not loading and no error */}
                {(() => {
                  console.log("🔍 Stats render condition check:", {
                    isLoadingWebsites,
                    websitesError,
                    websites,
                    isArray: Array.isArray(websites),
                    shouldShow:
                      !isLoadingWebsites &&
                      !websitesError &&
                      websites &&
                      Array.isArray(websites),
                  });
                  return (
                    !isLoadingWebsites &&
                    !websitesError &&
                    websites &&
                    Array.isArray(websites)
                  );
                })() && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Survey Responses
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {websites && Array.isArray(websites)
                                ? websites
                                    .reduce(
                                      (sum, site) =>
                                        sum + (site.surveyResponses || 0),
                                      0
                                    )
                                    .toLocaleString()
                                : "0"}
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <BarChart3 className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Average Rating
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {websites &&
                              Array.isArray(websites) &&
                              websites.length > 0
                                ? (
                                    websites.reduce(
                                      (sum, site) =>
                                        sum + (site.averageRating || 0),
                                      0
                                    ) / websites.length
                                  ).toFixed(1)
                                : "0.0"}
                            </p>
                          </div>
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <Star className="h-6 w-6 text-yellow-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Bug Reports
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {websites && Array.isArray(websites)
                                ? websites.reduce(
                                    (sum, site) => sum + (site.bugReports || 0),
                                    0
                                  )
                                : "0"}
                            </p>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg">
                            <Bug className="h-6 w-6 text-red-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Feature Requests
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                              {websites && Array.isArray(websites)
                                ? websites.reduce(
                                    (sum, site) =>
                                      sum + (site.featureRequests || 0),
                                    0
                                  )
                                : "0"}
                            </p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <Lightbulb className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Website List - Only show when not loading and no error */}
                {(() => {
                  console.log("🔍 Website list render condition check:", {
                    isLoadingWebsites,
                    websitesError,
                    websites,
                    isArray: Array.isArray(websites),
                    shouldShow:
                      !isLoadingWebsites &&
                      !websitesError &&
                      websites &&
                      Array.isArray(websites),
                  });
                  return (
                    !isLoadingWebsites &&
                    !websitesError &&
                    websites &&
                    Array.isArray(websites)
                  );
                })() && (
                  <>
                    {websites.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Globe className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No websites added yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Add your first website to start collecting feedback.
                        </p>
                        <Button
                          onClick={() => setCurrentView("create-website")}
                          className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Website
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {websites.map((website) => {
                          console.log("🔍 Rendering website:", website);
                          console.log("🔍 Website properties:", {
                            totalResponses: website.totalResponses,
                            feedbackCount: website.feedbackCount,
                            surveyResponses: website.surveyResponses,
                            bugReports: website.bugReports,
                            featureRequests: website.featureRequests,
                          });
                          return (
                            <Card
                              key={website.id}
                              className="hover:shadow-md transition-shadow duration-200 border border-gray-200"
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-4">
                                      <div className="p-2 bg-[#F5C842]/10 rounded-lg">
                                        <Globe className="h-5 w-5 text-[#F5C842]" />
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                          {website.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                          {website.url}
                                        </p>
                                      </div>
                                      <Badge
                                        variant={
                                          website.status === "active"
                                            ? "default"
                                            : "secondary"
                                        }
                                        className={
                                          website.status === "active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                        }
                                      >
                                        {website.status}
                                      </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                      {/* Total Responses */}
                                      <div className="flex items-center space-x-2">
                                        <BarChart3 className="h-4 w-4 text-gray-500" />
                                        <div>
                                          <p className="text-sm text-gray-500">
                                            Total Responses
                                          </p>
                                          <p className="font-semibold text-gray-900">
                                            {(
                                              website.totalResponses || 0
                                            ).toLocaleString()}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Feedback & Rating */}
                                      <div className="flex items-center space-x-2">
                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                        <div>
                                          <p className="text-sm text-gray-500">
                                            Feedback
                                          </p>
                                          <p className="font-semibold text-gray-900">
                                            {website.feedbackCount || 0}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Survey Responses */}
                                      <div className="flex items-center space-x-2">
                                        <Users className="h-4 w-4 text-green-500" />
                                        <div>
                                          <p className="text-sm text-gray-500">
                                            Surveys
                                          </p>
                                          <p className="font-semibold text-gray-900">
                                            {website.surveyResponses || 0}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Bug Reports */}
                                      <div className="flex items-center space-x-2">
                                        <Bug className="h-4 w-4 text-red-500" />
                                        <div>
                                          <p className="text-sm text-gray-500">
                                            Bug Reports
                                          </p>
                                          <p className="font-semibold text-gray-900">
                                            {website.bugReports || 0}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Feature Requests */}
                                      <div className="flex items-center space-x-2">
                                        <Lightbulb className="h-4 w-4 text-purple-500" />
                                        <div>
                                          <p className="text-sm text-gray-500">
                                            Features
                                          </p>
                                          <p className="font-semibold text-gray-900">
                                            {website.featureRequests || 0}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ml-6">
                                    <div className="flex items-center space-x-3">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-[#F5C842] hover:bg-[#F5C842]/10 hover:text-[#F5C842]"
                                        onClick={() =>
                                          handleViewWebsite(website, "results")
                                        }
                                        title="View Details"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                                        onClick={() =>
                                          handleViewWebsite(website, "build")
                                        }
                                        title="Settings"
                                      >
                                        <Settings className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  const { user, login, isLoading, needsOnboarding } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={login} />;
  }

  if (needsOnboarding) {
    return <OnboardingFlow />;
  }

  return <SurveyDashboard />;
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
