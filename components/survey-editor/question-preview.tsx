"use client"

import { Input } from "@/components/ui/input"

interface QuestionPreviewProps {
  question: any
}

export function QuestionPreview({ question }: QuestionPreviewProps) {
  switch (question.type) {
    case "Opinion Scale":
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{question.leftLabel}</span>
            <span className="text-sm text-gray-500">{question.rightLabel}</span>
          </div>
          <div className="flex justify-center space-x-4">
            {Array.from({ length: question.steps }, (_, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-[#F5C842] flex items-center justify-center text-sm font-medium"
              >
                {question.startScaleAt1 ? i + 1 : i}
              </button>
            ))}
          </div>
        </div>
      )
    case "Multiple Choice":
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input type="radio" className="w-4 h-4" />
            <span className="text-gray-700">Option 1</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="radio" className="w-4 h-4" />
            <span className="text-gray-700">Option 2</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="radio" className="w-4 h-4" />
            <span className="text-gray-700">Option 3</span>
          </div>
        </div>
      )
    case "Text":
      return (
        <div>
          <Input placeholder="Type your answer here..." className="w-full" />
        </div>
      )
    case "Rating":
      return (
        <div className="flex space-x-2">
          {Array.from({ length: 5 }, (_, i) => (
            <button key={i} className="text-2xl text-gray-300 hover:text-[#F5C842]">
              ★
            </button>
          ))}
        </div>
      )
    case "Email":
      return (
        <div>
          <Input placeholder="Enter your email address..." type="email" className="w-full" />
        </div>
      )
    case "Phone Number":
      return (
        <div>
          <Input placeholder="Enter your phone number..." type="tel" className="w-full" />
        </div>
      )
    case "Yes or No":
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input type="radio" className="w-4 h-4" />
            <span className="text-gray-700">Yes</span>
          </div>
          <div className="flex items-center space-x-3">
            <input type="radio" className="w-4 h-4" />
            <span className="text-gray-700">No</span>
          </div>
        </div>
      )
    default:
      return <div className="text-gray-500 italic">Preview for {question.type} will appear here</div>
  }
}
