import { Link } from 'react-router-dom';

import logo from '../../img/osmosis_logo.jpeg';
import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
    <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="Logo" />
        <nav>
            <ul>
                <li>
                    <Link to='/'>Overview</Link>
                </li>
                <li>
                    <Link to='/pools'>Pools</Link>
                </li>
                <li>
                    <Link to='/tokens'>Tokens</Link>
                </li>
            </ul>
        </nav>
    </header>
    );
}

export default MainNavigation;