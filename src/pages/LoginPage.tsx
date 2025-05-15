import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { login } from '../services/authService';


//schema di validazione per il form di login
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email non valida').required('Email obbligatoria'),
    password: Yup.string().min(6, 'Password troppo corta').required('Password obbligatoria')
});

//componente di login
const LoginPage: React.FC = () => {
    //hook per navigare fra le pagine
    const navigate = useNavigate();
    //accesso allo store di autenticazione
    const {setAuth} = useAuthStore();

    //configuro il form con formik
    const formik = useFormik({
        //valori iniziali del form
        initialValues: {
            email: '',
            password: ''
        },
        //schema di validazione
        validationSchema: LoginSchema,
        //funzione chiamata al submit del form
        onSubmit: async (values, {setSubmitting, setStatus}) => {
            try{
                //chiamata api per il login
                console.log('Tentativo di login con:', values);
                const tokens = await login(values);
                console.log('Token ricevuti:', tokens);

                //salvo token nello store
                setAuth(tokens);

                //reindirizzamento alla dashboard dopo il login
                navigate('/dashboard');
            } catch (error) {
                //gestione errori
                console.error('Errore dettagliato:', error);
                setStatus('Autenticazione non riuscita, ritenta');
            } finally{
                //ripristino lo stato di invio 
                setSubmitting(false);
            }
        }
    })

    return (
        // Container principale centrato nella pagina
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {/* Card del form di login */}
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            {/* Titolo */}
            <h1 className="text-2xl font-bold text-center text-gray-800">Accedi</h1>
            
            {/* Messaggio di errore (se presente) */}
            {formik.status && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                {formik.status}
              </div>
            )}
            
            {/* Form di login */}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Campo email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Messaggio di errore per l'email */}
                {formik.touched.email && formik.errors.email ? (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>
    
              {/* Campo password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Messaggio di errore per la password */}
                {formik.touched.password && formik.errors.password ? (
                  <div className="mt-1 text-sm text-red-600">{formik.errors.password}</div>
                ) : null}
              </div>
    
              {/* Pulsante di login */}
              <button 
                type="submit" 
                disabled={formik.isSubmitting}
                className={`w-full px-4 py-2 text-white rounded-md ${
                  formik.isSubmitting 
                    ? 'bg-blue-300 cursor-not-allowed' // Stile quando il form è in fase di invio
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' // Stile normale
                }`}
              >
                {formik.isSubmitting ? 'Accesso in corso...' : 'Accedi'}
              </button>
            </form>
          </div>
        </div>
      );
}

export default LoginPage;