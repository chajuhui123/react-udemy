import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import FavoritesContext from '../../store/favorites-context'

function MainNavigation(){
    const favoritesContext = useContext(FavoritesContext);
    return(
        <header className = {classes.header}>
            <div className = {classes.logo}>모임확인</div>
            <nav>
                <ul>
                    <li>
                        <Link to = "/">모든모임</Link>
                    </li>
                    <li>
                        <Link to = "/new-meetup">모임추가</Link>
                    </li>
                    <li>
                        <Link to = "/favorites">
                            즐겨찾기
                            <span className = {classes.badge}>
                                {favoritesContext.totalFavorites}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;