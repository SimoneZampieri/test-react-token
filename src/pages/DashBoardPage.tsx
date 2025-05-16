import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../services/authService'
import { useAuthStore } from '../store/authStore'

//componente dashboard protetto
const DashBoardPage: React.FC = () => {

    //hook di navigazione
    const navigate = useNavigate();

    //accesso allo store di autenticazione
    const {isAuthenticated, user, setUser, logout} = useAuthStore();

    //stati locali per gestire caricamenti ed errori
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //useeffect al caricametno del componente
    useEffect(() => {
        //varifica se l'utente è autenticato
        if(!isAuthenticated){
            //redireziona alla pagina di login se non autenticato
            navigate('/login');
            return;
        }

        //funzione che recupera i dati dell'utente
        const fetchUserData = async () => {
            try{
                //chiamata api per recuperare i dati dell'utente
                const userData = await getUserData();
                //salvataggio dati nello store
                setUser(userData);
            } catch(err){
                //gestione errori
                setError('Impossibile caricare i dati utente');
                console.error(err)
            }finally{
                setLoading(false); //imposta loading a false al termine del caricamento
            }
        }
        //funzione di recupero dati 
        fetchUserData();
    },[isAuthenticated, navigate, setUser]) //dipende dall'autenticazione e dalla navigazione

    //funzione di logout
    const handleLogout = () => {
        //chiamo la funzione di logout dallo store
        logout()
        //reindirizzo alla pagina di login
        navigate('/login');
    };

    //se l'utente non è autenticato non mostro il contenuto
    if(!isAuthenticated){
        return null
    }

  return (
    <div className="min-h-screen bg-gray-100">
    <div className="max-w-4xl p-6 mx-auto">
      {/* header con titolo e pulsante logout */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
      
      {/* indicatore di caricamento */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* messaggio di errore */}
      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      {/* visualizzazione dei dati utente */}
      {user && !loading && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Informazioni Utente</h2>
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-medium">ID:</span> {user.id}</p>
            <p className="text-gray-700"><span className="font-medium">Nome:</span> {user.name}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
            {/* visualizza altre proprietà dell'utente se necessario */}
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default DashBoardPage