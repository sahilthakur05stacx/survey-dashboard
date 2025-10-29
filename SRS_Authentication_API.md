# Software Requirements Specification (SRS)
## Authentication API - Register/Login System

### Document Information
- **Project**: Survey Dashboard Application
- **Version**: 1.0
- **Date**: December 2024
- **Author**: Development Team

---

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for the Authentication API system that handles user registration and login functionality for the Survey Dashboard application. The system provides secure user authentication with JWT token-based authorization.

### 1.2 Scope
The authentication system covers:
- User registration with email/password
- User login with email/password
- JWT token management
- User session management
- Onboarding flow integration

### 1.3 Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Backend**: Node.js/Express (separate service)
- **Authentication**: JWT tokens
- **Storage**: LocalStorage for client-side persistence

---

## 2. System Architecture

### 2.1 Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                      │
├─────────────────────────────────────────────────────────────┤
│  LoginScreen Component                                       │
│  ├── Login Form                                             │
│  ├── Register Form                                         │
│  └── Form Validation                                        │
├─────────────────────────────────────────────────────────────┤
│  AuthProvider (Context)                                     │
│  ├── useAuth Hook                                           │
│  ├── User State Management                                  │
│  ├── Login Function                                         │
│  ├── Register Function                                      │
│  └── Logout Function                                        │
├─────────────────────────────────────────────────────────────┤
│  API Client (Axios)                                         │
│  ├── HTTP Request Configuration                             │
│  ├── Error Handling                                         │
│  └── Token Management                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Service                      │
│                   (localhost:3000)                          │
├─────────────────────────────────────────────────────────────┤
│  POST /api/auth/register                                    │
│  POST /api/auth/login                                       │
│  GET  /api/onboarding/progress                             │
│  GET  /api/onboarding                                       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow
1. User submits login/register form
2. Frontend validates form data
3. Axios sends HTTP request to backend API
4. Backend processes authentication
5. Backend returns JWT token and user data
6. Frontend stores token and user data in localStorage
7. Frontend updates React context state
8. User is redirected to dashboard

---

## 3. Functional Requirements

### 3.1 User Registration

#### 3.1.1 Registration Form Fields
- **Name** (required): Full name of the user
- **Email** (required): Valid email address
- **Password** (required): Minimum 6 characters
- **Confirm Password** (required): Must match password
- **Company** (optional): Company name (currently commented out)

#### 3.1.2 Registration Validation Rules
```typescript
// Frontend validation rules
const validateRegisterForm = () => {
  const newErrors: Record<string, string> = {};

  if (!registerForm.name) {
    newErrors.name = "Name is required";
  }

  if (!registerForm.company) {
    newErrors.company = "Company is required";
  }

  if (!registerForm.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!registerForm.password) {
    newErrors.password = "Password is required";
  } else if (registerForm.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return Object.keys(newErrors).length === 0;
};
```

#### 3.1.3 Registration API Call
```typescript
const register = async (
  name: string,
  email: string,
  password: string
): Promise<boolean> => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    const data = response?.data as
      | { success?: boolean; message?: string }
      | undefined;
    
    if (data && data.success === false) {
      throw { message: data.message || "Registration failed" };
    }

    return true;
  } catch (error: unknown) {
    // Error handling with field-specific errors
    if (axios.isAxiosError(error)) {
      const data = (error.response?.data ?? {}) as {
        message?: string;
        errors?: Record<string, string>;
      };
      const message = data.message || error.message || "Registration failed";
      const fieldErrors = data.errors || undefined;
      throw { message, fieldErrors };
    }
    throw error instanceof Error ? error : { message: "Registration failed" };
  } finally {
    setIsLoading(false);
  }
};
```

### 3.2 User Login

#### 3.2.1 Login Form Fields
- **Email** (required): Valid email address
- **Password** (required): User password
- **Remember Me** (optional): Checkbox for session persistence

#### 3.2.2 Login Validation Rules
```typescript
const validateLoginForm = () => {
  const newErrors: Record<string, string> = {};

  if (!loginForm.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!loginForm.password) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

#### 3.2.3 Login API Call
```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      }
    );
    
    const payload = (response?.data ?? {}) as {
      success?: boolean;
      message?: string;
      data?: {
        token?: string;
        user?: Partial<User> & {
          id?: string;
          name?: string;
          email?: string;
          company?: string;
          avatar?: string | null;
          defaultTeam?: {
            id: string;
            name: string;
            slug: string;
            role: string;
          };
        };
      };
    };
    
    if (payload && payload.success === false) {
      throw { message: payload.message || "Login failed" };
    }
    
    const apiUser = payload.data?.user || {};
    const userData: User = {
      id: apiUser.id || "",
      name: apiUser.name || "",
      email: apiUser.email || email,
      company: apiUser.company || "",
      avatar: apiUser.avatar || "/diverse-user-avatars.png",
      defaultTeam: apiUser.defaultTeam,
    };
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    if (payload.data?.token) {
      localStorage.setItem("auth_token", payload.data.token);
    }
    
    const onboardingComplete = localStorage.getItem("onboarding_complete");
    setNeedsOnboarding(!onboardingComplete);

    return true;
  } catch (error: unknown) {
    // Error handling
    if (axios.isAxiosError(error)) {
      const data = (error.response?.data ?? {}) as {
        message?: string;
        errors?: Record<string, string>;
      };
      const message = data.message || error.message || "Login failed";
      const fieldErrors = data.errors || undefined;
      throw { message, fieldErrors };
    }
    throw error instanceof Error ? error : { message: "Login failed" };
  } finally {
    setIsLoading(false);
  }
};
```

### 3.3 User Data Model

#### 3.3.1 User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  defaultTeam?: {
    id: string;
    name: string;
    slug: string;
    role: string;
  };
}
```

