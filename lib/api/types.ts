// Common API response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status: "success" | "error";
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  joinedAt: string;
}

export type TaskPriority = "low" | "medium" | "high";
export type TaskFilter = "all" | "active" | "completed";
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
}