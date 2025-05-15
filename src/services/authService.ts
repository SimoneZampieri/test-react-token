import axios from 'axios';
import type { AuthTokens, LoginCredentials, User } from '../types/auth';

// url dell'api mock per login e dati utente
const API_URL = {
  // questo endpoint restituisce token JWT e refresh token
  login: 'https://run.mocky.io/v3/8d1199c0-d333-482e87c1-78ee85010b8e',
  // questo endpoint restituisce i dati dell'utente
  userData: 'https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ffa05d93b0d44e'
};

// salva i token nel localStorage
const storeTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('token', tokens.token);
  localStorage.setItem('refreshToken', tokens.refreshToken);
};

// ottiene i token dal localStorage
export const getTokens = (): AuthTokens | null => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (token && refreshToken) {
    return { token, refreshToken };
  }
  
  return null;
};

// timuove i token dal localStorage
export const removeTokens = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// saervizio di login
export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  try {
    // effettua la chiamata POST all'API di login
    const response = await axios.post<AuthTokens>(API_URL.login, credentials);
    
    // salva i token ricevuti
    storeTokens(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Errore di login:', error);
    throw error;
  }
};

// ottiene i dati dell'utente
export const getUserData = async (): Promise<User> => {
  const tokens = getTokens();
  
  if (!tokens) {
    throw new Error('Nessun token di autenticazione trovato');
  }
  
  try {
    // effettua la chiamata get con il token JWT nell'header Authorization
    const response = await axios.get<User>(API_URL.userData, {
      headers: {
        Authorization: `Bearer ${tokens.token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dati utente:', error);
    throw error;
  }
};

// verifica se l'utente è autenticato
export const isAuthenticated = (): boolean => {
  return !!getTokens();
};