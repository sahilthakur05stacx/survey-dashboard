"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Mail, Settings, Eye, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

interface EmailTemplateComponentProps {
  onBack: () => void
  surveyInfo?: any
}

export function EmailTemplateComponent({ onBack, surveyInfo }: EmailTemplateComponentProps) {
  const [activeTab, setActiveTab] = useState("compose")
  const [emailData, setEmailData] = useState({
    fromEmail: "survey@company.com",
    fromName: "Survey Team",
    subject: `Survey Invitation: ${surveyInfo?.name || "Your Opinion Matters"}`,
    preheaderText: "We'd love to hear your thoughts",
    greeting: "Hi {{FirstName}},",
    bodyText: `We hope this email finds you well. We're reaching out to gather your valuable feedback through a brief survey.

Your input is incredibly important to us and will help us improve our services. The survey should take no more than 5 minutes to complete.`,
    callToAction: "Take Survey",
    closingText: "Thank you for your time and valuable feedback!",
    signature: "Best regards,\nThe Survey Team",
    replyToEmail: "noreply@company.com",
    embedQuestion: true,
    customFooter: true,
    companyName: "Survey Bee",
    companyAddress: "123 Survey Street, Data City, DC 12345, USA",
    socialLinks: {
      facebook: "https://facebook.com/surveybee",
      twitter: "https://twitter.com/surveybee",
      linkedin: "https://linkedin.com/company/surveybee",
      instagram: "https://instagram.com/surveybee",
    },
  })

  const handleDownloadTemplate = () => {
    const template = generateEmailTemplate(emailData)
    const blob = new Blob([template], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${surveyInfo?.name?.toLowerCase().replace(/\s+/g, "-") || "survey"}-email-template.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateEmailTemplate = (data: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #F5C842; }
        .content { padding: 30px 0; }
        .cta-button { display: inline-block; background-color: #F5C842; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .survey-preview { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .scale-buttons { display: flex; justify-content: center; gap: 8px; margin: 15px 0; flex-wrap: wrap; }
        .scale-button { width: 35px; height: 35px; border: 2px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; background: white; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; margin-top: 30px; font-size: 12px; color: #666; }
        .social-links { margin: 15px 0; }
        .social-links a { margin: 0 10px; color: #666; text-decoration: none; }
        @media (max-width: 600px) { .scale-buttons { gap: 4px; } .scale-button { width: 30px; height: 30px; font-size: 12px; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #F5C842; margin: 0;">${data.companyName}</h1>
        </div>
        
        <div class="content">
            <p><strong>${data.greeting}</strong></p>
            
            <p>${data.bodyText.replace(/\n/g, "</p><p>")}</p>
            
            ${
              data.embedQuestion
                ? `
            <div class="survey-preview">
                <h3 style="margin-top: 0;">Quick Preview:</h3>
                <p><strong>How likely are you to recommend our service?</strong></p>
                <div class="scale-buttons">
                    ${Array.from({ length: 11 }, (_, i) => `<div class="scale-button">${i}</div>`).join("")}
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-top: 10px;">
                    <span>Not Likely</span>
                    <span>Very Likely</span>
                </div>
            </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://survey.bee/${(surveyInfo?.name || "survey").toLowerCase().replace(/\s+/g, "-")}" class="cta-button">${data.callToAction}</a>
            </div>
            
            <p>${data.closingText}</p>
            
            <p style="white-space: pre-line;">${data.signature}</p>
        </div>
        
        ${
          data.customFooter
            ? `
        <div class="footer">
            <div class="social-links">
                <a href="${data.socialLinks.facebook}">Facebook</a>
                <a href="${data.socialLinks.twitter}">Twitter</a>
                <a href="${data.socialLinks.linkedin}">LinkedIn</a>
                <a href="${data.socialLinks.instagram}">Instagram</a>
            </div>
            <p>${data.companyAddress}</p>
            <p>© ${new Date().getFullYear()} ${data.companyName}. All rights reserved.</p>
            <p><a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Privacy Policy</a></p>
        </div>
        `
            : ""
        }
    </div>
</body>
</html>`
  }

  const renderEmailPreview = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="bg-white max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
          {/* Email Header */}
          <div className="bg-[#F5C842] text-center py-4">
            <h2 className="text-lg font-bold text-black">{emailData.companyName}</h2>
          </div>

          {/* Email Content */}
          <div className="p-6 space-y-4">
            <p className="font-semibold">{emailData.greeting}</p>

            <div className="text-sm text-gray-700 space-y-2">
              {emailData.bodyText.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            {/* Embedded Question Preview */}
            {emailData.embedQuestion && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-medium mb-3">Quick Preview:</h4>
                <p className="text-sm font-medium mb-3">How likely are you to recommend our service?</p>
                <div className="flex justify-center space-x-1 mb-2 flex-wrap gap-1">
                  {Array.from({ length: 11 }, (_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center text-xs font-medium bg-white"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Not Likely</span>
                  <span>Very Likely</span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="text-center py-4">
              <button className="bg-[#F5C842] text-black px-6 py-2 rounded font-medium text-sm">
                {emailData.callToAction}
              </button>
            </div>

            <p className="text-sm text-gray-700">{emailData.closingText}</p>

            <div className="text-sm text-gray-700 whitespace-pre-line">{emailData.signature}</div>
          </div>

          {/* Footer */}
          {emailData.customFooter && (
            <div className="bg-gray-50 p-4 text-center text-xs text-gray-600 space-y-2">
              <div className="flex justify-center space-x-4">
                <Facebook className="h-4 w-4" />
                <Twitter className="h-4 w-4" />
                <Linkedin className="h-4 w-4" />
                <Instagram className="h-4 w-4" />
              </div>
              <p>{emailData.companyAddress}</p>
              <p>
                © {new Date().getFullYear()} {emailData.companyName}. All rights reserved.
              </p>
              <p>
                <span className="underline">Unsubscribe</span> | <span className="underline">Privacy Policy</span>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Create Email Template</h2>
              <p className="text-sm text-gray-500">Design and customize your survey invitation email</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={handleDownloadTemplate} className="bg-[#F5C842] text-black hover:bg-[#F5C842]/90">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Email Configuration */}
        <div className="w-1/2 border-r overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="compose" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Compose</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="px-6 pb-6 space-y-6">
              {/* Email Headers */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">From Name</Label>
                    <Input
                      value={emailData.fromName}
                      onChange={(e) => setEmailData({ ...emailData, fromName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">From Email</Label>
                    <Input
                      value={emailData.fromEmail}
                      onChange={(e) => setEmailData({ ...emailData, fromEmail: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Subject Line <span className="text-xs text-gray-500">({emailData.subject.length}/140)</span>
                  </Label>
                  <Input
                    value={emailData.subject}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    maxLength={140}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Preheader Text <span className="text-xs text-gray-500">({emailData.preheaderText.length}/140)</span>
                  </Label>
                  <Input
                    value={emailData.preheaderText}
                    onChange={(e) => setEmailData({ ...emailData, preheaderText: e.target.value })}
                    maxLength={140}
                    placeholder="Preview text that appears in email clients"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Email Content */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Greeting</Label>
                  <Input
                    value={emailData.greeting}
                    onChange={(e) => setEmailData({ ...emailData, greeting: e.target.value })}
                    placeholder="Hi {{FirstName}},"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{{FirstName}}"}, {"{{LastName}}"}, {"{{Email}}"} for personalization
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email Body</Label>
                  <Textarea
                    value={emailData.bodyText}
                    onChange={(e) => setEmailData({ ...emailData, bodyText: e.target.value })}
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Call to Action Button Text</Label>
                  <Input
                    value={emailData.callToAction}
                    onChange={(e) => setEmailData({ ...emailData, callToAction: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Closing Text</Label>
                  <Textarea
                    value={emailData.closingText}
                    onChange={(e) => setEmailData({ ...emailData, closingText: e.target.value })}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Signature</Label>
                  <Textarea
                    value={emailData.signature}
                    onChange={(e) => setEmailData({ ...emailData, signature: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="px-6 pb-6 space-y-6">
              {/* Email Settings */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Reply To Email</Label>
                  <Input
                    value={emailData.replyToEmail}
                    onChange={(e) => setEmailData({ ...emailData, replyToEmail: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Embed Survey Question</Label>
                    <p className="text-xs text-gray-500">Show a preview question in the email</p>
                  </div>
                  <Switch
                    checked={emailData.embedQuestion}
                    onCheckedChange={(checked) => setEmailData({ ...emailData, embedQuestion: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Custom Footer</Label>
                    <p className="text-xs text-gray-500">Include company info and social links</p>
                  </div>
                  <Switch
                    checked={emailData.customFooter}
                    onCheckedChange={(checked) => setEmailData({ ...emailData, customFooter: checked })}
                  />
                </div>
              </div>

              {/* Company Information */}
              {emailData.customFooter && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Company Information</h4>

                  <div>
                    <Label className="text-sm font-medium">Company Name</Label>
                    <Input
                      value={emailData.companyName}
                      onChange={(e) => setEmailData({ ...emailData, companyName: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Company Address</Label>
                    <Textarea
                      value={emailData.companyAddress}
                      onChange={(e) => setEmailData({ ...emailData, companyAddress: e.target.value })}
                      rows={2}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Social Media Links</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-600">Facebook</Label>
                        <Input
                          value={emailData.socialLinks.facebook}
                          onChange={(e) =>
                            setEmailData({
                              ...emailData,
                              socialLinks: { ...emailData.socialLinks, facebook: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Twitter</Label>
                        <Input
                          value={emailData.socialLinks.twitter}
                          onChange={(e) =>
                            setEmailData({
                              ...emailData,
                              socialLinks: { ...emailData.socialLinks, twitter: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">LinkedIn</Label>
                        <Input
                          value={emailData.socialLinks.linkedin}
                          onChange={(e) =>
                            setEmailData({
                              ...emailData,
                              socialLinks: { ...emailData.socialLinks, linkedin: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Instagram</Label>
                        <Input
                          value={emailData.socialLinks.instagram}
                          onChange={(e) =>
                            setEmailData({
                              ...emailData,
                              socialLinks: { ...emailData.socialLinks, instagram: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Email Preview</span>
              </h3>
              <Badge variant="secondary" className="text-xs">
                Mobile View
              </Badge>
            </div>
            {renderEmailPreview()}
          </div>
        </div>
      </div>
    </div>
  )
}
