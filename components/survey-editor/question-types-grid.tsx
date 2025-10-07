"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { questionTypes } from "./question-types"

interface QuestionTypesGridProps {
  searchQuery: string
  onAddQuestion: (questionType: any) => void
}

export function QuestionTypesGrid({ searchQuery, onAddQuestion }: QuestionTypesGridProps) {
  const filteredQuestionTypes = {
    frequentlyUsed: questionTypes.frequentlyUsed.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    otherQuestions: questionTypes.otherQuestions.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    otherElements: questionTypes.otherElements.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-8">
        {/* Frequently Used */}
        {filteredQuestionTypes.frequentlyUsed.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-4">Frequently Used</h3>
            <div className="grid grid-cols-3 gap-4">
              {filteredQuestionTypes.frequentlyUsed.map((type) => (
                <Card
                  key={type.name}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842] hover:scale-105"
                  onClick={() => onAddQuestion(type)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Dummy Image */}
                      <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=96&width=160&query=${type.name.toLowerCase().replace(/\s+/g, "-")}-survey-question-preview`}
                          alt={`${type.name} preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Icon and Name */}
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-[#F5C842]/10 rounded-md">
                          <type.icon className="h-4 w-4 text-[#F5C842]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 truncate">{type.name}</h4>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Questions */}
        {filteredQuestionTypes.otherQuestions.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-4">Other Questions</h3>
            <div className="grid grid-cols-3 gap-4">
              {filteredQuestionTypes.otherQuestions.map((type) => (
                <Card
                  key={type.name}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842] hover:scale-105"
                  onClick={() => onAddQuestion(type)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Dummy Image */}
                      <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=96&width=160&query=${type.name.toLowerCase().replace(/\s+/g, "-")}-survey-question-preview`}
                          alt={`${type.name} preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Icon and Name */}
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-[#F5C842]/10 rounded-md">
                          <type.icon className="h-4 w-4 text-[#F5C842]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 truncate">{type.name}</h4>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Elements */}
        {filteredQuestionTypes.otherElements.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-4">Other Elements</h3>
            <div className="grid grid-cols-3 gap-4">
              {filteredQuestionTypes.otherElements.map((type) => (
                <Card
                  key={type.name}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-[#F5C842] hover:scale-105"
                  onClick={() => onAddQuestion(type)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Dummy Image */}
                      <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=96&width=160&query=${type.name.toLowerCase().replace(/\s+/g, "-")}-survey-element-preview`}
                          alt={`${type.name} preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Icon and Name */}
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-[#F5C842]/10 rounded-md">
                          <type.icon className="h-4 w-4 text-[#F5C842]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-xs font-medium text-gray-900 truncate">{type.name}</h4>
                            {type.isNew && <Badge className="bg-[#F5C842] text-black text-xs">NEW</Badge>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
