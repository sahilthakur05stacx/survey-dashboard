# Software Requirements Specification (SRS)
## Website Management API - Add/Fetch Website System

### Document Information
- **Project**: Survey Dashboard Application
- **Version**: 1.0
- **Date**: December 2024
- **Author**: Development Team

---

## 1. Introduction

### 1.1 Purpose
This document specifies the requirements for the Website Management API system that handles website creation, fetching, and module configuration for the Survey Dashboard application. The system provides comprehensive website management with module-based functionality for collecting user feedback, surveys, bug reports, and feature requests.

### 1.2 Scope
The website management system covers:
- Website creation with URL, name, and description
- Website data fetching and display
- Website module configuration and management
- Website statistics and analytics
- Website status management (active/paused/inactive)
- Module enable/disable functionality

### 1.3 Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **HTTP Client**: Axios
- **State Management**: React Context API, useState hooks
- **Backend**: Node.js/Express (separate service)
- **Authentication**: JWT tokens
- **Storage**: LocalStorage for client-side persistence
- **UI Components**: Tailwind CSS, shadcn/ui

---

## 2. System Architecture

### 2.1 Frontend Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                      │
├─────────────────────────────────────────────────────────────┤
│  WebsiteSetupModal Component                                │
│  ├── Website Creation Form                                  │
│  ├── URL Validation                                         │
│  ├── Form Validation                                        │
│  └── Error Handling                                         │
├─────────────────────────────────────────────────────────────┤
│  Website Dashboard                                          │
│  ├── Website List Display                                   │
│  ├── Website Statistics                                     │
│  ├── Website Actions (View/Edit)                           │
│  └── Website Status Management                              │
├─────────────────────────────────────────────────────────────┤
│  ModulesOverview Component                                  │
│  ├── Module Configuration                                   │
│  ├── Module Enable/Disable                                  │
│  ├── Module Statistics                                       │
│  └── Module Status Management                               │
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
│  POST /api/websites/{teamId}/websites                       │
│  GET  /api/websites/{teamId}/websites                      │
│  GET  /api/modules                                          │
│  GET  /api/website-modules/websites/{websiteId}/modules    │
│  POST /api/website-modules/websites/{websiteId}/modules    │
│  PATCH /api/website-modules/{moduleId}                      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow
1. User creates new website via WebsiteSetupModal
2. Frontend validates form data (URL, name, description)
3. Axios sends HTTP request to backend API
4. Backend processes website creation
5. Backend returns website data with ID
6. Frontend updates website list and redirects to website editor
7. User configures modules for the website
8. Frontend fetches and displays website statistics

---

## 3. Functional Requirements

### 3.1 Website Creation

#### 3.1.1 Website Creation Form Fields
- **Website URL** (required): Valid URL format
- **Website Name** (required): Display name for the website
- **Description** (optional): Brief description of the website

#### 3.1.2 Website Creation Validation Rules
```typescript
// Frontend validation rules
const isValidUrl = (url: string) => {
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

const isFormValid = 
  websiteName.trim() &&
  websiteUrl.trim() &&
  isValidUrl(websiteUrl) &&
  !isLoading;
```

#### 3.1.3 Website Creation API Call
```typescript
const handleSubmit = async () => {
  if (!websiteName.trim() || !websiteUrl.trim()) {
    return;
  }

  if (!user?.defaultTeam?.id) {
    setError("No team found. Please log in again.");
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const websiteData = {
      name: websiteName.trim(),
      url: websiteUrl.trim(),
      description: websiteDescription.trim() || null,
    };

    const apiUrl = `http://localhost:3000/api/websites/${user.defaultTeam.id}/websites`;
    
    const response = await axios.post(apiUrl, websiteData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      onClose(response.data.data || websiteData);
    } else {
      throw new Error(response.data.message || "Failed to create website");
    }
  } catch (error: any) {
    // Error handling with validation errors
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const validationErrors = error.response.data.errors.join(", ");
      setError(`Validation Error: ${validationErrors}`);
    } else {
      const errorMessage = 
        error.response?.data?.message ||
        error.message ||
        "Failed to create website";
      setError(errorMessage);
    }
  } finally {
    setIsLoading(false);
  }
};
```

### 3.2 Website Data Fetching

#### 3.2.1 Website Data Model
```typescript
export interface Website {
  id: string;
  name: string;
  url: string;
  description?: string;
  status: "active" | "paused" | "inactive";
  totalResponses: number;
  feedbackCount: number;
  surveyResponses: number;
  bugReports: number;
  featureRequests: number;
  averageRating: number;
  responseRate: number;
  createdAt: string;
  updatedAt: string;
}
```

#### 3.2.2 Website Fetching API Call
```typescript
export const fetchWebsites = async (teamId: string): Promise<Website[]> => {
  const token = localStorage.getItem("auth_token");
  
  if (!token) {
    throw new Error("No authentication token found");
  }

  const apiUrl = `http://localhost:3000/api/websites/${teamId}/websites`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.success) {
      const websites = 
        response.data.data?.websites || 
        response.data.websites || 
        [];
      return websites;
    } else {
      throw new Error(response.data.message || "Failed to fetch websites");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch websites"
    );
  }
};
```

### 3.3 Website Module Management

#### 3.3.1 Module Data Model
```typescript
export interface ModuleStats {
  responses?: number;
  avgRating?: number;
  surveys?: number;
  reports?: number;
  resolved?: number;
  requests?: number;
  votes?: number;
  todo?: number;
  inProgress?: number;
  done?: number;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  configured: boolean;
  stats: ModuleStats;
  color: string;
  enabled?: boolean;
}
```

#### 3.3.2 Module Fetching API Call
```typescript
export const fetchModules = async (
  page: number = 1,
  limit: number = 10
): Promise<ModulesResponse | any[]> => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `http://localhost:3000/api/modules?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle different response formats
    if (response.data && typeof response.data === "object" && "success" in response.data) {
      return response.data;
    }

    if (Array.isArray(response.data)) {
      return {
        success: true,
        data: response.data,
        message: "Modules fetched successfully",
      };
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch modules"
    );
  }
};
```

