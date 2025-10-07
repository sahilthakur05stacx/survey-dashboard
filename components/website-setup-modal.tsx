"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Globe, X } from "lucide-react"

interface WebsiteSetupModalProps {
  open: boolean
  onClose: (websiteData?: any) => void
  template?: any
}

export function WebsiteSetupModal({ open, onClose, template }: WebsiteSetupModalProps) {
  const [websiteName, setWebsiteName] = useState(template?.name || "")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [websiteDescription, setWebsiteDescription] = useState("")

  const handleSubmit = () => {
    if (!websiteName.trim() || !websiteUrl.trim()) return

    const websiteData = {
      name: websiteName.trim(),
      url: websiteUrl.trim(),
      description: websiteDescription.trim(),
      template: template,
      createdAt: new Date().toISOString(),
    }

    onClose(websiteData)
  }

  const handleCancel = () => {
    onClose()
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const isFormValid = websiteName.trim() && websiteUrl.trim() && isValidUrl(websiteUrl)

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#F5C842]/10 rounded-lg">
                <Globe className="h-5 w-5 text-[#F5C842]" />
              </div>
              <DialogTitle className="text-xl font-semibold text-gray-900">Add New Website</DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {template && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Template:</span> {template.name}
              </p>
            </div>
          )}

          {/* Website URL */}
          <div className="space-y-2">
            <Label htmlFor="website-url" className="text-sm font-semibold text-gray-900">
              Website URL *
            </Label>
            <Input
              id="website-url"
              placeholder="https://example.com or example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
            {websiteUrl && !isValidUrl(websiteUrl) && <p className="text-xs text-red-600">Please enter a valid URL</p>}
          </div>

          {/* Website Name */}
          <div className="space-y-2">
            <Label htmlFor="website-name" className="text-sm font-semibold text-gray-900">
              Website Name *
            </Label>
            <Input
              id="website-name"
              placeholder="My Awesome Website"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
          </div>

          {/* Website Description */}
          <div className="space-y-2">
            <Label htmlFor="website-description" className="text-sm font-semibold text-gray-900">
              Description <span className="text-gray-500 font-normal">(optional)</span>
            </Label>
            <Textarea
              id="website-description"
              placeholder="Brief description of your website..."
              value={websiteDescription}
              onChange={(e) => setWebsiteDescription(e.target.value)}
              rows={3}
              className="w-full resize-none text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={handleCancel} className="px-6 h-11 font-medium bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 px-6 h-11 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
