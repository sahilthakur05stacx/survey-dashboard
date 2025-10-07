"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft, Users, Briefcase, Search, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface OnboardingData {
  position: string
  customPosition: string
  companySize: string
  howDidYouHear: string
  goals: string[]
  expectations: string
}

export default function OnboardingFlow() {
  const { user, completeOnboarding } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    position: "",
    customPosition: "",
    companySize: "",
    howDidYouHear: "",
    goals: [],
    expectations: "",
  })

  const totalSteps = 4

  const positions = [
    "CEO/Founder",
    "Product Manager",
    "Marketing Manager",
    "UX/UI Designer",
    "Developer",
    "Customer Success",
    "Sales Manager",
    "Operations",
    "Other",
  ]

  const companySizes = [
    "Just me (1)",
    "Small team (2-10)",
    "Growing company (11-50)",
    "Medium company (51-200)",
    "Large company (201-1000)",
    "Enterprise (1000+)",
  ]

  const hearAboutUs = [
    "Google Search",
    "Social Media",
    "Friend/Colleague",
    "Blog/Article",
    "Product Hunt",
    "Conference/Event",
    "Advertisement",
    "Other",
  ]

  const goalOptions = [
    "Collect customer feedback",
    "Improve user experience",
    "Increase customer satisfaction",
    "Reduce support tickets",
    "Gather product insights",
    "Monitor brand sentiment",
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGoalToggle = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.position !== "" && (data.position !== "Other" || data.customPosition !== "")
      case 2:
        return data.companySize !== ""
      case 3:
        return data.howDidYouHear !== ""
      case 4:
        return data.goals.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251,191,36,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251,191,36,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              SurveyPro
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user?.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-600 text-lg">Let's personalize your experience in just a few steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/80 border-amber-200 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            {/* Step 1: Position */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your role?</h2>
                  <p className="text-gray-600">Help us understand how you'll be using SurveyPro</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {positions.map((position) => (
                    <button
                      key={position}
                      onClick={() => setData((prev) => ({ ...prev, position }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        data.position === position
                          ? "bg-amber-400 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm"
                      }`}
                    >
                      {position}
                    </button>
                  ))}
                </div>

                {data.position === "Other" && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="custom-position" className="text-gray-700">
                      Please specify your role
                    </Label>
                    <Input
                      id="custom-position"
                      placeholder="Enter your role"
                      className="bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      value={data.customPosition}
                      onChange={(e) => setData((prev) => ({ ...prev, customPosition: e.target.value }))}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Company Size */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">How big is your team?</h2>
                  <p className="text-gray-600">This helps us recommend the right features for you</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {companySizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setData((prev) => ({ ...prev, companySize: size }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        data.companySize === size
                          ? "bg-orange-400 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700 hover:shadow-sm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: How did you hear about us */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">How did you find us?</h2>
                  <p className="text-gray-600">We'd love to know how you discovered SurveyPro</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {hearAboutUs.map((source) => (
                    <button
                      key={source}
                      onClick={() => setData((prev) => ({ ...prev, howDidYouHear: source }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        data.howDidYouHear === source
                          ? "bg-yellow-400 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 hover:shadow-sm"
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Goals */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What are your main goals?</h2>
                  <p className="text-gray-600">Select all that apply - we'll customize your dashboard accordingly</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        data.goals.includes(goal)
                          ? "bg-amber-400 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 mt-6">
                  <Label htmlFor="expectations" className="text-gray-700">
                    Anything specific you'd like to achieve? (Optional)
                  </Label>
                  <Textarea
                    id="expectations"
                    placeholder="Tell us about your specific needs or expectations..."
                    className="bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400 min-h-[100px]"
                    value={data.expectations}
                    onChange={(e) => setData((prev) => ({ ...prev, expectations: e.target.value }))}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-amber-200">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="text-gray-500 hover:text-gray-700 hover:bg-amber-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i + 1 <= currentStep ? "bg-amber-400" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
              >
                {currentStep === totalSteps ? (
                  <>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button variant="link" onClick={completeOnboarding} className="text-gray-500 hover:text-gray-700">
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  )
}