#### 3.3.3 Module Enable/Disable API Call
```typescript
export const setWebsiteModuleEnabled = async (
  websiteId: string,
  moduleId: string,
  enabled: boolean
) => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Check if module already exists
    const listUrl = `http://localhost:3000/api/website-modules/websites/${websiteId}/modules`;
    const listResponse = await axios.get(listUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const modules = 
      listResponse.data?.data ||
      listResponse.data?.modules ||
      listResponse.data ||
      [];
    
    const existingModule = modules.find(
      (m: any) =>
        m.moduleId === moduleId ||
        m.module?.id === moduleId ||
        m.id === moduleId
    );

    if (existingModule) {
      // Update existing module
      const patchUrl = `http://localhost:3000/api/website-modules/${existingModule.id}`;
      const patchPayload = { enabled };

      const patchResponse = await axios.patch(patchUrl, patchPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return patchResponse.data;
    } else {
      // Create new module association
      const url = `http://localhost:3000/api/website-modules/websites/${websiteId}/modules`;
      const payload = { websiteId, moduleId, enabled };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update website module state"
    );
  }
};
```

---

## 4. API Specifications

### 4.1 Website Creation Endpoint

#### 4.1.1 Request
- **URL**: `POST http://localhost:3000/api/websites/{teamId}/websites`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "name": "string",
  "url": "string",
  "description": "string (optional)"
}
```

#### 4.1.2 Response
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "website_id",
    "name": "Website Name",
    "url": "https://example.com",
    "description": "Website description",
    "status": "active",
    "totalResponses": 0,
    "feedbackCount": 0,
    "surveyResponses": 0,
    "bugReports": 0,
    "featureRequests": 0,
    "averageRating": 0,
    "responseRate": 0,
    "createdAt": "2024-12-01T00:00:00Z",
    "updatedAt": "2024-12-01T00:00:00Z"
  },
  "message": "Website created successfully"
}
```

- **Error Response** (400/409):
```json
{
  "success": false,
  "message": "Website creation failed",
  "errors": [
    "URL already exists",
    "Invalid URL format"
  ]
}
```

### 4.2 Website Fetching Endpoint

