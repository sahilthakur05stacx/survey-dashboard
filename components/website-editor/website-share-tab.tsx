"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Monitor, MessageSquare, SidebarOpen, Star, Bug, Lightbulb, FileText, Settings, Eye } from "lucide-react"

interface WebsiteShareTabProps {
  websiteInfo: any
  enabledModules: any
}

export function WebsiteShareTab({ websiteInfo, enabledModules }: WebsiteShareTabProps) {
  const [embedMode, setEmbedMode] = useState("side-panel")
  const [position, setPosition] = useState("bottom-right")
  const [triggerDelay, setTriggerDelay] = useState([3])
  const [widgetColor, setWidgetColor] = useState("#F5C842")
  const [showLabels, setShowLabels] = useState(true)
  const [showWidgetPanel, setShowWidgetPanel] = useState(false)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const embedModes = [
    {
      id: "inline",
      name: "Inline Embed",
      icon: Monitor,
      description: "Embed directly in your page content",
    },
    {
      id: "popup",
      name: "Pop-up Modal",
      icon: MessageSquare,
      description: "Show as a modal overlay",
    },
    {
      id: "side-panel",
      name: "Side Panel",
      icon: SidebarOpen,
      description: "Slide in from the side",
    },
  ]

  const colors = [
    "#F5C842", // Yellow (brand)
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#6B7280", // Gray
    "#000000", // Black
  ]

  const getEnabledModulesList = () => {
    const moduleInfo = {
      feedback: { name: "Feedback", icon: Star, color: "bg-blue-500" },
      survey: { name: "Survey", icon: FileText, color: "bg-green-500" },
      "bug-report": { name: "Bug Report", icon: Bug, color: "bg-red-500" },
      "feature-request": { name: "Feature Request", icon: Lightbulb, color: "bg-purple-500" },
    }

    return Object.entries(enabledModules)
      .filter(([_, enabled]) => enabled)
      .map(([moduleId, _]) => ({
        id: moduleId,
        ...moduleInfo[moduleId],
      }))
  }

  const generateEmbedCode = () => {
    const enabledModulesList = getEnabledModulesList()
    const websiteUrl = websiteInfo?.url || "https://example.com"
    const websiteName = websiteInfo?.name || "Website"

    if (embedMode === "inline") {
      return ` ${websiteName} Feedback Widget 
<div id="feedback-widget-${websiteInfo?.id || "demo"}" style="max-width: 400px; margin: 20px auto;">
  <div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 24px;">
    <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px; font-weight: 600;">We'd love your feedback!</h3>
    <div style="display: grid; gap: 12px;">
      ${enabledModulesList
        .map(
          (module) => `
      <button onclick="openModule('${module.id}')" style="display: flex; align-items: center; gap: 8px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; cursor: pointer; text-align: left; width: 100%;">
        <div style="width: 32px; height: 32px; background: ${widgetColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">📝</div>
        <span style="color: #374151; font-weight: 500;">${module.name}</span>
      </button>`,
        )
        .join("")}
    </div>
  </div>
</div>

<script>
function openModule(moduleId) {
  // Open module in modal or redirect
  window.open('https://feedback.yoursite.com/' + moduleId, '_blank', 'width=600,height=700');
}
</script>`
    }

    return ` ${websiteName} Feedback Widget 
<script>
(function() {
  // Create widget button
  var widget = document.createElement('div');
  widget.id = 'feedback-widget-${websiteInfo?.id || "demo"}';
  widget.style.cssText = 'position: fixed; ${position.includes("right") ? "right: 20px" : "left: 20px"}; ${position.includes("bottom") ? "bottom: 20px" : "top: 20px"}; z-index: 9999; font-family: Arial, sans-serif;';
  
  // Widget trigger button
  var trigger = document.createElement('button');
  trigger.innerHTML = '💬 Feedback';
  trigger.style.cssText = 'background: ${widgetColor}; color: ${widgetColor === "#000000" ? "white" : "black"}; border: none; padding: 12px 20px; border-radius: 25px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s;';
  trigger.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
  trigger.onmouseout = function() { this.style.transform = 'scale(1)'; };
  
  // Widget panel
  var panel = document.createElement('div');
  panel.style.cssText = 'position: absolute; ${position.includes("right") ? "right: 0" : "left: 0"}; ${position.includes("bottom") ? "bottom: 60px" : "top: 60px"}; width: 280px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); padding: 20px; display: none; border: 1px solid #e5e7eb;';
  
  panel.innerHTML = \`
    <div style="margin-bottom: 16px;">
      <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">How can we help?</h3>
      <p style="margin: 0; color: #6b7280; font-size: 14px;">Choose an option below</p>
    </div>
    <div style="display: grid; gap: 8px;">
      ${enabledModulesList
        .map(
          (module) => `
      <button onclick="openModule('${module.id}')" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: white; cursor: pointer; text-align: left; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
        <div style="width: 28px; height: 28px; background: ${widgetColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: ${widgetColor === "#000000" ? "white" : "black"}; font-size: 12px;">
          ${module.id === "feedback" ? "⭐" : module.id === "survey" ? "📋" : module.id === "bug-report" ? "🐛" : "💡"}
        </div>
        <span style="color: #374151; font-weight: 500; font-size: 14px;">${module.name}</span>
      </button>`,
        )
        .join("")}
    </div>
    <button onclick="closePanel()" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 18px;">×</button>
  \`;
  
  var isOpen = false;
  
  trigger.onclick = function() {
    if (isOpen) {
      panel.style.display = 'none';
      isOpen = false;
    } else {
      panel.style.display = 'block';
      isOpen = true;
    }
  };
  
  window.closePanel = function() {
    panel.style.display = 'none';
    isOpen = false;
  };
  
  window.openModule = function(moduleId) {
    // Open module in modal or redirect
    window.open('https://feedback.yoursite.com/' + moduleId + '?site=${websiteInfo?.id || "demo"}', '_blank', 'width=600,height=700');
    closePanel();
  };
  
  widget.appendChild(trigger);
  widget.appendChild(panel);
  
  // Add to page after delay
  setTimeout(function() {
    document.body.appendChild(widget);
  }, ${triggerDelay[0] * 1000});
  
  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (!widget.contains(e.target) && isOpen) {
      closePanel();
    }
  });
})();
</script>`
  }

  const copyEmbedCode = () => {
    const code = generateEmbedCode()
    navigator.clipboard.writeText(code)
  }

  const enabledModulesList = getEnabledModulesList()

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Configuration */}
        <div className="w-[35%] border-r overflow-y-auto p-6 space-y-8">
          {/* Enabled Modules */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Enabled Modules</h3>
            {enabledModulesList.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Settings className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-sm text-gray-500">No modules enabled</p>
                <p className="text-xs text-gray-400 mt-1">Go to Build tab to enable modules</p>
              </div>
            ) : (
              <div className="space-y-2">
                {enabledModulesList.map((module) => {
                  const IconComponent = module.icon
                  return (
                    <div key={module.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{module.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Active
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Embed Mode */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Embed Mode</h3>
            <div className="grid grid-cols-1 gap-3">
              {embedModes.map((mode) => (
                <Card
                  key={mode.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    embedMode === mode.id
                      ? "border-[#F5C842] bg-[#F5C842]/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setEmbedMode(mode.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          embedMode === mode.id ? "bg-[#F5C842]/20" : "bg-blue-100"
                        }`}
                      >
                        <mode.icon
                          className={`h-5 w-5 ${embedMode === mode.id ? "text-[#F5C842]" : "text-blue-600"}`}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{mode.name}</h4>
                        <p className="text-xs text-gray-600">{mode.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Widget Settings */}
          {embedMode !== "inline" && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Widget Settings</h3>

              {/* Position */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trigger Delay */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show After</Label>
                  <span className="text-sm text-gray-600">{triggerDelay[0]}s</span>
                </div>
                <Slider
                  value={triggerDelay}
                  onValueChange={setTriggerDelay}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Widget Color */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Widget Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setWidgetColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        widgetColor === color ? "border-gray-900 scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview & Code */}
        <div className="w-[65%] bg-gray-50 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Preview Section - Moved to top */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
                <Badge variant="secondary" className="text-xs">
                  {embedMode === "inline" ? "Inline View" : embedMode === "popup" ? "Popup View" : "Widget View"}
                </Badge>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ minHeight: "400px" }}>
                  {/* Browser mockup header */}
                  <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
                      {websiteInfo?.url || "https://yourwebsite.com"}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-8 relative" style={{ minHeight: "350px" }}>
                    <div className="text-center mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Website Content</h3>
                      <p className="text-gray-600">This is where your website content would appear.</p>
                    </div>

                    {embedMode === "inline" && enabledModulesList.length > 0 && (
                      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg border">
                        <h4 className="font-semibold text-gray-900 mb-4">We'd love your feedback!</h4>
                        <div className="space-y-3">
                          {enabledModulesList.map((module) => {
                            const IconComponent = module.icon
                            return (
                              <div
                                key={module.id}
                                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                                onClick={() => {
                                  // Show module preview
                                  const modulePreview = document.getElementById(`module-preview-${module.id}`)
                                  if (modulePreview) {
                                    modulePreview.style.display =
                                      modulePreview.style.display === "none" ? "block" : "none"
                                  }
                                }}
                              >
                                <div className={`p-2 rounded-lg ${module.color} text-white`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{module.name}</span>
                                <span className="text-xs text-gray-500 ml-auto">Click to preview</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {embedMode !== "inline" && enabledModulesList.length > 0 && (
                      <>
                        {/* Widget Preview */}
                        <div
                          className={`fixed ${position.includes("right") ? "right-6" : "left-6"} ${position.includes("bottom") ? "bottom-6" : "top-6"} z-10`}
                          style={{ position: "absolute" }}
                        >
                          <button
                            className="px-4 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                            style={{
                              backgroundColor: widgetColor,
                              color: widgetColor === "#000000" ? "white" : "black",
                            }}
                            onClick={() => setShowWidgetPanel(!showWidgetPanel)}
                          >
                            💬 Feedback
                          </button>
                        </div>

                        {/* Side Panel Mode */}
                        {showWidgetPanel && embedMode === "side-panel" && (
                          <>
                            {/* Backdrop - Full screen */}
                            <div
                              className="fixed inset-0 bg-black bg-opacity-25 z-50"
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 9998,
                              }}
                              onClick={() => {
                                setShowWidgetPanel(false)
                                setSelectedModule(null)
                              }}
                            />
                            {/* Side Panel - Full screen height */}
                            <div
                              className={`fixed ${position.includes("right") ? "right-0" : "left-0"} top-0 h-screen w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out`}
                              style={{
                                position: "fixed",
                                top: 0,
                                height: "100vh",
                                zIndex: 9999,
                                transform: showWidgetPanel
                                  ? "translateX(0)"
                                  : position.includes("right")
                                    ? "translateX(100%)"
                                    : "translateX(-100%)",
                              }}
                            >
                              <div className="h-full flex flex-col">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                                  <h4 className="text-xl font-semibold text-gray-900">How can we help?</h4>
                                  <button
                                    onClick={() => {
                                      setShowWidgetPanel(false)
                                      setSelectedModule(null)
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-2xl p-1 hover:bg-gray-200 rounded-full transition-colors"
                                  >
                                    ×
                                  </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto p-6">
                                  {!selectedModule ? (
                                    <div className="space-y-4">
                                      <p className="text-gray-600 mb-8 text-lg">
                                        Choose an option below to get started
                                      </p>
                                      {enabledModulesList.map((module) => {
                                        const IconComponent = module.icon
                                        return (
                                          <button
                                            key={module.id}
                                            onClick={() => {
                                              setSelectedModule(module.id)
                                            }}
                                            className="w-full flex items-center space-x-5 p-5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-left hover:border-gray-300 hover:shadow-sm"
                                          >
                                            <div className={`p-4 rounded-xl ${module.color} text-white`}>
                                              <IconComponent className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                              <span className="text-lg font-semibold text-gray-900 block">
                                                {module.name}
                                              </span>
                                              <p className="text-gray-500 mt-1">
                                                {module.id === "feedback" &&
                                                  "Share your experience and help us improve"}
                                                {module.id === "survey" &&
                                                  "Participate in our survey to help us serve you better"}
                                                {module.id === "bug-report" &&
                                                  "Report any issues or bugs you've encountered"}
                                                {module.id === "feature-request" &&
                                                  "Suggest new features or improvements"}
                                              </p>
                                            </div>
                                            <div className="text-gray-400">→</div>
                                          </button>
                                        )
                                      })}
                                    </div>
                                  ) : (
                                    <div className="space-y-8">
                                      <div className="flex items-center space-x-4 mb-8">
                                        <button
                                          onClick={() => setSelectedModule(null)}
                                          className="text-gray-400 hover:text-gray-600 text-xl p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                          ←
                                        </button>
                                        <div>
                                          <span className="text-xl font-semibold text-gray-900">
                                            {enabledModulesList.find((m) => m.id === selectedModule)?.name}
                                          </span>
                                          <p className="text-gray-500 mt-1">
                                            {selectedModule === "feedback" && "We value your feedback"}
                                            {selectedModule === "survey" && "Help us understand your needs"}
                                            {selectedModule === "bug-report" && "Help us fix the issue"}
                                            {selectedModule === "feature-request" && "Share your ideas with us"}
                                          </p>
                                        </div>
                                      </div>

                                      {selectedModule === "feedback" && (
                                        <div className="space-y-8">
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              How would you rate your experience?
                                            </label>
                                            <div className="flex space-x-3 justify-center py-4">
                                              {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                  key={star}
                                                  className="text-4xl text-gray-300 hover:text-yellow-400 transition-colors transform hover:scale-110"
                                                >
                                                  ⭐
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              Tell us more about your experience
                                            </label>
                                            <textarea
                                              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                              rows={6}
                                              placeholder="Share your thoughts, suggestions, or any specific details about your experience..."
                                            ></textarea>
                                          </div>
                                          <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                                            Submit Feedback
                                          </button>
                                        </div>
                                      )}

                                      {selectedModule === "survey" && (
                                        <div className="space-y-8">
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              What's your primary use case?
                                            </label>
                                            <div className="space-y-3">
                                              <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                <input type="radio" name="usecase" className="mr-4 w-4 h-4" />
                                                <div>
                                                  <span className="font-medium">Personal use</span>
                                                  <p className="text-gray-500 text-sm mt-1">
                                                    Using for personal projects or learning
                                                  </p>
                                                </div>
                                              </label>
                                              <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                <input type="radio" name="usecase" className="mr-4 w-4 h-4" />
                                                <div>
                                                  <span className="font-medium">Business use</span>
                                                  <p className="text-gray-500 text-sm mt-1">
                                                    Using for work or business purposes
                                                  </p>
                                                </div>
                                              </label>
                                              <label className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                                <input type="radio" name="usecase" className="mr-4 w-4 h-4" />
                                                <div>
                                                  <span className="font-medium">Educational</span>
                                                  <p className="text-gray-500 text-sm mt-1">
                                                    Using for teaching or academic research
                                                  </p>
                                                </div>
                                              </label>
                                            </div>
                                          </div>
                                          <button className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                                            Continue Survey
                                          </button>
                                        </div>
                                      )}

                                      {selectedModule === "bug-report" && (
                                        <div className="space-y-8">
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              Describe the issue
                                            </label>
                                            <textarea
                                              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                                              rows={4}
                                              placeholder="Please describe what went wrong in detail..."
                                            ></textarea>
                                          </div>
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              Steps to reproduce
                                            </label>
                                            <textarea
                                              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                                              rows={4}
                                              placeholder="1. Go to...&#10;2. Click on...&#10;3. See error&#10;&#10;Please provide step-by-step instructions"
                                            ></textarea>
                                          </div>
                                          <div>
                                            <label className="block text-lg font-semibold text-gray-700 mb-4">
                                              What browser are you using?
                                            </label>
                                            <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-base">
                                              <option>Chrome</option>
                                              <option>Firefox</option>
                                              <option>Safari</option>
                                              <option>Edge</option>
                                              <option>Other</option>
                                            </select>
                                          </div>
                                          <button className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
                                            Report Bug
                                          </button>
                                        </div>
                                      )}

                                      {selectedModule === "feature-request" && (
                                        <div className="space-y-6">
                                          {/* Tab Navigation */}
                                          <div className="flex border-b border-gray-200 -mx-6 px-6">
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

                                          {/* Request New Feature Button */}
                                          <div className="flex justify-end">
                                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                                              + Request Feature
                                            </Button>
                                          </div>

                                          {/* Feature List */}
                                          <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {/* Feature Item 1 */}
                                            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                  <h4 className="font-medium text-gray-900">Dark Mode Support</h4>
                                                  <p className="text-sm text-gray-600 mt-1">
                                                    Add dark theme option for better user experience
                                                  </p>
                                                  <div className="flex items-center space-x-2 mt-3">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                      UI/UX
                                                    </span>
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                      Medium
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1 ml-4">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-green-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-green-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                  </Button>
                                                  <span className="text-sm font-medium text-gray-700">12</span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-red-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
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

                                            {/* Feature Item 2 */}
                                            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                  <h4 className="font-medium text-gray-900">Mobile App Integration</h4>
                                                  <p className="text-sm text-gray-600 mt-1">
                                                    Connect with mobile applications for seamless experience
                                                  </p>
                                                  <div className="flex items-center space-x-2 mt-3">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                      Integration
                                                    </span>
                                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                      High
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1 ml-4">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-green-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-green-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                  </Button>
                                                  <span className="text-sm font-medium text-gray-700">8</span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-red-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
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

                                            {/* Feature Item 3 */}
                                            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                              <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                  <h4 className="font-medium text-gray-900">Advanced Search Filters</h4>
                                                  <p className="text-sm text-gray-600 mt-1">
                                                    More filtering options for better content discovery
                                                  </p>
                                                  <div className="flex items-center space-x-2 mt-3">
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                                      Performance
                                                    </span>
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                      Low
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1 ml-4">
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-green-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-green-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                  </Button>
                                                  <span className="text-sm font-medium text-gray-700">5</span>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                                  >
                                                    <svg
                                                      className="h-4 w-4 text-red-600"
                                                      fill="currentColor"
                                                      viewBox="0 0 20 20"
                                                    >
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

                                          {/* Footer Stats */}
                                          <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between text-sm text-gray-600">
                                              <span>Total: 11 features</span>
                                              <span>Most voted: Dark Mode Support</span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Footer */}
                                <div className="border-t bg-gray-50 p-6">
                                  <p className="text-center text-gray-500 text-sm">
                                    Powered by {websiteInfo?.name || "Your Website"} Feedback System
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Popup Mode */}
                        {showWidgetPanel && embedMode === "popup" && (
                          <>
                            {/* Backdrop - Full screen */}
                            <div
                              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                              style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 9998,
                              }}
                              onClick={() => {
                                setShowWidgetPanel(false)
                                setSelectedModule(null)
                              }}
                            >
                              {/* Popup Modal */}
                              <div
                                className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[85vh] overflow-hidden mx-4"
                                style={{ zIndex: 9999 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="flex flex-col max-h-[85vh]">
                                  {/* Header */}
                                  <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                                    <h4 className="text-xl font-semibold text-gray-900">How can we help?</h4>
                                    <button
                                      onClick={() => {
                                        setShowWidgetPanel(false)
                                        setSelectedModule(null)
                                      }}
                                      className="text-gray-400 hover:text-gray-600 text-2xl p-1 hover:bg-gray-200 rounded-full transition-colors"
                                    >
                                      ×
                                    </button>
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 overflow-y-auto p-6">
                                    {!selectedModule ? (
                                      <div className="space-y-3">
                                        <p className="text-gray-600 mb-6 text-center">Choose an option below</p>
                                        {enabledModulesList.map((module) => {
                                          const IconComponent = module.icon
                                          return (
                                            <button
                                              key={module.id}
                                              onClick={() => {
                                                setSelectedModule(module.id)
                                              }}
                                              className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left hover:border-gray-300"
                                            >
                                              <div className={`p-3 rounded-lg ${module.color} text-white`}>
                                                <IconComponent className="h-5 w-5" />
                                              </div>
                                              <span className="font-medium text-gray-900">{module.name}</span>
                                            </button>
                                          )
                                        })}
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <div className="flex items-center space-x-2 mb-4">
                                          <button
                                            onClick={() => setSelectedModule(null)}
                                            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                                          >
                                            ←
                                          </button>
                                          <span className="font-medium text-gray-900">
                                            {enabledModulesList.find((m) => m.id === selectedModule)?.name}
                                          </span>
                                        </div>

                                        {selectedModule === "feedback" && (
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block font-medium text-gray-700 mb-2">
                                                How would you rate your experience?
                                              </label>
                                              <div className="flex space-x-1 justify-center py-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                  <button
                                                    key={star}
                                                    className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                                                  >
                                                    ⭐
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                            <div>
                                              <label className="block font-medium text-gray-700 mb-2">
                                                Tell us more (optional)
                                              </label>
                                              <textarea
                                                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                rows={3}
                                                placeholder="Share your thoughts..."
                                              ></textarea>
                                            </div>
                                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                              Submit Feedback
                                            </button>
                                          </div>
                                        )}

                                        {selectedModule === "survey" && (
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block font-medium text-gray-700 mb-2">
                                                What's your primary use case?
                                              </label>
                                              <div className="space-y-2">
                                                <label className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                                  <input type="radio" name="usecase" className="mr-2" />
                                                  <span className="text-sm">Personal use</span>
                                                </label>
                                                <label className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                                  <input type="radio" name="usecase" className="mr-2" />
                                                  <span className="text-sm">Business use</span>
                                                </label>
                                                <label className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                                  <input type="radio" name="usecase" className="mr-2" />
                                                  <span className="text-sm">Educational</span>
                                                </label>
                                              </div>
                                            </div>
                                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                              Continue Survey
                                            </button>
                                          </div>
                                        )}

                                        {selectedModule === "bug-report" && (
                                          <div className="space-y-4">
                                            <div>
                                              <label className="block font-medium text-gray-700 mb-2">
                                                Describe the issue
                                              </label>
                                              <textarea
                                                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                rows={2}
                                                placeholder="What went wrong?"
                                              ></textarea>
                                            </div>
                                            <div>
                                              <label className="block font-medium text-gray-700 mb-2">
                                                Steps to reproduce
                                              </label>
                                              <textarea
                                                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                rows={2}
                                                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error"
                                              ></textarea>
                                            </div>
                                            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                              Report Bug
                                            </button>
                                          </div>
                                        )}

                                        {selectedModule === "feature-request" && (
                                          <div className="space-y-6">
                                            {/* Tab Navigation */}
                                            <div className="flex border-b border-gray-200 -mx-6 px-6">
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

                                            {/* Request New Feature Button */}
                                            <div className="flex justify-end">
                                              <Button
                                                size="sm"
                                                className="bg-purple-500 hover:bg-purple-600 text-white"
                                              >
                                                + Request Feature
                                              </Button>
                                            </div>

                                            {/* Feature List */}
                                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                              {/* Feature Item 1 */}
                                              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-start justify-between">
                                                  <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">Dark Mode Support</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                      Add dark theme option for better user experience
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-3">
                                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                        UI/UX
                                                      </span>
                                                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                        Medium
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-col items-center space-y-1 ml-4">
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-green-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-green-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                    </Button>
                                                    <span className="text-sm font-medium text-gray-700">12</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-red-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-red-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
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

                                              {/* Feature Item 2 */}
                                              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-start justify-between">
                                                  <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                      Mobile App Integration
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                      Connect with mobile applications for seamless experience
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-3">
                                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        Integration
                                                      </span>
                                                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                        High
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-col items-center space-y-1 ml-4">
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-green-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-green-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                    </Button>
                                                    <span className="text-sm font-medium text-gray-700">8</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-red-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-red-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
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

                                              {/* Feature Item 3 */}
                                              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-start justify-between">
                                                  <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">
                                                      Advanced Search Filters
                                                    </h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                      More filtering options for better content discovery
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-3">
                                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                                        Performance
                                                      </span>
                                                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                        Low
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-col items-center space-y-1 ml-4">
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-green-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-green-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                    </Button>
                                                    <span className="text-sm font-medium text-gray-700">5</span>
                                                    <Button
                                                      variant="ghost"
                                                      size="sm"
                                                      className="h-8 w-8 p-0 hover:bg-red-100"
                                                    >
                                                      <svg
                                                        className="h-4 w-4 text-red-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                      >
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

                                            {/* Footer Stats */}
                                            <div className="pt-4 border-t border-gray-200">
                                              <div className="flex items-center justify-between text-sm text-gray-600">
                                                <span>Total: 11 features</span>
                                                <span>Most voted: Dark Mode Support</span>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="text-center mt-4">
                          <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>Click the widget to see it in action</span>
                          </p>
                        </div>
                      </>
                    )}

                    {enabledModulesList.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Settings className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No modules enabled</h3>
                        <p className="text-gray-500">Enable modules in the Build tab to see the preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Embed Code Section - Moved to bottom */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Embed Code</h3>
                  <p className="text-sm text-gray-600">Copy and paste this code into your website</p>
                </div>
                <Button
                  onClick={copyEmbedCode}
                  className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                  disabled={enabledModulesList.length === 0}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{generateEmbedCode()}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
