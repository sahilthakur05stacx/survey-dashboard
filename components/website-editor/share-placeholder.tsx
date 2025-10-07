"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Code, Mail, Link, Clock } from "lucide-react"

interface SharePlaceholderProps {
  moduleType: string
}

export function SharePlaceholder({ moduleType }: SharePlaceholderProps) {
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
              <h1 className="text-2xl font-bold text-gray-900">Share {getModuleName()}</h1>
              <p className="text-gray-600 mt-2">
                Distribution and sharing options for your {getModuleName().toLowerCase()} module
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
                  <h2 className="text-xl font-semibold text-gray-900">Coming Soon!</h2>
                  <p className="text-gray-600">
                    We're working hard to bring you powerful sharing and distribution features for your{" "}
                    {getModuleName().toLowerCase()} module.
                  </p>
                </div>

                {/* Feature Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto">
                      <Link className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Direct Links</h3>
                    <p className="text-sm text-gray-600">Share direct links to your module</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto">
                      <Code className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Embed Code</h3>
                    <p className="text-sm text-gray-600">Embed directly in your website</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto">
                      <Mail className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Email Templates</h3>
                    <p className="text-sm text-gray-600">Custom email distributions</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
                    <Share2 className="h-4 w-4 mr-2" />
                    Available Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    <span className="text-gray-600">Share Features - 🚧 In Progress</span>
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