#### 4.2.1 Request
- **URL**: `GET http://localhost:3000/api/websites/{teamId}/websites`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 4.2.2 Response
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "websites": [
      {
        "id": "website_id",
        "name": "Website Name",
        "url": "https://example.com",
        "description": "Website description",
        "status": "active",
        "totalResponses": 150,
        "feedbackCount": 45,
        "surveyResponses": 30,
        "bugReports": 12,
        "featureRequests": 8,
        "averageRating": 4.2,
        "responseRate": 0.15,
        "createdAt": "2024-12-01T00:00:00Z",
        "updatedAt": "2024-12-01T00:00:00Z"
      }
    ]
  },
  "message": "Websites fetched successfully"
}
```

### 4.3 Module Management Endpoints

#### 4.3.1 Fetch Modules
- **URL**: `GET http://localhost:3000/api/modules?page=1&limit=10`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 4.3.2 Website Module States
- **URL**: `GET http://localhost:3000/api/website-modules/websites/{websiteId}/modules`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`

#### 4.3.3 Enable/Disable Module
- **URL**: `POST http://localhost:3000/api/website-modules/websites/{websiteId}/modules`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "websiteId": "website_id",
  "moduleId": "module_id",
  "enabled": true
}
```

#### 4.3.4 Update Module State
- **URL**: `PATCH http://localhost:3000/api/website-modules/{moduleId}`
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "enabled": true
}
```

---

## 5. User Interface Requirements

### 5.1 Website Setup Modal Design
- Modern modal dialog with clean design
- Form validation with real-time feedback
- URL validation with format checking
- Loading states with spinners
- Error message display
- Responsive design for mobile/desktop

### 5.2 Website Dashboard Design
- Grid layout for website cards
- Statistics overview cards
- Website status badges
- Action buttons (View/Edit)
- Empty state for no websites
- Loading states and error handling

### 5.3 Module Management Interface
- Card-based module layout
- Toggle switches for enable/disable
- Module status indicators
- Statistics display for active modules
- Configuration buttons
- Quick setup guide

### 5.4 User Experience Features
- Smooth transitions and animations
- Optimistic UI updates
- Toast notifications for actions
- Error recovery mechanisms
- Responsive design
- Accessibility compliance

---

## 6. Security Requirements

### 6.1 Authentication
- JWT token validation for all requests
- Team-based access control
- User session management

### 6.2 Input Validation
- URL format validation
- Required field validation
- Client-side validation before API calls
- Server-side validation (backend responsibility)

### 6.3 Error Handling
- Structured error responses
- User-friendly error messages
- No sensitive information exposure
- Graceful error recovery

---

## 7. Implementation Details

### 7.1 Frontend Implementation

#### 7.1.1 WebsiteSetupModal Component
```typescript
interface WebsiteSetupModalProps {
  open: boolean;
  onClose: (websiteData?: any) => void;
  template?: any;
}

export function WebsiteSetupModal({
  open,
  onClose,
  template,
}: WebsiteSetupModalProps) {
  const { user } = useAuth();
  const [websiteName, setWebsiteName] = useState(template?.name || "");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form validation and submission logic
  // URL validation
  // Error handling
  // Loading states
}
```

#### 7.1.2 Website Dashboard Component
```typescript
function SurveyDashboard() {
  const { user, logout } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoadingWebsites, setIsLoadingWebsites] = useState(true);
  const [websitesError, setWebsitesError] = useState<string | null>(null);

  // Website fetching logic
  // Statistics calculation
  // Error handling
  // Loading states
}
```

#### 7.1.3 ModulesOverview Component
```typescript
interface ModulesOverviewProps {
  onEditModule: (moduleId: string) => void;
  enabledModules: any;
  setEnabledModules: (modules: any) => void;
  websiteId?: string;
}

export function ModulesOverview({
  onEditModule,
  enabledModules,
  setEnabledModules,
  websiteId,
}: ModulesOverviewProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Module fetching logic
  // Module toggle functionality
  // Statistics display
  // Error handling
}
```

### 7.2 State Management
- React useState hooks for local state
- Context API for global state
- LocalStorage for persistence
- Loading states for async operations
- Error state management

### 7.3 HTTP Client Configuration
- Axios for HTTP requests
- Authorization header injection
- Error interceptors
- Request/response logging
- Token management

---

## 8. Testing Requirements

### 8.1 Unit Testing
- Form validation functions
- API client functions
- Component rendering
- Error handling scenarios
- URL validation logic

### 8.2 Integration Testing
- Website creation flow end-to-end
- Website fetching flow end-to-end
- Module management flow end-to-end
- Error scenarios
- Token management

### 8.3 User Acceptance Testing
- Website creation process
- Website dashboard functionality
- Module configuration process
- Error handling
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
- Website templates
- Bulk website operations
- Advanced analytics
- Website cloning
- Custom domain support

### 10.2 Technical Improvements
- Real-time updates
- Offline support
- Performance optimizations
- Enhanced error logging
- Caching strategies

---

## 11. Conclusion

This website management system provides a comprehensive foundation for managing websites and their associated modules in the Survey Dashboard application. The implementation follows modern React patterns with proper state management, error handling, and user experience considerations.

The system is designed to be:
- **Scalable**: Supports multiple websites per team
- **Modular**: Flexible module system for different functionality
- **User-friendly**: Intuitive interface with clear feedback
- **Secure**: Proper authentication and validation
- **Maintainable**: Clean code structure and error handling

The frontend implementation is complete and functional, communicating with a separate backend API service that handles the actual website storage, module management, and data processing.

---

**Note**: This SRS document is based on the frontend implementation analysis. The backend API implementation details would need to be documented separately as they are not present in this codebase.
