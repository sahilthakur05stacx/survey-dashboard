"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Tag } from "lucide-react"
import { QuestionPreview } from "./question-preview"
import { questionTypes } from "./question-types"

interface QuestionEditorProps {
  question: any
  onUpdateQuestion: (question: any) => void
  onShowQuestionTypes: () => void
}

export function QuestionEditor({ question, onUpdateQuestion, onShowQuestionTypes }: QuestionEditorProps) {
  const changeQuestionType = (newType: string) => {
    const updatedQuestion = {
      ...question,
      type: newType,
      title: question.title === `New ${question.type} Question` ? `New ${newType} Question` : question.title,
    }
    onUpdateQuestion(updatedQuestion)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Question Editor Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-transparent">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
              View
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={question.required}
                onCheckedChange={(checked) => onUpdateQuestion({ ...question, required: checked as boolean })}
              />
              <Label htmlFor="required" className="text-xs font-medium">
                Required
              </Label>
            </div>
            <Button
              onClick={onShowQuestionTypes}
              className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 h-8 px-3 text-xs"
            >
              Add Next Question
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question Setup */}
        <div className="w-[70%] bg-white p-6 space-y-6">
          {/* Question Type Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-700">Question Type</Label>
            <Select value={question.type} onValueChange={changeQuestionType}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Frequently Used
                </div>
                {questionTypes.frequentlyUsed.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide mt-2">
                  Other Questions
                </div>
                {questionTypes.otherQuestions.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide mt-2">
                  Other Elements
                </div>
                {questionTypes.otherElements.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    <div className="flex items-center space-x-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                      {type.isNew && <Badge className="bg-[#F5C842] text-black text-xs ml-2">NEW</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Input */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">1.</span>
              <Input
                placeholder="Start typing..."
                value={question.title}
                onChange={(e) => onUpdateQuestion({ ...question, title: e.target.value })}
                className="text-sm font-medium border-none shadow-none p-0 focus-visible:ring-0 h-8 text-xs"
              />
            </div>
            <Textarea
              placeholder="Add description to your question."
              value={question.description}
              onChange={(e) => onUpdateQuestion({ ...question, description: e.target.value })}
              className="border-none shadow-none p-0 resize-none focus-visible:ring-0 text-gray-500 text-sm"
              rows={2}
            />
          </div>

          {/* Question Preview */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <QuestionPreview question={question} />
            </CardContent>
          </Card>
        </div>

        {/* Question Settings */}
        <div className="w-[30%] bg-gray-50 border-l border-gray-200 p-6">
          <Tabs defaultValue="options" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="options" className="text-xs">
                Options
              </TabsTrigger>
              <TabsTrigger value="logic" className="text-xs">
                Logic
              </TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6 mt-6">
              {question.type === "Opinion Scale" && (
                <>
                  {/* Steps */}
                  <div className="space-y-3">
                    <Label className="text-xs font-medium">Steps: {question.steps}</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#F5C842] rounded-full"></div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        value={question.steps}
                        onChange={(e) => onUpdateQuestion({ ...question, steps: Number.parseInt(e.target.value) })}
                        className="flex-1 h-8 text-xs"
                      />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-gray-600">Left label</Label>
                      <Input
                        value={question.leftLabel}
                        onChange={(e) => onUpdateQuestion({ ...question, leftLabel: e.target.value })}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600">Middle label</Label>
                      <Input
                        value={question.middleLabel}
                        onChange={(e) => onUpdateQuestion({ ...question, middleLabel: e.target.value })}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600">Right label</Label>
                      <Input
                        value={question.rightLabel}
                        onChange={(e) => onUpdateQuestion({ ...question, rightLabel: e.target.value })}
                        className="mt-1 h-8 text-xs"
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Reverse scale</Label>
                      <Switch
                        checked={question.reverseScale}
                        onCheckedChange={(checked) => onUpdateQuestion({ ...question, reverseScale: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Include N/A</Label>
                      <Switch
                        checked={question.includeNA}
                        onCheckedChange={(checked) => onUpdateQuestion({ ...question, includeNA: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Set Default Answer</Label>
                      <Switch
                        checked={question.setDefaultAnswer}
                        onCheckedChange={(checked) => onUpdateQuestion({ ...question, setDefaultAnswer: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Start scale at 1</Label>
                      <Switch
                        checked={question.startScaleAt1}
                        onCheckedChange={(checked) => onUpdateQuestion({ ...question, startScaleAt1: checked })}
                      />
                    </div>
                  </div>
                </>
              )}

              {question.type === "Multiple Choice" && (
                <div className="space-y-4">
                  <Label className="text-xs font-medium">Answer Options</Label>
                  <div className="space-y-2">
                    <Input placeholder="Option 1" className="h-8 text-xs" />
                    <Input placeholder="Option 2" className="h-8 text-xs" />
                    <Input placeholder="Option 3" className="h-8 text-xs" />
                    <Button variant="outline" size="sm" className="w-full bg-transparent h-8 text-xs">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Add Tag */}
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full bg-transparent h-8 text-xs">
                  <Tag className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="logic" className="space-y-4 mt-6">
              <div className="text-center py-8 text-gray-500">
                <p>Logic settings will appear here</p>
                <p className="text-sm">Set up conditional logic and branching</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
