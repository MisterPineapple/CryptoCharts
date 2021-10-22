import { Route, Switch } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OverviewPage from './pages/Overview';
import PoolsPage from './pages/Pools';
import TokensPage from './pages/Tokens';
import './index.css';
function App() {
  return (
    // <Layout>
    //   <div>
    //     Crypto Charts - Overview
    //   </div>
    // </Layout>

  <Layout>
    <Switch>
      <Route path='/' exact>
        <OverviewPage />
      </Route>
      <Route path='/pools'>
        <PoolsPage />
      </Route>
      <Route path='/tokens'>
        <TokensPage />
      </Route>
    </Switch>
  </Layout>
  );
}

export default App;
