import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {login } from '../services/authService';


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
                const tokens = await login(values)

                //salvo token nello store
                setAuth(tokens)

                //reindirizzo alla dashboard dopo il login
                navigate('/dashboard')
            }
        }
    })
}