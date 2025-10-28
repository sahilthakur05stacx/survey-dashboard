"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { WebsiteSetupModal } from "./website-setup-modal";
import { LoadingAnimation } from "./loading-animation";
import { EmailTemplateModal } from "./email-template-modal";
import { BuildTab } from "./survey-editor/build-tab";
import { ModulesOverview } from "./website-editor/modules-overview";
import { FeedbackModuleEditor } from "./website-editor/feedback-module-editor";
import { BugReportModuleEditor } from "./website-editor/bug-report-module-editor";
import { FeatureRequestModuleEditor } from "./website-editor/feature-request-module-editor";
import { WebsiteShareTab } from "./website-editor/website-share-tab";
import { WebsiteResultsTab } from "./website-editor/website-results-tab";

interface SurveyEditorProps {
  onBack: () => void;
  existingWebsite?: any;
  template?: any;
  defaultTab?: string;
  onWebsiteCreated?: () => void;
}

export function SurveyEditor({
  onBack,
  existingWebsite,
  template,
  defaultTab = "build",
  onWebsiteCreated,
}: SurveyEditorProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [currentView, setCurrentView] = useState("modules"); // modules, survey, feedback, bug-report, feature-request
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showSetupModal, setShowSetupModal] = useState(true);
  const [websiteInfo, setWebsiteInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailTemplateModal, setShowEmailTemplateModal] = useState(false);

  // Mock enabled modules state
  const [enabledModules, setEnabledModules] = useState({
    feedback: true,
    survey: false,
    "bug-report": false,
    "feature-request": false,
  });

  useEffect(() => {
    // If we have an existing website, skip loading and setup modal
    if (existingWebsite) {
      setIsLoading(false);
      setShowSetupModal(false);
      setWebsiteInfo(existingWebsite);
      // Set the active tab based on defaultTab prop
      if (defaultTab) {
        setActiveTab(defaultTab);
      }
      return;
    }

    // Show loading for 2-3 seconds before showing the modal for new websites
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [existingWebsite, defaultTab]);

  const handleWebsiteSetup = (websiteData: any) => {
    console.log("🔧 Website setup completed:", websiteData);

    if (websiteData) {
      console.log("✅ Website data received, updating state...");
      setWebsiteInfo(websiteData);
      setShowSetupModal(false);
      console.log("📝 Website info set:", websiteData);

      // Set active tab to "build" to show the modules overview
      setActiveTab("build");
      setCurrentView("modules");

      console.log("✅ Redirected to Website Modules page");

      // Call the callback to refresh the website list in the parent component
      if (onWebsiteCreated) {
        console.log("🔄 Calling onWebsiteCreated callback...");
        onWebsiteCreated();
      } else {
        console.log("⚠️ No onWebsiteCreated callback provided");
      }
    } else {
      console.log("❌ No website data, user cancelled");
      // User cancelled, go back to dashboard
      onBack();
    }
  };

  const handleEditModule = (moduleId: string) => {
    setCurrentView(moduleId);
  };

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
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };

  const selectQuestion = (question: any) => {
    setSelectedQuestion(question);
  };

  const updateQuestion = (updatedQuestion: any) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setSelectedQuestion(updatedQuestion);
  };

  const showQuestionTypes = () => {
    setSelectedQuestion(null);
  };

  // Render the full editor component
  const renderEditor = () => (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={
                  currentView === "modules"
                    ? onBack
                    : () => setCurrentView("modules")
                }
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Website Editor</span>
                <span className="text-xs text-gray-400">/</span>
                <span className="text-xs font-medium">
                  {websiteInfo?.name || "New Website"}
                </span>
                {currentView !== "modules" && (
                  <>
                    <span className="text-xs text-gray-400">/</span>
                    <span className="text-xs text-gray-500 capitalize">
                      {currentView.replace("-", " ")}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Show tabs only for website-level views (modules, share, results) */}
            {(currentView === "modules" ||
              activeTab === "share" ||
              activeTab === "results") && (
              <div className="flex items-center space-x-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => {
                      setActiveTab("build");
                      setCurrentView("modules");
                    }}
                    className={`text-xs font-medium pb-1 border-b-2 transition-colors ${
                      currentView === "modules" && activeTab === "build"
                        ? "text-[#F5C842] border-[#F5C842]"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Build
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("share");
                      setCurrentView("modules");
                    }}
                    className={`text-xs font-medium pb-1 border-b-2 transition-colors ${
                      activeTab === "share"
                        ? "text-[#F5C842] border-[#F5C842]"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Share
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("results");
                      setCurrentView("modules");
                    }}
                    className={`text-xs font-medium pb-1 border-b-2 transition-colors ${
                      activeTab === "results"
                        ? "text-[#F5C842] border-[#F5C842]"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    Results
                  </button>
                </nav>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 h-8 px-3 text-xs"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            )}

            {/* Show save/publish for individual module editors */}
            {currentView !== "modules" &&
              activeTab !== "share" &&
              activeTab !== "results" && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90 h-8 px-3 text-xs"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Publish
                  </Button>
                </div>
              )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* Website-level views */}
      {currentView === "modules" && activeTab === "build" && (
        <ModulesOverview
          onEditModule={handleEditModule}
          enabledModules={enabledModules}
          setEnabledModules={setEnabledModules}
          websiteId={websiteInfo?.id}
        />
      )}
      {activeTab === "share" && (
        <WebsiteShareTab
          websiteInfo={websiteInfo}
          enabledModules={enabledModules}
        />
      )}
      {activeTab === "results" && (
        <WebsiteResultsTab
          websiteInfo={websiteInfo}
          enabledModules={enabledModules}
        />
      )}

      {/* Individual module editors */}
      {currentView === "survey" && (
        <BuildTab
          questions={questions}
          selectedQuestion={selectedQuestion}
          onAddQuestion={addQuestion}
          onSelectQuestion={selectQuestion}
          onUpdateQuestion={updateQuestion}
          onShowQuestionTypes={showQuestionTypes}
        />
      )}
      {currentView === "feedback" && (
        <FeedbackModuleEditor onBack={() => setCurrentView("modules")} />
      )}
      {currentView === "bug-report" && (
        <BugReportModuleEditor onBack={() => setCurrentView("modules")} />
      )}
      {currentView === "feature-request" && (
        <FeatureRequestModuleEditor onBack={() => setCurrentView("modules")} />
      )}
    </div>
  );

  // Show loading animation first
  if (isLoading) {
    return (
      <>
        {/* Render the editor in background with reduced opacity */}
        <div className="opacity-50 pointer-events-none">{renderEditor()}</div>
        {/* Loading animation overlay */}
        <LoadingAnimation />
      </>
    );
  }

  // Show setup modal after loading, then render editor (only for new websites)
  if (showSetupModal && !existingWebsite) {
    return (
      <>
        {/* Render the editor in background with reduced opacity */}
        <div className="opacity-60 pointer-events-none">{renderEditor()}</div>
        {/* Modal overlay */}
        <WebsiteSetupModal
          open={showSetupModal}
          onClose={handleWebsiteSetup}
          template={template}
        />
      </>
    );
  }

  // Normal editor view
  return (
    <>
      {renderEditor()}
      {/* Email Template Modal */}
      <EmailTemplateModal
        open={showEmailTemplateModal}
        onClose={() => setShowEmailTemplateModal(false)}
        surveyInfo={websiteInfo}
      />
    </>
  );
}
