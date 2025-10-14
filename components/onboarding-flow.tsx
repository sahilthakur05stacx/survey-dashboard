"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Briefcase,
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  step: number;
  key: string;
  type: "SINGLE" | "MULTI";
  title: string;
  options: {
    choices: string[];
    allowOtherText?: boolean;
  };
}

interface Answer {
  questionId: string;
  answer?: string | string[] | null;
  skipped: boolean;
}

interface OnboardingProgress {
  totalSteps: number;
  completed: number;
  isCompleted: boolean;
  completedAt: string | null;
  lastStep: number;
}

interface OnboardingResponse {
  success: boolean;
  data: {
    questions: Question[];
    answers: Answer[];
    progress: OnboardingProgress;
  };
}

export default function OnboardingFlow() {
  const { user, completeOnboarding } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch onboarding data from API
  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth_token");

        const response = await fetch("http://localhost:3000/api/onboarding", {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch onboarding data");
        }

        const data: OnboardingResponse = await response.json();

        if (data.success) {
          setQuestions(data.data.questions);
          setProgress(data.data.progress);

          // Initialize answers map
          const answersMap = new Map<string, Answer>();
          data.data.answers.forEach((answer) => {
            answersMap.set(answer.questionId, answer);
          });
          setAnswers(answersMap);

          // Set current step based on progress
          setCurrentStep(data.data.progress.lastStep || 1);
        }
      } catch (error) {
        console.error("Error fetching onboarding data:", error);
        toast({
          title: "Error",
          description: "Failed to load onboarding questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, [toast]);

  const getCurrentQuestion = (): Question | undefined => {
    return questions.find((q) => q.step === currentStep);
  };

  const getCurrentAnswer = (): Answer | undefined => {
    const question = getCurrentQuestion();
    return question ? answers.get(question.id) : undefined;
  };

  const handleSingleChoice = (questionId: string, choice: string) => {
    const newAnswer: Answer = {
      questionId,
      answer: choice, // Store as string for single choice
      skipped: false,
    };

    setAnswers((prev) => new Map(prev).set(questionId, newAnswer));
  };

  const saveAnswer = async (answer: Answer) => {
    try {
      const token = localStorage.getItem("auth_token");

      // Prepare payload for API
      const payload = {
        questionId: answer.questionId,
        answer: answer.answer,
      };

      console.log("Sending payload:", payload);
      console.log("Token:", token ? "Token exists" : "No token");

      const response = await fetch(
        "http://localhost:3000/api/onboarding/answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error Response:", errorData);
        throw new Error(errorData?.message || "Failed to save answer");
      }

      const result = await response.json();
      console.log("API Success Response:", result);
    } catch (error) {
      console.error("Error saving answer:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save your answer. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to handle in handleNext
    }
  };

  const handleSkip = async () => {
    const question = getCurrentQuestion();
    if (!question) return;

    const newAnswer: Answer = {
      questionId: question.id,
      answer: null,
      skipped: true,
    };

    setAnswers((prev) => new Map(prev).set(question.id, newAnswer));

    try {
      await saveAnswer(newAnswer);

      if (currentStep < (progress?.totalSteps || 4)) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      // Error already handled in saveAnswer
    }
  };

  const handleNext = async () => {
    const question = getCurrentQuestion();
    const answer = getCurrentAnswer();

    if (!answer || answer.skipped || !answer.answer) {
      toast({
        title: "Please select an option",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save answer to API
      await saveAnswer(answer);

      // Move to next step or complete onboarding
      if (currentStep < (progress?.totalSteps || 4)) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding
        completeOnboarding();
      }
    } catch (error) {
      // Error already handled in saveAnswer, don't proceed
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (): boolean => {
    const question = getCurrentQuestion();
    if (!question) return false;

    const answer = getCurrentAnswer();
    if (!answer || answer.skipped) return false;

    // Check if answer exists (string for single choice)
    return typeof answer.answer === "string" && answer.answer.length > 0;
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Briefcase className="w-8 h-8 text-amber-600" />;
      case 2:
        return <Users className="w-8 h-8 text-orange-600" />;
      case 3:
        return <Search className="w-8 h-8 text-yellow-600" />;
      case 4:
        return <CheckCircle className="w-8 h-8 text-amber-600" />;
      default:
        return <Sparkles className="w-8 h-8 text-amber-600" />;
    }
  };

  const getStepColorClasses = (step: number, isSelected: boolean) => {
    const baseClasses =
      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200";

    switch (step) {
      case 1:
        return isSelected
          ? `${baseClasses} bg-amber-400 text-white shadow-md transform scale-105`
          : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm`;
      case 2:
        return isSelected
          ? `${baseClasses} bg-orange-400 text-white shadow-md transform scale-105`
          : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700 hover:shadow-sm`;
      case 3:
        return isSelected
          ? `${baseClasses} bg-yellow-400 text-white shadow-md transform scale-105`
          : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 hover:shadow-sm`;
      case 4:
        return isSelected
          ? `${baseClasses} bg-amber-400 text-white shadow-md transform scale-105`
          : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm`;
      default:
        return isSelected
          ? `${baseClasses} bg-amber-400 text-white shadow-md transform scale-105`
          : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700 hover:shadow-sm`;
    }
  };

  const getStepIconBgClass = (step: number) => {
    switch (step) {
      case 1:
        return "w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4";
      case 2:
        return "w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4";
      case 3:
        return "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4";
      case 4:
        return "w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4";
      default:
        return "w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your onboarding...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const currentAnswer = getCurrentAnswer();
  const totalSteps = progress?.totalSteps || 4;

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Let's personalize your experience in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
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
            {currentQuestion ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className={getStepIconBgClass(currentStep)}>
                    {getStepIcon(currentStep)}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentQuestion.title}
                  </h2>
                  <p className="text-gray-600">Choose one option</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {currentQuestion.options.choices.map((choice) => {
                    const isSelected = currentAnswer?.answer === choice;

                    return (
                      <button
                        key={choice}
                        onClick={() => {
                          handleSingleChoice(currentQuestion.id, choice);
                        }}
                        className={getStepColorClasses(currentStep, isSelected)}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No question available for this step.
                </p>
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

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md disabled:opacity-50"
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
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            onClick={completeOnboarding}
            className="text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
