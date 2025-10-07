"use client"

import { useState } from "react"
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
import {
  Plus,
  Download,
  Upload,
  Search,
  Star,
  CheckSquare,
  Type,
  Mail,
  Phone,
  ImageIcon,
  ToggleLeft,
  MessageSquare,
  BarChart3,
  Calendar,
  CreditCard,
  List,
  Link,
  Camera,
  Users,
  Hash,
  Grid3X3,
  ArrowUpDown,
  ChevronDown,
  FileCheck,
  Thermometer,
  ThumbsUp,
  Home,
  Divide,
  Tag,
} from "lucide-react"

interface QuestionEditorProps {
  onBack: () => void
}

const questionTypes = {
  frequentlyUsed: [
    { name: "Opinion Scale", icon: BarChart3, description: "1-10 rating scale" },
    { name: "Multiple Choice", icon: CheckSquare, description: "Select one or more options" },
    { name: "Text", icon: Type, description: "Short or long text input" },
    { name: "Email", icon: Mail, description: "Email address input" },
    { name: "Phone Number", icon: Phone, description: "Phone number input" },
    { name: "Rating", icon: Star, description: "Star rating system" },
    { name: "Contact Form", icon: FileCheck, description: "Complete contact information" },
  ],
  otherQuestions: [
    { name: "Picture Choice", icon: ImageIcon, description: "Choose from images" },
    { name: "Yes or No", icon: ToggleLeft, description: "Binary choice question" },
    { name: "Message", icon: MessageSquare, description: "Display text message" },
    { name: "Upload", icon: Upload, description: "File upload field" },
    { name: "Bipolar Matrix", icon: Grid3X3, description: "Matrix with opposing scales" },
    { name: "Slider", icon: Thermometer, description: "Sliding scale input" },
    { name: "Date", icon: Calendar, description: "Date picker" },
    { name: "Payment", icon: CreditCard, description: "Payment processing" },
    { name: "Group Rank", icon: List, description: "Rank items in order" },
    { name: "Constant Sum", icon: Hash, description: "Distribute points" },
    { name: "Website", icon: Link, description: "Website URL input" },
    { name: "Signature", icon: FileCheck, description: "Digital signature" },
    { name: "Photo Capture", icon: Camera, description: "Take photo with camera" },
    { name: "Group Rating", icon: Users, description: "Rate multiple items" },
    { name: "Number", icon: Hash, description: "Numeric input" },
    { name: "Matrix", icon: Grid3X3, description: "Grid of questions" },
    { name: "Rank Order", icon: ArrowUpDown, description: "Drag to reorder" },
    { name: "Dropdown", icon: ChevronDown, description: "Select from dropdown" },
    { name: "Consent/Agreement", icon: FileCheck, description: "Terms agreement" },
    { name: "Heatmap", icon: Thermometer, description: "Click heatmap" },
  ],
  otherElements: [
    { name: "Thank You Page", icon: ThumbsUp, description: "End survey message" },
    { name: "Welcome Page", icon: Home, description: "Survey introduction" },
    { name: "Section", icon: Divide, description: "Organize questions" },
    { name: "Authenticator", icon: FileCheck, description: "User verification", isNew: true },
  ],
}

