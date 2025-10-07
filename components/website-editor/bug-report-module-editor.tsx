"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bug, Upload, Settings, Eye, AlertTriangle } from "lucide-react"

interface BugReportModuleEditorProps {
  onBack: () => void
}

export function BugReportModuleEditor({ onBack }: BugReportModuleEditorProps) {
  const [config, setConfig] = useState({
    title: "Report a Bug",
    description: "Help us improve by reporting any issues you encounter",
    requireName: false,
    requireEmail: true,
    allowScreenshots: true,
    maxScreenshots: 3,
    maxFileSize: 5, // MB
    autoAssign: true,
    notifyOnSubmission: true,
    severityLevels: ["Low", "Medium", "High", "Critical"],
    categories: ["UI/UX", "Performance", "Functionality", "Security", "Other"],
  })

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
                  <Upload className="h-5 w-5" />
                  <span>File Upload Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-screenshots">Allow Screenshots</Label>
                  <Switch
                    id="allow-screenshots"
                    checked={config.allowScreenshots}
                    onCheckedChange={(checked) => updateConfig("allowScreenshots", checked)}
                  />
                </div>

                {config.allowScreenshots && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="max-screenshots">Max Screenshots</Label>
                      <Input
                        id="max-screenshots"
                        type="number"
                        value={config.maxScreenshots}
                        onChange={(e) => updateConfig("maxScreenshots", Number.parseInt(e.target.value))}
                        min="1"
                        max="10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                      <Input
                        id="max-file-size"
                        type="number"
                        value={config.maxFileSize}
                        onChange={(e) => updateConfig("maxFileSize", Number.parseInt(e.target.value))}
                        min="1"
                        max="50"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-assign">Auto-assign to Team</Label>
                  <Switch
                    id="auto-assign"
                    checked={config.autoAssign}
                    onCheckedChange={(checked) => updateConfig("autoAssign", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-submission">Notify on Submission</Label>
                  <Switch
                    id="notify-submission"
                    checked={config.notifyOnSubmission}
                    onCheckedChange={(checked) => updateConfig("notifyOnSubmission", checked)}
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
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mx-auto">
                          <Bug className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{config.title}</h3>
                        <p className="text-sm text-gray-600">{config.description}</p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs">Bug Title *</Label>
                          <Input placeholder="Brief description of the issue" className="mt-1" />
                        </div>

                        <div>
                          <Label className="text-xs">Severity *</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              {config.severityLevels.map((level) => (
                                <SelectItem key={level} value={level.toLowerCase()}>
                                  <div className="flex items-center space-x-2">
                                    <AlertTriangle
                                      className={`h-3 w-3 ${
                                        level === "Critical"
                                          ? "text-red-500"
                                          : level === "High"
                                            ? "text-orange-500"
                                            : level === "Medium"
                                              ? "text-yellow-500"
                                              : "text-green-500"
                                      }`}
                                    />
                                    <span>{level}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {config.requireName && (
                          <div>
                            <Label className="text-xs">Name *</Label>
                            <Input placeholder="Your name" className="mt-1" />
                          </div>
                        )}

                        {config.requireEmail && (
                          <div>
                            <Label className="text-xs">Email *</Label>
                            <Input placeholder="your.email@example.com" className="mt-1" />
                          </div>
                        )}

                        <div>
                          <Label className="text-xs">Description *</Label>
                          <Textarea
                            placeholder="Detailed description of the bug..."
                            rows={3}
                            className="mt-1 resize-none"
                          />
                        </div>

                        {config.allowScreenshots && (
                          <div>
                            <Label className="text-xs">Screenshots (Optional)</Label>
                            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500">Drop files here or click to upload</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Max {config.maxScreenshots} files, {config.maxFileSize}MB each
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Submit Bug Report</Button>
                    </div>
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
