"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ThumbsUp, Settings, Eye } from "lucide-react"

interface FeatureRequestModuleEditorProps {
  onBack: () => void
}

export function FeatureRequestModuleEditor({ onBack }: FeatureRequestModuleEditorProps) {
  const [config, setConfig] = useState({
    title: "Request a Feature",
    description: "Share your ideas to help us improve our product",
    requireName: false,
    requireEmail: true,
    allowVoting: true,
    allowAnonymousVoting: true,
    requireApproval: true,
    categories: ["UI/UX", "Performance", "Integration", "Security", "Mobile", "Other"],
    priorityLevels: ["Low", "Medium", "High"],
    thankYouMessage: "Thank you for your suggestion! We'll review it and get back to you.",
  })

  const [embedType, setEmbedType] = useState("popup") // popup, side, kanban
  const [showRequestForm, setShowRequestForm] = useState(false)

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    value={config.title}
                    onChange={(e) => updateConfig("title", e.target.value)}
                    placeholder="Enter form title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={config.description}
                    onChange={(e) => updateConfig("description", e.target.value)}
                    placeholder="Enter form description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thank-you">Thank You Message</Label>
                  <Textarea
                    id="thank-you"
                    value={config.thankYouMessage}
                    onChange={(e) => updateConfig("thankYouMessage", e.target.value)}
                    placeholder="Enter thank you message"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="require-name">Require Name</Label>
                  <Switch
                    id="require-name"
                    checked={config.requireName}
                    onCheckedChange={(checked) => updateConfig("requireName", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="require-email">Require Email</Label>
                  <Switch
                    id="require-email"
                    checked={config.requireEmail}
                    onCheckedChange={(checked) => updateConfig("requireEmail", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ThumbsUp className="h-5 w-5" />
                  <span>Voting Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-voting">Allow Voting</Label>
                  <Switch
                    id="allow-voting"
                    checked={config.allowVoting}
                    onCheckedChange={(checked) => updateConfig("allowVoting", checked)}
                  />
                </div>

                {config.allowVoting && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-voting">Allow Anonymous Voting</Label>
                    <Switch
                      id="anonymous-voting"
                      checked={config.allowAnonymousVoting}
                      onCheckedChange={(checked) => updateConfig("allowAnonymousVoting", checked)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-approval">Require Approval</Label>
                  <Switch
                    id="require-approval"
                    checked={config.requireApproval}
                    onCheckedChange={(checked) => updateConfig("requireApproval", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-6 rounded-lg">
                  {/* Embed Type Controls */}
                  <div className="mb-4">
                    <Label className="text-sm font-medium mb-2 block">Embed Type</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant={embedType === "popup" ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${embedType === "popup" ? "bg-purple-500" : "bg-transparent"}`}
                        onClick={() => setEmbedType("popup")}
                      >
                        Popup
                      </Button>
                      <Button
                        variant={embedType === "side" ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${embedType === "side" ? "bg-purple-500" : "bg-transparent"}`}
                        onClick={() => setEmbedType("side")}
                      >
                        Side Panel
                      </Button>
                      <Button
                        variant={embedType === "kanban" ? "default" : "outline"}
                        size="sm"
                        className={`text-xs ${embedType === "kanban" ? "bg-purple-500" : "bg-transparent"}`}
                        onClick={() => setEmbedType("kanban")}
                      >
                        Kanban
                      </Button>
                    </div>
                  </div>

                  {/* Show Tab View for popup and side panel */}
                  {(embedType === "popup" || embedType === "side") && (
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Features</h3>
                          <Button
                            size="sm"
                            className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                            onClick={() => setShowRequestForm(true)}
                          >
                            + Request Feature
                          </Button>
                        </div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="flex border-b border-gray-200">
                        <button className="px-4 py-2 text-sm font-medium text-purple-600 border-b-2 border-purple-600 bg-purple-50">
                          Asked Features (3)
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                          Todo (2)
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                          In Progress (1)
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                          Done (5)
                        </button>
                      </div>

                      {/* Feature List */}
                      <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                        {/* Feature Item 1 */}
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">Dark Mode Support</h4>
                              <p className="text-xs text-gray-600 mt-1">
                                Add dark theme option for better user experience
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">UI/UX</span>
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                  Medium
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center space-y-1 ml-3">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-green-100">
                                <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                              <span className="text-xs font-medium text-gray-700">12</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-red-100">
                                <svg className="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414-1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Feature Item 2 */}
                        <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">Mobile App Integration</h4>
                              <p className="text-xs text-gray-600 mt-1">
                                Connect with mobile applications for seamless experience
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Integration
                                </span>
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center space-y-1 ml-3">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-green-100">
                                <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                              <span className="text-xs font-medium text-gray-700">8</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-red-100">
                                <svg className="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Total: 11 features</span>
                          <span>Most voted: Dark Mode Support</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show Kanban View for kanban embed */}
                  {embedType === "kanban" && (
                    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Features Board</h3>
                          <Button
                            size="sm"
                            className="bg-purple-500 hover:bg-purple-600 text-white text-xs"
                            onClick={() => setShowRequestForm(true)}
                          >
                            + Request Feature
                          </Button>
                        </div>
                      </div>

                      {/* Kanban Columns */}
                      <div className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                          {/* Asked Features Column */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 text-sm">Asked Features</h4>
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">3</span>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
                                <h5 className="font-medium text-xs text-gray-900">Dark Mode</h5>
                                <p className="text-xs text-gray-600 mt-1">Add dark theme support</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">UI/UX</span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-600">12</span>
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
                                <h5 className="font-medium text-xs text-gray-900">Mobile App</h5>
                                <p className="text-xs text-gray-600 mt-1">Mobile integration</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="px-1 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                    Integration
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-600">8</span>
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Todo Column */}
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 text-sm">Todo</h4>
                              <span className="bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">2</span>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
                                <h5 className="font-medium text-xs text-gray-900">Search Filters</h5>
                                <p className="text-xs text-gray-600 mt-1">Advanced filtering</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="px-1 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                                    Performance
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-600">5</span>
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* In Progress Column */}
                          <div className="bg-yellow-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 text-sm">In Progress</h4>
                              <span className="bg-yellow-200 text-yellow-700 text-xs px-2 py-1 rounded-full">1</span>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
                                <h5 className="font-medium text-xs text-gray-900">API Integration</h5>
                                <p className="text-xs text-gray-600 mt-1">Third-party APIs</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="px-1 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                                    Integration
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-600">15</span>
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Done Column */}
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 text-sm">Done</h4>
                              <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full">5</span>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-white border border-gray-200 rounded p-2 shadow-sm">
                                <h5 className="font-medium text-xs text-gray-900">User Dashboard</h5>
                                <p className="text-xs text-gray-600 mt-1">Personal dashboard</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">UI/UX</span>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-gray-600">22</span>
                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Description */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-600">
                      {(embedType === "popup" || embedType === "side") &&
                        "Tab View: Perfect for popup and side panel embeds with organized feature tabs"}
                      {embedType === "kanban" &&
                        "Kanban View: Visual board ideal for full-page embeds showing feature progress"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Request Form Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Request a Feature</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowRequestForm(false)} className="h-6 w-6 p-0">
                    ×
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Feature Title *</Label>
                  <Input placeholder="Brief description of the feature" className="text-sm" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Category *</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select category</option>
                    {config.categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Priority</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select priority</option>
                    {config.priorityLevels.map((priority) => (
                      <option key={priority} value={priority.toLowerCase()}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                {config.requireName && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Name *</Label>
                    <Input placeholder="Your name" className="text-sm" />
                  </div>
                )}

                {config.requireEmail && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email *</Label>
                    <Input placeholder="your.email@example.com" className="text-sm" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description *</Label>
                  <Textarea
                    placeholder="Detailed description of the feature..."
                    rows={3}
                    className="text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Use Case</Label>
                  <Textarea placeholder="How would this feature help you?" rows={2} className="text-sm resize-none" />
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowRequestForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => {
                    setShowRequestForm(false)
                    // Here you would handle the form submission
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
