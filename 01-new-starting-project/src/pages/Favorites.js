import { useContext } from 'react';
import FavoritesContext from '../store/favorites-context'
import MeetupList from '../components/meetups/MeetupList';

function FavoritesPage(){
    const favoritesContext = useContext(FavoritesContext);
    let content ;
    if (favoritesContext.totalFavorites === 0){
        content = <p>즐겨찾기 목록이 비었습니다.</p>
    } else {
        content = <MeetupList meetups = {favoritesContext.favorites} />
    }
    return <section>
        <h1>즐겨찾기</h1>
        {content}
    </section>
}

export default FavoritesPage;