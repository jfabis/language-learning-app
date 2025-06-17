import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

// Sprawdź czy użytkownik jest zalogowany przy starcie aplikacji
useEffect(() => {
  try {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    localStorage.removeItem('currentUser');
  } finally {
    setIsLoading(false);
  }
}, []);

  // Funkcje do zarządzania użytkownikami
  const loadUsers = () => {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };

  const saveUsers = (users) => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  // Funkcja rejestracji
  const register = async (userData) => {
    try {
      const { username, email, password, firstName, lastName } = userData;
      const users = loadUsers();

      if (users.find(u => u.username === username)) {
        return { success: false, message: 'Użytkownik o takiej nazwie już istnieje' };
      }

      if (users.find(u => u.email === email)) {
        return { success: false, message: 'Użytkownik z tym emailem już istnieje' };
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        firstName,
        lastName,
        phone: '',
        location: '',
        bio: '',
        createdAt: new Date().toISOString(),
        profile: {
          avatar: null,
          level: 12,
          totalXP: 1247,
          streak: 7,
          completedLessons: 127,
          completedQuizzes: 23,
          achievements: [],
          languages: [
            { name: 'Angielski', progress: 75, level: 'B2', flag: '🇺🇸' },
            { name: 'Hiszpański', progress: 45, level: 'A2', flag: '🇪🇸' },
            { name: 'Francuski', progress: 20, level: 'A1', flag: '🇫🇷' }
          ]
        }
      };

      users.push(newUser);
      saveUsers(users);

      return { success: true, message: 'Rejestracja zakończona sukcesem' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Wystąpił błąd podczas rejestracji' };
    }
  };

  // Funkcja logowania
  const login = async (username, password) => {
    try {
      const users = loadUsers();
      const foundUser = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
      );

      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        
        setUser(userWithoutPassword);
        // ZAPISZ SESJĘ - ale będzie usunięta przy restarcie
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        return { success: true, message: 'Logowanie zakończone sukcesem' };
      } else {
        return { success: false, message: 'Niepoprawny login lub hasło' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Wystąpił błąd podczas logowania' };
    }
  };

  // Funkcja wylogowania
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  };

  // Funkcja aktualizacji profilu użytkownika
  const updateProfile = (updates) => {
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        saveUsers(users);
        
        const updatedUser = { ...users[userIndex] };
        delete updatedUser.password;
        
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return { success: true, message: 'Profil zaktualizowany' };
      }
      
      return { success: false, message: 'Nie znaleziono użytkownika' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Błąd podczas aktualizacji profilu' };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
