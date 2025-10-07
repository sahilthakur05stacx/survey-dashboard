"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Globe,
  MessageSquare,
  Star,
  Bug,
  Lightbulb,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WebsiteDetailsProps {
  website: any
  onBack: () => void
}

export function WebsiteDetails({ website, onBack }: WebsiteDetailsProps) {
  const [activeFeature, setActiveFeature] = useState("overview")

  // Mock data for the website
  const websiteStats = {
    totalResponses: 1247,
    feedbackCount: 456,
    surveyResponses: 321,
    bugReports: 89,
    featureRequests: 381,
    averageRating: 4.2,
    responseRate: 23.5,
  }

  const recentActivity = [
    { type: "feedback", message: "Great product! Love the new design.", rating: 5, time: "2 hours ago" },
    { type: "bug", message: "Login button not working on mobile", priority: "high", time: "4 hours ago" },
    { type: "feature", message: "Please add dark mode support", votes: 12, time: "6 hours ago" },
    { type: "survey", message: "Customer satisfaction survey completed", score: 8, time: "1 day ago" },
  ]

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="h-4 w-4" />
      case "survey":
        return <BarChart3 className="h-4 w-4" />
      case "bug":
        return <Bug className="h-4 w-4" />
      case "feature":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getFeatureColor = (type: string) => {
    switch (type) {
      case "feedback":
        return "text-blue-600 bg-blue-50"
      case "survey":
        return "text-green-600 bg-green-50"
      case "bug":
        return "text-red-600 bg-red-50"
      case "feature":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Websites</span>
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
              View Embed Code
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          {/* Website Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-[#F5C842]/10 rounded-lg">
                <Globe className="h-8 w-8 text-[#F5C842]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{website.name}</h1>
                <p className="text-lg text-gray-600">{website.url}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Responses</p>
                    <p className="text-2xl font-bold text-gray-900">{websiteStats.totalResponses.toLocaleString()}</p>
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
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{websiteStats.averageRating}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(websiteStats.averageRating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
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
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{websiteStats.responseRate}%</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">2,341</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Feedback & Rating</p>
                    <p className="text-xl font-bold text-gray-900">{websiteStats.feedbackCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Simple Survey</p>
                    <p className="text-xl font-bold text-gray-900">{websiteStats.surveyResponses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Bug className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bug Reporting</p>
                    <p className="text-xl font-bold text-gray-900">{websiteStats.bugReports}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Feature Request</p>
                    <p className="text-xl font-bold text-gray-900">{websiteStats.featureRequests}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="embed">Embed Code</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className={`p-2 rounded-lg ${getFeatureColor(activity.type)}`}>
                          {getFeatureIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">{activity.time}</span>
                            {activity.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{activity.rating}/5</span>
                              </div>
                            )}
                            {activity.votes && (
                              <Badge variant="secondary" className="text-xs">
                                {activity.votes} votes
                              </Badge>
                            )}
                            {activity.priority && (
                              <Badge
                                variant={activity.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {activity.priority} priority
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Detailed analytics and reporting will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Website Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Website configuration and settings will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="embed">
              <Card>
                <CardHeader>
                  <CardTitle>Embed Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Embed code and integration instructions will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
