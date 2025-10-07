"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Play, Clock, CheckCircle, Sparkles } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function ResultsTab() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [shareFilter, setShareFilter] = useState("all-shares")

  // Mock data for the chart
  const chartData = [
    { date: "Jan-08", responses: 2.25 },
    { date: "Jan-27", responses: 2 },
    { date: "Jul-28", responses: 0.75 },
    { date: "Jan-29", responses: 3 },
    { date: "Jan-30", responses: 2 },
    { date: "Feb-01", responses: 0.75 },
    { date: "Feb-06", responses: 2 },
  ]

  // Mock data for device analytics
  const deviceData = [
    { name: "Desktop", value: 8, color: "#3b82f6" },
    { name: "Mobile", value: 4, color: "#06b6d4" },
    { name: "Tablet", value: 2, color: "#8b5cf6" },
  ]

  // Mock data for share type analytics
  const shareTypeData = [
    { name: "Direct Link", value: 6, color: "#10b981" },
    { name: "Email", value: 5, color: "#f59e0b" },
    { name: "Embed", value: 3, color: "#ef4444" },
  ]

  const maxResponses = Math.max(...chartData.map((d) => d.responses))

  const insights = [
    {
      icon: Eye,
      label: "Visited",
      value: "14",
      color: "text-gray-600",
    },
    {
      icon: Play,
      label: "Started",
      value: "13",
      color: "text-gray-600",
    },
    {
      icon: Clock,
      label: "Avg Time to Complete",
      value: "26",
      unit: "seconds",
      color: "text-gray-600",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "13",
      color: "text-gray-600",
    },
  ]

  const completionRate = 100 // 13/13 * 100

  const renderChart = () => {
    return (
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">cls text</h3>
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue placeholder="Data from All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-time">Data from All Time</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <div className="relative h-80 mb-8">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
            <span>3</span>
            <span>2.25</span>
            <span>1.5</span>
            <span>0.75</span>
            <span>0</span>
          </div>

          {/* Y-axis title */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium">
            TOTAL RESPONSES
          </div>

          {/* Chart area */}
          <div className="ml-16 h-full flex items-end justify-between space-x-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-blue-500 rounded-t-sm w-full min-w-[20px] transition-all hover:bg-blue-600"
                  style={{
                    height: `${(item.responses / maxResponses) * 100}%`,
                    minHeight: item.responses > 0 ? "8px" : "0px",
                  }}
                />
                <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-xs text-gray-600 font-medium">NO OF RESPONSES</span>
        </div>
      </div>
    )
  }

  const renderInsights = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Insights</h3>
          <div className="flex items-center space-x-4">
            <Select value={shareFilter} onValueChange={setShareFilter}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-shares">All Shares</SelectItem>
                <SelectItem value="email-shares">Email Shares</SelectItem>
                <SelectItem value="direct-shares">Direct Shares</SelectItem>
                <SelectItem value="embed-shares">Embed Shares</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center w-32 h-32 relative">
              {/* Completion Rate Circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(completionRate / 100) * 314} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{completionRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  <span className="text-sm text-gray-600">{insight.label}</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900">{insight.value}</span>
                  {insight.unit && <span className="text-sm text-gray-600">{insight.unit}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion Rate Label */}
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Completion Rate</p>
          </div>
        </div>
      </div>
    )
  }

  const renderPieCharts = () => {
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
            <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          </div>
        )
      }
      return null
    }

    return (
      <div className="grid grid-cols-2 gap-8">
        {/* By Device Chart */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">By Device</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* By Share Type Chart */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">By Share Type</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shareTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {shareTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {shareTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderReports = () => {
    // Mock question data
    const questionReports = [
      {
        id: 1,
        type: "Opinion Scale",
        title: "How likely are you to recommend our service?",
        answered: 13,
        skipped: 0,
        average: 8.2,
        responses: [
          { choice: "0", count: 0, percentage: 0 },
          { choice: "1", count: 0, percentage: 0 },
          { choice: "2", count: 3, percentage: 23.08 },
          { choice: "3", count: 1, percentage: 7.69 },
          { choice: "4", count: 0, percentage: 0 },
          { choice: "5", count: 1, percentage: 7.69 },
          { choice: "6", count: 1, percentage: 7.69 },
          { choice: "7", count: 1, percentage: 7.69 },
          { choice: "8", count: 4, percentage: 30.77 },
          { choice: "9", count: 1, percentage: 7.69 },
          { choice: "10", count: 1, percentage: 7.69 },
        ],
      },
      {
        id: 2,
        type: "Multiple Choice",
        title: "What is your primary reason for using our service?",
        answered: 13,
        skipped: 0,
        responses: [
          { choice: "Quality of service", count: 6, percentage: 46.15 },
          { choice: "Competitive pricing", count: 4, percentage: 30.77 },
          { choice: "Customer support", count: 2, percentage: 15.38 },
          { choice: "Brand reputation", count: 1, percentage: 7.69 },
        ],
      },
      {
        id: 3,
        type: "Text",
        title: "What improvements would you suggest?",
        answered: 10,
        skipped: 3,
        responses: [
          { text: "Better mobile app interface", count: 1 },
          { text: "Faster response times", count: 1 },
          { text: "More payment options", count: 1 },
          { text: "24/7 customer support", count: 1 },
          { text: "Lower pricing", count: 1 },
          { text: "More features", count: 1 },
          { text: "Better documentation", count: 1 },
          { text: "Improved user experience", count: 1 },
          { text: "More integrations", count: 1 },
          { text: "Better onboarding", count: 1 },
        ],
      },
    ]

    const renderOverviewCard = () => (
      <Card className="border border-gray-200 mb-8">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Summary</h2>
              <p className="text-gray-600 max-w-2xl">
                Explore the data behind your survey responses. Gain a better perspective of your survey data and uncover
                insights for further planning.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>📊</span>
              <span>📈</span>
              <span>📋</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Visited</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">14</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Play className="h-4 w-4" />
                <span className="text-sm">Started</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">13</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Avg. Time to Complete</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                26<span className="text-lg text-gray-600">s</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Completed</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">13</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Completion Rate</span>
              </div>
              <p className="text-4xl font-bold text-gray-900">
                100.00<span className="text-lg text-gray-600">%</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <span>Page 1/3</span>
          </div>
        </CardContent>
      </Card>
    )

    const renderQuestionCard = (question: any, index: number) => {
      if (question.type === "Opinion Scale") {
        const maxCount = Math.max(...question.responses.map((r) => r.count))

        return (
          <Card key={question.id} className="border border-gray-200 mb-6">
            <div className="bg-cyan-400 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  QUESTION {String(index + 1).padStart(2, "0")} | {question.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">OPQ</h3>
              <div className="flex items-center space-x-6 text-sm">
                <span>
                  Answered: <strong>{question.answered}</strong>
                </span>
                <span>
                  Skipped: <strong>{question.skipped}</strong>
                </span>
                <span>
                  Average: <strong>{question.average}</strong>
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Bar Chart */}
              <div className="mb-8">
                <div className="relative h-64">
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                    <span>50</span>
                    <span>30</span>
                    <span>15</span>
                    <span>0</span>
                  </div>

                  <div className="ml-8 h-full flex items-end justify-between space-x-1">
                    {question.responses.map((response, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1">
                        <div className="relative">
                          {response.count > 0 && (
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                              {response.percentage}%
                            </div>
                          )}
                          <div
                            className="w-full min-w-[20px] rounded-t-sm transition-all"
                            style={{
                              height: response.count > 0 ? `${(response.count / maxCount) * 200}px` : "0px",
                              backgroundColor:
                                idx === 0 || idx === 7
                                  ? "#8B5CF6"
                                  : idx === 1
                                    ? "#F59E0B"
                                    : idx === 2
                                      ? "#10B981"
                                      : idx === 3
                                        ? "#EF4444"
                                        : idx === 4
                                          ? "#06B6D4"
                                          : idx === 5
                                            ? "#8B5CF6"
                                            : idx === 6
                                              ? "#F59E0B"
                                              : idx === 8
                                                ? "#EF4444"
                                                : "#8B5CF6",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{response.choice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Answer Choices
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Responses
                      </th>
                      <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Response Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {question.responses
                      .filter((r) => r.count > 0)
                      .map((response, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-900">{response.choice}</td>
                          <td className="py-3 text-sm text-gray-900">{response.count}</td>
                          <td className="py-3 text-sm text-gray-900">{response.percentage}%</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )
      }

      if (question.type === "Multiple Choice") {
        const maxCount = Math.max(...question.responses.map((r) => r.count))

        return (
          <Card key={question.id} className="border border-gray-200 mb-6">
            <div className="bg-blue-500 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  QUESTION {String(index + 1).padStart(2, "0")} | {question.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{question.title}</h3>
              <div className="flex items-center space-x-6 text-sm">
                <span>
                  Answered: <strong>{question.answered}</strong>
                </span>
                <span>
                  Skipped: <strong>{question.skipped}</strong>
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                {question.responses.map((response, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                      <span className="text-sm text-gray-900">{response.choice}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(response.count / maxCount) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">{response.percentage}%</span>
                      <span className="text-sm text-gray-600 w-8 text-right">({response.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      }

      if (question.type === "Text") {
        return (
          <Card key={question.id} className="border border-gray-200 mb-6">
            <div className="bg-green-500 text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  QUESTION {String(index + 1).padStart(2, "0")} | {question.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">{question.title}</h3>
              <div className="flex items-center space-x-6 text-sm">
                <span>
                  Answered: <strong>{question.answered}</strong>
                </span>
                <span>
                  Skipped: <strong>{question.skipped}</strong>
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Sample Responses:</h4>
                {question.responses.slice(0, 5).map((response, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-700">"{response.text}"</p>
                  </div>
                ))}
                {question.responses.length > 5 && (
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      View All {question.responses.length} Responses
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      }

      return null
    }

    return (
      <div className="p-6 space-y-6">
        {renderOverviewCard()}

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Question Reports</h3>
          {questionReports.map((question, index) => renderQuestionCard(question, index))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "text-[#F5C842] border-[#F5C842]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "reports"
                  ? "text-[#F5C842] border-[#F5C842]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab("responses")}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "responses"
                  ? "text-[#F5C842] border-[#F5C842]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Responses
            </button>
          </nav>

          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs bg-transparent border-gray-300 hover:bg-gray-50"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Co-pilot
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="p-6 space-y-8">
            {renderChart()}
            {renderInsights()}
            {renderPieCharts()}
          </div>
        )}

        {activeTab === "reports" && renderReports()}

        {activeTab === "responses" && (
          <div className="p-6">
            <div className="bg-white rounded-lg border">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Individual Responses</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Filter
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Respondent (13)
                          </span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Submitted On
                          </span>
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Q1</div>
                          <div className="text-xs text-gray-400 mt-1">OPQ</div>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Q2</div>
                          <div className="text-xs text-gray-400 mt-1">TEXT</div>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Q3</div>
                          <div className="text-xs text-gray-400 mt-1">MULTIPLE CHOICE</div>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Q4</div>
                          <div className="text-xs text-gray-400 mt-1">RATING</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Response rows */}
                    {[
                      {
                        id: 1,
                        date: "23 February 2024 09:27 PM",
                        q1: 7,
                        q2: "erg",
                        q3: "Quality of service",
                        q4: 4,
                      },
                      {
                        id: 2,
                        date: "23 February 2024 04:27 PM",
                        q1: 6,
                        q2: "ffqer",
                        q3: "Competitive pricing",
                        q4: 5,
                      },
                      {
                        id: 3,
                        date: "06 February 2024 04:55 PM",
                        q1: 3,
                        q2: "gr",
                        q3: "Customer support",
                        q4: 3,
                      },
                      {
                        id: 4,
                        date: "31 January 2024 10:44 PM",
                        q1: 8,
                        q2: "Smooth shopping experi...",
                        q3: "Quality of service",
                        q4: 5,
                      },
                      {
                        id: 5,
                        date: "31 January 2024 10:44 PM",
                        q1: 8,
                        q2: "This e-commerce websit...",
                        q3: "Brand reputation",
                        q4: 4,
                      },
                      {
                        id: 6,
                        date: "30 January 2024 10:44 PM",
                        q1: 2,
                        q2: "Navigating through this si...",
                        q3: "Competitive pricing",
                        q4: 2,
                      },
                      {
                        id: 7,
                        date: "30 January 2024 10:44 PM",
                        q1: 8,
                        q2: "Impressed by the variety ...",
                        q3: "Quality of service",
                        q4: 5,
                      },
                      {
                        id: 8,
                        date: "29 January 2024 08:15 PM",
                        q1: 9,
                        q2: "Great user experience ov...",
                        q3: "Quality of service",
                        q4: 5,
                      },
                      {
                        id: 9,
                        date: "29 January 2024 06:22 PM",
                        q1: 5,
                        q2: "Average service, could be...",
                        q3: "Customer support",
                        q4: 3,
                      },
                      {
                        id: 10,
                        date: "28 January 2024 11:30 AM",
                        q1: 10,
                        q2: "Excellent service and sup...",
                        q3: "Quality of service",
                        q4: 5,
                      },
                    ].map((response) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">A</span>
                              </div>
                              <span className="text-sm text-gray-900">Anonymous</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{response.date}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-medium text-gray-900">{response.q1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-sm text-gray-700 max-w-xs truncate">{response.q2}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-gray-700 max-w-xs truncate">{response.q3}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < response.q4 ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Showing 1 to 10 of 13 responses</div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-[#F5C842] text-black border-[#F5C842]">
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
