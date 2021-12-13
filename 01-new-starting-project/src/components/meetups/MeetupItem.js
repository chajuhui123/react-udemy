import { useContext } from 'react';
import classes from './MeetupItem.module.css';
import Card from '../ui/Card';
import FavoritesContext from '../../store/favorites-context'

// 데이터를 받아오기 위해 props 사용
function MeetupItem(props){
    const favortiesContext = useContext(FavoritesContext);
    const itemIsFavorite = favortiesContext.itemIsFavorite(props.id);
    function toggleFavoriteStatusHandler(){
        if (itemIsFavorite){
            favortiesContext.removeFavorite(props.id);
        } else {
            favortiesContext.addFavorite({
                id : props.id,
                title : props.title,
                address : props.address,
                image : props.image,
                description : props.description,
            });
        }

    }
    return (
    <li className = {classes.item}>
        {/* Card로 JSX 콘텐츠 감쌈 */}
        <Card> 
            {/* 동적데이터를 삽입 */}
            <div className = {classes.image}>
                <img alt = {props.title} src = {props.image}/>
            </div>
            <div className = {classes.content}>
                <h3>{props.title}</h3>
                <address>{props.address}</address>
                <p>{props.description}</p>
            </div>
            <div className = {classes.actions}>
                <button onClick = {toggleFavoriteStatusHandler}>
                    {itemIsFavorite ? 'Remove From Favorites' : 'To Favorites'}
                </button>
            </div>
        </Card>
    </li>)
}

export default MeetupItem;