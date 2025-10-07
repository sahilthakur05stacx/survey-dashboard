"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Building, Sparkles, BarChart3, Shield, Zap } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<boolean>
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [layout, setLayout] = useState<"modern" | "sleek">("modern")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {}

    if (!loginForm.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!loginForm.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}

    if (!registerForm.name) {
      newErrors.name = "Name is required"
    }

    if (!registerForm.company) {
      newErrors.company = "Company is required"
    }

    if (!registerForm.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!registerForm.password) {
      newErrors.password = "Password is required"
    } else if (registerForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLoginForm()) return

    setIsLoading(true)
    try {
      await onLogin(loginForm.email, loginForm.password)
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateRegisterForm()) return

    setIsLoading(true)
    try {
      await register(registerForm.name, registerForm.company, registerForm.email, registerForm.password)

      // Show success message and prepare for login
      setRegistrationSuccess(true)
      setRegisteredEmail(registerForm.email)

      // Clear registration form
      setRegisterForm({
        name: "",
        company: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      // Switch to login tab after 2 seconds
      setTimeout(() => {
        setActiveTab("login")
        setLoginForm((prev) => ({ ...prev, email: registerForm.email }))
        setRegistrationSuccess(false)
      }, 2000)
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights from your surveys and feedback",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security to protect your data",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "See responses and feedback as they come in",
    },
  ]

  if (layout === "modern") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-white">SurveyPro</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Transform Your Business with Smart Feedback
            </h1>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Create powerful surveys, collect valuable feedback, and make data-driven decisions that drive growth.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-blue-100">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-blue-100 text-sm">
              "SurveyPro helped us increase customer satisfaction by 40% in just 3 months."
            </p>
            <p className="text-white font-medium mt-2">— Sarah Johnson, CEO at TechCorp</p>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Layout Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-sm border">
                <Button
                  variant={layout === "modern" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLayout("modern")}
                  className="text-xs"
                >
                  Modern
                </Button>
                <Button
                  variant={layout === "sleek" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLayout("sleek")}
                  className="text-xs"
                >
                  Sleek
                </Button>
              </div>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">Sign in to your account or create a new one</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          />
                        </div>
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            checked={loginForm.rememberMe}
                            onCheckedChange={(checked) =>
                              setLoginForm({ ...loginForm, rememberMe: checked as boolean })
                            }
                          />
                          <Label htmlFor="remember" className="text-sm text-gray-600">
                            Remember me
                          </Label>
                        </div>
                        <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 p-0">
                          Forgot password?
                        </Button>
                      </div>

                      {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="pl-10"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                          />
                        </div>
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="company"
                            type="text"
                            placeholder="Enter your company name"
                            className="pl-10"
                            value={registerForm.company}
                            onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                          />
                        </div>
                        {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          />
                        </div>
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10"
                            value={registerForm.confirmPassword}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                      </div>

                      {registrationSuccess && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">
                                Account created successfully! Redirecting to login...
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">Demo: Use any email/password combination to sign in</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Sleek Layout
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Layout Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-1 border border-gray-800">
            <Button
              variant={layout === "modern" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout("modern")}
              className="text-xs bg-transparent hover:bg-gray-800"
            >
              Modern
            </Button>
            <Button
              variant={layout === "sleek" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout("sleek")}
              className="text-xs bg-white text-black hover:bg-gray-200"
            >
              Sleek
            </Button>
          </div>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SurveyPro
            </span>
          </div>
          <p className="text-gray-400 text-lg">The future of feedback collection</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800 border-gray-700">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginForm.rememberMe}
                        onCheckedChange={(checked) => setLoginForm({ ...loginForm, rememberMe: checked as boolean })}
                        className="border-gray-600 data-[state=checked]:bg-blue-600"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-400">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm text-blue-400 hover:text-blue-300 p-0">
                      Forgot password?
                    </Button>
                  </div>

                  {errors.general && <p className="text-sm text-red-400">{errors.general}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">
                        Company
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Acme Corp"
                          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                          value={registerForm.company}
                          onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                        />
                      </div>
                      {errors.company && <p className="text-sm text-red-400">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-300">
                        Confirm
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {registrationSuccess && (
                    <div className="bg-green-900/50 border border-green-700 rounded-md p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-300">
                            Account created successfully! Redirecting to login...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.general && <p className="text-sm text-red-400">{errors.general}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Demo mode: Use any email/password to continue</p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="p-4 bg-gray-900/30 rounded-lg border border-gray-800">
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">{feature.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
