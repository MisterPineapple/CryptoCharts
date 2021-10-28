import React from 'react'
import Login from '../../components/login/Login';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';

import classes from './Header1.module.css';

function Header1() {
    const [osmoData, setOsmoData] = useState();
    const [ionData, setIonData] = useState();

    useEffect(() => {
        fetch(
            'https://api-osmosis.imperator.co/search/v1/price/osmo'
        ).then(response => {
            return response.json();
        }).then(data => {
            setOsmoData(data.price.toFixed(2));
        })
    }, [])

    useEffect(() => {
        fetch(
            'https://api-osmosis.imperator.co/search/v1/price/ion'
        ).then(response => {
            return response.json();
        }).then(data => {
            setIonData(data.price.toFixed(2));
        })
    }, [])

    return (
        <div className={classes.header}>
            <div className={classes.countUp}> Uploaded &nbsp;<CountUp end={1000000} duration={2000000} />s ago</div>
            <div className={classes.price}>OSMO: ${osmoData}</div>
            &nbsp;&nbsp;
            <div className={classes.price}>ION: ${ionData}</div>
            <div className={classes.logIn}><Login /></div>
        </div>
    )
}

export default Header1
