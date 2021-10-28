import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import OverviewPage from './pages/Overview';
import PoolsPage from './pages/Pools';
import TokensPage from './pages/Tokens';
import './index.css';
import CryptoOverviewDetail from './components/crypto_overview/CryptoOverviewDetail';
import Header1 from './components/layout/Header1';
import React from 'react';

function App() {

  return (
  <React.Fragment>
    <Header1 />
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
