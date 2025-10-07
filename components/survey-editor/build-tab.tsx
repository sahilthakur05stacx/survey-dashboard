"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { QuestionsList } from "./questions-list"
import { QuestionEditor } from "./question-editor"
import { QuestionTypesGrid } from "./question-types-grid"

interface BuildTabProps {
  questions: any[]
  selectedQuestion: any
  onAddQuestion: (questionType: any) => void
  onSelectQuestion: (question: any) => void
  onUpdateQuestion: (question: any) => void
  onShowQuestionTypes: () => void
}

export function BuildTab({
  questions,
  selectedQuestion,
  onAddQuestion,
  onSelectQuestion,
  onUpdateQuestion,
  onShowQuestionTypes,
}: BuildTabProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Column - Questions */}
      <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-900 mb-4">QUESTIONS</h2>
          <div className="space-y-3">
            <Button
              onClick={onShowQuestionTypes}
              variant="outline"
              className="w-full justify-center border-dashed border-2 border-[#F5C842] text-[#F5C842] hover:bg-[#F5C842]/10 bg-transparent h-8 text-xs"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a question
            </Button>
            {questions.length === 0 && (
              <Button variant="outline" className="w-full justify-center bg-transparent h-8 text-xs">
                <Download className="h-4 w-4 mr-2" />
                Import from library
              </Button>
            )}
          </div>
        </div>

        <QuestionsList questions={questions} selectedQuestion={selectedQuestion} onSelectQuestion={onSelectQuestion} />
      </div>

      {/* Right Column - Question Types or Question Details */}
      <div className="w-[70%] bg-gray-50 flex flex-col">
        {selectedQuestion ? (
          <QuestionEditor
            question={selectedQuestion}
            onUpdateQuestion={onUpdateQuestion}
            onShowQuestionTypes={onShowQuestionTypes}
          />
        ) : (
          <>
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Question Type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-8 text-xs"
                />
              </div>
            </div>

            <QuestionTypesGrid searchQuery={searchQuery} onAddQuestion={onAddQuestion} />
          </>
        )}
      </div>
    </div>
  )
}
