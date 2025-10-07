"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Plus,
  X,
  FileText,
  Files,
  List,
  Building2,
  DollarSign,
  UserCheck,
  Users,
  Heart,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Zap,
} from "lucide-react"

interface SurveySetupModalProps {
  open: boolean
  onClose: (surveyData?: any) => void
  existingCategories?: any[]
  onNewCategory?: (category: any) => void
}

export function SurveySetupModal({ open, onClose, existingCategories = [], onNewCategory }: SurveySetupModalProps) {
  const [surveyName, setSurveyName] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [surveyType, setSurveyType] = useState("single") // single or multi
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryColor, setNewCategoryColor] = useState("#F5C842")
  const [newCategoryIcon, setNewCategoryIcon] = useState(List)

  const colors = [
    "#F5C842", // Yellow
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Orange
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#06B6D4", // Cyan
    "#F97316", // Orange
    "#EC4899", // Pink
    "#6B7280", // Gray
  ]

  const availableIcons = [
    { icon: List, name: "List" },
    { icon: Building2, name: "Building" },
    { icon: DollarSign, name: "Dollar" },
    { icon: UserCheck, name: "User Check" },
    { icon: Users, name: "Users" },
    { icon: Heart, name: "Heart" },
    { icon: Briefcase, name: "Briefcase" },
    { icon: GraduationCap, name: "Education" },
    { icon: ShoppingCart, name: "Shopping" },
    { icon: Zap, name: "Technology" },
    { icon: FileText, name: "Document" },
    { icon: Files, name: "Files" },
  ]

  // Pick the currently-selected icon so React sees a capitalized component
  const SelectedIcon = newCategoryIcon

  const handleSubmit = () => {
    if (!surveyName.trim()) return

    let categoryId = selectedCategory

    // If creating a new category
    if (showNewCategoryInput && newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        color: newCategoryColor,
        icon: newCategoryIcon,
        count: 1,
      }
      onNewCategory?.(newCategory)
      categoryId = newCategory.id
    }

    const surveyData = {
      name: surveyName.trim(),
      description: surveyDescription.trim(),
      category: categoryId,
      type: surveyType,
      createdAt: new Date().toISOString(),
    }

    onClose(surveyData)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-white">
          <DialogTitle className="text-xl font-semibold text-gray-900">Create New Survey</DialogTitle>
        </DialogHeader>

        <div
          className="flex-1 overflow-y-scroll px-6 py-6"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#F5C842 #f1f5f9" }}
        >
          <div className="space-y-8">
            {/* Survey Name */}
            <div className="space-y-3">
              <Label htmlFor="survey-name" className="text-sm font-semibold text-gray-900">
                Survey Name *
              </Label>
              <Input
                id="survey-name"
                placeholder="Enter survey name"
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
                className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
              />
            </div>

            {/* Survey Description */}
            <div className="space-y-3">
              <Label htmlFor="survey-description" className="text-sm font-semibold text-gray-900">
                Description
              </Label>
              <Textarea
                id="survey-description"
                placeholder="Brief description of your survey (optional)"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                rows={3}
                className="w-full resize-none text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
              />
            </div>

            {/* Survey Type */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-900">Survey Type</Label>
              <RadioGroup value={surveyType} onValueChange={setSurveyType} className="space-y-3">
                <div
                  className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-sm ${
                    surveyType === "single"
                      ? "border-[#F5C842] bg-[#F5C842]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="single" id="single" className="text-[#F5C842]" />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Label htmlFor="single" className="text-base font-semibold cursor-pointer text-gray-900">
                        Single Page Survey
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">All questions displayed on one page</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-sm ${
                    surveyType === "multi"
                      ? "border-[#F5C842] bg-[#F5C842]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem value="multi" id="multi" className="text-[#F5C842]" />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-3 bg-green-50 rounded-xl">
                      <Files className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <Label htmlFor="multi" className="text-base font-semibold cursor-pointer text-gray-900">
                        Multi-Page Survey
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">One question per page for better focus</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-900">Category</Label>
              {!showNewCategoryInput ? (
                <div className="space-y-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full h-11 text-sm border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingCategories
                        .filter((cat) => cat.id !== "all")
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center space-x-3">
                              <category.icon className="w-4 h-4" style={{ color: category.color }} />
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                              <span className="font-medium">{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewCategoryInput(true)}
                    className="w-full h-11 text-sm border-2 border-dashed border-[#F5C842] text-[#F5C842] hover:bg-[#F5C842]/10 bg-transparent font-medium"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Category
                  </Button>
                </div>
              ) : (
                <div className="space-y-5 p-5 border-2 border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-900">New Category</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowNewCategoryInput(false)
                        setNewCategoryName("")
                        setNewCategoryColor("#F5C842")
                        setNewCategoryIcon(List)
                      }}
                      className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Category Name</Label>
                      <Input
                        placeholder="Enter category name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="mt-2 h-10 border-gray-300 focus:border-[#F5C842] focus:ring-[#F5C842]"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Choose Color</Label>
                      <div className="flex flex-wrap gap-3 mt-3">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setNewCategoryColor(color)}
                            className={`w-10 h-10 rounded-full border-3 transition-all hover:scale-110 shadow-sm ${
                              newCategoryColor === color ? "border-gray-900 shadow-lg scale-110" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Choose Icon</Label>
                      <div className="grid grid-cols-6 gap-3 mt-3">
                        {availableIcons.map(({ icon: IconComponent, name }) => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => setNewCategoryIcon(IconComponent)}
                            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-105 shadow-sm ${
                              newCategoryIcon === IconComponent
                                ? "border-[#F5C842] bg-[#F5C842]/10 shadow-md scale-105"
                                : "border-gray-300 hover:border-gray-400 bg-white"
                            }`}
                            title={name}
                          >
                            <IconComponent className="w-5 h-5 text-gray-700" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {newCategoryName && (
                      <div className="flex items-center space-x-3 pt-3 border-t border-gray-300">
                        <SelectedIcon className="w-5 h-5" style={{ color: newCategoryColor }} />
                        <div
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: newCategoryColor }}
                        ></div>
                        <span className="text-sm text-gray-900 font-semibold">Preview: {newCategoryName}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" onClick={handleCancel} className="px-6 h-11 font-medium bg-white">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!surveyName.trim()}
            className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 px-6 h-11 font-semibold shadow-sm"
          >
            Create Survey
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
