"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, PieChart, TrendingUp, Clock, Users, Eye } from "lucide-react"

interface ResultsPlaceholderProps {
  moduleType: string
}

export function ResultsPlaceholder({ moduleType }: ResultsPlaceholderProps) {
  const getModuleIcon = () => {
    switch (moduleType) {
      case "feedback":
        return "💬"
      case "bug-report":
        return "🐛"
      case "feature-request":
        return "💡"
      default:
        return "📋"
    }
  }

  const getModuleName = () => {
    switch (moduleType) {
      case "feedback":
        return "Feedback & Rating"
      case "bug-report":
        return "Bug Report"
      case "feature-request":
        return "Feature Request"
      default:
        return "Module"
    }
  }

  const getExpectedMetrics = () => {
    switch (moduleType) {
      case "feedback":
        return [
          { label: "Total Responses", icon: Users },
          { label: "Average Rating", icon: TrendingUp },
          { label: "Response Rate", icon: BarChart3 },
          { label: "Sentiment Analysis", icon: PieChart },
        ]
      case "bug-report":
        return [
          { label: "Total Reports", icon: Users },
          { label: "Resolution Rate", icon: TrendingUp },
          { label: "Severity Breakdown", icon: PieChart },
          { label: "Response Time", icon: Clock },
        ]
      case "feature-request":
        return [
          { label: "Total Requests", icon: Users },
          { label: "Popular Features", icon: TrendingUp },
          { label: "Category Breakdown", icon: PieChart },
          { label: "Implementation Status", icon: BarChart3 },
        ]
      default:
        return [
          { label: "Total Submissions", icon: Users },
          { label: "Engagement Rate", icon: TrendingUp },
          { label: "Data Breakdown", icon: PieChart },
          { label: "Performance Metrics", icon: BarChart3 },
        ]
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mx-auto">
              <span className="text-3xl">{getModuleIcon()}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getModuleName()} Analytics</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive insights and analytics for your {getModuleName().toLowerCase()} module
              </p>
            </div>
          </div>

          {/* Coming Soon Card */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 bg-[#F5C842] rounded-full mx-auto">
                  <Clock className="h-8 w-8 text-black" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard Coming Soon!</h2>
                  <p className="text-gray-600">
                    We're building a comprehensive analytics dashboard to help you understand and analyze your{" "}
                    {getModuleName().toLowerCase()} data.
                  </p>
                </div>

                {/* Feature Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {getExpectedMetrics().map((metric, index) => {
                    const IconComponent = metric.icon
                    return (
                      <div key={index} className="text-center space-y-2">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">{metric.label}</h3>
                      </div>
                    )
                  })}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics Available Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Chart Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Interactive Charts
                  </h3>
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">Real-time data visualization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Preview */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Data Export
                  </h3>
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Eye className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">Export to CSV, PDF, Excel</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Development Timeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Module Configuration - ✅ Complete</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Data Collection - 🚧 In Progress</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-600">Analytics Dashboard - 📋 Planned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
