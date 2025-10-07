"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit2,
  Trash2,
  Check,
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
  FileText,
  Files,
} from "lucide-react"

interface CategoryManagementModalProps {
  open: boolean
  onClose: () => void
  categories: any[]
  onUpdateCategory: (categoryId: string, updates: any) => void
  onDeleteCategory: (categoryId: string) => void
  onAddCategory: (category: any) => void
  surveys: any[]
}

export function CategoryManagementModal({
  open,
  onClose,
  categories,
  onUpdateCategory,
  onDeleteCategory,
  onAddCategory,
  surveys,
}: CategoryManagementModalProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editIcon, setEditIcon] = useState<any>(null)
  const [editColor, setEditColor] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryIcon, setNewCategoryIcon] = useState(List)
  const [newCategoryColor, setNewCategoryColor] = useState("#F5C842")

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

  const startEditing = (category: any) => {
    setEditingCategory(category.id)
    setEditName(category.name)
    setEditIcon(category.icon)
    setEditColor(category.color)
  }

  const saveEdit = () => {
    if (editingCategory && editName.trim()) {
      onUpdateCategory(editingCategory, {
        name: editName.trim(),
        icon: editIcon,
        color: editColor,
      })
      setEditingCategory(null)
      setEditName("")
      setEditIcon(null)
      setEditColor("")
    }
  }

  const cancelEdit = () => {
    setEditingCategory(null)
    setEditName("")
    setEditIcon(null)
    setEditColor("")
  }

  const handleDelete = (categoryId: string) => {
    const categoryHasSurveys = surveys.some((survey) => survey.category === categoryId)
    if (!categoryHasSurveys) {
      onDeleteCategory(categoryId)
    }
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        icon: newCategoryIcon,
        color: getColorClass(newCategoryColor),
      }
      onAddCategory(newCategory)
      setShowAddForm(false)
      setNewCategoryName("")
      setNewCategoryIcon(List)
      setNewCategoryColor("#F5C842")
    }
  }

  const getColorClass = (hexColor: string) => {
    const colorMap = {
      "#F5C842": "text-yellow-600",
      "#3B82F6": "text-blue-600",
      "#10B981": "text-green-600",
      "#F59E0B": "text-orange-600",
      "#EF4444": "text-red-600",
      "#8B5CF6": "text-purple-600",
      "#06B6D4": "text-cyan-600",
      "#F97316": "text-orange-600",
      "#EC4899": "text-pink-600",
      "#6B7280": "text-gray-600",
    }
    return colorMap[hexColor] || "text-gray-600"
  }

  const getHexFromColorClass = (colorClass: string) => {
    const colorMap = {
      "text-yellow-600": "#F5C842",
      "text-blue-600": "#3B82F6",
      "text-green-600": "#10B981",
      "text-orange-600": "#F59E0B",
      "text-red-600": "#EF4444",
      "text-purple-600": "#8B5CF6",
      "text-cyan-600": "#06B6D4",
      "text-pink-600": "#EC4899",
      "text-gray-600": "#6B7280",
    }
    return colorMap[colorClass] || "#F5C842"
  }

  // Filter out "all" category as it shouldn't be editable
  const editableCategories = categories.filter((cat) => cat.id !== "all")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">Manage Categories</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">Organize your surveys by creating and managing categories</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Add New Category */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>

              {showAddForm && (
                <Card className="border-2 border-dashed border-[#F5C842]">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Category Name</Label>
                        <Input
                          placeholder="Enter category name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Choose Icon</Label>
                        <div className="grid grid-cols-6 gap-2 mt-2">
                          {availableIcons.map(({ icon: IconComponent, name }) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => setNewCategoryIcon(IconComponent)}
                              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-105 ${
                                newCategoryIcon === IconComponent
                                  ? "border-[#F5C842] bg-[#F5C842]/10"
                                  : "border-gray-300 hover:border-gray-400 bg-white"
                              }`}
                            >
                              <IconComponent className="w-5 h-5 text-gray-700" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Choose Color</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setNewCategoryColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                newCategoryColor === color ? "border-gray-900 scale-110" : "border-gray-300"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button
                          onClick={handleAddCategory}
                          size="sm"
                          className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Add Category
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowAddForm(false)
                            setNewCategoryName("")
                            setNewCategoryIcon(List)
                            setNewCategoryColor("#F5C842")
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Existing Categories */}
            <div className="grid gap-4">
              {editableCategories.map((category) => {
                const categoryCount = surveys.filter((survey) => survey.category === category.id).length
                const isEditing = editingCategory === category.id

                return (
                  <Card key={category.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Category Name</Label>
                            <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-2" />
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Choose Icon</Label>
                            <div className="grid grid-cols-6 gap-2 mt-2">
                              {availableIcons.map(({ icon: IconComponent, name }) => (
                                <button
                                  key={name}
                                  type="button"
                                  onClick={() => setEditIcon(IconComponent)}
                                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-105 ${
                                    editIcon === IconComponent
                                      ? "border-[#F5C842] bg-[#F5C842]/10"
                                      : "border-gray-300 hover:border-gray-400 bg-white"
                                  }`}
                                >
                                  <IconComponent className="w-5 h-5 text-gray-700" />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">Choose Color</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {colors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setEditColor(getColorClass(color))}
                                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                    editColor === getColorClass(color) ? "border-gray-900 scale-110" : "border-gray-300"
                                  }`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              onClick={saveEdit}
                              size="sm"
                              className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm" onClick={cancelEdit}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              <category.icon className={`h-6 w-6 ${category.color}`} />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {categoryCount} survey{categoryCount !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="ml-4">
                              {categoryCount}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(category)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(category.id)}
                              disabled={categoryCount > 0}
                              className={`h-8 w-8 p-0 ${
                                categoryCount > 0
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-700 hover:bg-red-50"
                              }`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {editableCategories.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Building2 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                <p className="text-gray-500 mb-4">Create your first category to organize your surveys.</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
