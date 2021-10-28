import CryptoOverview from '../components/crypto_overview/CryptoOverview';
import TopTokens from '../components/top_tokens/TopTokens';
import TopPools from '../components/top_pools/TopPools';

function OverviewPage () {
    return(
        <div >
            <CryptoOverview />
            <TopTokens />
            <TopPools />
        </div>
    );
}

export default OverviewPage;