"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Link, Mail, Code } from "lucide-react"
import { EmailTemplateComponent } from "./email-template-component"
import { EmbedComponent } from "./embed-component"

interface ShareTabProps {
  websiteInfo: any
  onShowEmailTemplate: () => void
}

export function ShareTab({ websiteInfo, onShowEmailTemplate }: ShareTabProps) {
  const [currentView, setCurrentView] = useState<"share" | "email-template" | "embed">("share")

  if (currentView === "email-template") {
    return <EmailTemplateComponent onBack={() => setCurrentView("share")} surveyInfo={websiteInfo} />
  }

  if (currentView === "embed") {
    return <EmbedComponent onBack={() => setCurrentView("share")} surveyInfo={websiteInfo} />
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Website URL Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Website Link</h2>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-2 flex-1">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-mono">{websiteInfo?.url || "https://example.com"}</span>
            </div>
          </div>
        </div>

        {/* Distribution Methods */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Distribution Methods</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Direct Link */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842]">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto">
                    <Link className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900">Direct Link</h3>
                    <p className="text-xs text-gray-500 mt-1">Share a direct link to your website</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-transparent"
                    onClick={() => {
                      navigator.clipboard.writeText(websiteInfo?.url || "https://example.com")
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842]">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto">
                    <Mail className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                    <p className="text-xs text-gray-500 mt-1">Create custom email templates</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-transparent"
                    onClick={() => setCurrentView("email-template")}
                  >
                    Create Distribution
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Embed */}
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842]">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900">Embed</h3>
                    <p className="text-xs text-gray-500 mt-1">Embed modules directly in your website</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-transparent"
                    onClick={() => setCurrentView("embed")}
                  >
                    Create Distribution
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Distribution History */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Distribution History</h2>
          <div className="space-y-3">
            {/* Sample distribution entries */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <Link className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Direct Link Share</p>
                  <p className="text-xs text-gray-500">Today 2:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">0 responses</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                  <Mail className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Campaign</p>
                  <p className="text-xs text-gray-500">Yesterday 4:15 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">0 responses</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
