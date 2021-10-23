import CryptoOverview from '../components/crypto_overview/CryptoOverview';
import TopTokens from '../components/top_tokens/TopTokens';

function OverviewPage () {
    return(
        <div >
            <CryptoOverview />
            <TopTokens />
        </div>
    );
}

export default OverviewPage;