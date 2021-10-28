import React from 'react'
import { signInWithGoogle } from '../service/firebase'
import google from "../img/google_logo.png";
import classes from './AuthGoogle.module.css';

function AuthGoogle() {
    return (
        <img className={classes.logo} src={google} alt="google" onClick={signInWithGoogle}/>
    )
}

export default AuthGoogle
