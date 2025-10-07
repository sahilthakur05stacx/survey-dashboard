"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MessageSquare, Settings, Eye } from "lucide-react"

interface FeedbackModuleEditorProps {
  onBack: () => void
}

export function FeedbackModuleEditor({ onBack }: FeedbackModuleEditorProps) {
  const [config, setConfig] = useState({
    ratingQuestion: "How would you rate your overall experience?",
    ratingScale: "5",
    feedbackQuestion: "Please share your feedback or suggestions:",
    feedbackPlaceholder: "Tell us what you think...",
    requireRating: true,
    requireFeedback: false,
    thankYouMessage: "Thank you for your feedback!",
    showAfterSeconds: 30,
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
                  <span>Rating Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating-question">Rating Question</Label>
                  <Input
                    id="rating-question"
                    value={config.ratingQuestion}
                    onChange={(e) => updateConfig("ratingQuestion", e.target.value)}
                    placeholder="Enter your rating question"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating-scale">Rating Scale</Label>
                  <Select value={config.ratingScale} onValueChange={(value) => updateConfig("ratingScale", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">1-5 Stars</SelectItem>
                      <SelectItem value="10">1-10 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="require-rating">Require Rating</Label>
                  <Switch
                    id="require-rating"
                    checked={config.requireRating}
                    onCheckedChange={(checked) => updateConfig("requireRating", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Feedback Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback-question">Feedback Question</Label>
                  <Input
                    id="feedback-question"
                    value={config.feedbackQuestion}
                    onChange={(e) => updateConfig("feedbackQuestion", e.target.value)}
                    placeholder="Enter your feedback question"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-placeholder">Placeholder Text</Label>
                  <Input
                    id="feedback-placeholder"
                    value={config.feedbackPlaceholder}
                    onChange={(e) => updateConfig("feedbackPlaceholder", e.target.value)}
                    placeholder="Enter placeholder text"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="require-feedback">Require Feedback</Label>
                  <Switch
                    id="require-feedback"
                    checked={config.requireFeedback}
                    onCheckedChange={(checked) => updateConfig("requireFeedback", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="space-y-2">
                  <Label htmlFor="show-after">Show After (seconds)</Label>
                  <Input
                    id="show-after"
                    type="number"
                    value={config.showAfterSeconds}
                    onChange={(e) => updateConfig("showAfterSeconds", Number.parseInt(e.target.value))}
                    min="0"
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
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                    <div className="space-y-4">
                      {/* Rating Section */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900">{config.ratingQuestion}</h3>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Number.parseInt(config.ratingScale) }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 cursor-pointer transition-colors ${
                                i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Feedback Section */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900">{config.feedbackQuestion}</h3>
                        <Textarea placeholder={config.feedbackPlaceholder} rows={3} className="resize-none" />
                      </div>

                      {/* Submit Button */}
                      <Button className="w-full bg-[#F5C842] text-black hover:bg-[#F5C842]/90">Submit Feedback</Button>
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
