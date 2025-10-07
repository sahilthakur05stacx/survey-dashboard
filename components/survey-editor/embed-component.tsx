"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Copy, Monitor, MessageSquare, SidebarOpen, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmbedComponentProps {
  onBack: () => void
  surveyInfo?: any
}

export function EmbedComponent({ onBack, surveyInfo }: EmbedComponentProps) {
  const [embedMode, setEmbedMode] = useState("side-panel")
  const [triggerType, setTriggerType] = useState("button")
  const [matchingString, setMatchingString] = useState("url-path")
  const [scrollPercentage, setScrollPercentage] = useState([5])
  const [triggerDelay, setTriggerDelay] = useState([0])
  const [buttonLabel, setButtonLabel] = useState("Open Survey")
  const [buttonFontSize, setButtonFontSize] = useState([16])
  const [buttonColor, setButtonColor] = useState("#06B6D4")

  const embedModes = [
    {
      id: "inline",
      name: "Inline Embed",
      icon: Monitor,
      description: "Embed directly in your page content",
    },
    {
      id: "popup",
      name: "Pop-up",
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
    "#06B6D4", // Cyan
    "#F5C842", // Yellow
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#6B7280", // Gray
    "#000000", // Black
  ]

  const generateEmbedCode = () => {
    const surveyUrl = `https://survey.bee/${surveyInfo?.name?.toLowerCase().replace(/\s+/g, "-") || "new-survey"}`

    if (embedMode === "inline") {
      return `<iframe src="${surveyUrl}" width="100%" height="600" frameborder="0" style="border-radius: 8px;"></iframe>`
    }

    if (embedMode === "popup") {
      return `<script>
  (function() {
    var button = document.createElement('button');
    button.innerHTML = '${buttonLabel}';
    button.style.cssText = 'background-color: ${buttonColor}; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: ${buttonFontSize[0]}px; cursor: pointer; font-family: Arial, sans-serif;';
    
    button.onclick = function() {
      var modal = document.createElement('div');
      modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;';
      
      var iframe = document.createElement('iframe');
      iframe.src = '${surveyUrl}';
      iframe.style.cssText = 'width: 90%; max-width: 800px; height: 80%; border: none; border-radius: 8px; background: white;';
      
      var closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; background: white; border: none; font-size: 24px; cursor: pointer; width: 40px; height: 40px; border-radius: 50%;';
      closeBtn.onclick = function() { document.body.removeChild(modal); };
      
      modal.appendChild(iframe);
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
    };
    
    document.body.appendChild(button);
  })();
</script>`
    }

    // Side Panel
    return `<script>
  (function() {
    var button = document.createElement('button');
    button.innerHTML = '${buttonLabel}';
    button.style.cssText = 'background-color: ${buttonColor}; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: ${buttonFontSize[0]}px; cursor: pointer; font-family: Arial, sans-serif; position: fixed; right: 20px; top: 50%; transform: translateY(-50%); z-index: 9999;';
    
    button.onclick = function() {
      var panel = document.createElement('div');
      panel.style.cssText = 'position: fixed; top: 0; right: -400px; width: 400px; height: 100%; background: white; z-index: 10000; transition: right 0.3s ease; box-shadow: -2px 0 10px rgba(0,0,0,0.1);';
      
      var iframe = document.createElement('iframe');
      iframe.src = '${surveyUrl}';
      iframe.style.cssText = 'width: 100%; height: 100%; border: none;';
      
      var closeBtn = document.createElement('button');
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer; z-index: 10001;';
      closeBtn.onclick = function() { 
        panel.style.right = '-400px';
        setTimeout(function() { document.body.removeChild(panel); }, 300);
      };
      
      panel.appendChild(iframe);
      panel.appendChild(closeBtn);
      document.body.appendChild(panel);
      
      setTimeout(function() { panel.style.right = '0'; }, 10);
    };
    
    document.body.appendChild(button);
  })();
</script>`
  }

  const copyEmbedCode = () => {
    const code = generateEmbedCode()
    navigator.clipboard.writeText(code)
  }

  const renderPreview = () => {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ minHeight: "400px" }}>
          {/* Browser mockup header */}
          <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">https://yourwebsite.com</div>
          </div>

          {/* Content area */}
          <div className="p-8 relative" style={{ minHeight: "350px" }}>
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Website Content</h3>
              <p className="text-gray-600">This is where your website content would appear.</p>
            </div>

            {embedMode === "inline" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <Monitor className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-medium">Survey Embedded Here</p>
                  <p className="text-sm">Survey appears directly in your page content</p>
                </div>
              </div>
            )}

            {(embedMode === "popup" || embedMode === "side-panel") && (
              <>
                <div className="flex justify-center mb-4">
                  <button
                    className="px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
                    style={{
                      backgroundColor: buttonColor,
                      fontSize: `${buttonFontSize[0]}px`,
                    }}
                  >
                    {buttonLabel}
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                    <span>👆</span>
                    <span>
                      Click the above button to see the {embedMode === "popup" ? "popup" : "side panel"} in action
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Embed Survey</h2>
              <p className="text-sm text-gray-500">Embed surveys on your website or product</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={copyEmbedCode} className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
              <Copy className="h-4 w-4 mr-2" />
              Copy Embed Code
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Configuration */}
        <div className="w-[30%] border-r overflow-y-auto p-6 space-y-8">
          {/* Choose Mode */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Choose Mode</h3>
            <p className="text-sm text-gray-600">
              Embed surveys on your website or product. Our three options: Pop-up Card, Chat and Inline Embed gives you
              the flexibility to collect data the way you like.
            </p>

            <div className="grid grid-cols-3 gap-4">
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
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                        embedMode === mode.id ? "bg-[#F5C842]/20" : "bg-blue-100"
                      }`}
                    >
                      <mode.icon className={`h-6 w-6 ${embedMode === mode.id ? "text-[#F5C842]" : "text-blue-600"}`} />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{mode.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Settings */}
          {(embedMode === "popup" || embedMode === "side-panel") && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Settings</h3>

              {/* Trigger Type */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      triggerType === "button"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTriggerType("button")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trigger using a button</span>
                      {triggerType === "button" && <span className="text-white">✓</span>}
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      triggerType === "string"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTriggerType("string")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trigger when a matching string</span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                      {triggerType === "string" && <span className="text-white">✓</span>}
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      triggerType === "scroll"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setTriggerType("scroll")}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Trigger when the user scrolls till</span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                      {triggerType === "scroll" && <span className="text-white">✓</span>}
                    </div>
                  </div>
                </div>

                {/* Conditional inputs based on trigger type */}
                {triggerType === "string" && (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={matchingString}
                      onChange={(e) => setMatchingString(e.target.value)}
                      className="flex-1"
                      placeholder="url-path"
                    />
                  </div>
                )}

                {triggerType === "scroll" && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={scrollPercentage[0]}
                      onChange={(e) => setScrollPercentage([Number.parseInt(e.target.value) || 0])}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                )}

                {/* Trigger after delay */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Trigger after</Label>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={triggerDelay[0]}
                      onChange={(e) => setTriggerDelay([Number.parseInt(e.target.value) || 0])}
                      className="w-20"
                      min="0"
                    />
                    <span className="text-sm text-gray-600">sec</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {(embedMode === "popup" || embedMode === "side-panel") && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Appearance</h3>

              {/* Button Label */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Button Label</Label>
                  <span className="text-xs text-gray-500">{buttonLabel.length}/25</span>
                </div>
                <Input
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  maxLength={25}
                  className="w-full"
                />
              </div>

              {/* Button Font Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Button Font Size</Label>
                  <span className="text-sm text-gray-600">{buttonFontSize[0]} px</span>
                </div>
                <Slider
                  value={buttonFontSize}
                  onValueChange={setButtonFontSize}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Button Color */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Button Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setButtonColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        buttonColor === color ? "border-gray-900 scale-110" : "border-gray-300"
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

        {/* Right Panel - Preview */}
        <div className="w-[70%] bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Preview</h3>
              <Badge variant="secondary" className="text-xs">
                {embedMode === "inline" ? "Inline View" : embedMode === "popup" ? "Popup View" : "Side Panel View"}
              </Badge>
            </div>
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  )
}
