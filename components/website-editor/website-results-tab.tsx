"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Star,
  TrendingUp,
  Bug,
  Lightbulb,
  FileText,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  ArrowLeft,
  TrendingDown,
} from "lucide-react"
import { useState } from "react"

interface WebsiteResultsTabProps {
  websiteInfo: any
  enabledModules: any
}

export function WebsiteResultsTab({ websiteInfo, enabledModules }: WebsiteResultsTabProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const getEnabledModulesList = () => {
    const moduleInfo = {
      feedback: {
        name: "Feedback & Rating",
        icon: Star,
        color: "bg-blue-500",
        stats: { total: 156, thisWeek: 23, avgRating: 4.2, trend: "+12%" },
      },
      survey: {
        name: "Custom Survey",
        icon: FileText,
        color: "bg-green-500",
        stats: { total: 89, thisWeek: 12, completion: 78, trend: "+8%" },
      },
      "bug-report": {
        name: "Bug Report",
        icon: Bug,
        color: "bg-red-500",
        stats: { total: 34, thisWeek: 5, resolved: 28, trend: "-15%" },
      },
      "feature-request": {
        name: "Feature Request",
        icon: Lightbulb,
        color: "bg-purple-500",
        stats: { total: 67, thisWeek: 8, votes: 234, trend: "+25%" },
      },
    }

    return Object.entries(enabledModules)
      .filter(([_, enabled]) => enabled)
      .map(([moduleId, _]) => ({
        id: moduleId,
        ...moduleInfo[moduleId],
      }))
  }

  const enabledModulesList = getEnabledModulesList()
  const totalResponses = enabledModulesList.reduce((sum, module) => sum + module.stats.total, 0)
  const thisWeekResponses = enabledModulesList.reduce((sum, module) => sum + module.stats.thisWeek, 0)

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights for {websiteInfo?.name || "your website"}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {enabledModulesList.length === 0 ? (
          /* No Modules Enabled */
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules enabled</h3>
            <p className="text-gray-500 mb-4">
              Enable modules in the Build tab to start collecting data and see analytics
            </p>
            <Button variant="outline">Go to Build Tab</Button>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Responses</p>
                      <p className="text-2xl font-bold text-gray-900">{totalResponses.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">+{thisWeekResponses} this week</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Modules</p>
                      <p className="text-2xl font-bold text-gray-900">{enabledModulesList.length}</p>
                      <p className="text-xs text-gray-500 mt-1">of 4 total modules</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Response Rate</p>
                      <p className="text-2xl font-bold text-gray-900">23.5%</p>
                      <p className="text-xs text-green-600 mt-1">+2.3% from last month</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">User Satisfaction</p>
                      <p className="text-2xl font-bold text-gray-900">4.2/5</p>
                      <p className="text-xs text-green-600 mt-1">+0.3 from last month</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Module Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Module Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enabledModulesList.map((module) => {
                    const IconComponent = module.icon
                    return (
                      <div
                        key={module.id}
                        className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-colors cursor-pointer hover:bg-gray-100 ${
                          module.id === "feedback" || module.id === "feature-request"
                            ? "hover:border-blue-200 hover:shadow-sm"
                            : ""
                        }`}
                        onClick={() => {
                          if (module.id === "feedback") {
                            setSelectedModule("feedback-details")
                          } else if (module.id === "feature-request") {
                            setSelectedModule("feature-request-details")
                          }
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${module.color} text-white`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{module.name}</h4>
                            <p className="text-sm text-gray-600">
                              {module.id === "feedback" &&
                                `${module.stats.total} responses • ${module.stats.avgRating}/5 avg rating`}
                              {module.id === "survey" &&
                                `${module.stats.total} responses • ${module.stats.completion}% completion`}
                              {module.id === "bug-report" &&
                                `${module.stats.total} reports • ${module.stats.resolved} resolved`}
                              {module.id === "feature-request" &&
                                `${module.stats.total} requests • ${module.stats.votes} votes`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">+{module.stats.thisWeek} this week</p>
                            <p
                              className={`text-xs ${module.stats.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                            >
                              {module.stats.trend} vs last week
                            </p>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">Interactive charts coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Module Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">Pie charts coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "feedback",
                      user: "Anonymous",
                      action: "left 5-star feedback",
                      time: "2 minutes ago",
                      module: "Feedback & Rating",
                    },
                    {
                      type: "bug",
                      user: "john@example.com",
                      action: "reported a bug",
                      time: "15 minutes ago",
                      module: "Bug Report",
                    },
                    {
                      type: "feature",
                      user: "sarah@example.com",
                      action: "requested a feature",
                      time: "1 hour ago",
                      module: "Feature Request",
                    },
                    {
                      type: "feedback",
                      user: "Anonymous",
                      action: "left 4-star feedback",
                      time: "2 hours ago",
                      module: "Feedback & Rating",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "feedback"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "bug"
                              ? "bg-red-100 text-red-600"
                              : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {activity.type === "feedback" && <Star className="h-4 w-4" />}
                        {activity.type === "bug" && <Bug className="h-4 w-4" />}
                        {activity.type === "feature" && <Lightbulb className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.module} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Feedback Details Page */}
        {selectedModule === "feedback-details" && (
          <div className="absolute inset-0 bg-white z-40 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedModule(null)}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Analytics</span>
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Feedback & Rating Details</h1>
                    <p className="text-gray-600">Detailed analysis of user feedback and ratings</p>
                  </div>
                </div>
                <Button className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Responses</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Star className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
                        <p className="text-2xl font-bold text-green-600">124</p>
                        <p className="text-xs text-gray-500">79.5% of total</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Negative Feedback</p>
                        <p className="text-2xl font-bold text-red-600">32</p>
                        <p className="text-xs text-gray-500">20.5% of total</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <TrendingDown className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Average Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.2</p>
                        <p className="text-xs text-gray-500">out of 5 stars</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Responses */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        rating: 5,
                        feedback: "Excellent service! The website is very user-friendly and fast.",
                        date: "2024-01-15",
                        sentiment: "positive",
                      },
                      {
                        id: 2,
                        rating: 4,
                        feedback: "Good overall experience, but could improve the checkout process.",
                        date: "2024-01-14",
                        sentiment: "positive",
                      },
                      {
                        id: 3,
                        rating: 2,
                        feedback: "The website is slow and confusing to navigate.",
                        date: "2024-01-13",
                        sentiment: "negative",
                      },
                      {
                        id: 4,
                        rating: 5,
                        feedback: "Love the new design! Much better than before.",
                        date: "2024-01-12",
                        sentiment: "positive",
                      },
                      {
                        id: 5,
                        rating: 1,
                        feedback: "Terrible experience. The site crashed multiple times.",
                        date: "2024-01-11",
                        sentiment: "negative",
                      },
                    ].map((response) => (
                      <div key={response.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= response.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge
                              variant={response.sentiment === "positive" ? "default" : "destructive"}
                              className={
                                response.sentiment === "positive"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {response.sentiment === "positive" ? "Positive" : "Negative"}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">{response.date}</span>
                        </div>
                        <p className="text-gray-700">{response.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Feature Request Details Page */}
        {selectedModule === "feature-request-details" && (
          <div className="absolute inset-0 bg-white z-40 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedModule(null)}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Analytics</span>
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Feature Request Board</h1>
                    <p className="text-gray-600">Kanban view of all feature requests and their progress</p>
                  </div>
                </div>
                <Button className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-900">67</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <Lightbulb className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Asked Features</p>
                        <p className="text-2xl font-bold text-gray-600">28</p>
                        <p className="text-xs text-gray-500">41.8% of total</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <Lightbulb className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">In Development</p>
                        <p className="text-2xl font-bold text-yellow-600">15</p>
                        <p className="text-xs text-gray-500">22.4% of total</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-green-600">24</p>
                        <p className="text-xs text-gray-500">35.8% of total</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <Star className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Kanban Board */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Request Kanban Board</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    {/* Asked Features Column */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Asked Features</h3>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                          28
                        </Badge>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {[
                          {
                            title: "Dark Mode Support",
                            description: "Add dark theme option for better user experience",
                            votes: 45,
                            category: "UI/UX",
                            priority: "High",
                            date: "2024-01-15",
                          },
                          {
                            title: "Mobile App Integration",
                            description: "Connect with mobile applications",
                            votes: 32,
                            category: "Integration",
                            priority: "Medium",
                            date: "2024-01-14",
                          },
                          {
                            title: "Advanced Search Filters",
                            description: "More filtering options for search",
                            votes: 28,
                            category: "Performance",
                            priority: "Low",
                            date: "2024-01-13",
                          },
                        ].map((feature, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {feature.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1 py-0 ${
                                    feature.priority === "High"
                                      ? "border-red-200 text-red-700"
                                      : feature.priority === "Medium"
                                        ? "border-yellow-200 text-yellow-700"
                                        : "border-green-200 text-green-700"
                                  }`}
                                >
                                  {feature.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-gray-600">{feature.votes}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{feature.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Todo Column */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Todo</h3>
                        <Badge variant="secondary" className="bg-blue-200 text-blue-700">
                          12
                        </Badge>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {[
                          {
                            title: "Two-Factor Authentication",
                            description: "Enhanced security with 2FA",
                            votes: 67,
                            category: "Security",
                            priority: "High",
                            date: "2024-01-10",
                          },
                          {
                            title: "Export to PDF",
                            description: "Allow users to export data as PDF",
                            votes: 23,
                            category: "Feature",
                            priority: "Medium",
                            date: "2024-01-08",
                          },
                        ].map((feature, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {feature.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1 py-0 ${
                                    feature.priority === "High"
                                      ? "border-red-200 text-red-700"
                                      : feature.priority === "Medium"
                                        ? "border-yellow-200 text-yellow-700"
                                        : "border-green-200 text-green-700"
                                  }`}
                                >
                                  {feature.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-gray-600">{feature.votes}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{feature.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">In Progress</h3>
                        <Badge variant="secondary" className="bg-yellow-200 text-yellow-700">
                          3
                        </Badge>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {[
                          {
                            title: "API Rate Limiting",
                            description: "Implement rate limiting for API calls",
                            votes: 89,
                            category: "Performance",
                            priority: "High",
                            date: "2024-01-05",
                            progress: 65,
                          },
                        ].map((feature, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {feature.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs px-1 py-0 ${
                                    feature.priority === "High"
                                      ? "border-red-200 text-red-700"
                                      : feature.priority === "Medium"
                                        ? "border-yellow-200 text-yellow-700"
                                        : "border-green-200 text-green-700"
                                  }`}
                                >
                                  {feature.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-gray-600">{feature.votes}</span>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{feature.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-yellow-500 h-1.5 rounded-full"
                                  style={{ width: `${feature.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{feature.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Done Column */}
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Done</h3>
                        <Badge variant="secondary" className="bg-green-200 text-green-700">
                          24
                        </Badge>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {[
                          {
                            title: "User Dashboard Redesign",
                            description: "Complete redesign of user dashboard",
                            votes: 156,
                            category: "UI/UX",
                            priority: "High",
                            date: "2024-01-01",
                            completedDate: "2024-01-12",
                          },
                          {
                            title: "Email Notifications",
                            description: "Send email notifications for important events",
                            votes: 78,
                            category: "Feature",
                            priority: "Medium",
                            date: "2023-12-20",
                            completedDate: "2024-01-08",
                          },
                        ].map((feature, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  {feature.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs px-1 py-0 border-green-200 text-green-700">
                                  Completed
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-gray-600">{feature.votes}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Completed: {feature.completedDate}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
