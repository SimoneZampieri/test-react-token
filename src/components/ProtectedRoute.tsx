import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// interfaccia per le props del componente
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// componente che protegge le rotte che richiedono autenticazione
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // accesso allo stato di autenticazione
  const { isAuthenticated } = useAuthStore();

  // se l'utente non è autenticato, reindirizza alla pagina di login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // se l'utente è autenticato, mostra il contenuto protetto
  return <>{children}</>;
};

export default ProtectedRoute;