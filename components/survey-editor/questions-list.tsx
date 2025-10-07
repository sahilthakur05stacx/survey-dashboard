"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface QuestionsListProps {
  questions: any[]
  selectedQuestion: any
  onSelectQuestion: (question: any) => void
}

export function QuestionsList({ questions, selectedQuestion, onSelectQuestion }: QuestionsListProps) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {questions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500">No questions added yet</p>
          <p className="text-xs text-gray-400 mt-1">Select a question type from the right panel to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card
              key={question.id}
              className={`border cursor-pointer transition-colors ${
                selectedQuestion?.id === question.id
                  ? "border-[#F5C842] bg-[#F5C842]/5"
                  : "border-gray-200 hover:border-[#F5C842]"
              }`}
              onClick={() => onSelectQuestion(question)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{question.title}</h3>
                    <p className="text-xs text-gray-500">{question.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      Q{index + 1}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
