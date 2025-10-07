"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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
} from "lucide-react"

interface ModulesOverviewProps {
  onEditModule: (moduleId: string) => void
  enabledModules: any
  setEnabledModules: (modules: any) => void
}

export function ModulesOverview({ onEditModule, enabledModules, setEnabledModules }: ModulesOverviewProps) {
  const modules = [
    {
      id: "feedback",
      name: "Feedback & Rating",
      description: "Collect user feedback and ratings with pre-built forms",
      icon: MessageSquare,
      configured: true,
      stats: { responses: 156, avgRating: 4.2 },
      color: "bg-blue-500",
    },
    {
      id: "survey",
      name: "Custom Survey",
      description: "Create detailed surveys with multiple question types",
      icon: FileText,
      configured: false,
      stats: { surveys: 3, responses: 89 },
      color: "bg-green-500",
    },
    {
      id: "bug-report",
      name: "Bug Report",
      description: "Allow users to report bugs with detailed information",
      icon: Bug,
      configured: false,
      stats: { reports: 0, resolved: 0 },
      color: "bg-red-500",
    },
    {
      id: "feature-request",
      name: "Features",
      description: "Users can upvote existing requests and submit new feature ideas with status tracking",
      icon: Lightbulb,
      configured: false,
      stats: { requests: 0, votes: 0, todo: 0, inProgress: 0, done: 0 },
      color: "bg-purple-500",
    },
  ]

  const toggleModule = (moduleId: string) => {
    setEnabledModules({
      ...enabledModules,
      [moduleId]: !enabledModules[moduleId],
    })
  }

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
        )
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
        )
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
        )
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
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Website Modules</h1>
          <p className="text-gray-600">
            Configure and manage the interactive modules for your website. Enable the modules you need and customize
            them to fit your requirements.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            const isEnabled = enabledModules[module.id]
            return (
              <Card
                key={module.id}
                className={`border-2 transition-all duration-200 ${
                  isEnabled ? "border-[#F5C842] bg-white shadow-md" : "border-gray-200 bg-gray-50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${module.color} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        </div>
                      </div>
                      <Switch checked={isEnabled} onCheckedChange={() => toggleModule(module.id)} />
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.configured ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {module.configured ? "Configured" : "Needs Setup"}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isEnabled ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isEnabled ? "Active" : "Inactive"}
                      </div>
                    </div>

                    {/* Stats */}
                    {isEnabled && <div className="pt-2 border-t border-gray-100">{getStatsDisplay(module)}</div>}

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
                        <Button variant="ghost" size="sm" className="text-xs text-gray-600 hover:text-gray-900">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Setup Guide */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Setup Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Getting Started:</h4>
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
  )
}
