import React from 'react'
import { signInWithFacebook } from '../service/firebase'
import facebook from '../img/facebook_logo.png';
import classes from './AuthFacebook.module.css';

function AuthFacebook() {
    return (
        <img className={classes.logo} src={facebook} alt="facebook" onClick={signInWithFacebook}/>
    )
}

export default AuthFacebook
