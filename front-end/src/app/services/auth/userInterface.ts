export interface User {
    name: string;
    email: string;
    password: string;
    role?: string;
    authToken?: string;
    profile_picture?: string;
  }