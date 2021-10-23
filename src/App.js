import { Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Layout from './components/layout/Layout';
import OverviewPage from './pages/Overview';
import PoolsPage from './pages/Pools';
import TokensPage from './pages/Tokens';
import './index.css';
import CryptoOverviewDetail from './components/crypto_overview/CryptoOverviewDetail';
import React from 'react';
import Login from './components/login/Login';
import firebase from './service/firebase'

function App() {
  // const [userState, setUser] = useState();

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if(user){
  //       setUser(user)
  //     }
  //   })
  // }, [])

  // console.log(userState);

  return (
  <React.Fragment>
    <div>
      <Login />
    </div>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <OverviewPage />
        </Route>
        <Route path='/pools'>
          <PoolsPage />
        </Route>
        <Route exact path='/tokens'>
          <TokensPage />
        </Route>
        <Route exact path='/tokens/:symbol'>
          <CryptoOverviewDetail />
        </Route>
      </Switch>
    </Layout>
  </React.Fragment>
  );
}

export default App;
