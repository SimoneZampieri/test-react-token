import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";


//schema di validazione per il form di login
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email non valida').required('Email obbligatoria'),
    password: Yup.string().min(6, 'Password troppo corta').required('Password obbligatoria')
})