#### 3.3.2 Authentication Context
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  needsOnboarding: boolean;
  completeOnboarding: () => void;
}
```

### 3.4 Session Management

#### 3.4.1 Logout Function
```typescript
const logout = () => {
  setUser(null);
  setNeedsOnboarding(false);
  localStorage.removeItem("user");
  localStorage.removeItem("onboarding_complete");
  localStorage.removeItem("auth_token");
};
```

#### 3.4.2 Session Persistence
- User data stored in localStorage
- Auth token stored in localStorage
- Onboarding completion status stored in localStorage
- Automatic session restoration on app reload

---

## 4. API Specifications

### 4.1 Registration Endpoint

#### 4.1.1 Request
- **URL**: `POST http://localhost:3000/api/auth/register`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### 4.1.2 Response
- **Success Response** (200):
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

- **Error Response** (400/409):
```json
{
  "success": false,
  "message": "Registration failed",
  "errors": {
    "email": "Email already exists",
    "password": "Password too weak"
  }
}
```

### 4.2 Login Endpoint

#### 4.2.1 Request
- **URL**: `POST http://localhost:3000/api/auth/login`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

#### 4.2.2 Response
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_string",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "company": "Company Name",
      "avatar": "avatar_url_or_null",
      "defaultTeam": {
        "id": "team_id",
        "name": "Team Name",
        "slug": "team_slug",
        "role": "admin"
      }
    }
  }
}
```

- **Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 4.3 Onboarding Endpoints

#### 4.3.1 Onboarding Progress
- **URL**: `GET http://localhost:3000/api/onboarding/progress`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 4.3.2 Onboarding Data
- **URL**: `GET http://localhost:3000/api/onboarding`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

---

## 5. Security Requirements

### 5.1 Password Security
- Minimum 6 characters required
- Passwords are hashed on backend (not visible in frontend)
- Password confirmation validation

### 5.2 Token Management
- JWT tokens stored in localStorage
- Tokens included in Authorization header for authenticated requests
- Token validation on backend

### 5.3 Input Validation
- Email format validation using regex
- Required field validation
- Client-side validation before API calls
- Server-side validation (backend responsibility)

### 5.4 Error Handling
- Structured error responses with field-specific messages
- User-friendly error messages
- No sensitive information exposed in error messages

---

## 6. User Interface Requirements

### 6.1 Login Screen Design
- Modern dark theme with gradient backgrounds
- Tabbed interface for Login/Register
- Form validation with real-time feedback
- Loading states with spinners
- Password visibility toggle
- Responsive design

### 6.2 Form Features
- Real-time validation
- Error message display
- Success feedback
- Loading indicators
- Form state management

### 6.3 User Experience
- Smooth transitions between login/register
- Auto-redirect after successful registration
- Remember me functionality
- Forgot password link (UI only)
- Onboarding flow integration

---

## 7. Implementation Details

### 7.1 Frontend Implementation

#### 7.1.1 AuthProvider Component
```typescript
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("user");
    const onboardingComplete = localStorage.getItem("onboarding_complete");

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);

      // Check if user needs onboarding
      if (!onboardingComplete) {
        setNeedsOnboarding(true);
      }
    }
    setIsLoading(false);
  }, []);

  // ... login, register, logout functions
}
```

#### 7.1.2 LoginScreen Component
- Tabbed interface with Login/Register forms
- Form validation and error handling
- Loading states and success feedback
- Modern UI with Tailwind CSS styling

### 7.2 State Management
- React Context API for global auth state
- LocalStorage for persistence
- Loading states for async operations
- Error state management

### 7.3 HTTP Client Configuration
- Axios for HTTP requests
- Error interceptors for consistent error handling
- Authorization header injection
- Request/response logging

---

## 8. Testing Requirements

### 8.1 Unit Testing
- Form validation functions
- Auth context methods
- API client functions
- Error handling scenarios

### 8.2 Integration Testing
- Login flow end-to-end
- Registration flow end-to-end
- Session persistence
- Token management

### 8.3 User Acceptance Testing
- User registration process
- User login process
- Error scenarios
- UI/UX validation

---

## 9. Deployment Considerations

### 9.1 Environment Configuration
- API base URL configuration
- Environment-specific settings
- CORS configuration for backend

### 9.2 Security Considerations
- HTTPS enforcement in production
- Secure token storage
- Input sanitization
- Rate limiting (backend)

---

## 10. Future Enhancements

### 10.1 Planned Features
- Password reset functionality
- Email verification
- Two-factor authentication
- Social login integration
- Remember me functionality implementation

### 10.2 Technical Improvements
- Refresh token implementation
- Session timeout handling
- Enhanced error logging
- Performance optimizations

---

## 11. Conclusion

This authentication system provides a robust foundation for user management in the Survey Dashboard application. The implementation follows modern React patterns with proper state management, error handling, and user experience considerations. The system is designed to be secure, scalable, and maintainable.

The frontend implementation is complete and functional, communicating with a separate backend API service that handles the actual authentication logic, user storage, and JWT token generation.

---

**Note**: This SRS document is based on the frontend implementation analysis. The backend API implementation details would need to be documented separately as they are not present in this codebase.
