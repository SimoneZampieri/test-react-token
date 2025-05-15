export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Aggiungi altre proprietà dell'utente se necessario
}