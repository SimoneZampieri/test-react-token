import axios from 'axios';
import type { AuthTokens, LoginCredentials, User } from '../types/auth';

const API_URL = {
  login: 'https://run.mocky.io/v3/8d1199c0-d333-482e87c1-78ee85010b8e',
  userData: 'https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ffa05d93b0d44e'
};

// Salva i token nel localStorage
const storeTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// Ottiene i token dal localStorage
export const getTokens = (): AuthTokens | null => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (token && refreshToken) {
    return { token, refreshToken };
  }
  
  return null;
};

// Rimuove i token dal localStorage
export const removeTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Mock della risposta dell'API di login per evitare problemi CORS
const mockLoginResponse = (): AuthTokens => {
  return {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIgVGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIgVGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };
};

// Mock della risposta dell'API per i dati utente
const mockUserDataResponse = (): User => {
  return {
    id: '123456',
    name: 'Utente Test',
    email: 'utente@test.com'
  };
};

// Servizio di login
export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  try {
    
    
    // Simuliamo un ritardo per rendere più realistico il mock
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Utilizziamo la risposta mock
    const mockResponse = mockLoginResponse();
    
    // Salva i token ricevuti
    storeTokens(mockResponse);
    
    return mockResponse;
  } catch (error) {
    console.error('Errore di login:', error);
    throw error;
  }
};

// Ottiene i dati dell'utente
export const getUserData = async (): Promise<User> => {
  const tokens = getTokens();
  
  if (!tokens) {
    throw new Error('Nessun token di autenticazione trovato');
  }
  
  try {
   
    
    // Simuliamo un ritardo per rendere più realistico il mock
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Utilizziamo la risposta mock
    return mockUserDataResponse();
  } catch (error) {
    console.error('Errore nel recupero dei dati utente:', error);
    throw error;
  }
};

// Verifica se l'utente è autenticato
export const isAuthenticated = (): boolean => {
  return !!getTokens();
};