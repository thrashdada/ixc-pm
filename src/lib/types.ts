// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'pm' | 'contractor' | 'admin' | 'accountant';
  avatar?: string;
  company?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Property Management Types
export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'residential' | 'commercial' | 'mixed';
  units: number;
  status: 'active' | 'inactive' | 'maintenance';
  managerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  type: 'apartment' | 'office' | 'retail' | 'warehouse';
  squareFootage: number;
  bedrooms?: number;
  bathrooms?: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  rentAmount?: number;
  accessInfo?: string;
}

// Work Order Types
export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  unitId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  category: 'plumbing' | 'electrical' | 'hvac' | 'carpentry' | 'cleaning' | 'other';
  estimatedCost?: number;
  actualCost?: number;
  assignedTo?: string;
  requestedBy: string;
  requestedAt: Date;
  assignedAt?: Date;
  completedAt?: Date;
  photos?: string[];
  notes?: string[];
}

// Contractor Types
export interface Contractor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  specialties: string[];
  rating: number;
  totalJobs: number;
  completedJobs: number;
  status: 'active' | 'inactive' | 'suspended';
  insuranceInfo?: string;
  certifications?: string[];
  hourlyRate?: number;
  joinedAt: Date;
}

// Financial Types
export interface Invoice {
  id: string;
  workOrderId: string;
  contractorId: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'pending' | 'approved' | 'paid' | 'overdue' | 'cancelled';
  dueDate: Date;
  issuedDate: Date;
  paidDate?: Date;
  paymentMethod?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'credit_card' | 'ach' | 'check' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  processedAt: Date;
  notes?: string;
}

// Message Types
export interface Message {
  id: string;
  workOrderId?: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: 'text' | 'photo' | 'voice' | 'file';
  attachments?: string[];
  readAt?: Date;
  createdAt: Date;
}

// Report Types
export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'maintenance' | 'contractor' | 'property';
  dateRange: {
    start: Date;
    end: Date;
  };
  data: Record<string, unknown>;
  generatedAt: Date;
  generatedBy: string;
}

// Settings Types
export interface CompanySettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  taxId?: string;
  paymentMethods: string[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
} 