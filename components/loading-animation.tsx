"use client"

import { useState, useEffect } from "react"

const loadingMessages = [
  "Setting up your website modules...",
  "Configuring feedback collection...",
  "Preparing survey tools...",
  "Initializing bug reporting...",
  "Setting up feature requests...",
  "Almost ready...",
]

export function LoadingAnimation() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 400)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 50)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Logo or Icon */}
          <div className="w-16 h-16 bg-[#F5C842] rounded-full mx-auto flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Loading Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Setting up your website</h3>
            <p className="text-sm text-gray-600 min-h-[20px] transition-all duration-300">
              {loadingMessages[currentMessage]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#F5C842] h-2 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">{progress}% complete</p>
          </div>

          {/* Feature Preview */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Feedback & Rating</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Custom Surveys</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Bug Reporting</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Feature Requests</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
