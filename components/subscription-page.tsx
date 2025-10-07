"use client"

import { useState } from "react"
import { ArrowLeft, Crown, Check, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SubscriptionPageProps {
  onBack: () => void
}

export function SubscriptionPage({ onBack }: SubscriptionPageProps) {
  const [currentPlan] = useState("free")

  const currentUsage = {
    surveysCreated: 1,
    maxSurveys: 5,
    monthlyResponses: 0,
    maxResponses: 10000,
  }

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      period: "forever",
      description: "Perfect for getting started with surveys",
      features: [
        "Up to 5 surveys",
        "10,000 responses per month",
        "Basic analytics",
        "Email support",
        "Standard templates",
      ],
      current: true,
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: 19,
      period: "monthly",
      description: "Everything you need for professional surveys",
      features: [
        "Unlimited surveys",
        "Unlimited responses",
        "Advanced analytics",
        "Priority support",
        "Custom themes",
        "Export capabilities",
        "Team collaboration",
      ],
      popular: true,
    },
  ]

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
        </div>
      </header>

      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🔥</span>
              <h1 className="text-3xl font-bold text-gray-900">NEW Subscription Plans</h1>
            </div>
            <p className="text-lg text-gray-600 mb-6">Choose the plan that best fits your survey needs</p>
            <Badge className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
              <Crown className="h-4 w-4 mr-1" />
              Current Plan: Free Plan
            </Badge>
          </div>

          {/* Current Usage */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📊</span>
                <span>Current Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Surveys Created</span>
                    <span className="text-sm font-bold text-gray-900">
                      {currentUsage.surveysCreated} / {currentUsage.maxSurveys}
                    </span>
                  </div>
                  <Progress value={(currentUsage.surveysCreated / currentUsage.maxSurveys) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Monthly Responses</span>
                    <span className="text-sm font-bold text-gray-900">
                      {currentUsage.monthlyResponses} / {currentUsage.maxResponses.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(currentUsage.monthlyResponses / currentUsage.maxResponses) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <div className="text-center mb-6">
            <p className="text-gray-600">Available Plans: {plans.length}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.current
                    ? "border-[#F5C842] border-2"
                    : plan.popular
                      ? "border-blue-500 border-2"
                      : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">⭐ Popular Choice</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#F5C842] text-black">Current Plan</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {plan.id === "free" ? (
                      <Crown className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Zap className="h-5 w-5 text-blue-600" />
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.current
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : plan.popular
                          ? "bg-[#F5C842] text-black hover:bg-[#F5C842]/90"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>All plans include SSL security, 99.9% uptime, and GDPR compliance.</p>
            <p className="mt-2">
              Need a custom plan?{" "}
              <a href="#" className="text-[#F5C842] hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
