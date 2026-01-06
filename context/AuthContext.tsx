import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Lógica Mockada de Login
    
    // Simula Login de Especialista
    if (email.includes('admin') || email.includes('bio.com')) {
      setUser({
        id: 'spec_001',
        name: 'Dra. Especialista',
        email: email,
        company: 'Big Data Bio Team',
        role: 'specialist'
      });
    } else {
      // Simula Login de Cliente
      setUser({
        id: 'usr_123',
        name: 'Dr. Roberto Silva',
        email: email,
        company: 'Universidade Federal',
        role: 'client'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};