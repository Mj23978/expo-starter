import type { ApiResponse, AuthCredentials, AuthResponse, User, UserProfile } from './types';

// Mock delay for realistic API simulation
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  avatar: 'https://via.placeholder.com/150/4f46e5/ffffff?text=DU',
  role: 'user',
  createdAt: '2024-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
};

// Mock user profiles
const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    bio: 'Full-stack developer passionate about React and React Native',
    avatar: 'https://via.placeholder.com/150/4f46e5/ffffff?text=DU',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    joinedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'React enthusiast and tech blogger',
    avatar: 'https://via.placeholder.com/150/059669/ffffff?text=JD',
    location: 'New York, NY',
    joinedAt: '2024-02-15T00:00:00Z',
  },
];

// Authentication API
export const authApi = {
  // Mock login
  async login(credentials: AuthCredentials): Promise<ApiResponse<AuthResponse>> {
    await delay(1500); // Simulate network delay

    // Simulate login validation
    if (credentials.email === 'error@example.com') {
      throw new Error('Invalid credentials. Please try again.');
    }

    if (credentials.email === 'slow@example.com') {
      await delay(3000); // Extra slow response
    }

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
    };
  },

  // Mock logout
  async logout(): Promise<ApiResponse<null>> {
    await delay(500);
    return {
      status: "success",
      message: "Logout successful",
      data: null,
    };
  },

  // Mock current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(800);
    return {
      status: "success",
      message: "User data retrieved",
      data: mockUser,
    };
  },
};