export function QuestionEditor({ onBack }: QuestionEditorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [questions, setQuestions] = useState<any[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)

  const showQuestionTypes = () => {
    setSelectedQuestion(null)
  }

  const addQuestion = (questionType: any) => {
    const newQuestion = {
      id: Date.now(),
      type: questionType.name,
      title: `New ${questionType.name} Question`,
      description: "",
      required: false,
      steps: 4,
      leftLabel: "Least Likely",
      middleLabel: "Neutral",
      rightLabel: "Most Likely",
      reverseScale: false,
      includeNA: false,
      setDefaultAnswer: false,
      startScaleAt1: false,
    }
    setQuestions([...questions, newQuestion])
    setSelectedQuestion(newQuestion)
  }

  const selectQuestion = (question: any) => {
    setSelectedQuestion(question)
  }

  const updateQuestion = (updatedQuestion: any) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
    setSelectedQuestion(updatedQuestion)
  }

  const changeQuestionType = (newType: string) => {
    if (selectedQuestion) {
      const updatedQuestion = {
        ...selectedQuestion,
        type: newType,
        title:
          selectedQuestion.title === `New ${selectedQuestion.type} Question`
            ? `New ${newType} Question`
            : selectedQuestion.title,
      }
      updateQuestion(updatedQuestion)
    }
  }

  const renderQuestionPreview = (question: any) => {
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
    <div className="flex flex-1 overflow-hidden">
      {/* Left Column - Questions */}
      <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-900 mb-4">QUESTIONS</h2>
          <div className="space-y-3">
            <Button
              onClick={showQuestionTypes}
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
                  onClick={() => selectQuestion(question)}
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
      </div>

      {/* Right Column - Question Types or Question Details */}
      <div className="w-[70%] bg-gray-50 flex flex-col">
        {selectedQuestion ? (
          // Question Details View
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
                      checked={selectedQuestion.required}
                      onCheckedChange={(checked) =>
                        updateQuestion({ ...selectedQuestion, required: checked as boolean })
                      }
                    />
                    <Label htmlFor="required" className="text-xs font-medium">
                      Required
                    </Label>
                  </div>
                  <Button
                    onClick={showQuestionTypes}
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
                  <Select value={selectedQuestion.type} onValueChange={changeQuestionType}>
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
                      value={selectedQuestion.title}
                      onChange={(e) => updateQuestion({ ...selectedQuestion, title: e.target.value })}
                      className="text-sm font-medium border-none shadow-none p-0 focus-visible:ring-0 h-8 text-xs"
                    />
                  </div>
                  <Textarea
                    placeholder="Add description to your question."
                    value={selectedQuestion.description}
                    onChange={(e) => updateQuestion({ ...selectedQuestion, description: e.target.value })}
                    className="border-none shadow-none p-0 resize-none focus-visible:ring-0 text-gray-500 text-sm"
                    rows={2}
                  />
                </div>

                {/* Question Preview */}
                <Card className="border border-gray-200">
                  <CardContent className="p-6">{renderQuestionPreview(selectedQuestion)}</CardContent>
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
                    {selectedQuestion.type === "Opinion Scale" && (
                      <>
                        {/* Steps */}
                        <div className="space-y-3">
                          <Label className="text-xs font-medium">Steps: {selectedQuestion.steps}</Label>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-[#F5C842] rounded-full"></div>
                            <input
                              type="range"
                              min="2"
                              max="10"
                              value={selectedQuestion.steps}
                              onChange={(e) =>
                                updateQuestion({ ...selectedQuestion, steps: Number.parseInt(e.target.value) })
                              }
                              className="flex-1 h-8 text-xs"
                            />
                          </div>
                        </div>

                        {/* Labels */}
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600">Left label</Label>
                            <Input
                              value={selectedQuestion.leftLabel}
                              onChange={(e) => updateQuestion({ ...selectedQuestion, leftLabel: e.target.value })}
                              className="mt-1 h-8 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600">Middle label</Label>
                            <Input
                              value={selectedQuestion.middleLabel}
                              onChange={(e) => updateQuestion({ ...selectedQuestion, middleLabel: e.target.value })}
                              className="mt-1 h-8 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600">Right label</Label>
                            <Input
                              value={selectedQuestion.rightLabel}
                              onChange={(e) => updateQuestion({ ...selectedQuestion, rightLabel: e.target.value })}
                              className="mt-1 h-8 text-xs"
                            />
                          </div>
                        </div>

                        {/* Toggles */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium">Reverse scale</Label>
                            <Switch
                              checked={selectedQuestion.reverseScale}
                              onCheckedChange={(checked) =>
                                updateQuestion({ ...selectedQuestion, reverseScale: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium">Include N/A</Label>
                            <Switch
                              checked={selectedQuestion.includeNA}
                              onCheckedChange={(checked) => updateQuestion({ ...selectedQuestion, includeNA: checked })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium">Set Default Answer</Label>
                            <Switch
                              checked={selectedQuestion.setDefaultAnswer}
                              onCheckedChange={(checked) =>
                                updateQuestion({ ...selectedQuestion, setDefaultAnswer: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium">Start scale at 1</Label>
                            <Switch
                              checked={selectedQuestion.startScaleAt1}
                              onCheckedChange={(checked) =>
                                updateQuestion({ ...selectedQuestion, startScaleAt1: checked })
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {selectedQuestion.type === "Multiple Choice" && (
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
        ) : (
          // Question Types View
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
                          onClick={() => addQuestion(type)}
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
                          onClick={() => addQuestion(type)}
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
                          onClick={() => addQuestion(type)}
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
          </>
        )}
      </div>
    </div>
  )
}
