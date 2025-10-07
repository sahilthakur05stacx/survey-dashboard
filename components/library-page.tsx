"use client"

import { useState } from "react"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LibraryPageProps {
  onBack: () => void
  onSelectTemplate: (template: any) => void
}

export function LibraryPage({ onBack, onSelectTemplate }: LibraryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Templates", count: 1 },
    { id: "general", name: "General", count: 1 },
  ]

  const templates = [
    {
      id: 1,
      name: "Basic Website Template",
      category: "general",
      description: "A simple template to get started with website feedback collection",
      image: "/placeholder.svg?height=200&width=300&text=Basic+Template",
      features: ["User Feedback", "Bug Reports", "Feature Requests", "Surveys"],
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Templates</h1>
            <p className="text-lg text-gray-600">Choose a template to get started with your website feedback system</p>
          </div>

          <div className="flex gap-8">
            {/* Category Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Categories</h3>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? "bg-[#F5C842]/10 text-[#F5C842] border border-[#F5C842]/20"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Templates Grid */}
            <div className="flex-1">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700" variant="secondary">
                            {categories.find((cat) => cat.id === template.category)?.name}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                          <div className="mb-4">
                            <p className="text-xs font-medium text-gray-500 mb-2">INCLUDES:</p>
                            <div className="flex flex-wrap gap-1">
                              {template.features.map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button
                            onClick={() => onSelectTemplate(template)}
                            className="w-full bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                          >
                            Use This Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
